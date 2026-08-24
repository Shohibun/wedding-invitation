export function generateGuestUrl(invitationSlug: string, guestSlug?: string, baseUrl: string = "") {
  let url = `${baseUrl}/${invitationSlug}`;
  if (guestSlug) {
    url += `?to=${guestSlug}`;
  }
  return url;
}
