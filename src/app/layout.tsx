/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
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
  title: "Darsana - Digital Wedding Invitation SaaS",
  description: "Create your beautiful, elegant, and modern digital wedding invitation in minutes.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
    locale: "en_US",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const session = null; // Unused for now, removed from Providers if needed.
  const user = null;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lato.variable} ${inter.variable} ${cinzel.variable} ${montserrat.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body" suppressHydrationWarning>
        <Providers session={session} user={user}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
