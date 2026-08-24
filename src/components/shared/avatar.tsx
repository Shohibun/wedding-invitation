import * as React from "react";
import { cn } from "@/lib/utils";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  fallback: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, fallback, size = "md", ...props }, ref) => {
    const sizes = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-16 h-16 text-lg",
      xl: "w-24 h-24 text-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full bg-secondary items-center justify-center font-medium",
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={fallback} className="h-full w-full object-cover" />
          </>
        ) : (
          <span>{fallback.substring(0, 2).toUpperCase()}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";
