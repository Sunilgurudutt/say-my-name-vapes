import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/data";
import type { ProductCategory } from "@/types";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryFilter from "@/components/products/CategoryFilter";

export const metadata: Metadata = { title: "Discover" };
export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function DiscoverPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const allProducts = await getProducts();

  const filtered =
    category && category !== "all"
      ? allProducts.filter((p) => p.category === (category as ProductCategory))
      : allProducts;

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-violet-500 text-xs tracking-[0.2em] uppercase font-semibold mb-2">
          The Full Range
        </p>
        <h1 className="font-display text-[#1c1c1e] text-3xl sm:text-4xl font-bold">
          Discover <span className="text-violet-600">Everything</span>
        </h1>
      </div>

      <div className="mb-8">
        <Suspense>
          <CategoryFilter />
        </Suspense>
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}
