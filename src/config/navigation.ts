export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export const navigationConfig = {
  // Navigasi untuk halaman utama (Landing Page Admin)
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Undangan",
      href: "/invitations",
    },
  ] as NavItem[],

  // Navigasi untuk Admin Dashboard
  dashboardNav: [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Undangan Saya",
      href: "/invitations",
    },
    {
      title: "Pengaturan",
      href: "/settings",
    },
  ] as NavItem[],
};
