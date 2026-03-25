"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product, Category } from "@/types";

interface ProductFormProps {
  product?: Product;
  isNew?: boolean;
}

export default function ProductForm({ product, isNew = false }: ProductFormProps) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: Category[]) => setCategories(data))
      .catch(() => {});
  }, []);

  const [importUrl, setImportUrl] = useState("");
  const [importing, setImporting] = useState(false);

  async function importFromUrl() {
    if (!importUrl.trim()) return;
    setImporting(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: importUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Import failed");
      set("imageUrl", data.url);
      setImportUrl("");
      toast.success("Image imported.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Import failed.");
    } finally {
      setImporting(false);
    }
  }

  const [form, setForm] = useState({
    name: product?.name ?? "",
    description: product?.description ?? "",
    price: product ? (product.price / 100).toFixed(2) : "",
    category: product?.category ?? "",
    brand: product?.brand ?? "",
    imageUrl: product?.imageUrl ?? "",
    inStock: product?.inStock ?? true,
    featured: product?.featured ?? false,
  });

  function set(key: string, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function uploadImage(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      set("imageUrl", data.url);
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Product name is required."); return; }
    if (!form.price || isNaN(Number(form.price))) { toast.error("Enter a valid price."); return; }

    setLoading(true);
    try {
      const payload = {
        ...form,
        price: Math.round(Number(form.price) * 100),
      };

      const url = isNew ? "/api/products" : `/api/products/${product!.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isNew ? "Product created!" : "Product updated!");
        router.push("/admin/products");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error ?? "Failed to save product.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Blue Sky Blueberry 60ml"
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Describe the product…"
          rows={3}
          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Price & Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price (AUD) *</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="24.99"
              className="pl-7"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Category *</Label>
          <Select value={form.category} onValueChange={(v) => set("category", v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.slug}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          value={form.brand}
          onChange={(e) => set("brand", e.target.value)}
          placeholder="e.g. Elfbar, Flavour Beast, Level X, Zpods"
        />
      </div>

      {/* Image upload */}
      <div className="space-y-2">
        <Label>Product Image</Label>
        <div
          className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file) uploadImage(file);
          }}
        >
          {form.imageUrl ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                <Image src={form.imageUrl} alt="Product" fill className="object-cover" />
              </div>
              <p className="text-xs text-muted-foreground">Click to change image</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="text-3xl">📸</div>
              <p className="text-sm text-muted-foreground">
                {uploading ? "Uploading…" : "Click or drag & drop to upload image"}
              </p>
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadImage(file);
          }}
        />
        {/* Import from URL */}
        <div className="flex gap-2">
          <Input
            value={importUrl}
            onChange={(e) => setImportUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), importFromUrl())}
            placeholder="Paste image URL to import (saves to storage)"
            className="text-xs flex-1"
            disabled={importing}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={importFromUrl}
            disabled={importing || !importUrl.trim()}
            className="shrink-0 text-xs"
          >
            {importing ? "Importing…" : "Import"}
          </Button>
        </div>
        {/* Or use URL directly */}
        <Input
          value={form.imageUrl}
          onChange={(e) => set("imageUrl", e.target.value)}
          placeholder="Or paste final image URL directly (no import)"
          className="text-xs"
        />
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border">
          <div>
            <p className="text-sm font-medium text-foreground">In Stock</p>
            <p className="text-xs text-muted-foreground">Show as available to customers</p>
          </div>
          <Switch
            checked={form.inStock}
            onCheckedChange={(v) => set("inStock", v)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/40 rounded-lg border border-border">
          <div>
            <p className="text-sm font-medium text-foreground">Featured</p>
            <p className="text-xs text-muted-foreground">Show in homepage curation</p>
          </div>
          <Switch
            checked={form.featured}
            onCheckedChange={(v) => set("featured", v)}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading || uploading}>
          {loading ? "Saving…" : isNew ? "Create Product" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
