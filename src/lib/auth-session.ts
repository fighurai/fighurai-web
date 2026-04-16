const KEY = "fighurai-auth-session";

export type AuthSession = {
  email: string;
  name: string;
  signedAt: number;
};

export function readAuthSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<AuthSession>;
    if (typeof v.email !== "string" || typeof v.name !== "string") return null;
    return {
      email: v.email,
      name: v.name,
      signedAt: typeof v.signedAt === "number" ? v.signedAt : Date.now(),
    };
  } catch {
    return null;
  }
}

export function writeAuthSession(s: AuthSession) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function clearAuthSession() {
  localStorage.removeItem(KEY);
}
