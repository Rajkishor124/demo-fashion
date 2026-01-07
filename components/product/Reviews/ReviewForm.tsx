
import React, { useState } from 'react';
import Button from '../../ui/Button';
import { useToast } from '../../../context/ToastContext';

const StarInput = ({ rating, setRating }: { rating: number, setRating: (r: number) => void }) => {
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="flex items-center" onMouseLeave={() => setHoverRating(0)}>
      {[...Array(5)].map((_, i) => {
        const value = i + 1;
        return (
          <button
            key={value}
            type="button"
            className="p-1"
            onMouseEnter={() => setHoverRating(value)}
            onClick={() => setRating(value)}
          >
            <svg
              className={`w-6 h-6 transition-colors ${(hoverRating || rating) >= value ? 'text-rose' : 'text-beige'}`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};


interface ReviewFormProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onCancel, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would collect form data and send it to an API.
    // For this demo, we'll just show a success message.
    if (rating === 0) {
      addToast('Please select a rating', 'error');
      return;
    }
    addToast('Thank you for your review!');
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-ivory/50 border border-beige p-6 space-y-4">
      <h4 className="font-serif text-xl">Write a Review</h4>
      <div className="flex items-center gap-2">
        <label className="font-sans text-sm font-medium">Your Rating:</label>
        <StarInput rating={rating} setRating={setRating} />
      </div>
      <div>
        <label htmlFor="review-title" className="block text-sm font-medium text-charcoal">Review Title</label>
        <input type="text" id="review-title" className="mt-1 block w-full bg-white border-beige focus:ring-rose focus:border-rose p-2 text-sm" />
      </div>
      <div>
        <label htmlFor="review-body" className="block text-sm font-medium text-charcoal">Your Review</label>
        <textarea id="review-body" rows={4} className="mt-1 block w-full bg-white border-beige focus:ring-rose focus:border-rose p-2 text-sm"></textarea>
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Submit Review</Button>
      </div>
    </form>
  );
};

export default ReviewForm;