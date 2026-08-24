export class TokenUtilities {
  /**
   * Decodes a JWT token without verifying the signature.
   * Useful for inspecting claims on the client side (e.g. exp, sub).
   */
  static decodeJwt<T = Record<string, unknown>>(token: string): T | null {
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

      return JSON.parse(jsonPayload) as T;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  }

  /**
   * Extracts the expiration time (in seconds) from a JWT.
   */
  static getTokenExpiration(token: string): number | null {
    const decoded = this.decodeJwt<{ exp?: number }>(token);
    return decoded?.exp || null;
  }
}
