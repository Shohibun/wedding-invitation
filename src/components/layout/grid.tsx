import * as React from "react";
import { cn } from "@/lib/utils";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "sm" | "md" | "lg" | "xl";
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 1, gap = "md", ...props }, ref) => {
    const gaps = {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
      xl: "gap-12",
    };

    return (
      <div
        ref={ref}
        className={cn("grid", `grid-cols-1 md:grid-cols-${cols}`, gaps[gap], className)}
        {...props}
      />
    );
  }
);
Grid.displayName = "Grid";
