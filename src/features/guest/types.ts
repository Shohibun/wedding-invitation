export type GuestCategory = "family" | "friend" | "coworker" | "vip" | "vendor" | "general";
export type GuestStatus = "active" | "inactive" | "blocked";
export type RsvpStatus = "pending" | "accepted" | "declined" | "maybe";
export type AttendanceStatus = "not_checked_in" | "checked_in" | "checked_out";

export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  phone_number: string | null;
  slug: string;
  category: GuestCategory;
  guest_status: GuestStatus;
  rsvp_status: RsvpStatus;
  attendance_status: AttendanceStatus;
  access_token: string;
  visit_count: number;
  first_visited_at?: string;
  last_visited_at?: string;
  pax: number;
  created_at: string;
  updated_at: string;
}

export interface GuestFilter {
  category?: GuestCategory;
  guest_status?: GuestStatus;
  rsvp_status?: RsvpStatus;
  attendance_status?: AttendanceStatus;
  search?: string;
}

export interface GuestSearch {
  query?: string;
  invitation_id: string;
  filter?: GuestFilter;
  page?: number;
  limit?: number;
  sortBy?: "name" | "created_at" | "updated_at";
  sortOrder?: "asc" | "desc";
}

export interface GuestStatistics {
  total: number;
  invited: number; // GuestStatus active
  confirmed: number; // RsvpStatus accepted
  pending: number; // RsvpStatus pending
  declined: number; // RsvpStatus declined
  checkedIn: number; // AttendanceStatus checked_in
  notArrived: number; // AttendanceStatus not_checked_in
  attendanceRate: number; // checkedIn / confirmed
  rsvpRate: number; // (confirmed + declined + maybe) / total
  acceptanceRate: number; // confirmed / total
  totalPax: number;
}

export interface GuestActivity {
  guest_id: string;
  name: string;
  action: string;
  timestamp: string;
}

export interface GuestImport {
  name: string;
  phone_number?: string;
  category?: GuestCategory;
  pax?: number;
}

export interface GuestExport {
  name: string;
  phone_number: string;
  category: string;
  status: string;
  rsvp: string;
  pax: number;
  link: string;
}

export interface GuestLink {
  guest_id: string;
  url: string;
}
