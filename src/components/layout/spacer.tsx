import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  axis?: "horizontal" | "vertical";
}

export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({ className, size = "md", axis = "vertical", ...props }, ref) => {
    const sizes = {
      sm: "1rem",
      md: "2rem",
      lg: "4rem",
      xl: "8rem",
      "2xl": "12rem",
    };

    const style = axis === "vertical" ? { minHeight: sizes[size] } : { minWidth: sizes[size] };

    return (
      <div
        ref={ref}
        style={style}
        className={cn("shrink-0", className)}
        {...props}
        aria-hidden="true"
      />
    );
  }
);
Spacer.displayName = "Spacer";
