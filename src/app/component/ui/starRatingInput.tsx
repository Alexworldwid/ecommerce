'use client';
import Star from './stars';

type Props = {
  rating: number;
  onChange: (rating: number) => void;
};

const StarRatingInput = ({ rating, onChange }: Props) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          <Star filled={star <= rating} />
        </button>
      ))}
    </div>
  );
};

export default StarRatingInput;
