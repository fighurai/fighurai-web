import Anthropic from "@anthropic-ai/sdk";
import type { MessageParam, ToolResultBlockParam } from "@anthropic-ai/sdk/resources/messages/messages";

import { ACUITY_CHAT_TOOLS, runAcuityChatTool } from "@/lib/acuity-chat-tools";

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

/**
 * Stream assistant text to the client; when `enableAcuityTools` is true, run an agent loop so Claude
 * can list real slots and create appointments via tools (must match `buildFightChatSystemPrompt` flag).
 */
export async function streamAnthropicChat(
  system: string,
  messages: { role: string; content: string }[],
  model: string,
  anthropicApiKey: string,
  signal: AbortSignal | undefined,
  enableAcuityTools: boolean,
): Promise<Response> {
  const anthropic = new Anthropic({ apiKey: anthropicApiKey });
  const tools = enableAcuityTools ? ACUITY_CHAT_TOOLS : undefined;

  const conversation: MessageParam[] = toAnthropicMessages(messages);
  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        const maxSteps = 8;
        try {
          for (let i = 0; i < maxSteps; i++) {
            const stream = anthropic.messages.stream(
              {
                model: process.env.ANTHROPIC_MODEL?.trim() || model || DEFAULT_MODEL,
                max_tokens: 8192,
                system,
                messages: conversation,
                ...(tools
                  ? { tools, tool_choice: { type: "auto" as const } }
                  : {}),
              },
              { signal },
            );

            stream.on("text", (delta: string) => {
              controller.enqueue(encoder.encode(delta));
            });

            let final;
            try {
              final = await stream.finalMessage();
            } catch (err) {
              if ((err as Error).name === "AbortError") return;
              const message = err instanceof Error ? err.message : "Streaming failed.";
              controller.enqueue(encoder.encode(`\n\n_${message}_`));
              return;
            }

            if (final.stop_reason !== "tool_use") {
              return;
            }

            conversation.push({
              role: "assistant",
              content: final.content,
            });

            const toolResults: ToolResultBlockParam[] = [];
            for (const block of final.content) {
              if (block.type === "tool_use") {
                const rawInput = block.input;
                const inputObj =
                  typeof rawInput === "object" &&
                  rawInput !== null &&
                  !Array.isArray(rawInput)
                    ? (rawInput as Record<string, unknown>)
                    : {};
                const result = await runAcuityChatTool(block.name, inputObj);
                toolResults.push({
                  type: "tool_result",
                  tool_use_id: block.id,
                  content: JSON.stringify(result),
                });
              }
            }

            if (toolResults.length === 0) {
              controller.enqueue(encoder.encode("\n\n_(Tool turn had no tool_use blocks.)_"));
              return;
            }

            conversation.push({
              role: "user",
              content: toolResults,
            });
          }
          controller.enqueue(encoder.encode("\n\n_Too many tool steps — please try again._"));
        } finally {
          controller.close();
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}
