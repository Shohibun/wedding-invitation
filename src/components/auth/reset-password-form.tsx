"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, ResetPasswordInput } from "@/features/auth/schema";
import { resetPasswordAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { PasswordInput } from "./password-input";
import { PasswordStrength } from "./password-strength";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function ResetPasswordForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const { control, handleSubmit } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ResetPasswordInput) => {
    setIsPending(true);
    try {
      const result = await resetPasswordAction(values);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Password reset successfully. You can now log in.");
      router.push("/login");
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  const passwordValue = useWatch({
    control,
    name: "password",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel>New Password</FieldLabel>
            <div className="space-y-2">
              <PasswordInput placeholder="••••••••" {...field} />
              {passwordValue && <PasswordStrength password={passwordValue} />}
            </div>
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel>Confirm New Password</FieldLabel>
            <PasswordInput placeholder="••••••••" {...field} />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Resetting password..." : "Reset Password"}
      </Button>
    </form>
  );
}
