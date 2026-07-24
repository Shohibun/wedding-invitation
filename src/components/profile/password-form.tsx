"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema, ChangePasswordInput } from "@/features/profile/schema";
import { changePasswordAction } from "@/features/profile/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { PasswordInput } from "@/components/auth/password-input";
import { PasswordStrength } from "@/components/auth/password-strength";
import { useState, useTransition } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function PasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data: ChangePasswordInput) => {
    setSuccess(false);
    setError(null);
    startTransition(async () => {
      const result = await changePasswordAction(data);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        form.reset();
      }
    });
  };

  const { control } = form;
  const newPassword = useWatch({ control, name: "new_password" });
  useWatch({ control });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-500/50 text-green-600 bg-green-50/50 dark:bg-green-500/10 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>Password changed successfully.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        <Field data-invalid={!!form.formState.errors.current_password}>
          <FieldLabel>Current Password</FieldLabel>
          <PasswordInput
            placeholder="Enter current password"
            {...form.register("current_password")}
            disabled={isPending}
          />
          <FieldError>{form.formState.errors.current_password?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.new_password}>
          <FieldLabel>New Password</FieldLabel>
          <PasswordInput
            placeholder="Enter new password"
            {...form.register("new_password")}
            disabled={isPending}
          />
          <PasswordStrength password={newPassword || ""} />
          <FieldError>{form.formState.errors.new_password?.message}</FieldError>
        </Field>

        <Field data-invalid={!!form.formState.errors.confirm_password}>
          <FieldLabel>Confirm New Password</FieldLabel>
          <PasswordInput
            placeholder="Confirm new password"
            {...form.register("confirm_password")}
            disabled={isPending}
          />
          <FieldError>{form.formState.errors.confirm_password?.message}</FieldError>
        </Field>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
          {isPending ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </form>
  );
}
