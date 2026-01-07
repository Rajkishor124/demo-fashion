import React from 'react';

interface StarRatingProps {
  rating: number;
  className?: string;
  size?: number;
}

// FIX: Define a separate interface for StarIcon props to prevent TypeScript from flagging
// the 'key' prop as an excess property when the component is used in a list.
interface StarIconProps {
  fillPercentage: number;
  size: number;
}

// FIX: Explicitly type StarIcon as React.FC to allow React's special `key` prop
// without causing an excess property error in TypeScript when used in a list.
const StarIcon: React.FC<StarIconProps> = ({ fillPercentage, size }) => (
  <div style={{ position: 'relative', display: 'inline-block', width: size, height: size }}>
    {/* Background star (empty) */}
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#EAE0D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', top: 0, left: 0 }}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
    {/* Foreground star (filled) */}
    <div style={{ position: 'absolute', top: 0, left: 0, width: `${fillPercentage}%`, height: '100%', overflow: 'hidden' }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="#DAB8B8" stroke="#DAB8B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </div>
  </div>
);

const StarRating: React.FC<StarRatingProps> = ({ rating, className = '', size = 16 }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    const fillPercentage = 
      rating >= starNumber 
      ? 100 
      : rating > index 
      ? (rating - index) * 100 
      : 0;
    return <StarIcon key={index} fillPercentage={fillPercentage} size={size} />;
  });

  return <div className={`flex items-center ${className}`}>{stars}</div>;
};

export default StarRating;