import { getHeroSlides } from "@/lib/data";
import HeroSlidesClient from "./HeroSlidesClient";

export default async function HeroSlidesPage() {
  const slides = await getHeroSlides();
  return <HeroSlidesClient initialSlides={slides} />;
}
