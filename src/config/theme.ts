import { WeddingTheme } from "@/providers/wedding-theme-provider";

export interface ThemeConfig {
  id: WeddingTheme;
  name: string;
  description: string;
  previewImage?: string; // URL for theme preview in the dashboard
}

export const themeConfig: { themes: ThemeConfig[] } = {
  themes: [
    {
      id: "elegant",
      name: "Elegant Rose Gold",
      description: "Desain mewah dengan sentuhan warna rose gold dan font klasik.",
    },
    {
      id: "minimal",
      name: "Modern Minimalist",
      description: "Tampilan bersih, modern, dengan fokus pada ruang kosong (whitespace).",
    },
    {
      id: "luxury",
      name: "Midnight Luxury",
      description: "Nuansa gelap nan mewah dengan elemen pure gold.",
    },
    {
      id: "floral",
      name: "Botanical Floral",
      description: "Desain lembut dengan hiasan bunga dan warna sage green.",
    },
  ],
};
