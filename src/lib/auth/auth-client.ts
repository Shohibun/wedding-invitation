import { createBrowserClient } from "@supabase/ssr";

let clientInstance: ReturnType<typeof createBrowserClient> | null = null;

export const getAuthClient = () => {
  if (!clientInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zwmqlzblbqkeuymtacew.supabase.co";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-anon-key";
    clientInstance = createBrowserClient(url, key);
  }
  return clientInstance;
};
