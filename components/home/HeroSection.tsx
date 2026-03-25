"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const SLIDES = [
  {
    src: "/images/hero/hero-1.jpg",
    label: "Top Brands In Store",
  },
  {
    src: "/images/hero/hero-2.jpg",
    label: "Disposables & Devices",
  },
  {
    src: "/images/hero/hero-3.jpg",
    label: "Premium E-Liquids",
  },
  {
    src: "/images/hero/hero-4.jpg",
    label: "Pods & Accessories",
  },
];

export default function HeroSection({ logoUrl }: { logoUrl?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16">

      {/* Background slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[current].src}
            alt={SLIDES[current].label}
            fill
            priority={current === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Bottom gradient for readability */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">

        {/* Logo */}
        {logoUrl && (
          <div className="mb-6 opacity-90">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Say My Name Vapes"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto drop-shadow-lg"
            />
          </div>
        )}

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-violet-300 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase mb-4"
        >
          Premium Vape Store
        </motion.p>

        {/* Store name */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-white font-bold leading-none mb-3"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}
        >
          Say My Name
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-violet-400 font-bold leading-none mb-6"
          style={{ fontSize: "clamp(2.4rem, 7vw, 5.2rem)" }}
        >
          Vapes
        </motion.div>

        {/* Slide label */}
        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="text-white/70 text-sm sm:text-base mb-8"
          >
            {SLIDES[current].label}
          </motion.p>
        </AnimatePresence>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-white/60 text-sm sm:text-base max-w-md mb-8 leading-relaxed"
        >
          Curated e-liquids, premium devices, and accessories — all in one place. Come visit us in store.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center w-full max-w-xs sm:max-w-none"
        >
          <Link
            href="/discover"
            className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-2xl transition-all duration-200 text-sm sm:text-base hover:shadow-lg hover:shadow-violet-500/30 hover:-translate-y-0.5 text-center"
          >
            Browse Products →
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-200 text-sm sm:text-base backdrop-blur-sm text-center"
          >
            Find Our Store
          </Link>
        </motion.div>

        {/* Trust badges */}
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
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
