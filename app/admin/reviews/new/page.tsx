import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import ReviewForm from "@/components/admin/ReviewForm";

export default async function NewReviewPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Add Review</h1>
      <p className="text-muted-foreground text-sm mb-8">Add a customer review to the homepage strip.</p>
      <ReviewForm />
    </div>
  );
}
