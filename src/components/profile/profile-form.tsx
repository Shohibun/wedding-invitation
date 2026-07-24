"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, UpdateProfileInput } from "@/features/profile/schema";
import { updateProfileAction } from "@/features/profile/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useAuthContext } from "@/providers/auth-provider";
import { useState, useTransition } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ProfileForm() {
  const { user, refresh } = useAuthContext();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      full_name: user?.profile?.full_name || "",
    },
  });

  const onSubmit = (data: UpdateProfileInput) => {
    setSuccess(false);
    setError(null);
    startTransition(async () => {
      const result = await updateProfileAction(data);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        await refresh(); // Refresh session to reflect updated name in the UI globally
      }
    });
  };

  const { control } = form;
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
          <AlertDescription>Profile updated successfully.</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        <Field data-invalid={!!form.formState.errors.full_name}>
          <FieldLabel>Display Name</FieldLabel>
          <Input placeholder="John Doe" {...form.register("full_name")} disabled={isPending} />
          <FieldError>{form.formState.errors.full_name?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel>Email Address</FieldLabel>
          <Input value={user?.email || ""} disabled readOnly className="bg-muted" />
          <p className="text-xs text-muted-foreground mt-1">
            Email address cannot be changed at this time.
          </p>
        </Field>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
