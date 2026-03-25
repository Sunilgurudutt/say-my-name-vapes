"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import type { Product, Category } from "@/types";

interface ProductsClientProps {
  allProducts: Product[];
}

export default function ProductsClient({ allProducts }: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [brand, setBrand] = useState(searchParams.get("brand") ?? "");
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from API
  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: Category[]) => setCategories(data))
      .catch(() => {});
  }, []);

  // Keep URL in sync with filter state so links are shareable
  useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (brand) params.set("brand", brand);
    const qs = params.toString();
    router.replace(qs ? `/discover?${qs}` : "/discover", { scroll: false });
  }, [category, brand, router]);

  // Derive unique brands from products (optionally filtered by current category)
  const availableBrands = useMemo(() => {
    const source = category
      ? allProducts.filter((p) => p.category === category)
      : allProducts;
    const set = new Set(source.map((p) => p.brand).filter(Boolean) as string[]);
    return Array.from(set).sort();
  }, [allProducts, category]);

  // Apply all filters
  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      if (category && p.category !== category) return false;
      if (brand && p.brand !== brand) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q) ||
          (p.brand ?? "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allProducts, category, brand, search]);

  function clearAll() {
    setSearch("");
    setCategory("");
    setBrand("");
  }

  const hasFilters = search || category || brand;

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-5">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products, brands, flavours..."
          className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-[#e5e4e2] bg-white text-[#1c1c1e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category filter row */}
      <div className="overflow-x-auto -mx-4 px-4 pb-2 mb-3 scrollbar-hide">
        <div className="flex gap-2 whitespace-nowrap">
          <button
            onClick={() => { setCategory(""); setBrand(""); }}
            className={`h-9 px-4 rounded-full text-xs font-semibold transition-all shrink-0 ${
              !category
                ? "bg-violet-600 text-white shadow-sm"
                : "bg-white border border-[#e5e4e2] text-gray-600 hover:border-violet-300 hover:text-violet-600"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCategory(c.slug); setBrand(""); }}
              className={`h-9 px-4 rounded-full text-xs font-semibold transition-all shrink-0 ${
                category === c.slug
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-white border border-[#e5e4e2] text-gray-600 hover:border-violet-300 hover:text-violet-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Brand filter row — only shown if there are brands */}
      {availableBrands.length > 0 && (
        <div className="overflow-x-auto -mx-4 px-4 pb-3 mb-6 scrollbar-hide">
          <div className="flex gap-2 whitespace-nowrap">
            <button
              onClick={() => setBrand("")}
              className={`h-8 px-3 rounded-full text-[11px] font-semibold transition-all shrink-0 ${
                !brand
                  ? "bg-[#1c1c1e] text-white"
                  : "bg-white border border-[#e5e4e2] text-gray-500 hover:border-gray-400"
              }`}
            >
              All Brands
            </button>
            {availableBrands.map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`h-8 px-3 rounded-full text-[11px] font-semibold transition-all shrink-0 ${
                  brand === b
                    ? "bg-[#1c1c1e] text-white"
                    : "bg-white border border-[#e5e4e2] text-gray-500 hover:border-gray-400"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results count + clear */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm text-gray-500">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
          {hasFilters ? " found" : ""}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-violet-600 hover:text-violet-800 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      <ProductGrid
        products={filtered}
        emptyMessage={
          hasFilters
            ? "No products match your search. Try different filters."
            : "No products yet."
        }
      />
    </div>
  );
}
