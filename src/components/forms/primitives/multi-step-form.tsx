"use client";

import * as React from "react";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMultiStepForm } from "@/hooks/form/use-multi-step-form";

interface MultiStepFormProps {
  multiStep: ReturnType<typeof useMultiStepForm>;
  children: React.ReactNode;
}

export function MultiStepForm({ multiStep, children }: MultiStepFormProps) {
  const { steps, getStepState, progress } = multiStep;

  return (
    <div className="w-full space-y-8">
      {/* Progress Bar & Steps Header */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const state = getStepState(index);
            const isActive = state === "active";
            const isCompleted = state === "completed";
            const isInvalid = state === "invalid";

            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-200",
                    isActive && "border-primary bg-primary text-primary-foreground",
                    isCompleted && "border-primary bg-primary/10 text-primary",
                    isInvalid && "border-destructive bg-destructive/10 text-destructive",
                    state === "pending" && "border-muted bg-background text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : isInvalid ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    isActive ? "text-primary" : "text-muted-foreground",
                    isInvalid && "text-destructive"
                  )}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">{children}</div>
    </div>
  );
}
