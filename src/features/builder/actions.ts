"use server";

import { publishPipeline } from "@/publishing/pipeline";
import { requireAuth } from "@/features/auth/server-guards";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";
import { headers } from "next/headers";

export async function publishInvitationAction(invitationId: string) {
  try {
    const user = await requireAuth();

    // Rate Limit: Max 5 publishes per minute
    const requestHeaders = await headers();
    const ip = getClientIp(requestHeaders);
    const rl = rateLimit(ip, "publish", { limit: 5, windowMs: 60 * 1000 });
    if (!rl.success) {
      logger.warn("Rate limit exceeded for publish", { userId: user.id, ip });
      return { success: false, error: "Too many requests. Please try again later." };
    }

    const result = await publishPipeline.execute({ invitationId });

    if (result.status === "success") {
      logger.info("Invitation published successfully", { invitationId, userId: user.id });
      return { success: true };
    } else {
      logger.warn("Invitation publish failed", {
        invitationId,
        userId: user.id,
        errors: result.errors,
      });
      return {
        success: false,
        error: "Publish failed",
        details: result.errors,
      };
    }
  } catch (error: unknown) {
    logger.error("Publish Server Action Error", error, { invitationId });
    const message = error instanceof Error ? error.message : "Unknown error";
    return { success: false, error: message };
  }
}
