import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam } from "@anthropic-ai/sdk/resources/messages";
import { NextResponse } from "next/server";

import {
  getChatModelById,
  pickDefaultModelId,
  type ChatModelOption,
  type ChatProvider,
} from "@/lib/chat-models";
import { openAIStreamToTextStream } from "@/lib/openai-stream";
import { FIGHURAI_SYSTEM_PROMPT } from "@/lib/system-prompt";
import { searchWeb } from "@/lib/web-search";

const DEFAULT_MODEL = "claude-sonnet-4-5-20250929";

function toAnthropicMessages(
  messages: { role: string; content: string }[],
): MessageParam[] {
  return messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));
}

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

async function buildSystemPrompt(
  useWeb: boolean,
  messages: { role: string; content: string }[],
): Promise<string> {
  let system = FIGHURAI_SYSTEM_PROMPT;
  if (useWeb) {
    system += `\n\n(Web mode is ON: DuckDuckGo snippets may appear below. Use them only for general context — **not** to contradict or replace the FIGHURAI facts block. For FIGHURAI services, booking, and contact, trust only the facts already in this prompt.)`;
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser?.content) {
      const web = await searchWeb(lastUser.content);
      system += `\n\n--- Web excerpts (supplemental; may be incomplete) ---\n${web}\n--- End web excerpts ---`;
    }
  }
  return system;
}

async function streamAnthropic(
  system: string,
  messages: { role: string; content: string }[],
  model: string,
  apiKey: string,
): Promise<Response> {
  const anthropic = new Anthropic({ apiKey });
  const stream = anthropic.messages.stream({
    model: process.env.ANTHROPIC_MODEL?.trim() || model || DEFAULT_MODEL,
    max_tokens: 8192,
    system,
    messages: toAnthropicMessages(messages),
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      const onText = (delta: string) => {
        controller.enqueue(encoder.encode(delta));
      };
      stream.on("text", onText);
      try {
        await stream.finalMessage();
      } catch (err) {
        const message = err instanceof Error ? err.message : "Streaming failed.";
        controller.enqueue(encoder.encode(`\n\n_${message}_`));
      } finally {
        stream.off("text", onText);
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
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
    useWeb?: unknown;
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

  const useWeb = b.useWeb === true;
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

  const system = await buildSystemPrompt(useWeb, messages);

  try {
    switch (option.provider) {
      case "anthropic":
        return await streamAnthropic(system, messages, option.apiModel, key);
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
