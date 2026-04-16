import type { ChatMessage } from "@/lib/chat-types";

export type SavedConversation = {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
};

const STORAGE_KEY = "fighurai-conversations-v1";
const LAST_ACTIVE_KEY = "fighurai-conversations-active-id";
const MAX_CONVERSATIONS = 80;

function deriveTitle(messages: ChatMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser?.content?.trim()) return "New chat";
  const t = firstUser.content.trim().replace(/\s+/g, " ");
  return t.length > 56 ? `${t.slice(0, 53)}…` : t;
}

export function loadConversations(): SavedConversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedConversation[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (c) =>
          c &&
          typeof c.id === "string" &&
          Array.isArray(c.messages) &&
          typeof c.updatedAt === "number",
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function loadLastActiveId(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(LAST_ACTIVE_KEY);
    return v && v.length > 0 ? v : null;
  } catch {
    return null;
  }
}

export function saveLastActiveId(id: string | null) {
  if (typeof window === "undefined") return;
  try {
    if (id === null) localStorage.removeItem(LAST_ACTIVE_KEY);
    else localStorage.setItem(LAST_ACTIVE_KEY, id);
  } catch {
    /* quota */
  }
}

export function persistConversations(list: SavedConversation[]) {
  if (typeof window === "undefined") return;
  try {
    const trimmed = list
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, MAX_CONVERSATIONS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch {
    /* quota */
  }
}

export function upsertConversation(
  list: SavedConversation[],
  patch: SavedConversation,
): SavedConversation[] {
  const next = list.filter((c) => c.id !== patch.id);
  next.push({
    ...patch,
    title: patch.title || deriveTitle(patch.messages),
    updatedAt: patch.updatedAt,
  });
  return next.sort((a, b) => b.updatedAt - a.updatedAt);
}

export function removeConversation(
  list: SavedConversation[],
  id: string,
): SavedConversation[] {
  return list.filter((c) => c.id !== id);
}

export { deriveTitle };
