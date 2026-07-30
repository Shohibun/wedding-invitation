import { SecurityStatus } from "./types";
import { securityRepository } from "./repository";
import { RiskAnalyzer } from "../../lib/security/risk-analyzer";

export const SecurityStatusService = {
  async getSecurityStatus(userId: string): Promise<SecurityStatus> {
    const rawStatus = await securityRepository.getSecurityStatus(userId);

    // In a real app, we would calculate this dynamically based on Profile/Auth properties
    // For now, we mock the calculation for demonstration using RiskAnalyzer
    const passwordAgeDays = Math.floor(
      (Date.now() - new Date(rawStatus.passwordUpdatedAt).getTime()) / (1000 * 60 * 60 * 24)
    );

    const analysis = RiskAnalyzer.calculateScore({
      emailVerified: rawStatus.emailVerified,
      passwordAgeDays,
      has2FA: false, // Future proofing
      unrecognizedDevices: 0, // Mocked 0 for now
    });

    return {
      ...rawStatus,
      securityScore: analysis.score,
      recommendations: analysis.recommendations,
    };
  },
};
