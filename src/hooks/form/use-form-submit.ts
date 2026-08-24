"use client";

import { useState } from "react";
import { toast } from "sonner";

export interface UseFormSubmitOptions<TData, TResult> {
  onSubmit: (data: TData) => Promise<TResult>;
  onSuccess?: (result: TResult, data: TData) => void;
  onError?: (error: Error) => void;
  successMessage?: string | ((result: TResult) => string);
  errorMessage?: string | ((error: Error) => string);
}

export function useFormSubmit<TData, TResult>({
  onSubmit,
  onSuccess,
  onError,
  successMessage = "Successfully saved!",
  errorMessage = "Failed to save. Please try again.",
}: UseFormSubmitOptions<TData, TResult>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: TData) => {
    setIsSubmitting(true);
    try {
      const result = await onSubmit(data);

      const msg = typeof successMessage === "function" ? successMessage(result) : successMessage;
      if (msg) toast.success(msg);

      onSuccess?.(result, data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));

      const msg = typeof errorMessage === "function" ? errorMessage(error) : errorMessage;
      if (msg) toast.error(msg);

      onError?.(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
  };
}
