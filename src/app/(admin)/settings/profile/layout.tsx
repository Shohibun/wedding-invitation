import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings",
  description: "Manage your profile settings",
};

export default function ProfileSettingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
