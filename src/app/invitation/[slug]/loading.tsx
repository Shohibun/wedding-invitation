import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/layout/container";

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center">
      <Container className="flex flex-col items-center justify-center space-y-6 max-w-lg mx-auto text-center">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="space-y-3 w-full">
          <Skeleton className="h-6 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
        </div>
        <Skeleton className="h-10 w-32 rounded-full" />
      </Container>
    </div>
  );
}
