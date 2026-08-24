"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AuthError({
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
    <div className="w-full bg-destructive/10 text-destructive p-6 rounded-xl border border-destructive/20 text-center space-y-4">
      <p className="font-medium">Something went wrong!</p>
      <Button variant="outline" size="sm" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
