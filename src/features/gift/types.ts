export interface GiftAccount {
  id: string;
  invitation_id: string;
  bank_name: string;
  account_number: string;
  account_name: string;
  is_ewallet: boolean;
  qr_code_url: string | null;
  created_at: string;
  updated_at: string;
}
