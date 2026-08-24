import { Database } from "@/types/database.types";

export type Wish = Database["public"]["Tables"]["wishes"]["Row"];
export type WishInsert = Database["public"]["Tables"]["wishes"]["Insert"];
export type WishUpdate = Database["public"]["Tables"]["wishes"]["Update"];
