import { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If Vercel Blob is configured, use it
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return Response.json({ error: "No file" }, { status: 400 });

    const blob = await put(file.name, file, { access: "public" });
    return Response.json({ url: blob.url });
  }

  // Dev fallback — save to /public/uploads/
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return Response.json({ error: "No file" }, { status: 400 });

  const { writeFileSync, mkdirSync } = await import("fs");
  const { join } = await import("path");
  const dir = join(process.cwd(), "public", "uploads");
  mkdirSync(dir, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  writeFileSync(join(dir, filename), buffer);

  return Response.json({ url: `/uploads/${filename}` });
}
