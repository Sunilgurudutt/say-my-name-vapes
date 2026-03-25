import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getProducts, getOffers, getReviews } from "@/lib/data";

export default async function AdminDashboardPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const [products, offers, reviews] = await Promise.all([getProducts(), getOffers(), getReviews()]);
  const inStock = products.filter((p) => p.inStock).length;
  const activeOffers = offers.filter((o) => o.active).length;

  const stats = [
    { label: "Total Products", value: products.length, icon: "📦", href: "/admin/products" },
    { label: "In Stock", value: inStock, icon: "✅", href: "/admin/products" },
    { label: "Active Offers", value: activeOffers, icon: "🏷️", href: "/admin/offers" },
    { label: "Reviews", value: reviews.length, icon: "⭐", href: "/admin/reviews" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Welcome back. Here&apos;s a quick overview.</p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-sm transition-all group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">→</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { href: "/admin/products/new", label: "Add New Product", icon: "➕" },
          { href: "/admin/offers/new", label: "Add New Offer", icon: "🎁" },
          { href: "/admin/reviews", label: "Manage Reviews", icon: "⭐" },
          { href: "/admin/store", label: "Update Store Info", icon: "🏪" },
          { href: "/", label: "View Live Site", icon: "🌐", target: "_blank" },
        ].map((action) => (
          <Link
            key={action.href}
            href={action.href}
            target={(action as { target?: string }).target}
            className="flex items-center gap-3 px-5 py-4 bg-card border border-border rounded-xl text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <span className="text-lg">{action.icon}</span>
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
