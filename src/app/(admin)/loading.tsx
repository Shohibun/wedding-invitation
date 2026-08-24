import { PageContainer } from "@/components/admin/page-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminLoading() {
  return (
    <PageContainer className="flex flex-col space-y-8 animate-in fade-in-50 duration-500">
      {/* Header Skeleton */}
      <div className="flex flex-col space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      {/* Toolbar / Actions Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>

      {/* Main Content Skeleton (Table/Grid approximation) */}
      <div className="rounded-md border bg-card overflow-hidden">
        <div className="flex items-center space-x-4 border-b p-4">
          <Skeleton className="h-4 w-[50px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 border-b p-4">
            <Skeleton className="h-4 w-[50px]" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
