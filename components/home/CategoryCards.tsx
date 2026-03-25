"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ProductCategory } from "@/types";

const CATEGORIES: {
  category: ProductCategory;
  href: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  bg: string;
  icon: React.ReactNode;
}[] = [
  {
    category: "lab-series",
    href: "/lab-series",
    title: "E-Liquids",
    subtitle: "Flavours & Salts",
    description: "Wide range of e-liquids for every taste — freebase, nic salts, shortfills.",
    color: "#7c3aed",
    bg: "#ede9fe",
    icon: <ELiquidIcon />,
  },
  {
    category: "gear-lab",
    href: "/gear",
    title: "Devices",
    subtitle: "Mods, Pods & Kits",
    description: "From beginner starter kits to advanced mods — all top brands stocked.",
    color: "#0891b2",
    bg: "#cffafe",
    icon: <DeviceIcon />,
  },
  {
    category: "component-lab",
    href: "/discover?category=component-lab",
    title: "Accessories",
    subtitle: "Coils, Tanks & More",
    description: "Replacement coils, tanks, batteries, and everything you need.",
    color: "#b45309",
    bg: "#fef3c7",
    icon: <AccessoryIcon />,
  },
];

export default function CategoryCards() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-violet-500 text-xs font-semibold tracking-[0.25em] uppercase mb-2">
            Shop By Category
          </p>
          <h2 className="font-display text-[#1c1c1e] text-4xl sm:text-5xl font-bold">
            What We Carry
          </h2>
        </motion.div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={cat.href} className="block group">
                <div className="relative rounded-2xl border border-[#e5e4e2] bg-white p-7 h-full transition-all duration-250 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-50 hover:-translate-y-1">

                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-200 group-hover:scale-105"
                    style={{ background: cat.bg, color: cat.color }}
                  >
                    {cat.icon}
                  </div>

                  {/* Text */}
                  <p
                    className="text-[10px] font-bold tracking-[0.25em] uppercase mb-1.5"
                    style={{ color: cat.color }}
                  >
                    {cat.subtitle}
                  </p>
                  <h3 className="text-[#1c1c1e] text-xl font-semibold mb-2 group-hover:text-violet-700 transition-colors duration-200">
                    {cat.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Arrow */}
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: cat.color }}>
                    <span>Shop now</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── Icons ──────────────────────────────────────────────────── */

function ELiquidIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 4h8l2 6H8L10 4Z" />
      <rect x="6" y="10" width="16" height="14" rx="3" />
      <path d="M11 17c0 1.66 1.34 3 3 3s3-1.34 3-3-3-5-3-5-3 3.34-3 5Z" fill="currentColor" fillOpacity="0.3" stroke="none" />
    </svg>
  );
}

function DeviceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="10" height="24" rx="3" />
      <path d="M12 6h4" />
      <path d="M12 10h4" />
      <circle cx="14" cy="18" r="2.5" />
      <path d="M11 2V1" />
      <path d="M17 2V1" />
    </svg>
  );
}

function AccessoryIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="14" r="5" />
      <path d="M14 2v3M14 23v3M2 14h3M23 14h3" />
      <path d="M5.64 5.64l2.12 2.12M20.24 20.24l2.12 2.12M20.24 5.64l-2.12 2.12M5.64 20.24l2.12 2.12" />
    </svg>
  );
}
