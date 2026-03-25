import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import ProductGrid from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Devices",
  description: "Shop vape devices, kits, and hardware at Say My Name Vapes. Top devices from Elfbar, Level X, Zpods, and more. Find your perfect device in store.",
  alternates: { canonical: "/gear" },
};
export const revalidate = 60;

export default async function GearPage() {
  const products = await getProducts();
  const gearProducts = products.filter((p) => p.category === "gear-lab");

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-violet-500 text-xs tracking-[0.2em] uppercase font-semibold mb-2">
          Premium Devices
        </p>
        <h1 className="font-display text-[#1c1c1e] text-3xl sm:text-4xl font-bold">
          Devices &amp; <span className="text-violet-600">Kits</span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-lg">
          From beginner starter kits to advanced pod systems — all top brands stocked in store.
        </p>
      </div>
      <ProductGrid products={gearProducts} emptyMessage="No devices in stock right now. Check back soon." />
    </div>
  );
}
