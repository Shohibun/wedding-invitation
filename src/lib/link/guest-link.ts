export function buildFullGuestLink(
  domain: string,
  invitationSlug: string,
  guestId: string
): string {
  return `${domain}/invitation/${invitationSlug}?guest=${guestId}`;
}

export function buildShortGuestLink(domain: string, guestSlug: string, token: string): string {
  return `${domain}/g/${guestSlug}?t=${token}`;
}
