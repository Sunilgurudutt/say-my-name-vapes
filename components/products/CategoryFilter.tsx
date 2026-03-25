"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Category } from "@/types";

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = searchParams.get("category") ?? "all";
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: Category[]) => setCategories(data))
      .catch(() => {});
  }, []);

  function setFilter(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }

  const allFilters = [
    { value: "all", label: "All Products" },
    ...categories.map((c) => ({ value: c.slug, label: c.label })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {allFilters.map((f) => (
        <button
          key={f.value}
          onClick={() => setFilter(f.value)}
          className={cn(
            "px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 border",
            active === f.value
              ? "bg-violet-600 border-violet-600 text-white"
              : "border-[#e5e4e2] text-gray-600 hover:border-violet-300 hover:text-violet-700 bg-white"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
