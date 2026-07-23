import * as React from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function PageContainer({ className, children, ...props }: PageContainerProps) {
  return (
    <main className={cn("flex-1 space-y-4 p-4 pt-6 md:p-8", className)} {...props}>
      {children}
    </main>
  );
}
