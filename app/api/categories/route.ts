import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { getCategories, createCategory } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { label } = await req.json();
  if (!label?.trim()) {
    return NextResponse.json({ error: "Label is required" }, { status: 400 });
  }
  const slug = label.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const id = slug || nanoid(8);
  const category = { id, label: label.trim(), slug };
  await createCategory(category);
  return NextResponse.json(category, { status: 201 });
}
