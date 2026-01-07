
import React, { useState } from 'react';
import { Product } from '../../../types';
import StarRating from '../StarRating';
import Button from '../../ui/Button';
import ReviewItem from './ReviewItem';
import ReviewForm from './ReviewForm';

interface ReviewsProps {
  product: Product;
}

const Reviews: React.FC<ReviewsProps> = ({ product }) => {
  const { averageRating, reviewCount, reviews } = product;
  const [showAll, setShowAll] = useState(false);
  const [isWritingReview, setIsWritingReview] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const handleFormSubmit = () => {
    // In a real app, you would refetch reviews or add the new one to the state
    setIsWritingReview(false);
  };
  
  return (
    <div className="border-t border-beige pt-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
            <h3 className="font-serif text-3xl">Customer Reviews</h3>
             {reviewCount > 0 && (
                <div className="flex items-center gap-2 mt-2">
                    <StarRating rating={averageRating} size={20} />
                    <span className="text-charcoal">Based on {reviewCount} reviews</span>
                </div>
            )}
        </div>
        {!isWritingReview && (
          <Button variant="secondary" onClick={() => setIsWritingReview(true)}>Write a Review</Button>
        )}
      </div>

      <div className="mt-8">
        {isWritingReview && (
            <div className="mb-8">
                <ReviewForm 
                    onSubmit={handleFormSubmit}
                    onCancel={() => setIsWritingReview(false)} 
                />
            </div>
        )}
        
        {reviews.length > 0 ? (
          <div className="divide-y divide-beige">
            {displayedReviews.map(review => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-ivory/50 border border-beige">
            <p className="text-charcoal">No reviews yet. Be the first to share your thoughts!</p>
          </div>
        )}

        {reviews.length > 3 && !showAll && (
          <div className="text-center mt-8">
            <Button variant="ghost" onClick={() => setShowAll(true)}>
              Show All {reviewCount} Reviews
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;