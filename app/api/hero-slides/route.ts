import { NextResponse } from "next/server";
import { getHeroSlides, saveHeroSlide } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";
import type { HeroSlide } from "@/types";

export async function GET() {
  const slides = await getHeroSlides();
  return NextResponse.json(slides);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const slide = (await req.json()) as HeroSlide;
  await saveHeroSlide(slide);
  return NextResponse.json({ ok: true });
}
