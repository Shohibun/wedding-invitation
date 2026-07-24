import { AuthCard } from "@/components/auth/auth-card";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Set New Password | Wedding Admin",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      title="Set new password"
      description="Please enter your new password below."
      footer={
        <div className="text-center w-full text-sm">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      }
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
