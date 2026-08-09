import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  LayoutDashboard,
  Lock,
  Sparkles,
  Smartphone,
  Layers,
  ShieldCheck,
  Zap,
  Heart,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0f19] text-slate-100 overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[128px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-slate-800/80 px-6 lg:px-12 bg-[#0b0f19]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Heart className="w-5 h-5 text-white fill-white/20" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white font-sans">
            Darsana<span className="text-blue-500 font-extrabold">CMS</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="outline"
              className="gap-2 border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200 hover:text-white transition-all duration-200"
            >
              <Lock className="w-4 h-4 text-blue-400" /> Admin Sign In
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-5xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-950/60 px-4 py-1.5 text-xs text-blue-400 font-medium mb-8 border border-blue-800/40 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Single Admin Wedding Invitation CMS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.15] text-white">
            Kelola & Publikasikan{" "}
            <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Undangan Digital Mewah
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-xl text-slate-400 leading-relaxed font-light">
            Platform manajemen konten modern khusus untuk membuat, mengedit, mempublikasikan, dan
            memantau undangan pernikahan digital dengan cepat, responsif, dan elegan.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="h-13 px-8 text-base w-full gap-2.5 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-600/30 transition-all duration-200 hover:scale-[1.02]"
              >
                <LayoutDashboard className="w-5 h-5" /> Buka Dashboard{" "}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl border-t border-slate-800/60 pt-10 text-left">
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-white">Real-time</p>
              <p className="text-xs text-slate-400 mt-1 font-light">Live Builder Preview</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-blue-400">4+ Tema</p>
              <p className="text-xs text-slate-400 mt-1 font-light">Preset Desain Undangan</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-indigo-400">Instan</p>
              <p className="text-xs text-slate-400 mt-1 font-light">Publikasi Undangan</p>
            </div>
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
              <p className="text-3xl font-extrabold text-cyan-400">Buku Tamu</p>
              <p className="text-xs text-slate-400 mt-1 font-light">Kelola RSVP & Ucapan</p>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="w-full max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Fitur Unggulan Portal Admin
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              Semua yang Anda butuhkan untuk membuat undangan impian
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Desain Responsif & Seluler</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Tampilan undangan teroptimasi secara sempurna untuk perangkat smartphone, tablet,
                dan desktop.
              </p>
            </div>

            <div className="group bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Draft & Publish Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Autosave draft saat mengedit tanpa mengganggu undangan yang sudah dipublikasikan ke
                publik.
              </p>
            </div>

            <div className="group bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Keamanan Standar Industri</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-light">
                Dilindungi oleh Supabase Auth, proxy edge middleware, dan RLS (Row Level Security).
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 py-8 bg-[#0b0f19]">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Darsana Wedding CMS. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-blue-500" />
            <span>Powered by Next.js 16 & Supabase</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
