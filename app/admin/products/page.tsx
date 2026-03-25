import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getProducts } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { CATEGORY_LABELS } from "@/types";
import { Badge } from "@/components/ui/badge";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export default async function AdminProductsPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground text-sm">{products.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No products yet.</p>
          <Link href="/admin/products/new" className="text-primary text-sm hover:underline mt-2 inline-block">
            Add your first product →
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Product</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Price</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Status</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-foreground">{product.name}</p>
                        {product.featured && (
                          <span className="text-xs text-amber-500 font-medium">★ Featured</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">
                      {CATEGORY_LABELS[product.category]}
                    </td>
                    <td className="px-4 py-3 font-semibold text-foreground">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge variant={product.inStock ? "default" : "secondary"} className="text-xs">
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="px-3 py-1.5 text-xs font-medium border border-border rounded-md hover:bg-accent transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
