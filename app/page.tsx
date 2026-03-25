import HeroSection from "@/components/home/HeroSection";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ReviewsStrip from "@/components/home/ReviewsStrip";
import OffersStrip from "@/components/home/OffersStrip";
import StoreMapSection from "@/components/home/StoreMapSection";
import { getFeaturedProducts, getStoreInfo, getActiveOffers } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, store, activeOffers] = await Promise.all([
    getFeaturedProducts(),
    getStoreInfo(),
    getActiveOffers(),
  ]);

  return (
    <>
      <HeroSection />
      <OffersStrip offers={activeOffers} />
      <FeaturedProducts products={featured} />
      <CategoryCards />
      <ReviewsStrip />
      <StoreMapSection store={store} />
    </>
  );
}
