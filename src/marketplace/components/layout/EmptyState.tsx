import React from "react";
import { PackageOpen } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center border rounded-xl border-dashed bg-card/50">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <PackageOpen className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No packages found</h3>
      <p className="text-muted-foreground max-w-sm">
        We couldn&apos;t find any marketplace items matching your current filters. Try adjusting
        your search criteria.
      </p>
    </div>
  );
}
