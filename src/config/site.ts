export const siteConfig = {
  name: "WeddingSaaS",
  description: "Platform Digital Wedding Invitation terbaik dan paling elegan.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "https://yourdomain.com/og.jpg",
  links: {
    twitter: "https://twitter.com/weddingsaas",
    github: "https://github.com/shohibunnajami/wedding-invitation",
    instagram: "https://instagram.com/weddingsaas",
  },
  author: {
    name: "Shohibun Najami",
    url: "https://github.com/shohibunnajami",
  },
};

export type SiteConfig = typeof siteConfig;
