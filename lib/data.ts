/**
 * Data access layer — reads/writes JSON files in /data/ during dev.
 * In production (Vercel), set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 * and the Redis client will be used instead.
 */
import { Redis } from "@upstash/redis";
import type { Product, Offer, StoreInfo, Review, Category, HeroSlide } from "@/types";
import { seedProducts, seedOffers, seedStoreInfo, seedReviews } from "./seeds";

// ── Client ────────────────────────────────────────────────────
function getRedis() {
  if (
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return null;
}

// ── File-based fallback (dev / no Redis) ─────────────────────
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function readJson<T>(key: string, fallback: T): T {
  ensureDataDir();
  const file = path.join(DATA_DIR, `${key}.json`);
  if (!fs.existsSync(file)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  ensureDataDir();
  fs.writeFileSync(
    path.join(DATA_DIR, `${key}.json`),
    JSON.stringify(value, null, 2)
  );
}

// ── Generic KV helpers ────────────────────────────────────────
async function kvGet<T>(key: string, fallback: T): Promise<T> {
  const redis = getRedis();
  if (redis) {
    const val = await redis.get<T>(key);
    return val ?? fallback;
  }
  return readJson<T>(key, fallback);
}

async function kvSet(key: string, value: unknown) {
  const redis = getRedis();
  if (redis) {
    await redis.set(key, value);
  } else {
    writeJson(key, value);
  }
}

// ── Products ──────────────────────────────────────────────────
export async function getProducts(): Promise<Product[]> {
  return kvGet<Product[]>("products", seedProducts);
}

export async function getProduct(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) ?? null;
}

export async function saveProduct(product: Product): Promise<void> {
  const products = await getProducts();
  const idx = products.findIndex((p) => p.id === product.id);
  if (idx >= 0) {
    products[idx] = product;
  } else {
    products.push(product);
  }
  await kvSet("products", products);
}

export async function deleteProduct(id: string): Promise<void> {
  const products = await getProducts();
  await kvSet(
    "products",
    products.filter((p) => p.id !== id)
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured && p.inStock);
}

// ── Offers ────────────────────────────────────────────────────
export async function getOffers(): Promise<Offer[]> {
  return kvGet<Offer[]>("offers", seedOffers);
}

export async function getActiveOffers(): Promise<Offer[]> {
  const offers = await getOffers();
  const now = new Date();
  return offers.filter(
    (o) => o.active && (!o.expiresAt || new Date(o.expiresAt) > now)
  );
}

export async function saveOffer(offer: Offer): Promise<void> {
  const offers = await getOffers();
  const idx = offers.findIndex((o) => o.id === offer.id);
  if (idx >= 0) {
    offers[idx] = offer;
  } else {
    offers.push(offer);
  }
  await kvSet("offers", offers);
}

export async function deleteOffer(id: string): Promise<void> {
  const offers = await getOffers();
  await kvSet(
    "offers",
    offers.filter((o) => o.id !== id)
  );
}

// ── Reviews ───────────────────────────────────────────────────
export async function getReviews(): Promise<Review[]> {
  return kvGet<Review[]>("reviews", seedReviews);
}

export async function getActiveReviews(): Promise<Review[]> {
  const reviews = await getReviews();
  return reviews.filter((r) => r.active);
}

export async function saveReview(review: Review): Promise<void> {
  const reviews = await getReviews();
  const idx = reviews.findIndex((r) => r.id === review.id);
  if (idx >= 0) {
    reviews[idx] = review;
  } else {
    reviews.push(review);
  }
  await kvSet("reviews", reviews);
}

export async function deleteReview(id: string): Promise<void> {
  const reviews = await getReviews();
  await kvSet(
    "reviews",
    reviews.filter((r) => r.id !== id)
  );
}

// ── Categories ────────────────────────────────────────────────
const defaultCategories: Category[] = [
  { id: "disposables",     label: "Disposables",     slug: "disposables" },
  { id: "e-liquid",        label: "E-Liquid",        slug: "e-liquid" },
  { id: "pods",            label: "Pods",            slug: "pods" },
  { id: "battery-devices", label: "Battery Devices", slug: "battery-devices" },
  { id: "refillable-pods", label: "Refillable Pods", slug: "refillable-pods" },
];

export async function getCategories(): Promise<Category[]> {
  return kvGet<Category[]>("categories", defaultCategories);
}

export async function createCategory(category: Category): Promise<void> {
  const categories = await getCategories();
  categories.push(category);
  await kvSet("categories", categories);
}

export async function deleteCategory(id: string): Promise<void> {
  const categories = await getCategories();
  await kvSet("categories", categories.filter((c) => c.id !== id));
}

// ── Store Info ────────────────────────────────────────────────
export async function getStoreInfo(): Promise<StoreInfo> {
  return kvGet<StoreInfo>("store", seedStoreInfo);
}

export async function saveStoreInfo(info: StoreInfo): Promise<void> {
  await kvSet("store", info);
}

// ── Hero Slides ───────────────────────────────────────────────
const defaultHeroSlides: HeroSlide[] = [
  { id: "hero-1", imageUrl: "/images/hero/hero-1.jpg", label: "Top Brands In Store", order: 1 },
  { id: "hero-2", imageUrl: "/images/hero/hero-2.jpg", label: "Disposables & Devices", order: 2 },
  { id: "hero-3", imageUrl: "/images/hero/hero-3.jpg", label: "Premium E-Liquids", order: 3 },
  { id: "hero-4", imageUrl: "/images/hero/hero-4.jpg", label: "Pods & Accessories", order: 4 },
  { id: "hero-5", imageUrl: "/images/hero/hero-5.jpg", label: "Flavours & More", order: 5 },
];

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const slides = await kvGet<HeroSlide[]>("hero_slides", defaultHeroSlides);
  return slides.sort((a, b) => a.order - b.order);
}

export async function saveHeroSlide(slide: HeroSlide): Promise<void> {
  const slides = await getHeroSlides();
  const idx = slides.findIndex((s) => s.id === slide.id);
  if (idx >= 0) {
    slides[idx] = slide;
  } else {
    slides.push(slide);
  }
  await kvSet("hero_slides", slides);
}

export async function deleteHeroSlide(id: string): Promise<void> {
  const slides = await getHeroSlides();
  await kvSet("hero_slides", slides.filter((s) => s.id !== id));
}
