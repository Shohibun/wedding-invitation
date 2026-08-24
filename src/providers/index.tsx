"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";
import { DialogProvider } from "./dialog-provider";
import { AuthProvider } from "./auth-provider";
import { WeddingThemeProvider } from "./wedding-theme-provider";

export function Providers({
  children,
  session,
  user,
}: {
  children: React.ReactNode;
  session?: unknown;
  user?: unknown;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider initialSession={session as never} initialUser={user as never}>
        <WeddingThemeProvider>
          <DialogProvider>{children}</DialogProvider>
        </WeddingThemeProvider>
      </AuthProvider>
      <ToastProvider />
    </ThemeProvider>
  );
}
