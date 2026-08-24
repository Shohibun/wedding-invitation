import { Database } from "@/types/database.types";

export type Rsvp = Database["public"]["Tables"]["rsvps"]["Row"];
export type RsvpInsert = Database["public"]["Tables"]["rsvps"]["Insert"];
export type RsvpUpdate = Database["public"]["Tables"]["rsvps"]["Update"];

// The old Guest interface was used in rsvp/types.ts incorrectly.
export type Guest = Database["public"]["Tables"]["guests"]["Row"];
