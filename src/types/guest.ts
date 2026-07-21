export type RsvpStatus = "pending" | "attending" | "declined";

export interface Guest {
  id: string;
  invitationId: string;
  name: string;
  phoneNumber?: string;
  slug: string; // the specific URL slug for this guest, e.g. ?to=Budi
  status: RsvpStatus;
  pax: number; // Number of people attending
  createdAt: Date;
  updatedAt: Date;
}
