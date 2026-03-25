import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getReviews, saveReview, deleteReview } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const reviews = await getReviews();
  const existing = reviews.find((r) => r.id === id);

  if (!existing) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const updated = {
    ...existing,
    name: body.name ?? existing.name,
    rating: body.rating !== undefined ? Number(body.rating) : existing.rating,
    text: body.text ?? existing.text,
    active: body.active !== undefined ? body.active : existing.active,
    updatedAt: new Date().toISOString(),
  };

  await saveReview(updated);
  revalidatePath("/");

  return Response.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteReview(id);
  revalidatePath("/");

  return Response.json({ success: true });
}
