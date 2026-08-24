import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatedButton, AnimatedButtonProps } from "./animated-button";

export const IconButton = React.forwardRef<HTMLButtonElement, Omit<AnimatedButtonProps, "size">>(
  ({ className, ...props }, ref) => {
    return (
      <AnimatedButton ref={ref} size="icon" className={cn("rounded-full", className)} {...props} />
    );
  }
);
IconButton.displayName = "IconButton";
