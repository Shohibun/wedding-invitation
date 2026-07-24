import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { Metadata } from "next";
import { AuthRedirectReasonType, AUTH_REASON_MESSAGES } from "@/features/auth/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign in | Wedding Admin",
};

export default async function LoginPage(props: { searchParams: Promise<{ reason?: string }> }) {
  const searchParams = await props.searchParams;
  const reasonStr = searchParams?.reason as AuthRedirectReasonType | undefined;

  const message =
    reasonStr && AUTH_REASON_MESSAGES[reasonStr] ? AUTH_REASON_MESSAGES[reasonStr] : null;

  // Render destructive alert if expired, else default/success style
  const isDestructive = reasonStr === "expired";

  return (
    <div className="flex flex-col space-y-4 w-full">
      {message && (
        <Alert
          variant={isDestructive ? "destructive" : "default"}
          className={
            !isDestructive
              ? "border-green-500/50 text-green-600 bg-green-50/50 dark:bg-green-500/10 dark:text-green-400"
              : ""
          }
        >
          {isDestructive ? (
            <AlertCircle className="h-4 w-4" />
          ) : (
            <CheckCircle2 className="h-4 w-4" />
          )}
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      <AuthCard
        title="Sign in"
        description="Enter your email and password to access the CMS"
        footer={
          <div className="flex justify-between w-full text-sm">
            <Link href="/forgot-password" className="text-primary hover:underline font-medium">
              Forgot password?
            </Link>
            <Link
              href="/register"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        }
      >
        <LoginForm />
      </AuthCard>
    </div>
  );
}
