import type { Product, Offer, StoreInfo, Review } from "@/types";

const ts = new Date().toISOString();
const p = (price: number) => price * 100; // dollars → cents

export const seedProducts: Product[] = [

  // ──────────────────────────────────────────
  // FLAVOUR BEAST 25K
  // ──────────────────────────────────────────
  { id: "fb25k_01", name: "Flavour Beast 25K — Blue Razz Ice",          description: "Flavour Beast 25,000 puff disposable. Bold blue raspberry with an icy finish.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: true,  createdAt: ts, updatedAt: ts },
  { id: "fb25k_02", name: "Flavour Beast 25K — Mango Peach Ice",        description: "Flavour Beast 25,000 puff disposable. Ripe mango and peach with cool menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: true,  createdAt: ts, updatedAt: ts },
  { id: "fb25k_03", name: "Flavour Beast 25K — Strawberry Kiwi Ice",    description: "Flavour Beast 25,000 puff disposable. Sweet strawberry and tart kiwi on ice.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb25k_04", name: "Flavour Beast 25K — Watermelon Ice",         description: "Flavour Beast 25,000 puff disposable. Juicy watermelon with a frosty exhale.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb25k_05", name: "Flavour Beast 25K — Peach Ice",              description: "Flavour Beast 25,000 puff disposable. Fresh-picked peach chilled to perfection.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb25k_06", name: "Flavour Beast 25K — Lychee Berry",           description: "Flavour Beast 25,000 puff disposable. Exotic lychee and mixed berry blend.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb25k_07", name: "Flavour Beast 25K — Berry Spearmint",        description: "Flavour Beast 25,000 puff disposable. Mixed berries with a spearmint twist.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb25k_08", name: "Flavour Beast 25K — Grape Ice",              description: "Flavour Beast 25,000 puff disposable. Deep purple grape with icy menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb25k_09", name: "Flavour Beast 25K — Tropical Mix",           description: "Flavour Beast 25,000 puff disposable. Multi-tropical fruit medley.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb25k_10", name: "Flavour Beast 25K — Pineapple Ice",          description: "Flavour Beast 25,000 puff disposable. Tangy pineapple with a cooling finish.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },

  // ──────────────────────────────────────────
  // FLAVOUR BEAST 50K
  // ──────────────────────────────────────────
  { id: "fb50k_01", name: "Flavour Beast 50K — Blue Razz Ice",          description: "Flavour Beast 50,000 puff disposable. Bold blue raspberry with an icy finish.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: true,  createdAt: ts, updatedAt: ts },
  { id: "fb50k_02", name: "Flavour Beast 50K — Mango Ice",              description: "Flavour Beast 50,000 puff disposable. Sun-ripened mango with arctic menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb50k_03", name: "Flavour Beast 50K — Strawberry Banana",      description: "Flavour Beast 50,000 puff disposable. Classic strawberry and creamy banana.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb50k_04", name: "Flavour Beast 50K — Watermelon Ice",         description: "Flavour Beast 50,000 puff disposable. Juicy watermelon blast on ice.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb50k_05", name: "Flavour Beast 50K — Blueberry Ice",          description: "Flavour Beast 50,000 puff disposable. Plump blueberry with frosty menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb50k_06", name: "Flavour Beast 50K — Passionfruit Mango",     description: "Flavour Beast 50,000 puff disposable. Tropical passionfruit and mango fusion.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb50k_07", name: "Flavour Beast 50K — Grape Ice",              description: "Flavour Beast 50,000 puff disposable. Rich grape with icy menthol edge.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb50k_08", name: "Flavour Beast 50K — Lychee Ice",             description: "Flavour Beast 50,000 puff disposable. Delicate lychee fruit on a cool base.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb50k_09", name: "Flavour Beast 50K — Peach Berry",            description: "Flavour Beast 50,000 puff disposable. Peach and mixed berry with smooth exhale.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "fb50k_10", name: "Flavour Beast 50K — Kiwi Dragon Fruit",      description: "Flavour Beast 50,000 puff disposable. Tangy kiwi meets sweet dragon fruit.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },

  // ──────────────────────────────────────────
  // ELFBAR 25K
  // ──────────────────────────────────────────
  { id: "eb25k_01", name: "Elfbar 25K — Blueberry Ice",                 description: "Elfbar 25,000 puff disposable. Plump blueberries with a frosty menthol finish.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb25k_02", name: "Elfbar 25K — Watermelon Ice",                description: "Elfbar 25,000 puff disposable. Refreshing watermelon with icy menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb25k_03", name: "Elfbar 25K — Strawberry Banana",             description: "Elfbar 25,000 puff disposable. Sweet strawberry and smooth creamy banana.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb25k_04", name: "Elfbar 25K — Mango Ice",                     description: "Elfbar 25,000 puff disposable. Tropical mango burst with cool menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb25k_05", name: "Elfbar 25K — Peach Ice",                     description: "Elfbar 25,000 puff disposable. Juicy peach on a smooth icy base.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb25k_06", name: "Elfbar 25K — Lychee Ice",                    description: "Elfbar 25,000 puff disposable. Exotic lychee with a refreshing chill.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb25k_07", name: "Elfbar 25K — Grape Ice",                     description: "Elfbar 25,000 puff disposable. Deep grape flavour with icy menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb25k_08", name: "Elfbar 25K — Kiwi Passionfruit Guava",       description: "Elfbar 25,000 puff disposable. Tropical trio — kiwi, passionfruit and guava.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb25k_09", name: "Elfbar 25K — Strawberry Ice Cream",          description: "Elfbar 25,000 puff disposable. Creamy strawberry ice cream — smooth and sweet.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb25k_10", name: "Elfbar 25K — Blue Razz Ice",                 description: "Elfbar 25,000 puff disposable. Tangy blue raspberry with arctic menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },

  // ──────────────────────────────────────────
  // ELFBAR 70K
  // ──────────────────────────────────────────
  { id: "eb70k_01", name: "Elfbar 70K — Watermelon Ice",                description: "Elfbar 70,000 puff disposable. Refreshing watermelon with icy menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: true,  createdAt: ts, updatedAt: ts },
  { id: "eb70k_02", name: "Elfbar 70K — Mango Peach",                   description: "Elfbar 70,000 puff disposable. Sweet mango and peach tropical blend.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb70k_03", name: "Elfbar 70K — Blueberry Raspberry",           description: "Elfbar 70,000 puff disposable. Berry duo — blueberry and sharp raspberry.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb70k_04", name: "Elfbar 70K — Strawberry Ice",                description: "Elfbar 70,000 puff disposable. Classic strawberry with a cool finish.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb70k_05", name: "Elfbar 70K — Peach Mango Watermelon",        description: "Elfbar 70,000 puff disposable. Triple tropical fruit powerhouse.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb70k_06", name: "Elfbar 70K — Black Currant Ice",             description: "Elfbar 70,000 puff disposable. Bold black currant with icy menthol.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb70k_07", name: "Elfbar 70K — Pink Lemonade",                 description: "Elfbar 70,000 puff disposable. Tangy-sweet pink lemonade refresher.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb70k_08", name: "Elfbar 70K — Cherry Ice",                    description: "Elfbar 70,000 puff disposable. Sweet cherry with a frosty menthol hit.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb70k_09", name: "Elfbar 70K — Grape Energy",                  description: "Elfbar 70,000 puff disposable. Grape with a sparkling energy drink twist.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "eb70k_10", name: "Elfbar 70K — Triple Berry Ice",              description: "Elfbar 70,000 puff disposable. Strawberry, blueberry and raspberry on ice.", price: p(50), category: "disposables", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },

  // ──────────────────────────────────────────
  // ZPODS DEVICE
  // ──────────────────────────────────────────
  { id: "zpods_device", name: "Zpods Pod Device",                       description: "Zpods refillable pod system. Compact, reliable and compatible with all Zpods flavour pods.", price: p(50), category: "battery-devices", imageUrl: "/images/placeholder-device.svg", inStock: true, featured: true, createdAt: ts, updatedAt: ts },

  // ──────────────────────────────────────────
  // ZPODS FLAVOURS
  // ──────────────────────────────────────────
  { id: "zpods_01", name: "Zpods — Mango Ice",                          description: "Zpods flavour pod. Tropical mango with a refreshing icy finish.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "zpods_02", name: "Zpods — Strawberry Ice",                     description: "Zpods flavour pod. Sweet strawberry with cool menthol.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "zpods_03", name: "Zpods — Blueberry Mint",                     description: "Zpods flavour pod. Juicy blueberry with fresh spearmint.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "zpods_04", name: "Zpods — Watermelon",                         description: "Zpods flavour pod. Crisp, juicy watermelon — smooth all day vape.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "zpods_05", name: "Zpods — Peach Lychee",                       description: "Zpods flavour pod. Delicate peach and exotic lychee combination.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "zpods_06", name: "Zpods — Grape Ice",                          description: "Zpods flavour pod. Bold grape with icy menthol finish.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "zpods_07", name: "Zpods — Tropical Mix",                       description: "Zpods flavour pod. Mixed tropical fruits — pineapple, mango and guava.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "zpods_08", name: "Zpods — Berry Blast",                        description: "Zpods flavour pod. Explosive mixed berry — strawberry, raspberry, blueberry.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "zpods_09", name: "Zpods — Passion Fruit Ice",                  description: "Zpods flavour pod. Tangy passionfruit on a smooth icy base.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
  { id: "zpods_10", name: "Zpods — Spearmint",                          description: "Zpods flavour pod. Clean, fresh spearmint — a classic all-day menthol.", price: p(50), category: "pods", imageUrl: "/images/placeholder-eliquid.svg", inStock: true, featured: false, createdAt: ts, updatedAt: ts },
];

export const seedOffers: Offer[] = [
  {
    id: "off_001",
    title: "Buy 2 Disposables, Get 1 Free",
    description: "Mix and match any Flavour Beast or Elfbar. Third item of equal or lesser value.",
    badgeText: "DEAL",
    active: true,
    createdAt: ts,
    updatedAt: ts,
  },
  {
    id: "off_002",
    title: "New Customer — 10% Off First Visit",
    description: "First time in store? Show this offer for 10% off your purchase.",
    badgeText: "NEW",
    active: true,
    createdAt: ts,
    updatedAt: ts,
  },
];

export const seedStoreInfo: StoreInfo = {
  name: "Say My Name Vapes",
  tagline: "Premium vaping — e-liquids, devices, and accessories.",
  address: "Inside Mavis KFF Convenience, 735 Twain Ave Unit #3",
  suburb: "Mississauga",
  state: "ON",
  postcode: "L5W 1X1",
  phone: "(905) 956-9366",
  email: "",
  hours: {
    monday:    { open: "8:00 AM", close: "10:30 PM", closed: false },
    tuesday:   { open: "8:00 AM", close: "10:30 PM", closed: false },
    wednesday: { open: "8:00 AM", close: "10:30 PM", closed: false },
    thursday:  { open: "8:00 AM", close: "10:30 PM", closed: false },
    friday:    { open: "8:00 AM", close: "11:00 PM", closed: false },
    saturday:  { open: "8:00 AM", close: "11:00 PM", closed: false },
    sunday:    { open: "8:00 AM", close: "10:30 PM", closed: false },
  },
  socialLinks: {
    facebook: "",
    instagram: "",
    youtube: "",
  },
  mapEmbedUrl:
    "https://maps.google.com/maps?q=735+Twain+Ave+Unit+3+Mississauga+ON+L5W+1X1&output=embed&z=15",
};

export const seedReviews: Review[] = [
  { id: "rev_001", name: "Jordan M.", rating: 5, text: "Best vape shop in Mississauga. Staff are super knowledgeable and always help me find exactly what I need.", active: true, createdAt: ts, updatedAt: ts },
  { id: "rev_002", name: "Priya K.", rating: 5, text: "Huge selection of disposables and great prices. They always have the flavours I'm looking for in stock.", active: true, createdAt: ts, updatedAt: ts },
  { id: "rev_003", name: "Chris T.", rating: 5, text: "Friendly staff and a really well-stocked store. I come here every time I need a refill or a new device.", active: true, createdAt: ts, updatedAt: ts },
  { id: "rev_004", name: "Aisha R.", rating: 5, text: "Love this place. They took their time explaining the difference between devices and helped me find the perfect one.", active: true, createdAt: ts, updatedAt: ts },
  { id: "rev_005", name: "Marcus D.", rating: 5, text: "The go-to spot in the area. Great range of Flavour Beast and Elfbar — never been disappointed.", active: true, createdAt: ts, updatedAt: ts },
  { id: "rev_006", name: "Natalie S.", rating: 5, text: "Convenient location inside the convenience store and always well-stocked. Staff are super helpful too!", active: true, createdAt: ts, updatedAt: ts },
  { id: "rev_007", name: "Kevin L.", rating: 5, text: "Amazing store. Great prices, great staff, and the widest selection I've seen around Mississauga.", active: true, createdAt: ts, updatedAt: ts },
  { id: "rev_008", name: "Fatima H.", rating: 5, text: "Really great experience every visit. They always have the latest products and honest recommendations.", active: true, createdAt: ts, updatedAt: ts },
];
