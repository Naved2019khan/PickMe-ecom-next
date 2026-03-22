import { Star } from "lucide-react";

interface StarRatingProps {
  rating:   number;
  reviews?: number;
  size?:    number;
}

export default function StarRating({ rating, reviews, size = 12 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "text-gray-200 fill-gray-200"
            }
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-[10px] text-[var(--color-text-muted)]">
          ({reviews.toLocaleString("en-IN")})
        </span>
      )}
    </div>
  );
}
