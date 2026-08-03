"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/shared/error/error-state";
import { Container } from "@/layouts/container";

export default function Error({
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
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Container>
        <ErrorState
          title="Something went wrong!"
          message="We couldn't load this invitation. It might be a temporary issue."
          onRetry={reset}
        />
      </Container>
    </div>
  );
}
