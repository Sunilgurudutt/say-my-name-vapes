import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/sonner";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import AgeGate from "@/components/ui/AgeGate";
import GlobalShaderBackground from "@/components/ui/GlobalShaderBackground";
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

export const metadata: Metadata = {
  title: {
    default: "Say My Name Vapes",
    template: "%s | Say My Name Vapes",
  },
  description:
    "Say My Name Vapes — Premium e-liquids, devices, and accessories. Visit us in store.",
  openGraph: {
    title: "Say My Name Vapes",
    description: "Premium vaping — e-liquids, devices, and accessories.",
    type: "website",
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
        <GlobalShaderBackground />
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
