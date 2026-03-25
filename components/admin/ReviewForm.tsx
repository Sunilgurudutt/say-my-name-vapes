"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Review } from "@/types";

interface ReviewFormProps {
  review?: Review;
}

export default function ReviewForm({ review }: ReviewFormProps) {
  const router = useRouter();
  const isEdit = !!review;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: review?.name ?? "",
    rating: review?.rating ?? 5,
    text: review?.text ?? "",
    active: review?.active ?? true,
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      toast.error("Name and review text are required.");
      return;
    }
    setLoading(true);
    try {
      const url = isEdit ? `/api/reviews/${review.id}` : "/api/reviews";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success(isEdit ? "Review updated!" : "Review added!");
        router.push("/admin/reviews");
        router.refresh();
      } else {
        toast.error("Failed to save review.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
      <div className="space-y-2">
        <Label htmlFor="name">Reviewer Name</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Jordan M."
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Rating</Label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => set("rating", n)}
              className={`w-10 h-10 rounded-lg text-lg font-semibold border transition-all ${
                form.rating >= n
                  ? "bg-violet-100 border-violet-400 text-violet-700"
                  : "bg-white border-border text-muted-foreground hover:border-violet-300"
              }`}
            >
              ★
            </button>
          ))}
          <span className="self-center text-sm text-muted-foreground ml-2">{form.rating} / 5</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="text">Review Text</Label>
        <textarea
          id="text"
          value={form.text}
          onChange={(e) => set("text", e.target.value)}
          rows={4}
          placeholder="Write the customer review here…"
          required
          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={form.active}
          onCheckedChange={(v) => set("active", v)}
          id="active"
        />
        <Label htmlFor="active">Show on website</Label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : isEdit ? "Update Review" : "Add Review"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/reviews")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
