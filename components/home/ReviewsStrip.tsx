import { getActiveReviews } from "@/lib/data";
import type { Review } from "@/types";
import AnimatedSection from "@/components/ui/AnimatedSection";

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#8b5cf6" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-[280px] bg-white rounded-2xl border border-[#e5e4e2] px-5 py-4 shadow-sm mx-3 flex flex-col gap-3">
      <StarRating count={review.rating} />
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">&ldquo;{review.text}&rdquo;</p>
      <p className="text-[#1c1c1e] text-xs font-semibold">{review.name}</p>
    </div>
  );
}

export default async function ReviewsStrip() {
  const reviews = await getActiveReviews();
  if (reviews.length === 0) return null;

  const doubled = [...reviews, ...reviews];

  return (
    <section className="py-16 overflow-hidden bg-[#f8f7f5]">
      <AnimatedSection className="max-w-6xl mx-auto px-4 mb-10">
        <p className="text-violet-500 text-xs font-semibold tracking-[0.25em] uppercase mb-2">
          Customer Reviews
        </p>
        <h2 className="font-display text-[#1c1c1e] text-4xl sm:text-5xl">
          What People Say
        </h2>
      </AnimatedSection>

      {/* Scrolling track */}
      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #f8f7f5, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, #f8f7f5, transparent)" }} />

        <div className="flex animate-marquee-slow" style={{ width: "max-content" }}>
          {doubled.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
