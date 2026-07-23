"use client";

import { useState } from "react";
import { ZodSchema } from "zod";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";

export type StepState = "pending" | "active" | "completed" | "invalid";

export interface StepDefinition {
  id: string;
  title: string;
  schema?: ZodSchema;
  fields?: string[]; // specific form fields bound to this step
}

export interface UseMultiStepFormOptions<T extends FieldValues = FieldValues> {
  steps: StepDefinition[];
  form: UseFormReturn<T>;
}

export function useMultiStepForm<T extends FieldValues = FieldValues>({
  steps,
  form,
}: UseMultiStepFormOptions<T>) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [attemptedSteps, setAttemptedSteps] = useState<Set<number>>(new Set());

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const validateStep = async (stepIndex: number): Promise<boolean> => {
    const step = steps[stepIndex];
    if (step.schema && step.fields) {
      // Trigger validation only for the fields in this step
      const isValid = await form.trigger(step.fields as Path<T>[]);
      return isValid;
    }
    return true; // No schema/fields means always valid
  };

  const next = async () => {
    if (isLastStep) return;

    setAttemptedSteps((prev) => new Set(prev).add(currentStepIndex));
    const isValid = await validateStep(currentStepIndex);

    if (isValid) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const back = () => {
    if (isFirstStep) return;
    setCurrentStepIndex((prev) => prev - 1);
  };

  const getStepState = (index: number): StepState => {
    if (index === currentStepIndex) return "active";
    if (index < currentStepIndex) return "completed";
    if (attemptedSteps.has(index)) {
      // If we attempted this step but moved back to it, it means it might be invalid
      // We can rely on form state to determine if it has errors
      const step = steps[index];
      if (step.fields) {
        const hasErrors = step.fields.some((field) => !!form.formState.errors[field]);
        if (hasErrors) return "invalid";
      }
    }
    return "pending";
  };

  return {
    currentStepIndex,
    currentStep,
    steps,
    isFirstStep,
    isLastStep,
    progress: (currentStepIndex / steps.length) * 100,
    next,
    back,
    getStepState,
  };
}
