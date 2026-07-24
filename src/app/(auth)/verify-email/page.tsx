import { AuthCard } from "@/components/auth/auth-card";
import Link from "next/link";
import { Metadata } from "next";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Verify Email | Wedding Admin",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard
      title="Check your email"
      description="We've sent a verification link to your email address. Please click the link to verify your account."
    >
      <div className="flex flex-col space-y-4 pt-4">
        <Link href="/login" className={buttonVariants({ variant: "outline", className: "w-full" })}>
          Return to Sign in
        </Link>
      </div>
    </AuthCard>
  );
}
