import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import AgeGate from "@/components/ui/AgeGate";
import { getStoreInfo } from "@/lib/data";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://say-my-name-vapes.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "Say My Name Vapes",
    template: "%s | Say My Name Vapes",
  },
  description:
    "Say My Name Vapes — Premium e-liquids, devices, and accessories. Browse top brands including Elfbar, Flavour Beast, Level X, and Zpods. Visit us in store.",
  openGraph: {
    title: "Say My Name Vapes",
    description: "Premium vaping — e-liquids, devices, and accessories. Top brands, great prices.",
    type: "website",
    url: BASE,
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Say My Name Vapes",
    description: "Premium vaping — e-liquids, devices, and accessories.",
  },
  alternates: {
    canonical: BASE,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await getStoreInfo();
  const logoUrl = store.logoUrl || "/images/logo.svg";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground" suppressHydrationWarning>
        <AgeGate logoUrl={logoUrl} />
        <CursorSpotlight />
        <Suspense fallback={null}>
          <Navbar logoUrl={logoUrl} />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer logoUrl={logoUrl} />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
