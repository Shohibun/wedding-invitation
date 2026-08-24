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
import { Providers } from "@/providers";

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
  title: "Darsana - Digital Wedding Invitation CMS",
  description: "Create your beautiful, elegant, and modern digital wedding invitation in minutes.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://wedding-invitation-brown-two-54.vercel.app"
  ),
  openGraph: {
    title: "Darsana - Digital Wedding Invitation",
    description: "Create your beautiful wedding invitation",
    url: "/",
    siteName: "Darsana",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Darsana Digital Wedding Invitation",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Darsana - Digital Wedding Invitation",
    description: "Create your beautiful wedding invitation",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lato.variable} ${inter.variable} ${cinzel.variable} ${montserrat.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body" suppressHydrationWarning>
        <Providers session={null} user={null}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
