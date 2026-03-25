"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Offer } from "@/types";

const BADGE_OPTIONS = ["DEAL", "NEW", "HOT", "SALE", "LIMITED"];

interface OfferFormProps {
  offer?: Offer;
  isNew?: boolean;
}

export default function OfferForm({ offer, isNew = false }: OfferFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: offer?.title ?? "",
    description: offer?.description ?? "",
    badgeText: offer?.badgeText ?? "DEAL",
    active: offer?.active ?? true,
    expiresAt: offer?.expiresAt ? offer.expiresAt.split("T")[0] : "",
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Offer title is required."); return; }

    setLoading(true);
    try {
      const payload = {
        ...form,
        expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : undefined,
      };

      const url = isNew ? "/api/offers" : `/api/offers/${offer!.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isNew ? "Offer created!" : "Offer updated!");
        router.push("/admin/offers");
        router.refresh();
      } else {
        toast.error("Failed to save offer.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Offer Title *</Label>
        <Input
          id="title"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Buy 2 E-Liquids, Get 1 Free"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="More details about the offer…"
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Badge Label</Label>
          <div className="flex flex-wrap gap-2">
            {BADGE_OPTIONS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => set("badgeText", b)}
                className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                  form.badgeText === b
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expires">Expiry Date (optional)</Label>
          <Input
            id="expires"
            type="date"
            value={form.expiresAt}
            onChange={(e) => set("expiresAt", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Leave blank for no expiry.</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border">
        <div>
          <p className="text-sm font-medium text-foreground">Active</p>
          <p className="text-xs text-muted-foreground">Show this offer on the site</p>
        </div>
        <Switch checked={form.active} onCheckedChange={(v) => set("active", v)} />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : isNew ? "Create Offer" : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/offers")} disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
