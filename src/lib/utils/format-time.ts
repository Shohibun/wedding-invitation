export function formatTime(timeString: string) {
  // Assuming timeString is "HH:mm:ss" or "HH:mm"
  if (!timeString) return "";
  const parts = timeString.split(":");
  if (parts.length >= 2) {
    return `${parts[0]}:${parts[1]}`;
  }
  return timeString;
}
