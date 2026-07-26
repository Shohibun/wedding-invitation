import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingSkeleton() {
  return (
    <div className="border rounded-xl overflow-hidden shadow-sm flex flex-col bg-card">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-5 flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-4/5" />

        <div className="flex gap-2 mt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        <div className="flex gap-3 mt-auto pt-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
      </div>
    </div>
  );
}
