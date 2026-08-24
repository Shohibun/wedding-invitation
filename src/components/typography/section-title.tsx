import * as React from "react";
import { cn } from "@/lib/utils";
import { Heading } from "./heading";
import { Text } from "./text";

export interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export const SectionTitle = React.forwardRef<HTMLDivElement, SectionTitleProps>(
  ({ title, subtitle, align = "center", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-2",
          align === "center" && "items-center text-center",
          align === "left" && "items-start text-left",
          align === "right" && "items-end text-right",
          className
        )}
        {...props}
      >
        <Heading level={2}>{title}</Heading>
        {subtitle && <Text muted>{subtitle}</Text>}
      </div>
    );
  }
);
SectionTitle.displayName = "SectionTitle";
