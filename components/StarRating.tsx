import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
};

const sizeClasses = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export default function StarRating({
  rating,
  max = 5,
  size = 'md',
  showValue = false,
}: StarRatingProps) {
  const filled = Math.round(rating);

  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          className={`${sizeClasses[size]} ${
            i < filled ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
          }`}
          aria-hidden
        />
      ))}
      {showValue && <span className="ml-1 text-sm text-slate-600">{rating}/5</span>}
    </span>
  );
}
