import { NotificationPreference } from "./types";

export const PreferenceManager = {
  isChannelEnabled(prefs: NotificationPreference, channel: string): boolean {
    if (!prefs.enabled) return false;
    return prefs.channels[channel] !== false; // Defaults to true if not explicitly false
  },

  isCategoryEnabled(prefs: NotificationPreference, category: string): boolean {
    if (!prefs.enabled) return false;
    return prefs.categories[category] !== false; // Defaults to true
  },

  isQuietHours(prefs: NotificationPreference, date: Date = new Date()): boolean {
    if (!prefs.quietHours?.enabled || !prefs.quietHours.start || !prefs.quietHours.end) {
      return false;
    }

    // Simplistic quiet hours calculation (assuming UTC for architectural sprint)
    const currentHour = date.getUTCHours();
    const currentMinute = date.getUTCMinutes();
    const currentTime = currentHour + currentMinute / 60;

    const [startHour, startMin] = prefs.quietHours.start.split(":").map(Number);
    const startTime = startHour + startMin / 60;

    const [endHour, endMin] = prefs.quietHours.end.split(":").map(Number);
    const endTime = endHour + endMin / 60;

    if (startTime <= endTime) {
      return currentTime >= startTime && currentTime <= endTime;
    } else {
      // Crosses midnight
      return currentTime >= startTime || currentTime <= endTime;
    }
  },
};
