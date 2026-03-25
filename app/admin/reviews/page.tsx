import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { getReviews } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import DeleteReviewButton from "@/components/admin/DeleteReviewButton";

export default async function AdminReviewsPage() {
  const authenticated = await isAuthenticated();
  if (!authenticated) redirect("/admin/login");

  const reviews = await getReviews();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
          <p className="text-muted-foreground text-sm">{reviews.length} total</p>
        </div>
        <Link
          href="/admin/reviews/new"
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          + Add Review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No reviews yet.</p>
          <Link href="/admin/reviews/new" className="text-primary text-sm hover:underline mt-2 inline-block">
            Add your first review →
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Reviewer</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden sm:table-cell">Rating</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium">Review</th>
                  <th className="text-left px-4 py-3 text-muted-foreground font-medium hidden md:table-cell">Status</th>
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {reviews.map((review) => (
                  <tr key={review.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{review.name}</td>
                    <td className="px-4 py-3 hidden sm:table-cell text-amber-500">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-xs">
                      <p className="truncate">{review.text}</p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <Badge variant={review.active ? "default" : "secondary"} className="text-xs">
                        {review.active ? "Visible" : "Hidden"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/reviews/${review.id}`}
                          className="px-3 py-1.5 text-xs font-medium border border-border rounded-md hover:bg-accent transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteReviewButton id={review.id} name={review.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
