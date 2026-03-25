import Link from "next/link";

export default function Footer({ logoUrl }: { logoUrl: string }) {
  return (
    <footer className="bg-[#1c1c1e] text-white mt-auto">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex flex-col items-start mb-5 w-fit group gap-3">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-white/5 p-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoUrl}
                  alt="Say My Name Vapes"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-none">
                <span className="block text-white font-bold text-base group-hover:text-violet-300 transition-colors">Say My Name</span>
                <span className="block text-violet-400 text-xs tracking-widest uppercase mt-0.5">Vapes</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Premium vaping products in store. Visit us to browse our full range.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              <SocialLink href="#" label="Facebook"><FacebookIcon /></SocialLink>
              <SocialLink href="#" label="Instagram"><InstagramIcon /></SocialLink>
              <SocialLink href="#" label="YouTube"><YouTubeIcon /></SocialLink>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Customer Service
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/contact", label: "Contact Us" },
                { href: "/about", label: "About Us" },
                { href: "/discover", label: "Browse Products" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 text-sm hover:text-violet-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Categories
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/lab-series", label: "E-Liquids" },
                { href: "/gear", label: "Devices & Mods" },
                { href: "/discover?category=component-lab", label: "Accessories" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-400 text-sm hover:text-violet-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Visit Us
            </h4>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">
                In-store experience only. No online orders.
              </p>
              <Link
                href="/contact"
                className="text-violet-400 text-sm hover:text-violet-300 transition-colors flex items-center gap-1"
              >
                Get Directions →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/8">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Say My Name Vapes. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs text-center">
            18+ only. Vaping products are for adult smokers only.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-violet-300 transition-all duration-200 footer-social"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.34 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#1c1c1e" />
    </svg>
  );
}
