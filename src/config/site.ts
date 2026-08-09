export const siteConfig = {
  name: "Wedding Invitation CMS",
  description: "Single Admin Digital Wedding Invitation Management System.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/og-image.jpg",
  links: {
    github: "https://github.com/shohibunnajami/wedding-invitation",
  },
  author: {
    name: "Shohibun Najam I.",
    url: "https://github.com/shohibunnajami",
  },
};

export type SiteConfig = typeof siteConfig;
