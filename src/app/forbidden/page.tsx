import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Ban } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forbidden",
};

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/40 p-4">
      <div className="max-w-md w-full bg-background rounded-xl shadow-lg border p-8 text-center space-y-6">
        <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto">
          <Ban className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Forbidden</h1>
          <p className="text-muted-foreground text-sm">Your access has been completely blocked.</p>
        </div>
        <Link href="/" className={buttonVariants({ className: "w-full" })}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
