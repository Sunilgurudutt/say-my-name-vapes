import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";
import { getProducts, saveProduct } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";
import type { Product } from "@/types";

export async function GET() {
  const products = await getProducts();
  return Response.json(products);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const now = new Date().toISOString();

  const product: Product = {
    id: nanoid(10),
    name: body.name ?? "",
    description: body.description ?? "",
    price: Number(body.price) || 0,
    category: body.category ?? "lab-series",
    imageUrl: body.imageUrl ?? "",
    inStock: body.inStock ?? true,
    featured: body.featured ?? false,
    createdAt: now,
    updatedAt: now,
  };

  await saveProduct(product);
  revalidatePath("/");
  revalidatePath("/discover");
  revalidatePath("/lab-series");
  revalidatePath("/gear");

  return Response.json(product, { status: 201 });
}
