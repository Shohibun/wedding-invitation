import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unauthorized Access",
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <div className="max-w-md w-full bg-background rounded-xl shadow-lg border p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>
          <p className="text-muted-foreground text-sm">
            You do not have the required permissions to access this page. Please contact your
            administrator if you believe this is a mistake.
          </p>
        </div>
        <Link href="/dashboard" className={buttonVariants({ className: "w-full" })}>
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
