"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

const PLACEHOLDER: Record<string, string> = {
  "lab-series": "/images/placeholder-eliquid.svg",
  "gear-lab": "/images/placeholder-device.svg",
  "component-lab": "/images/placeholder-eliquid.svg",
};

function FeaturedProductCard({ product, index }: { product: Product; index: number }) {
  const src = product.imageUrl || PLACEHOLDER[product.category] || "/images/placeholder-eliquid.svg";
  const isSvg = src.endsWith(".svg");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="relative rounded-xl overflow-hidden bg-white border border-[#e5e4e2] card-hover transition-all duration-300">

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#f8f7f5]">
          {!isSvg ? (
            <Image
              src={src}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(248,247,245,0.6) 100%)" }}
          />
          {/* Out of stock */}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(248,247,245,0.85)", backdropFilter: "blur(4px)" }}>
              <span className="text-gray-500 text-[10px] font-semibold tracking-widest uppercase px-3 py-1 border border-gray-300 rounded bg-white">
                Out of Stock
              </span>
            </div>
          )}
          {/* In-stock badge */}
          {product.inStock && (
            <div className="absolute top-2.5 right-2.5">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-white border border-[#e5e4e2] text-violet-600 shadow-sm">
                <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block" />
                In Stock
              </div>
            </div>
          )}
        </div>

        {/* Info panel */}
        <div className="p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1 h-3.5 rounded-full bg-violet-400" />
            <span className="text-violet-500 text-[9px] tracking-[0.25em] uppercase font-bold">
              {product.brand || product.category}
            </span>
          </div>
          <h3 className="text-[#1c1c1e] text-sm font-semibold leading-snug mb-3 group-hover:text-violet-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center justify-between pt-2 border-t border-[#e5e4e2]">
            <span className="text-violet-600 font-bold text-base">{formatPrice(product.price)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q) ||
        (p.brand ?? "").toLowerCase().includes(q)
    );
  }, [products, search]);

  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6">
          <div>
            <p className="text-violet-500 text-xs tracking-[0.2em] uppercase font-semibold mb-2">Flagship Selection</p>
            <h2 className="font-display text-[#1c1c1e] text-4xl sm:text-5xl">Featured Products</h2>
          </div>
          <Link href="/discover" className="text-violet-600 text-sm font-semibold hover:text-violet-800 transition-colors flex items-center gap-2 shrink-0 mb-1">
            View All →
          </Link>
        </div>
        <div className="brand-rule" />
      </motion.div>

      {/* Search bar */}
      <div className="relative mb-6">
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
          placeholder="Search featured products..."
          className="w-full h-10 pl-10 pr-4 text-sm rounded-xl border border-[#e5e4e2] bg-white text-[#1c1c1e] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-10">No featured products match &ldquo;{search}&rdquo;</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product, i) => (
            <FeaturedProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
