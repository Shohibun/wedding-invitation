import { Database } from "@/types/database.types";

export type Couple = Database["public"]["Tables"]["couples"]["Row"];
export type CoupleInsert = Database["public"]["Tables"]["couples"]["Insert"];
export type CoupleUpdate = Database["public"]["Tables"]["couples"]["Update"];

// Legacy mapping
export type Person = Couple;
