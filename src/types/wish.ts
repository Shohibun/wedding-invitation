export interface Wish {
  id: string;
  invitationId: string;
  guestName: string; // Captured from input or guest slug
  message: string;
  createdAt: Date;
  status: "approved" | "pending" | "spam"; // For moderation by the couple
}
