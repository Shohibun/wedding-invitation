export const DeviceUtils = {
  parseUserAgent(userAgent: string) {
    // Basic mock parser. Real world would use UAParser.js
    const isMobile = /Mobi|Android/i.test(userAgent);
    const isTablet = /Tablet|iPad/i.test(userAgent);

    let platform: "desktop" | "mobile" | "tablet" | "unknown" = "desktop";
    if (isMobile) platform = "mobile";
    if (isTablet) platform = "tablet";

    return {
      os: "Mac OS",
      browser: "Chrome",
      platform,
    };
  },

  isCurrentDevice(deviceId: string, currentDeviceId: string): boolean {
    return deviceId === currentDeviceId;
  },
};
