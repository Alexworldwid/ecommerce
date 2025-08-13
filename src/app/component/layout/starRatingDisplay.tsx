import Star from "../ui/stars";


interface StarRatingDisplayProps {
  rating: number; // e.g., 4.2
}

const StarRatingDisplay = ({ rating }: StarRatingDisplayProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} filled={true} />
      ))}

      {hasHalfStar && (
        // Simulate a half star with a full one for now
        <Star key="half" filled={true} />
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} filled={false} />
      ))}
    </div>
  );
};

export default StarRatingDisplay;
