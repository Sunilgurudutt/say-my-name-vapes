import type { Metadata } from "next";
import { getStoreInfo } from "@/lib/data";
import StoreMapSection from "@/components/home/StoreMapSection";

export const metadata: Metadata = { title: "Contact" };
export const revalidate = 60;

export default async function ContactPage() {
  const store = await getStoreInfo();

  return (
    <div className="pt-24 pb-20">
      <StoreMapSection store={store} />
    </div>
  );
}
