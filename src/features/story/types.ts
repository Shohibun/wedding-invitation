import { Database } from "@/types/database.types";

export type Story = Database["public"]["Tables"]["stories"]["Row"];
export type StoryInsert = Database["public"]["Tables"]["stories"]["Insert"];
export type StoryUpdate = Database["public"]["Tables"]["stories"]["Update"];

// Legacy mapping
export type LoveStory = Story;
