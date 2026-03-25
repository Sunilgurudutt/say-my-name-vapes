"use client";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  onSaved: () => void;
}

export default function HeroSlideForm({ onSaved }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [label, setLabel] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setImageUrl(url);
    } catch {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!imageUrl) { toast.error("Please upload an image first"); return; }
    if (!label.trim()) { toast.error("Please enter a label"); return; }
    setSaving(true);
    try {
      const slide = {
        id: `slide-${Date.now()}`,
        imageUrl,
        label: label.trim(),
        order: Date.now(),
      };
      const res = await fetch("/api/hero-slides", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slide),
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success("Slide added");
      setLabel("");
      setImageUrl("");
      onSaved();
    } catch {
      toast.error("Failed to save slide");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="border border-border rounded-lg p-5 space-y-4">
      <h3 className="font-semibold text-sm">Add New Slide</h3>

      <div className="space-y-1.5">
        <Label>Image</Label>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? "Uploading…" : "Choose Image"}
          </Button>
          {imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt="preview" className="h-10 w-16 object-cover rounded" />
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="slide-label">Label</Label>
        <Input
          id="slide-label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Top Brands In Store"
        />
      </div>

      <Button onClick={handleSave} disabled={saving || uploading} size="sm">
        {saving ? "Saving…" : "Add Slide"}
      </Button>
    </div>
  );
}
