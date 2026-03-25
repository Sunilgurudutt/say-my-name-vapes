import type { Metadata } from "next";
import { getStoreInfo } from "@/lib/data";
import StoreMapSection from "@/components/home/StoreMapSection";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find Say My Name Vapes in store. Get our address, opening hours, and directions. Come visit us for expert vaping advice and the best products.",
  alternates: { canonical: "/contact" },
};
export const revalidate = 60;

export default async function ContactPage() {
  const store = await getStoreInfo();

  return (
    <div className="pt-24 pb-20">
      <StoreMapSection store={store} />
    </div>
  );
}
