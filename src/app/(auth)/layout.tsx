import { Metadata } from "next";
import { Suspense } from "react";
import { AuthSkeleton } from "@/components/auth/auth-skeleton";
import { Heart } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authentication | Darsana Wedding CMS",
  description: "Secure login for Darsana Wedding CMS",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0b0f19] text-slate-100 p-4 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 w-full max-w-md my-auto">
        <div className="flex flex-col items-center mb-8 space-y-3">
          <Link href="/" className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-6 h-6 text-white fill-white/20" />
            </div>
            <h1 className="mt-3 text-2xl font-bold tracking-tight text-white font-sans">
              Darsana<span className="text-blue-500 font-extrabold">CMS</span>
            </h1>
          </Link>
          <p className="text-xs text-slate-400 font-light">Single Admin Portal</p>
        </div>

        <Suspense fallback={<AuthSkeleton />}>{children}</Suspense>
      </div>
    </div>
  );
}
