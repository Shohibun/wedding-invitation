export const DeviceDetector = {
  getDeviceType(userAgent: string): "Desktop" | "Tablet" | "Mobile" | "Other" {
    if (/tablet|ipad|playbook|silk|(android(?!.*mobi))/i.test(userAgent)) {
      return "Tablet";
    }
    if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        userAgent
      )
    ) {
      return "Mobile";
    }
    return "Desktop"; // Default to desktop if it doesn't match mobile/tablet
  },

  getOS(userAgent: string): string {
    if (userAgent.indexOf("Win") !== -1) return "Windows";
    if (userAgent.indexOf("Mac") !== -1) return "macOS";
    if (userAgent.indexOf("X11") !== -1) return "UNIX";
    if (userAgent.indexOf("Linux") !== -1) return "Linux";
    if (/Android/.test(userAgent)) return "Android";
    if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";

    return "Unknown";
  },
};
