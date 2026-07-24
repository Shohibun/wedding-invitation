"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, ForgotPasswordInput } from "@/features/auth/schema";
import { forgotPasswordAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const { control, handleSubmit } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordInput) => {
    setIsPending(true);
    try {
      const resetUrl = `${window.location.origin}/reset-password`;
      const result = await forgotPasswordAction(values, resetUrl);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      setIsSent(true);
      toast.success("Password reset instructions sent to your email.");
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  if (isSent) {
    return (
      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">
          If an account exists for that email, we have sent password reset instructions.
        </p>
        <Button variant="outline" className="w-full" onClick={() => setIsSent(false)}>
          Try another email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" placeholder="name@example.com" {...field} />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Sending instructions..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
