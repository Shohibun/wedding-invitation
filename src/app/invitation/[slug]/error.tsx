"use client";

import { useEffect } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  EmptyMedia,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20">
      <Container className="max-w-md">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </EmptyMedia>
            <EmptyTitle>Failed to Load Invitation</EmptyTitle>
            <EmptyDescription>
              We encountered an unexpected error while trying to fetch the invitation data. Please
              try again or contact the inviter.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => reset()} variant="outline">
              Try again
            </Button>
          </EmptyContent>
        </Empty>
      </Container>
    </div>
  );
}
