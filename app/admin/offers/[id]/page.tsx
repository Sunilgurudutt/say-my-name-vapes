import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getOffers } from "@/lib/data";
import OfferForm from "@/components/admin/OfferForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditOfferPage({ params }: PageProps) {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const { id } = await params;
  const offers = await getOffers();
  const offer = offers.find((o) => o.id === id);
  if (!offer) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/offers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Offers
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-2">Edit Offer</h1>
        <p className="text-muted-foreground text-sm">{offer.title}</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-6">
        <OfferForm offer={offer} />
      </div>
    </div>
  );
}
