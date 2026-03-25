import { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

  // Production: must use Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const blob = await put(filename, file, { access: "public" });
      return Response.json({ url: blob.url });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return Response.json({ error: `Blob upload failed: ${message}` }, { status: 500 });
    }
  }

  // Production with no Blob token — fail clearly
  if (process.env.NODE_ENV === "production") {
    return Response.json(
      { error: "Image storage not configured. Go to Vercel → Storage → Connect Blob store, then redeploy." },
      { status: 500 }
    );
  }

  // Dev fallback — save to /public/uploads/
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
