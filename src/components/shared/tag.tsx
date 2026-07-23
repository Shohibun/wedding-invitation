import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge, BadgeProps } from "./badge";

export const Tag = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, ...props }, ref) => {
  return <Badge ref={ref} variant="secondary" className={cn("rounded-md", className)} {...props} />;
});
Tag.displayName = "Tag";
