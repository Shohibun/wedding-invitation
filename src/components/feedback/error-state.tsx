import * as React from "react";
import { cn } from "@/lib/utils";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  error?: Error | string;
  onRetry?: () => void;
}

export const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  ({ className, title = "Something went wrong", error, onRetry, ...props }, ref) => {
    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-12 text-center border border-destructive/20 bg-destructive/5 rounded-lg",
          className
        )}
        {...props}
      >
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <span className="text-destructive font-bold">!</span>
        </div>
        <h3 className="text-lg font-semibold text-destructive">{title}</h3>
        {errorMessage && (
          <p className="text-sm text-destructive/80 mt-2 font-mono">{errorMessage}</p>
        )}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 px-4 py-2 bg-background border rounded-md text-sm font-medium hover:bg-muted transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }
);
ErrorState.displayName = "ErrorState";
