export interface WeddingEvent {
  id: string;
  invitation_id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string | null;
  timezone: string;
  location_name: string;
  address: string;
  google_maps_url: string | null;
  is_main_event: boolean;
  created_at: string;
  updated_at: string;
}
