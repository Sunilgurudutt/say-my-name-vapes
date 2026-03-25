"use client";
import { useState, useEffect, useRef, useCallback } from "react";
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

// ── Particle canvas ───────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.floor((w * h) / 8000);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.5,
      opacity: Math.random() * 0.6 + 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(canvas.width, canvas.height);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function connect(particles: Particle[]) {
      if (!ctx) return;
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const mx = (particles[i].x + particles[j].x) / 2;
            const my = (particles[i].y + particles[j].y) / 2;
            const r = dist * 0.55;

            ctx.save();
            ctx.filter = "blur(6px)";
            ctx.globalCompositeOperation = "screen";

            const grad = ctx.createRadialGradient(mx, my, 0, mx, my, r);
            const alpha = (1 - dist / maxDist) * 0.18;
            grad.addColorStop(0, `rgba(180, 100, 255, ${alpha})`);
            grad.addColorStop(1, "rgba(180, 100, 255, 0)");

            ctx.beginPath();
            ctx.arc(mx, my, r, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
            ctx.restore();
          }
        }
      }
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 100, 255, ${p.opacity * 0.9})`;
        ctx.fill();
        ctx.restore();
      }

      connect(particles);
      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 3 }}
    />
  );
}

// ── Hero section ──────────────────────────────────────────────

export default function HeroSection({ logoUrl }: { logoUrl?: string }) {
  const [slides, setSlides] = useState<HeroSlide[]>(FALLBACK_SLIDES);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/hero-slides")
      .then((r) => r.json())
      .then((data: HeroSlide[]) => {
        if (Array.isArray(data) && data.length > 0) setSlides(data);
      })
      .catch(() => {/* use fallback */});
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16">

      {/* Layer 1: Background slideshow */}
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

      {/* Layer 2: Dark overlay */}
      <div className="absolute inset-0 bg-black/40" style={{ zIndex: 2 }} />

      {/* Layer 3: AetherFlow smoke canvas (transparent bg, screen blend) */}
      <SmokeCanvas />

      {/* Layer 4: Bottom gradient */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black/60 to-transparent"
        style={{ zIndex: 4 }}
      />

      {/* Layer 5: Content */}
      <div
        className="relative text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
        style={{ zIndex: 5 }}
      >

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
            {slides[current]?.label}
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
