"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import type { StoreInfo } from "@/types";
import { DAYS_OF_WEEK } from "@/types";

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function StoreInfoForm({ store }: { store: StoreInfo }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<StoreInfo>(store);
  const [logoUploading, setLogoUploading] = useState(false);
  const logoInputRef = useRef<HTMLInputElement>(null);

  function setField(key: keyof StoreInfo, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function setHours(day: string, field: "open" | "close" | "closed", value: string | boolean) {
    setForm((f) => ({
      ...f,
      hours: {
        ...f.hours,
        [day]: { ...f.hours[day], [field]: value },
      },
    }));
  }

  function setSocial(key: "facebook" | "instagram" | "youtube", value: string) {
    setForm((f) => ({
      ...f,
      socialLinks: { ...f.socialLinks, [key]: value },
    }));
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const { url } = await res.json();
        setField("logoUrl", url);
        toast.success("Logo uploaded!");
      } else {
        toast.error("Upload failed.");
      }
    } catch {
      toast.error("Upload error.");
    } finally {
      setLogoUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Store info saved!");
        router.refresh();
      } else {
        toast.error("Failed to save.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Store Logo */}
      <div>
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Store Logo</h2>
        <div className="flex items-start gap-5">
          {/* Preview */}
          <div className="w-20 h-20 rounded-xl border border-border bg-muted flex items-center justify-center overflow-hidden shrink-0">
            {form.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.logoUrl} alt="Logo" className="w-full h-full object-contain" />
            ) : (
              <span className="text-muted-foreground text-xs text-center px-2">No logo</span>
            )}
          </div>
          <div className="space-y-2 flex-1">
            <Label>Upload New Logo</Label>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={logoUploading}
              onClick={() => logoInputRef.current?.click()}
            >
              {logoUploading ? "Uploading…" : "Choose Image"}
            </Button>
            {form.logoUrl && (
              <p className="text-xs text-muted-foreground break-all">{form.logoUrl}</p>
            )}
          </div>
        </div>
      </div>

      <Separator />

      {/* Basic Info */}
      <div>
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Store Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-2">
            <Label>Store Name</Label>
            <Input value={form.name} onChange={(e) => setField("name", e.target.value)} />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label>Tagline</Label>
            <Input value={form.tagline} onChange={(e) => setField("tagline", e.target.value)} />
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label>Street Address</Label>
            <Input value={form.address} onChange={(e) => setField("address", e.target.value)} placeholder="123 Example St" />
          </div>
          <div className="space-y-2">
            <Label>Suburb</Label>
            <Input value={form.suburb} onChange={(e) => setField("suburb", e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label>State</Label>
              <Input value={form.state} onChange={(e) => setField("state", e.target.value)} placeholder="VIC" />
            </div>
            <div className="space-y-2">
              <Label>Postcode</Label>
              <Input value={form.postcode} onChange={(e) => setField("postcode", e.target.value)} placeholder="3000" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={form.phone} onChange={(e) => setField("phone", e.target.value)} placeholder="(03) 0000 0000" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} />
          </div>
        </div>
      </div>

      <Separator />

      {/* Trading Hours */}
      <div>
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Trading Hours</h2>
        <div className="space-y-3">
          {DAYS_OF_WEEK.map((day) => {
            const h = form.hours[day] ?? { open: "10:00", close: "18:00", closed: false };
            return (
              <div key={day} className="flex items-center gap-4">
                <span className="w-24 text-sm font-medium text-foreground shrink-0">
                  {capitalise(day)}
                </span>
                <Switch
                  checked={!h.closed}
                  onCheckedChange={(v) => setHours(day, "closed", !v)}
                />
                {!h.closed ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      type="time"
                      value={h.open}
                      onChange={(e) => setHours(day, "open", e.target.value)}
                      className="w-32 text-sm"
                    />
                    <span className="text-muted-foreground text-sm">–</span>
                    <Input
                      type="time"
                      value={h.close}
                      onChange={(e) => setHours(day, "close", e.target.value)}
                      className="w-32 text-sm"
                    />
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">Closed</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Social Links */}
      <div>
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Social Links</h2>
        <div className="space-y-3">
          {(["facebook", "instagram", "youtube"] as const).map((platform) => (
            <div key={platform} className="space-y-1">
              <Label className="capitalize">{platform}</Label>
              <Input
                type="url"
                value={form.socialLinks[platform] ?? ""}
                onChange={(e) => setSocial(platform, e.target.value)}
                placeholder={`https://${platform}.com/yourpage`}
              />
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Google Maps */}
      <div className="space-y-2">
        <Label>Google Maps Embed URL</Label>
        <textarea
          value={form.mapEmbedUrl}
          onChange={(e) => setField("mapEmbedUrl", e.target.value)}
          rows={3}
          placeholder="Paste the Google Maps embed src URL here…"
          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring font-mono"
        />
        <p className="text-xs text-muted-foreground">
          In Google Maps, click Share → Embed a map → copy only the src=&quot;…&quot; URL.
        </p>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save Store Info"}
      </Button>
    </form>
  );
}
