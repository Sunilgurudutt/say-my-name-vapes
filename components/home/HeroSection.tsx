"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, MouseEvent } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

function MagneticButton({ children, className, href }: { children: React.ReactNode; className: string; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const onMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function HeroSection({
  heroProduct,
  logoUrl,
}: {
  heroProduct?: { name: string; imageUrl: string };
  logoUrl?: string;
}) {
  return (
    <section className="relative bg-[#f8f7f5] pt-16 overflow-hidden">

      {/* Subtle background accent */}
      <div
        className="absolute top-0 right-0 w-[55%] h-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 80% 40%, rgba(139,92,246,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-[calc(100vh-64px)] items-center py-16 lg:py-24">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col justify-center order-2 lg:order-1">

            <motion.p
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-violet-500 text-xs font-semibold tracking-[0.25em] uppercase mb-5"
            >
              Premium Vape Store
            </motion.p>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="font-display text-[#1c1c1e] leading-tight mb-4"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              Say My Name
              <br />
              <span className="text-violet-600">Vapes</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-gray-700 text-lg leading-relaxed mb-10 max-w-md"
            >
              Curated e-liquids, premium devices, and accessories — all in one place. Come visit us in store.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                href="/discover"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-violet-200 text-sm"
              >
                Browse Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
              <MagneticButton
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-gray-50 text-[#1c1c1e] font-semibold rounded-xl border border-[#e5e4e2] hover:border-violet-200 transition-all duration-200 text-sm"
              >
                Find Our Store
              </MagneticButton>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-6 mt-12"
            >
              {[
                { label: "In-Store Only", icon: "🏪" },
                { label: "Expert Staff", icon: "✦" },
                { label: "Top Brands", icon: "★" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-gray-600 text-xs font-medium">
                  <span>{b.icon}</span>
                  <span>{b.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Product showcase visual ── */}
          <motion.div
            className="order-1 lg:order-2 relative flex items-center justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Logo watermark */}
            {logoUrl && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.06 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoUrl} alt="" aria-hidden className="w-[280px] h-[280px] object-contain" />
              </div>
            )}

            {/* Main image frame */}
            <div className="relative w-full max-w-[480px]">

              {/* Primary card — large hero image */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl shadow-violet-100"
                style={{ aspectRatio: "4/5" }}
              >
                {heroProduct ? (
                  <>
                    <Image
                      src={heroProduct.imageUrl}
                      alt={heroProduct.name}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    {/* Bottom label overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5"
                      style={{ background: "linear-gradient(to top, rgba(255,255,255,0.9), transparent)" }}
                    >
                      <p className="text-[#1c1c1e] font-semibold text-sm">{heroProduct.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">Featured Product</p>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Gradient placeholder */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(145deg, #ede9fe 0%, #ddd6fe 40%, #c4b5fd 100%)",
                      }}
                    />
                    {/* Decorative inner content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <div
                        className="w-24 h-24 rounded-2xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(109,40,217,0.5) 100%)",
                          backdropFilter: "blur(8px)",
                        }}
                      />
                      <p className="text-violet-500 text-xs font-semibold tracking-widest uppercase">Featured Products</p>
                      <p className="text-violet-700/60 text-[10px] text-center px-8">
                        Upload product photos via the admin dashboard
                      </p>
                    </div>
                    {/* Bottom label overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5"
                      style={{ background: "linear-gradient(to top, rgba(255,255,255,0.9), transparent)" }}
                    >
                      <p className="text-[#1c1c1e] font-semibold text-sm">Premium Collection</p>
                      <p className="text-gray-400 text-xs mt-0.5">E-Liquids · Devices · Accessories</p>
                    </div>
                  </>
                )}
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-3 -right-3 bg-white rounded-2xl shadow-lg shadow-violet-100 px-4 py-2.5 border border-[#e5e4e2]">
                <p className="text-violet-600 font-bold text-sm">New In</p>
                <p className="text-gray-400 text-[10px]">Weekly drops</p>
              </div>

              {/* Floating badge — bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg shadow-violet-100 px-4 py-3 border border-[#e5e4e2] flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 text-base">
                  ★
                </div>
                <div>
                  <p className="text-[#1c1c1e] font-semibold text-xs">Top Rated</p>
                  <p className="text-gray-400 text-[10px]">By our customers</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom border */}
      <div className="brand-rule mx-8 opacity-40" />

    </section>
  );
}
