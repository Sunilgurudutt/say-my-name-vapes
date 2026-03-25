import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getOffers, saveOffer, deleteOffer } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

interface Params { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const offers = await getOffers();
  const existing = offers.find((o) => o.id === id);
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const updated = { ...existing, ...body, id, updatedAt: new Date().toISOString() };

  await saveOffer(updated);
  revalidatePath("/");

  return Response.json(updated);
}

export async function DELETE(_: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deleteOffer(id);
  revalidatePath("/");
  return new Response(null, { status: 204 });
}
