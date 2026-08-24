import * as React from "react";
import { cn } from "@/lib/utils";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 2, ...props }, ref) => {
    const Component = `h${level}` as React.ElementType;

    const sizes = {
      1: "text-4xl md:text-5xl lg:text-6xl font-extrabold",
      2: "text-3xl md:text-4xl font-bold",
      3: "text-2xl md:text-3xl font-semibold",
      4: "text-xl md:text-2xl font-semibold",
      5: "text-lg md:text-xl font-medium",
      6: "text-base md:text-lg font-medium",
    };

    return (
      <Component
        ref={ref}
        className={cn("font-heading tracking-tight text-foreground", sizes[level], className)}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";
