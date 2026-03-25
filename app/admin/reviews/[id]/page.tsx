import { redirect, notFound } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { getReviews } from "@/lib/data";
import ReviewForm from "@/components/admin/ReviewForm";

export default async function EditReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const { id } = await params;
  const reviews = await getReviews();
  const review = reviews.find((r) => r.id === id);
  if (!review) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Edit Review</h1>
      <p className="text-muted-foreground text-sm mb-8">Update this customer review.</p>
      <ReviewForm review={review} />
    </div>
  );
}
