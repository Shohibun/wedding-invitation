import * as React from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function PageHeader({ heading, text, className, children, ...props }: PageHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between px-2", className)} {...props}>
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">{heading}</h1>
        {text && <p className="text-lg text-muted-foreground">{text}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
