import { Session } from "../../features/auth/types";

export const AuthStorage = {
  get(key: string): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },

  set(key: string, value: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  },

  remove(key: string): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  },

  getSession(): Session | null {
    const stored = this.get("auth_session");
    if (!stored) return null;
    try {
      return JSON.parse(stored) as Session;
    } catch {
      return null;
    }
  },

  saveSession(session: Session): void {
    this.set("auth_session", JSON.stringify(session));
  },

  clearSession(): void {
    this.remove("auth_session");
  },
};
