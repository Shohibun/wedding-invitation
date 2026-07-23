import * as React from "react";
import { cn } from "@/lib/utils";

export const Caption = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} className={cn("text-xs text-muted-foreground", className)} {...props} />;
  }
);
Caption.displayName = "Caption";
