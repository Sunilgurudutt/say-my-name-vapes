import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import ProductGrid from "@/components/products/ProductGrid";

export const metadata: Metadata = { title: "E-Liquids" };
export const revalidate = 60;

export default async function LabSeriesPage() {
  const products = await getProducts();
  const labProducts = products.filter((p) => p.category === "lab-series");

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-violet-500 text-xs tracking-[0.2em] uppercase font-semibold mb-2">
          Premium E-Liquids
        </p>
        <h1 className="font-display text-[#1c1c1e] text-3xl sm:text-4xl font-bold">
          E-Liquids &amp; <span className="text-violet-600">Disposables</span>
        </h1>
        <p className="text-gray-500 mt-3 max-w-lg">
          Flavour Beast, Elfbar, Zpods and more — all your favourite brands in store.
        </p>
      </div>
      <ProductGrid products={labProducts} emptyMessage="No e-liquids in stock right now. Check back soon." />
    </div>
  );
}
