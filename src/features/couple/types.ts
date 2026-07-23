export interface Person {
  id: string;
  invitation_id: string;
  role: "groom" | "bride";
  name: string;
  full_name: string;
  father_name: string;
  mother_name: string;
  description: string | null;
  instagram_username: string | null;
  photo_url: string | null;
  created_at: string;
  updated_at: string;
}
