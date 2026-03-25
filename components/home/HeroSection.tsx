"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { HeroSlide } from "@/types";

const FALLBACK_SLIDES: HeroSlide[] = [
  { id: "hero-1", imageUrl: "/images/hero/hero-1.jpg", label: "Top Brands In Store", order: 1 },
  { id: "hero-2", imageUrl: "/images/hero/hero-2.jpg", label: "Disposables & Devices", order: 2 },
  { id: "hero-3", imageUrl: "/images/hero/hero-3.jpg", label: "Premium E-Liquids", order: 3 },
  { id: "hero-4", imageUrl: "/images/hero/hero-4.jpg", label: "Pods & Accessories", order: 4 },
  { id: "hero-5", imageUrl: "/images/hero/hero-5.jpg", label: "Flavours & More", order: 5 },
];

export default function HeroSection() {
  const [slides, setSlides] = useState<HeroSlide[]>(FALLBACK_SLIDES);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/hero-slides")
      .then((r) => r.json())
      .then((data: HeroSlide[]) => {
        if (Array.isArray(data) && data.length > 0) setSlides(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const id = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16">

      {/* Layer 1 — rotating brand images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slides[current]?.id ?? current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ zIndex: 1 }}
        >
          {slides[current] && (
            <Image
              src={slides[current].imageUrl}
              alt={slides[current].label}
              fill
              priority={current === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Layer 2 — dark overlay for readability */}
      <div className="absolute inset-0 bg-black/65" style={{ zIndex: 2 }} />

      {/* Layer 4 — bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/60 to-transparent"
        style={{ zIndex: 4 }}
      />

      {/* Layer 5 — content */}
      <div
        className="relative text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
        style={{ zIndex: 5 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-violet-300 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Premium Vape Store
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white font-bold leading-none mb-3"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,1)" }}
        >
          Say My Name
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-violet-400 font-bold leading-none mb-6"
          style={{ fontSize: "clamp(2.4rem, 7vw, 5.2rem)", textShadow: "0 2px 24px rgba(0,0,0,0.9), 0 1px 6px rgba(0,0,0,1)" }}
        >
          Vapes
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="text-white/70 text-sm sm:text-base mb-8"
          >
            {slides[current]?.label}
          </motion.p>
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/60 text-sm sm:text-base max-w-md mb-8 leading-relaxed"
        >
          Curated e-liquids, premium devices, and accessories — all in one place. Come visit us in store.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-xs sm:max-w-none"
        >
          <Link
            href="/discover"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-2xl transition-all duration-200 text-sm sm:text-base hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-200 text-sm sm:text-base backdrop-blur-sm text-center"
          >
            Find Our Store
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          {[
            { icon: "🏪", label: "In-Store Only" },
            { icon: "✦", label: "Expert Staff" },
            { icon: "★", label: "Top Brands" },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-1.5 text-white/60 text-xs">
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 5 }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-violet-400" : "w-1.5 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

    </section>
  );
}
