"use client";
import * as React from "react";
import { Menu } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="h-16 border-b bg-surface flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 text-textSecondary hover:bg-surfaceHover rounded-md">
          <Menu size={20} />
        </button>
      </div>
      <div className="flex items-center gap-4">{/* Profile menu will go here */}</div>
    </header>
  );
}
