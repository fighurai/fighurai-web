import { PromptStudioChat } from "@/components/prompt-studio-chat";

export default function AskPage() {
  const year = new Date().getFullYear();
  return (
    <>
      <PromptStudioChat />
      <p className="shrink-0 border-t border-white/[0.04] py-2 text-center text-[0.65rem] text-[var(--text-faint)]">
        © {year} FIGHURAI · fighurai.com
      </p>
    </>
  );
}
