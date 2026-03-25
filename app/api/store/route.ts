import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { getStoreInfo, saveStoreInfo } from "@/lib/data";
import { isAuthenticated } from "@/lib/auth";

export async function GET() {
  const store = await getStoreInfo();
  return Response.json(store);
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  await saveStoreInfo(body);
  revalidatePath("/");
  revalidatePath("/contact");
  return Response.json(body);
}
