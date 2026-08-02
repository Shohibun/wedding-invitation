import { Database } from "@/types/database.types";

export type Invitation = Database["public"]["Tables"]["invitations"]["Row"];
export type InvitationInsert = Database["public"]["Tables"]["invitations"]["Insert"];
export type InvitationUpdate = Database["public"]["Tables"]["invitations"]["Update"];

export interface InvitationWithDetails extends Invitation {
  couples?: { name: string; role: string }[];
  gallery?: { url: string }[];
  persons?: { name: string; role: string }[];
  gallery_images?: { url: string }[];
}
