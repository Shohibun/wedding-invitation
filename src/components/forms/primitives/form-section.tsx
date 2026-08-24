"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SectionCard } from "@/components/dashboard/section-card";

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({
  title,
  description,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <SectionCard
      title={title}
      description={description}
      className={cn("mb-6", className)}
      {...props}
    >
      <div className="grid gap-6 sm:grid-cols-2">{children}</div>
    </SectionCard>
  );
}
