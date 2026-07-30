export const AuthTokenUtil = {
  parseJwt(token: string): Record<string, unknown> | null {
    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) return null;
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (_e) {
      return null;
    }
  },

  getTokenExpiration(token: string): number | null {
    const payload = this.parseJwt(token);
    return payload && typeof payload.exp === "number" ? payload.exp : null;
  },
};
