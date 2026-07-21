export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export const navigationConfig = {
  // Navigasi untuk halaman utama (Landing Page SaaS)
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Themes",
      href: "/#themes",
    },
    {
      title: "Pricing",
      href: "/#pricing",
    },
  ] as NavItem[],

  // Navigasi untuk Dashboard Pengguna (Pengantin)
  dashboardNav: [
    {
      title: "Overview",
      href: "/dashboard",
    },
    {
      title: "Desain & Tema",
      href: "/dashboard/themes",
    },
    {
      title: "Buku Tamu",
      href: "/dashboard/guests",
    },
    {
      title: "Pengaturan",
      href: "/dashboard/settings",
    },
  ] as NavItem[],
};
