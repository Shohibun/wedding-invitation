"use client";

import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/features/auth/schema";
import { registerAction } from "@/features/auth/actions";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./password-input";
import { PasswordStrength } from "./password-strength";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const { control, handleSubmit } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values: RegisterInput) => {
    setIsPending(true);
    try {
      const result = await registerAction(values);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Registration successful! Please check your email to verify.");
      router.push("/verify-email");
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
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel>Full Name</FieldLabel>
            <Input placeholder="John Doe" {...field} />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
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
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel>Password</FieldLabel>
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
            <FieldLabel>Confirm Password</FieldLabel>
            <PasswordInput placeholder="••••••••" {...field} />
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        )}
      />
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}
