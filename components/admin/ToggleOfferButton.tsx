"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ToggleOfferButton({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      const res = await fetch(`/api/offers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !active }),
      });
      if (res.ok) {
        toast.success(active ? "Offer deactivated." : "Offer activated.");
        router.refresh();
      } else {
        toast.error("Failed to update.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors disabled:opacity-50 ${
        active
          ? "border border-amber-300 text-amber-700 hover:bg-amber-50"
          : "border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
      }`}
    >
      {loading ? "…" : active ? "Deactivate" : "Activate"}
    </button>
  );
}
