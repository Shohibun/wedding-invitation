import * as React from "react";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";

export const metadata = {
  title: "Admin Dashboard",
  description: "Single Admin Wedding CMS",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
