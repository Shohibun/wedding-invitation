import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge, BadgeProps } from "./badge";

export const Chip = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, ...props }, ref) => {
  return <Badge ref={ref} className={cn("px-3 py-1 text-sm font-medium", className)} {...props} />;
});
Chip.displayName = "Chip";
