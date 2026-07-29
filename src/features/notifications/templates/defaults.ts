import { NotificationVariable } from "./types";

export const DEFAULT_TEMPLATE_VARIABLES: NotificationVariable[] = [
  {
    key: "guest_name",
    label: "Guest Name",
    description: "The full name of the guest.",
    required: true,
    defaultValue: "Guest",
  },
  {
    key: "couple_name",
    label: "Couple Name",
    description: "Names of the couple getting married.",
    required: true,
  },
  { key: "groom_name", label: "Groom Name", description: "Name of the groom.", required: false },
  { key: "bride_name", label: "Bride Name", description: "Name of the bride.", required: false },
  { key: "event_date", label: "Event Date", description: "The date of the event.", required: true },
  { key: "event_time", label: "Event Time", description: "The time of the event.", required: true },
  {
    key: "event_location",
    label: "Event Location",
    description: "The physical address of the event.",
    required: true,
  },
  { key: "maps_url", label: "Maps URL", description: "Google Maps link.", required: false },
  {
    key: "invitation_url",
    label: "Invitation URL",
    description: "Unique link to the digital invitation.",
    required: true,
  },
  { key: "rsvp_url", label: "RSVP URL", description: "Direct link to RSVP.", required: false },
  {
    key: "sender_name",
    label: "Sender Name",
    description: "Name of the person/entity sending the message.",
    required: false,
  },
];
