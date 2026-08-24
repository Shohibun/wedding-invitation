import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge, BadgeProps } from "./badge";

export const Pill = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, ...props }, ref) => {
  return <Badge ref={ref} className={cn("rounded-full px-4", className)} {...props} />;
});
Pill.displayName = "Pill";
