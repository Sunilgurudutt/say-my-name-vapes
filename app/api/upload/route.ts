import { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";

async function uploadToBlob(bytes: ArrayBuffer, filename: string, contentType: string) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(filename, bytes, { access: "public", contentType });
    return blob.url;
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error("Image storage not configured. Go to Vercel → Storage → Connect Blob store, then redeploy.");
  }
  // Dev fallback — save to /public/uploads/
  const { writeFileSync, mkdirSync } = await import("fs");
  const { join } = await import("path");
  const dir = join(process.cwd(), "public", "uploads");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, filename), Buffer.from(bytes));
  return `/uploads/${filename}`;
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") ?? "";

  // --- URL import path ---
  if (contentType.includes("application/json")) {
    try {
      const { url } = await req.json();
      if (!url || !/^https?:\/\/.+/.test(url)) {
        return Response.json({ error: "Invalid URL" }, { status: 400 });
      }

      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) {
        return Response.json({ error: `Could not fetch image: ${res.status} ${res.statusText}` }, { status: 400 });
      }

      const imgContentType = res.headers.get("content-type") ?? "image/jpeg";
      const ext = imgContentType.split("/")[1]?.split(";")[0] ?? "jpg";
      const filename = `${Date.now()}-import.${ext}`;
      const bytes = await res.arrayBuffer();

      const blobUrl = await uploadToBlob(bytes, filename, imgContentType);
      return Response.json({ url: blobUrl });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return Response.json({ error: message }, { status: 500 });
    }
  }

  // --- File upload path ---
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) return Response.json({ error: "No file provided" }, { status: 400 });

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const bytes = await file.arrayBuffer();
    const blobUrl = await uploadToBlob(bytes, filename, file.type || "image/jpeg");
    return Response.json({ url: blobUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
