"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";
import { DialogProvider } from "./dialog-provider";
import { AuthProvider } from "./auth-provider";
import { WeddingThemeProvider } from "./wedding-theme-provider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Providers({
  children,
  session,
  user,
}: {
  children: React.ReactNode;
  session?: any;
  user?: any;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <AuthProvider initialSession={session} initialUser={user}>
        <WeddingThemeProvider>
          <DialogProvider>{children}</DialogProvider>
        </WeddingThemeProvider>
      </AuthProvider>
      <ToastProvider />
    </ThemeProvider>
  );
}
