"use client";
import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -9999, y: -9999 });
  const currentRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only activate on pointer-fine devices (mouse, not touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const el = spotlightRef.current;
    if (!el) return;

    el.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Lerp toward target
      currentRef.current.x += (posRef.current.x - currentRef.current.x) * 0.1;
      currentRef.current.y += (posRef.current.y - currentRef.current.y) * 0.1;

      if (el) {
        el.style.background = `radial-gradient(600px circle at ${currentRef.current.x}px ${currentRef.current.y}px, rgba(139,92,246,0.07) 0%, rgba(139,92,246,0.03) 40%, transparent 70%)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="cursor-spotlight"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  );
}
