import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://say-my-name-vapes.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,                        changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/discover`,          changeFrequency: "daily",   priority: 0.9 },
    { url: `${BASE}/gear`,              changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/lab-series`,        changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/about`,             changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`,           changeFrequency: "monthly", priority: 0.6 },
  ];
}
