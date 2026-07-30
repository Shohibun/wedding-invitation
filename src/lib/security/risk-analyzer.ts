import { SECURITY_CONSTANTS } from "../../features/security/constants";

export interface RiskFactors {
  emailVerified: boolean;
  passwordAgeDays: number;
  has2FA: boolean;
  unrecognizedDevices: number;
}

export const RiskAnalyzer = {
  /**
   * Calculates a heuristic security score (0-100).
   * No machine learning involved, simple rule-based approach.
   */
  calculateScore(factors: RiskFactors): { score: number; recommendations: string[] } {
    let score = 0;
    const recommendations: string[] = [];

    // Email verification
    if (factors.emailVerified) {
      score += SECURITY_CONSTANTS.SECURITY_SCORE_WEIGHTS.EMAIL_VERIFIED;
    } else {
      recommendations.push("Verify your email address to secure account recovery.");
    }

    // Password age
    if (factors.passwordAgeDays <= SECURITY_CONSTANTS.PASSWORD_EXPIRY_DAYS) {
      score += SECURITY_CONSTANTS.SECURITY_SCORE_WEIGHTS.RECENT_PASSWORD;
    } else {
      recommendations.push("Your password is old. Consider updating it.");
    }

    // 2FA (Future)
    if (factors.has2FA) {
      score += SECURITY_CONSTANTS.SECURITY_SCORE_WEIGHTS.TWO_FACTOR;
    } else {
      recommendations.push("Enable Two-Factor Authentication (2FA) for maximum security.");
    }

    // Penalties
    if (factors.unrecognizedDevices > 0) {
      score -= factors.unrecognizedDevices * 5; // 5 points per unknown device
      recommendations.push(
        `You have ${factors.unrecognizedDevices} unrecognized devices. Review your active sessions.`
      );
    }

    return {
      score: Math.max(0, Math.min(100, score)), // Clamp between 0 and 100
      recommendations,
    };
  },
};
