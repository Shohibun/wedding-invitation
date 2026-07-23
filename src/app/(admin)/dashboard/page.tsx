import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard, DashboardCard } from "@/components/dashboard/cards";
import { UsersIcon, MailsIcon, CheckCircleIcon } from "lucide-react";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader heading="Dashboard" text="Welcome to the Wedding Admin CMS." />

      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <StatCard
          title="Total Invitations"
          value="12"
          icon={MailsIcon}
          description="+2 from last month"
        />
        <StatCard title="Total RSVPs" value="143" icon={UsersIcon} description="+12 this week" />
        <StatCard
          title="System Status"
          value="Healthy"
          icon={CheckCircleIcon}
          description="All services running"
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DashboardCard
          className="col-span-4"
          title="Recent Activity"
          description="Latest changes across your invitations."
        >
          <div className="h-[300px] flex items-center justify-center text-muted-foreground border rounded-md border-dashed">
            Activity Chart Placeholder
          </div>
        </DashboardCard>

        <DashboardCard className="col-span-3" title="Quick Links">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Manage your invitations or update system settings.
            </p>
          </div>
        </DashboardCard>
      </div>
    </PageContainer>
  );
}
