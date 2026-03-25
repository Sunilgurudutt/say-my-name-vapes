import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getOffers } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import DeleteOfferButton from "@/components/admin/DeleteOfferButton";
import ToggleOfferButton from "@/components/admin/ToggleOfferButton";

export default async function AdminOffersPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const offers = await getOffers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Offers</h1>
          <p className="text-muted-foreground text-sm">{offers.length} total</p>
        </div>
        <Link
          href="/admin/offers/new"
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          + Add Offer
        </Link>
      </div>

      {offers.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No offers yet.</p>
          <Link href="/admin/offers/new" className="text-primary text-sm hover:underline mt-2 inline-block">
            Create your first offer →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">{offer.badgeText}</Badge>
                  {offer.active ? (
                    <span className="text-xs text-emerald-600 font-medium">● Active</span>
                  ) : (
                    <span className="text-xs text-muted-foreground">○ Inactive</span>
                  )}
                </div>
                <p className="font-semibold text-foreground">{offer.title}</p>
                <p className="text-sm text-muted-foreground truncate">{offer.description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <ToggleOfferButton id={offer.id} active={offer.active} />
                <Link
                  href={`/admin/offers/${offer.id}`}
                  className="px-3 py-1.5 text-xs font-medium border border-border rounded-md hover:bg-accent transition-colors"
                >
                  Edit
                </Link>
                <DeleteOfferButton id={offer.id} title={offer.title} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
