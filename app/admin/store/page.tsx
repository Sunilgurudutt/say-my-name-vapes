import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getStoreInfo } from "@/lib/data";
import StoreInfoForm from "@/components/admin/StoreInfoForm";

export default async function AdminStorePage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const store = await getStoreInfo();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Store Info</h1>
        <p className="text-muted-foreground text-sm">Update your store&apos;s address, hours, and contact details.</p>
      </div>
      <div className="bg-card border border-border rounded-xl p-6">
        <StoreInfoForm store={store} />
      </div>
    </div>
  );
}
