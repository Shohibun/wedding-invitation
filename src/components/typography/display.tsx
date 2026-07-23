import * as React from "react";
import { cn } from "@/lib/utils";

export const Display = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "font-heading text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter",
        className
      )}
      {...props}
    />
  );
});
Display.displayName = "Display";
