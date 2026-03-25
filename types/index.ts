export type ProductCategory = string;

export interface Category {
  id: string;
  label: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in cents, e.g. 2499 = $24.99
  category: ProductCategory;
  imageUrl: string;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  badgeText: string; // e.g. "DEAL", "NEW", "HOT"
  imageUrl?: string;
  active: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  name: string;    // e.g. "Jordan M."
  rating: number;  // 1–5
  text: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DayHours {
  open: string;  // "09:00"
  close: string; // "18:00"
  closed: boolean;
}

export interface StoreInfo {
  name: string;
  tagline: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  phone: string;
  email: string;
  hours: Record<string, DayHours>;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  mapEmbedUrl: string;
  logoUrl?: string;
}

export const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];
