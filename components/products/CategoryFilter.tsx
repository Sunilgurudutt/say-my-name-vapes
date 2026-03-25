"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types";

const ALL_FILTERS: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "lab-series", label: "E-Liquids" },
  { value: "gear-lab", label: "Devices" },
  { value: "component-lab", label: "Accessories" },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const active = (searchParams.get("category") ?? "all") as ProductCategory | "all";

  function setFilter(value: ProductCategory | "all") {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {ALL_FILTERS.map((f) => (
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
