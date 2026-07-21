export interface Event {
  id: string;
  title: string; // e.g., "Akad Nikah" or "Resepsi"
  date: Date;
  startTime: string; // e.g., "08:00"
  endTime?: string; // e.g., "10:00" or "Selesai"
  timezone: string; // e.g., "WIB"
  locationName: string; // e.g., "Masjid Istiqlal"
  address: string;
  googleMapsUrl?: string;
  isMainEvent?: boolean; // Determines which event drives the main countdown
}
