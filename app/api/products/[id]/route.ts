import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getProduct, saveProduct, deleteProduct } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

interface Params { params: Promise<{ id: string }> }

export async function GET(_: NextRequest, { params }: Params) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(product);
}

export async function PUT(req: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const existing = await getProduct(id);
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const updated = {
    ...existing,
    ...body,
    id, // prevent id change
    updatedAt: new Date().toISOString(),
  };

  await saveProduct(updated);
  revalidatePath("/");
  revalidatePath("/discover");
  revalidatePath("/lab-series");
  revalidatePath("/gear");

  return Response.json(updated);
}

export async function DELETE(_: NextRequest, { params }: Params) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deleteProduct(id);
  revalidatePath("/");
  revalidatePath("/discover");
  revalidatePath("/lab-series");
  revalidatePath("/gear");
  return new Response(null, { status: 204 });
}
