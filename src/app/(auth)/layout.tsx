import { Metadata } from "next";
import { Suspense } from "react";
import { AuthSkeleton } from "@/components/auth/auth-skeleton";

export const metadata: Metadata = {
  title: "Authentication | Wedding Admin",
  description: "Secure login for the Wedding Admin CMS",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-primary-foreground font-bold text-xl">W</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Wedding CMS</h1>
        </div>
        <Suspense fallback={<AuthSkeleton />}>{children}</Suspense>
      </div>
    </div>
  );
}
