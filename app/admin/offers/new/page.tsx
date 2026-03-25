import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import OfferForm from "@/components/admin/OfferForm";

export default async function NewOfferPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/offers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Offers
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-2">Add New Offer</h1>
      </div>
      <div className="bg-card border border-border rounded-xl p-6">
        <OfferForm isNew />
      </div>
    </div>
  );
}
