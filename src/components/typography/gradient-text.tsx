import * as React from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: string;
  to?: string;
  via?: string;
}

export const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, from = "from-primary", to = "to-secondary", via, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("bg-clip-text text-transparent bg-linear-to-r", from, via, to, className)}
        {...props}
      />
    );
  }
);
GradientText.displayName = "GradientText";
