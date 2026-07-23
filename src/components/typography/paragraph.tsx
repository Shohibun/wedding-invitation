import * as React from "react";
import { cn } from "@/lib/utils";

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  lead?: boolean;
}

export const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, lead, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "font-body leading-relaxed",
          lead ? "text-xl text-muted-foreground" : "text-base text-foreground",
          "not-first:mt-6",
          className
        )}
        {...props}
      />
    );
  }
);
Paragraph.displayName = "Paragraph";
