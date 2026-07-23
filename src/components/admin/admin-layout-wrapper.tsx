"use client";

import * as React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useSidebarState } from "@/hooks/use-sidebar-state";
import { AdminSidebar } from "./admin-sidebar";
import { TopNavigation } from "./top-navigation";

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useSidebarState(true);

  return (
    <SidebarProvider open={isOpen} onOpenChange={setOpen}>
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNavigation />
        {children}
      </div>
    </SidebarProvider>
  );
}
