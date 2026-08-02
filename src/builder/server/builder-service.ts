import { SupabaseClient } from "@supabase/supabase-js";
import { DraftService } from "@/features/drafts/service";
import { publishPipeline } from "@/publishing/pipeline";

export class BuilderService {
  constructor(private readonly supabase: SupabaseClient) {}

  async saveDraft(
    invitationId: string,
    templateId: string,
    workingInvitation: Record<string, unknown>
  ) {
    return DraftService.saveDraft(invitationId, {
      payload: { templateId, workingInvitation, updatedAt: new Date().toISOString() },
    });
  }

  async publish(invitationId: string) {
    const result = await publishPipeline.execute({ invitationId });
    if (result.status === "publish_failed" || result.status === "validation_failed") {
      throw new Error(`Publish failed: ${JSON.stringify(result.errors)}`);
    }
    return { success: true };
  }
}
