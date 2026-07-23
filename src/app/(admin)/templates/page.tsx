import { PageContainer } from "@/components/admin/page-container";
import { PageHeader } from "@/components/dashboard/page-header";
import { Toolbar, SearchBar } from "@/components/dashboard/toolbar";

export default function TemplatesPage() {
  return (
    <PageContainer>
      <PageHeader heading="Templates" text="Manage wedding themes and template configurations." />

      <div className="mt-6 space-y-4">
        <Toolbar>
          <SearchBar placeholder="Search templates..." />
        </Toolbar>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Template Card Placeholder */}
          <div className="border rounded-xl overflow-hidden shadow-sm">
            <div className="aspect-video bg-muted flex items-center justify-center">Preview</div>
            <div className="p-4 bg-card">
              <h3 className="font-semibold text-lg">Darsana Premium</h3>
              <p className="text-sm text-muted-foreground mt-1">Glassmorphism elegant design.</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
