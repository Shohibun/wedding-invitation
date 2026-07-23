import { SupabaseClient } from "@supabase/supabase-js";
import { LoveStoryService } from "@/features/story";

export async function seedStory(supabase: SupabaseClient, invitationId: string) {
  const service = new LoveStoryService(supabase);
  const existing = await service.getByInvitationId(invitationId);
  if (existing.length > 0) return;

  const stories = [
    {
      date_text: "First Meet",
      title: "Awaited Encounter",
      description: "We met at a coffee shop.",
      display_order: 1,
    },
    {
      date_text: "Started Dating",
      title: "A New Journey",
      description: "Officially a couple.",
      display_order: 2,
    },
    {
      date_text: "Engagement",
      title: "She Said Yes",
      description: "A beautiful ring for a beautiful soul.",
      display_order: 3,
    },
    {
      date_text: "Wedding Day",
      title: "Happily Ever After",
      description: "Tying the knot.",
      display_order: 4,
    },
  ];

  for (const story of stories) {
    await service.create({
      invitation_id: invitationId,
      ...story,
    });
  }
}
