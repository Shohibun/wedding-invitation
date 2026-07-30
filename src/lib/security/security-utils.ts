export const SecurityUtils = {
  maskIpAddress(ip: string): string {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.***.***`;
    }
    // IPv6 very basic mask
    const v6parts = ip.split(":");
    if (v6parts.length > 2) {
      return `${v6parts[0]}:****:****:${v6parts[v6parts.length - 1]}`;
    }
    return "***.***.***.***";
  },
};
