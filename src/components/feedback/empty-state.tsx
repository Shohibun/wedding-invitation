import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, title, description, icon, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-card/50",
          className
        )}
        {...props}
      >
        {icon && <div className="mb-4 text-muted-foreground opacity-50">{icon}</div>}
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-2">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";
