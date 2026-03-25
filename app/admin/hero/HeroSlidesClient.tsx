"use client";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSlideForm from "@/components/admin/HeroSlideForm";
import type { HeroSlide } from "@/types";

export default function HeroSlidesClient({ initialSlides }: { initialSlides: HeroSlide[] }) {
  const [slides, setSlides] = useState<HeroSlide[]>(initialSlides);

  async function refresh() {
    const res = await fetch("/api/hero-slides");
    if (res.ok) setSlides(await res.json());
  }

  async function handleDelete(id: string) {
    try {
      const res = await fetch(`/api/hero-slides/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Slide deleted");
      setSlides((prev) => prev.filter((s) => s.id !== id));
    } catch {
      toast.error("Failed to delete slide");
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Hero Slides</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage the rotating images shown in the homepage hero.
        </p>
      </div>

      <HeroSlideForm onSaved={refresh} />

      <div className="space-y-3">
        {slides.length === 0 && (
          <p className="text-muted-foreground text-sm">No slides yet — add one above.</p>
        )}
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex items-center gap-4 border border-border rounded-lg p-3"
          >
            <div className="relative w-24 h-14 rounded overflow-hidden shrink-0 bg-muted">
              <Image src={slide.imageUrl} alt={slide.label} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{slide.label}</p>
              <p className="text-xs text-muted-foreground truncate">{slide.imageUrl}</p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(slide.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
