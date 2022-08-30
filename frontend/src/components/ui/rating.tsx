'use client';

interface IconProps {
  size?: number;
  className?: string;
}

export const FullStar = ({ size = 24, className }: IconProps) => {
  return (
    <div className={className}>
      <svg height={size} viewBox="0 0 24 24">
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  );
};

export const HalfStar = ({ size = 24, className }: IconProps) => {
  return (
    <div className={className}>
      <svg height={size} viewBox="0 0 24 24">
        <path
          d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  );
};

export const EmptyStar = ({ size = 24, className }: IconProps) => {
  return (
    <div className={className}>
      <svg height={size} viewBox="0 0 24 24">
        <path
          d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  );
};

export type RatingProps = {
  rate: number;
  size?: number;
  max: number;
  className?: string;
};
export const Rating = ({ rate, size, className, max }: RatingProps) => {
  const decimal = rate % 1;
  const hasHalfStar = decimal > 0.25 && decimal <= 0.75;
  const roundedRate = hasHalfStar ? Math.floor(rate) : Math.round(rate);

  const nbEmptyStars = Math.max(0, max - roundedRate - (hasHalfStar ? 1 : 0));
  console.log({ rate, hasHalfStar, decimal, roundedRate });
  return (
    <div className="flex">
      {Array.from({ length: Math.max(roundedRate, 0) }).map((x, idx) => (
        <FullStar key={idx} size={size} className={className} />
      ))}
      {hasHalfStar ? <HalfStar size={size} className={className} /> : null}
      {Array.from({ length: nbEmptyStars }).map((x, idx) => (
        <EmptyStar key={idx} size={size} className={className} />
      ))}
    </div>
  );
};
