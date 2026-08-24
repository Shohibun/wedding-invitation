import * as React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

export const Loading = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-8 gap-4 text-muted-foreground",
          className
        )}
        {...props}
      >
        <Spinner className="w-8 h-8" />
        <span className="text-sm font-medium">Loading...</span>
      </div>
    );
  }
);
Loading.displayName = "Loading";
