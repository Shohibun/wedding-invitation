import type { NextConfig } from "next";

let supabaseHostname = "";
try {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://zwmqlzblbqkeuymtacew.supabase.co";
  supabaseHostname = new URL(url).hostname;
} catch (_e) {
  supabaseHostname = "zwmqlzblbqkeuymtacew.supabase.co";
}

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: supabaseHostname,
      },
    ],
  },
};

export default nextConfig;
