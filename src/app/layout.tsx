import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Inter,
  Cinzel,
  Montserrat,
  Great_Vibes,
  Lato,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { WeddingThemeProvider } from "@/providers/wedding-theme-provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Elegant Theme Fonts
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", subsets: ["latin"], weight: ["300", "400", "700"] });

// Minimal Theme Fonts
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

// Luxury Theme Fonts
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });

// Floral Theme Fonts
const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Digital Wedding Invitation SaaS",
  description: "Create your beautiful wedding invitation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lato.variable} ${inter.variable} ${cinzel.variable} ${montserrat.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <WeddingThemeProvider defaultTheme="elegant">{children}</WeddingThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
