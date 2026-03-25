import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getProduct } from "@/lib/data";
import ProductForm from "@/components/admin/ProductForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-foreground mt-2">Edit Product</h1>
        <p className="text-muted-foreground text-sm">{product.name}</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <ProductForm product={product} />
      </div>
    </div>
  );
}
