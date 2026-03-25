import HeroSection from "@/components/home/HeroSection";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ReviewsStrip from "@/components/home/ReviewsStrip";
import StoreMapSection from "@/components/home/StoreMapSection";
import { getFeaturedProducts, getStoreInfo } from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, store] = await Promise.all([
    getFeaturedProducts(),
    getStoreInfo(),
  ]);

  const heroProduct = featured.find((p) => p.imageUrl && !p.imageUrl.endsWith(".svg")) ?? null;

  return (
    <>
      <HeroSection
        heroProduct={heroProduct ? { name: heroProduct.name, imageUrl: heroProduct.imageUrl } : undefined}
        logoUrl={store.logoUrl || "/images/logo.svg"}
      />
      <CategoryCards />
      <ReviewsStrip />
      <FeaturedProducts products={featured} />
      <StoreMapSection store={store} />
    </>
  );
}
