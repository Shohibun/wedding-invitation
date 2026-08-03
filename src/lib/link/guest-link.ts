export function buildGuestLink(domain: string, invitationSlug: string, guestId: string): string {
  return `${domain}/invitation/${invitationSlug}?guest=${guestId}`;
}
