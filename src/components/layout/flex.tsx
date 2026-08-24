import * as React from "react";
import { cn } from "@/lib/utils";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  gap?: "1" | "2" | "3" | "4" | "6" | "8" | "12" | string;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction = "row",
      align = "start",
      justify = "start",
      wrap = "nowrap",
      gap,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          `flex-${direction}`,
          `items-${align}`,
          `justify-${justify}`,
          `flex-${wrap}`,
          gap && (["1", "2", "3", "4", "6", "8", "12"].includes(gap) ? `gap-${gap}` : gap),
          className
        )}
        {...props}
      />
    );
  }
);
Flex.displayName = "Flex";
