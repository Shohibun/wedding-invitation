import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileService } from "@/features/profile/service";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { ProfileEmptyState } from "@/components/profile/ProfileEmptyState";

export default async function ProfileSettingsPage() {
  const userId = "user-admin-id"; // Mock for now

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const profileService = new ProfileService(supabase);

  let profile = null;
  try {
    profile = await profileService.getProfile(userId);
  } catch (_e) {
    // If not found, we'll get an error
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 p-8">
        <ProfileEmptyState />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <ProfileCard profile={profile} email="admin@example.com" />
        <ProfileForm profile={profile} userId={userId} />
      </div>
    </div>
  );
}
