export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  phone_number: string | null;
  slug: string;
  status: "pending" | "attending" | "declined";
  pax: number;
  created_at: string;
  updated_at: string;
}
