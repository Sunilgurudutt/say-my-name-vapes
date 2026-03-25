import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminSidebar from "@/components/layout/AdminSidebar";

export const metadata: Metadata = { title: "Admin — Say My Name Vapes" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page doesn't need auth check — handled inline
  return (
    <div className="admin-theme min-h-screen bg-background text-foreground">
      <AdminShell>{children}</AdminShell>
    </div>
  );
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  const authenticated = await isAuthenticated();

  // We can't easily detect if we're on the login page from a layout,
  // so the login page itself handles unauthenticated state.
  if (!authenticated) {
    // Don't redirect — the children (login page) will handle it.
    // But if someone hits /admin directly, show the sidebar-less shell.
    return <div className="admin-theme">{children}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 ml-0 lg:ml-64 min-h-screen bg-background pt-14 lg:pt-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
