import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DashboardCard({
  className,
  title,
  description,
  children,
  footer,
}: {
  className?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <Card className={cn("overflow-hidden border border-border/80 shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {children && <CardContent>{children}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  className,
  iconClassName = "bg-primary/10 text-primary",
}: {
  title: React.ReactNode;
  value: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ElementType;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:shadow-md border border-border/80",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-semibold text-muted-foreground">{title}</CardTitle>
        {Icon && (
          <div
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
              iconClassName
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-extrabold tracking-tight text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1 font-light">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
