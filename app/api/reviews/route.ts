import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getReviews, saveReview } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";
import type { Review } from "@/types";

export async function GET() {
  const reviews = await getReviews();
  return Response.json(reviews);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const now = new Date().toISOString();

  const review: Review = {
    id: nanoid(10),
    name: body.name ?? "",
    rating: Number(body.rating) || 5,
    text: body.text ?? "",
    active: body.active ?? true,
    createdAt: now,
    updatedAt: now,
  };

  await saveReview(review);
  revalidatePath("/");

  return Response.json(review, { status: 201 });
}
