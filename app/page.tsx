import HeroSection from "@/components/home/HeroSection";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ReviewsStrip from "@/components/home/ReviewsStrip";
import OffersStrip from "@/components/home/OffersStrip";
import StoreMapSection from "@/components/home/StoreMapSection";
import { getFeaturedProducts, getStoreInfo, getActiveOffers } from "@/lib/data";

export const revalidate = 60;

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://say-my-name-vapes.vercel.app";

export default async function HomePage() {
  const [featured, store, activeOffers] = await Promise.all([
    getFeaturedProducts(),
    getStoreInfo(),
    getActiveOffers(),
  ]);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "VapeShop",
    name: store.name || "Say My Name Vapes",
    description: "Premium vape shop offering e-liquids, devices, pods, and accessories from top brands including Elfbar, Flavour Beast, Level X, and Zpods.",
    url: BASE,
    ...(store.address && { address: {
      "@type": "PostalAddress",
      streetAddress: store.address,
    }}),
    ...(store.phone && { telephone: store.phone }),
    ...(store.email && { email: store.email }),
    openingHoursSpecification: store.hours ? [{ "@type": "OpeningHoursSpecification", description: store.hours }] : undefined,
    priceRange: "$$",
    currenciesAccepted: "AUD",
    paymentAccepted: "Cash, Credit Card, EFTPOS",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What brands does Say My Name Vapes carry?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Say My Name Vapes stocks top vaping brands including Elfbar, Flavour Beast, Level X, Zpods, and many more. We carry disposables, pod systems, e-liquids, and accessories.",
        },
      },
      {
        "@type": "Question",
        name: "Does Say My Name Vapes sell e-liquids?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we carry a wide range of premium e-liquids in various nicotine strengths and flavour profiles. Visit our Lab Series section to browse all available e-liquids.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Say My Name Vapes located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: store.address
            ? `Say My Name Vapes is located at ${store.address}. ${store.hours ? `We are open: ${store.hours}.` : ""}`
            : "Please visit our Contact page for our store address and opening hours.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HeroSection />
      <OffersStrip offers={activeOffers} />
      <FeaturedProducts products={featured} />
      <CategoryCards />
      <ReviewsStrip />
      <StoreMapSection store={store} />
    </>
  );
}
