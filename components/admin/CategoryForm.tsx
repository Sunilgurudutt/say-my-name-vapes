"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CategoryForm({ onCreated }: { onCreated: () => void }) {
  const [label, setLabel] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!label.trim()) { toast.error("Category name is required."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label }),
      });
      if (res.ok) {
        toast.success("Category created!");
        setLabel("");
        onCreated();
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to create category.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-3">
      <div className="flex-1 space-y-2">
        <Label htmlFor="cat-label">New Category Name</Label>
        <Input
          id="cat-label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Refillable Pods"
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Adding…" : "Add Category"}
      </Button>
    </form>
  );
}
