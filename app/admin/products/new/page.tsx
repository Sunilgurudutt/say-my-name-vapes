import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-2">Add New Product</h1>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <ProductForm isNew />
      </div>
    </div>
  );
}
