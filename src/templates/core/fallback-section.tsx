import * as React from "react";
import { Heading } from "@/components/typography/heading";
import { Spinner } from "@/components/feedback/spinner";

interface FallbackSectionProps {
  id: string;
  height?: string;
  className?: string;
}

export const FallbackSection = ({ id, height = "min-h-[200px]" }: FallbackSectionProps) => (
  <div
    className={`w-full flex flex-col items-center justify-center p-8 border border-dashed border-border bg-muted/10 ${height}`}
  >
    <Spinner className="mb-4 text-muted-foreground w-6 h-6" />
    <Heading level={6} className="text-muted-foreground font-mono">
      [{id} Section Placeholder]
    </Heading>
    <p className="text-xs text-muted-foreground/60 mt-2">Will be loaded via next/dynamic</p>
  </div>
);
