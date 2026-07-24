import { AuthCard } from "@/components/auth/auth-card";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password | Wedding Admin",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      title="Reset your password"
      description="Enter your email address and we'll send you a link to reset your password."
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
      <ForgotPasswordForm />
    </AuthCard>
  );
}
