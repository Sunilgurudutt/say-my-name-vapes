"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/discover", label: "Products" },
  { href: "/lab-series", label: "E-Liquids" },
  { href: "/gear", label: "Devices" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function LogoArea({ logoUrl }: { logoUrl: string }) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt="Say My Name Vapes"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="leading-none">
        <span className="block text-[#1c1c1e] font-semibold text-base tracking-tight group-hover:text-violet-700 transition-colors duration-200">
          Say My Name
        </span>
        <span className="block text-violet-500 text-[11px] tracking-widest uppercase font-medium">
          Vapes
        </span>
      </div>
    </Link>
  );
}

export default function Navbar({ logoUrl }: { logoUrl: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
        scrolled
          ? "shadow-sm border-b border-[#e5e4e2]"
          : "border-b border-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          <LogoArea logoUrl={logoUrl} />

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative py-1",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-violet-500 after:transition-all after:duration-200",
                    pathname === link.href
                      ? "text-violet-600 after:w-full"
                      : "text-gray-600 hover:text-[#1c1c1e] after:w-0 hover:after:w-full"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden p-2 text-gray-600 hover:text-violet-600 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={cn("block h-0.5 bg-current rounded transition-all duration-300", menuOpen && "rotate-45 translate-y-1.5")} />
              <span className={cn("block h-0.5 bg-current rounded transition-all duration-300", menuOpen && "opacity-0")} />
              <span className={cn("block h-0.5 bg-current rounded transition-all duration-300", menuOpen && "-rotate-45 -translate-y-1.5")} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-white border-b border-[#e5e4e2]",
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <ul className="px-6 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "block px-3 py-2.5 text-sm font-medium rounded-lg transition-all",
                  pathname === link.href
                    ? "text-violet-600 bg-violet-50"
                    : "text-gray-600 hover:text-[#1c1c1e] hover:bg-gray-50"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
