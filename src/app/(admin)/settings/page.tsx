import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { SectionCard } from "@/components/dashboard/section-card";
import { ConfirmDialog } from "@/components/dashboard/confirm-dialog";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <PageContainer>
      <PageHeader heading="Settings" text="Configure global system preferences." />

      <div className="mt-6 max-w-2xl space-y-6">
        <SectionCard title="General Info" description="Basic information about the SaaS platform.">
          <div className="space-y-4">
            <div className="h-10 bg-muted rounded animate-pulse w-full max-w-sm" />
            <div className="h-10 bg-muted rounded animate-pulse w-full max-w-xs" />
          </div>
        </SectionCard>

        <SectionCard title="Danger Zone" description="Irreversible actions.">
          <ConfirmDialog
            title="Clear Cache?"
            description="This will clear all edge caches immediately. This action cannot be undone."
            confirmText="Clear Cache"
            destructive
            onConfirm={() => console.log("Cache cleared")}
            trigger={<Button variant="destructive">Clear System Cache</Button>}
          />
        </SectionCard>
      </div>
    </PageContainer>
  );
}
