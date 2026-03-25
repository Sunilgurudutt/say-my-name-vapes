"use client";
import { usePathname } from "next/navigation";
import ShaderBackground from "./shader-background";

export default function GlobalShaderBackground() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <ShaderBackground
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1, opacity: 0.35 }}
    />
  );
}
