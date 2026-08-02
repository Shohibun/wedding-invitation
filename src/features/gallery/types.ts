import { Database } from "@/types/database.types";

export type Gallery = Database["public"]["Tables"]["gallery"]["Row"];
export type GalleryInsert = Database["public"]["Tables"]["gallery"]["Insert"];
export type GalleryUpdate = Database["public"]["Tables"]["gallery"]["Update"];

// Legacy mapping
export type GalleryImage = Gallery;
