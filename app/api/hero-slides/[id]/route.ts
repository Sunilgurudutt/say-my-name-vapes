import { NextResponse } from "next/server";
import { deleteHeroSlide } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await deleteHeroSlide(id);
  return NextResponse.json({ ok: true });
}
