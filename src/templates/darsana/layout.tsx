import * as React from "react";
import { LayoutEngine } from "../core/layout-engine";

export function DarsanaLayout({ children }: { children?: React.ReactNode }) {
  // The layout wraps the core LayoutEngine, allowing the template
  // to inject custom headers, floating navigation, or background effects.
  return (
    <div className="relative w-full bg-background min-h-screen selection:bg-primary/20">
      {/* Decorative Template Elements can go here */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background -z-10 pointer-events-none" />

      {/* Dynamic Section Engine */}
      <LayoutEngine />

      {/* Children is used if Next.js layout composition requires it */}
      {children}
    </div>
  );
}
