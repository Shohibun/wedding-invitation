import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { InvitationForm } from "../components/invitation-form";

export default function CreateInvitationPage() {
  return (
    <PageContainer>
      <PageHeader heading="Create Invitation" text="Setup a new digital wedding invitation." />

      <div className="mt-6 max-w-3xl">
        <InvitationForm />
      </div>
    </PageContainer>
  );
}
