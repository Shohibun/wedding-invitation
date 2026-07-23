export interface Wish {
  id: string;
  invitation_id: string;
  guest_name: string;
  message: string;
  status: "pending" | "approved" | "spam";
  created_at: string;
  updated_at: string;
}
