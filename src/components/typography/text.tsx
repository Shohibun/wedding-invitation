import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: "xs" | "sm" | "base" | "lg" | "xl";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";
  align?: "left" | "center" | "right" | "justify";
  muted?: boolean;
}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  (
    { className, size = "base", weight = "normal", align = "left", muted = false, ...props },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "font-body",
          `text-${size}`,
          `font-${weight}`,
          `text-${align}`,
          muted ? "text-muted-foreground" : "text-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";
