import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import ProductsClient from "@/components/products/ProductsClient";

export const metadata: Metadata = { title: "Discover" };
export const revalidate = 60;

export default async function DiscoverPage() {
  const allProducts = await getProducts();

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-8">
        <p className="text-violet-500 text-xs tracking-[0.2em] uppercase font-semibold mb-2">
          The Full Range
        </p>
        <h1 className="font-display text-[#1c1c1e] text-2xl sm:text-4xl font-bold">
          Discover <span className="text-violet-600">Everything</span>
        </h1>
      </div>

      <Suspense>
        <ProductsClient allProducts={allProducts} />
      </Suspense>
    </div>
  );
}
