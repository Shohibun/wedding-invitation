import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/admin/page-container";
import { FileQuestion } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

export default function AdminNotFound() {
  return (
    <PageContainer className="flex items-center justify-center min-h-[80vh]">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileQuestion className="w-8 h-8 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>Page Not Found</EmptyTitle>
          <EmptyDescription>
            The page you are looking for does not exist or has been moved.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button nativeButton={false} render={<Link href="/dashboard" />} variant="outline">
            Return to Dashboard
          </Button>
        </EmptyContent>
      </Empty>
    </PageContainer>
  );
}
