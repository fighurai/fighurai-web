import { NextResponse } from "next/server";

import { streamAnthropicChat } from "@/lib/anthropic-chat-agent";
import {
  getChatModelById,
  pickDefaultModelId,
  type ChatModelOption,
  type ChatProvider,
} from "@/lib/chat-models";
import { isAcuityApiConfigured } from "@/lib/acuity-server";
import { openAIStreamToTextStream } from "@/lib/openai-stream";
import { buildFightChatSystemPrompt } from "@/lib/system-prompt";

function apiKeyFor(provider: ChatProvider): string | null {
  switch (provider) {
    case "anthropic":
      return process.env.ANTHROPIC_API_KEY?.trim() || null;
    case "groq":
      return process.env.GROQ_API_KEY?.trim() || null;
    case "openrouter":
      return process.env.OPENROUTER_API_KEY?.trim() || null;
    case "nvidia":
      return process.env.NVIDIA_API_KEY?.trim() || null;
    default:
      return null;
  }
}

function missingKeyMessage(provider: ChatProvider): string {
  switch (provider) {
    case "anthropic":
      return "Add ANTHROPIC_API_KEY to use Claude.";
    case "groq":
      return "Add GROQ_API_KEY (free tier at console.groq.com) for Groq models.";
    case "openrouter":
      return "Add OPENROUTER_API_KEY for OpenRouter models (incl. Nemotron, Qwen, Llama).";
    case "nvidia":
      return "Add NVIDIA_API_KEY from build.nvidia.com for NVIDIA Spark / NIM models.";
    default:
      return "Missing API key for this provider.";
  }
}

async function streamOpenAICompatible(
  url: string,
  apiKey: string,
  option: ChatModelOption,
  system: string,
  messages: { role: string; content: string }[],
  extraHeaders: Record<string, string>,
): Promise<Response> {
  const openaiMessages = [
    { role: "system" as const, content: system },
    ...messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
  ];

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: JSON.stringify({
      model: option.apiModel,
      messages: openaiMessages,
      stream: true,
      max_tokens: 4096,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    return NextResponse.json(
      { error: `Upstream ${res.status}: ${errText.slice(0, 800)}` },
      { status: 502 },
    );
  }

  return new Response(openAIStreamToTextStream(res), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const b = body as {
    messages?: unknown;
    model?: unknown;
  };

  const rawMessages = b.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return NextResponse.json({ error: "messages[] required" }, { status: 400 });
  }

  const messages = rawMessages.filter(
    (m): m is { role: string; content: string } =>
      m !== null &&
      typeof m === "object" &&
      typeof (m as { role?: unknown }).role === "string" &&
      typeof (m as { content?: unknown }).content === "string",
  );

  if (messages.length === 0) {
    return NextResponse.json({ error: "No valid messages" }, { status: 400 });
  }

  const requestedId = typeof b.model === "string" ? b.model : undefined;
  const option =
    requestedId && getChatModelById(requestedId)
      ? getChatModelById(requestedId)!
      : getChatModelById(pickDefaultModelId())!;

  const key = apiKeyFor(option.provider);
  if (!key) {
    return NextResponse.json(
      { error: missingKeyMessage(option.provider) },
      { status: 503 },
    );
  }

  const acuityChatTools =
    option.provider === "anthropic" && isAcuityApiConfigured();
  const system = buildFightChatSystemPrompt(acuityChatTools);

  try {
    switch (option.provider) {
      case "anthropic":
        return await streamAnthropicChat(
          system,
          messages,
          option.apiModel,
          key,
          request.signal,
          acuityChatTools,
        );
      case "groq":
        return await streamOpenAICompatible(
          "https://api.groq.com/openai/v1/chat/completions",
          key,
          option,
          system,
          messages,
          {},
        );
      case "openrouter":
        return await streamOpenAICompatible(
          "https://openrouter.ai/api/v1/chat/completions",
          key,
          option,
          system,
          messages,
          {
            "HTTP-Referer": process.env.OPENROUTER_REFERER?.trim() || "https://fighurai.com",
            "X-Title": "FIGHURAI",
          },
        );
      case "nvidia":
        return await streamOpenAICompatible(
          "https://integrate.api.nvidia.com/v1/chat/completions",
          key,
          option,
          system,
          messages,
          {},
        );
      default:
        return NextResponse.json({ error: "Unknown provider" }, { status: 500 });
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Chat failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
