"use client";

import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface AccordionFormSectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  hasErrors?: boolean;
}

interface AccordionFormProps {
  sections: AccordionFormSectionProps[];
  defaultValue?: string;
  className?: string;
}

export function AccordionForm({ sections, defaultValue, className }: AccordionFormProps) {
  return (
    <Accordion
      type="single"
      collapsible
      // @ts-expect-error Shadcn Accordion component typing issue with type="single"
      defaultValue={defaultValue || sections[0]?.id}
      className={cn("w-full space-y-4", className)}
    >
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="border rounded-lg px-4 bg-card shadow-sm"
        >
          <AccordionTrigger
            className={cn("hover:no-underline", section.hasErrors && "text-destructive")}
          >
            <div className="flex flex-col items-start text-left">
              <span className="font-semibold text-base">{section.title}</span>
              {section.description && (
                <span className="text-sm font-normal text-muted-foreground mt-1">
                  {section.description}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="grid gap-6 sm:grid-cols-2">{section.children}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
