import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 items-center border-b px-6 lg:px-8 bg-background">
        <div className="flex items-center gap-2 font-bold text-xl">✨ Wedding CMS</div>
        <div className="ml-auto flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 sm:px-6 lg:px-8 bg-muted/20">
        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-medium mb-6">
          Version 1.0 is now live
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl max-w-3xl leading-[1.1]">
          The Smartest Way to Manage Your <span className="text-primary">Digital Invitations</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground mx-auto">
          An elegant, fully-featured Content Management System designed exclusively for creating,
          managing, and tracking wedding invitations with ease.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login">
            <Button size="lg" className="h-12 px-8 text-base w-full sm:w-auto">
              Sign In to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto">
              Create an Account
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t py-8 bg-background">
        <div className="container flex flex-col items-center justify-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Wedding CMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
