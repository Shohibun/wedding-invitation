import { PageSkeleton } from "@/components/shared/loading/page-skeleton";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8 bg-background">
      <PageSkeleton />
    </div>
  );
}
