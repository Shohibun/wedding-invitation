import { AuthCard } from "@/components/auth/auth-card";
import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account | Wedding Admin",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Create an account"
      description="Enter your details below to create your account"
      footer={
        <div className="text-center w-full text-sm">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Already have an account? Sign in
          </Link>
        </div>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
