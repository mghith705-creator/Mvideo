import { useState } from 'react';
import { Star } from 'lucide-react';

type StarRatingProps = {
  value?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export function StarRating({ value = 0, onChange, readonly = false, size = 'md', className = '' }: StarRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = readonly ? value : hoverValue ?? value;

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (!readonly) setHoverValue(rating);
  };

  const handleMouseLeave = () => {
    if (!readonly) setHoverValue(null);
  };

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      onMouseLeave={handleMouseLeave}
      role="rating"
      aria-label={`تقييم ${displayValue} من 5 / Rating ${displayValue} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          className="p-0 bg-none border-none cursor-pointer text-text-secondary transition-colors disabled:cursor-default"
          aria-label={`${star} من 5 / ${star} of 5`}
          aria-checked={star <= displayValue}
        >
          <Star
            className={`${sizes[size]} fill-current transition-all duration-200 ${
              star <= displayValue
                ? 'text-yellow-400 drop-shadow-[0_0_2px_rgba(234,179,8,1)]'
                : 'text-text-secondary'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

type CompactRatingProps = {
  value: number;
  count?: number;
  size?: 'sm' | 'md';
};

export function CompactRating({ value, count, size = 'sm' }: CompactRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <StarRating value={value} readonly size={size} />
      {count && (
        <span className="text-xs text-text-secondary">({count})</span>
      )}
    </div>
  );
}
