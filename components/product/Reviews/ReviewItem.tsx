
import React from 'react';
import { Review } from '../../../types';
import StarRating from '../StarRating';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="py-6">
      <div className="flex items-center mb-2">
        <StarRating rating={review.rating} size={16} />
        <h4 className="font-sans font-semibold text-soft-black ml-3">{review.title}</h4>
      </div>
      <p className="text-sm text-charcoal leading-relaxed">{review.body}</p>
      <p className="text-xs text-gray-500 mt-3">{review.author} on {new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
  );
};

export default ReviewItem;