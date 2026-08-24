"use client";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Home, Settings, Users, LayoutTemplate } from "lucide-react";

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("hidden md:flex flex-col w-64 border-r bg-surface", className)}>
      <div className="p-6">
        <h2 className="text-lg font-bold text-primary">Invitation UI</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem href="/dashboard" icon={<Home size={20} />} label="Dashboard" />
        <SidebarItem href="/invitations" icon={<LayoutTemplate size={20} />} label="Invitations" />
        <SidebarItem href="/guests" icon={<Users size={20} />} label="Guests" />
      </nav>
      <div className="p-4 border-t">
        <SidebarItem href="/settings" icon={<Settings size={20} />} label="Settings" />
      </div>
    </aside>
  );
}

function SidebarItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-textSecondary hover:text-textPrimary hover:bg-surfaceHover transition-colors"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
