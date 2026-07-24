"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccountSchema, DeleteAccountInput } from "@/features/profile/schema";
import { deleteAccountAction } from "@/features/profile/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { PasswordInput } from "@/components/auth/password-input";
import { useState, useTransition } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DangerZone() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<DeleteAccountInput>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
      confirmation: "" as "DELETE",
    },
  });

  const onSubmit = (data: DeleteAccountInput) => {
    setError(null);
    startTransition(async () => {
      const result = await deleteAccountAction(data);
      if (result.error) {
        setError(result.error);
      } else {
        // Since it's a placeholder, it might just return success or "Not Yet Implemented" error
        // Real implementation would log out and redirect to home
      }
    });
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
      setError(null);
    }
  };

  const { control } = form;
  useWatch({ control });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 border border-destructive/20 bg-destructive/5 rounded-lg">
        <div className="space-y-1">
          <h4 className="font-medium text-destructive">Delete Account</h4>
          <p className="text-sm text-muted-foreground">
            Permanently remove your account and all of its contents from the system. This action is
            not reversible.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2">
            Delete Account
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-destructive">Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid gap-4">
                <Field data-invalid={!!form.formState.errors.password}>
                  <FieldLabel>Current Password</FieldLabel>
                  <PasswordInput
                    placeholder="Enter your password to confirm"
                    {...form.register("password")}
                    disabled={isPending}
                  />
                  <FieldError>{form.formState.errors.password?.message}</FieldError>
                </Field>

                <Field data-invalid={!!form.formState.errors.confirmation}>
                  <FieldLabel>Type DELETE to confirm</FieldLabel>
                  <Input
                    placeholder="DELETE"
                    {...form.register("confirmation")}
                    disabled={isPending}
                  />
                  <FieldError>{form.formState.errors.confirmation?.message}</FieldError>
                </Field>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="destructive" disabled={isPending}>
                  {isPending ? "Deleting..." : "Permanently Delete Account"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
