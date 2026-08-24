import { Database } from "@/types/database.types";

export type Gift = Database["public"]["Tables"]["gifts"]["Row"];
export type GiftInsert = Database["public"]["Tables"]["gifts"]["Insert"];
export type GiftUpdate = Database["public"]["Tables"]["gifts"]["Update"];

// Legacy mapping
export type GiftAccount = Gift;
