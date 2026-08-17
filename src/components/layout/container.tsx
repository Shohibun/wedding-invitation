import * as React from "react";
import { cn } from "@/lib/utils";

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full mx-auto px-3.5 sm:px-6 max-w-5xl", className)}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";
