import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getOffers, saveOffer } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";
import type { Offer } from "@/types";

export async function GET() {
  const offers = await getOffers();
  return Response.json(offers);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const now = new Date().toISOString();

  const offer: Offer = {
    id: nanoid(10),
    title: body.title ?? "",
    description: body.description ?? "",
    badgeText: body.badgeText ?? "DEAL",
    imageUrl: body.imageUrl,
    active: body.active ?? true,
    expiresAt: body.expiresAt,
    createdAt: now,
    updatedAt: now,
  };

  await saveOffer(offer);
  revalidatePath("/");

  return Response.json(offer, { status: 201 });
}
