
import React from 'react';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PriceDisplay: React.FC<PriceDisplayProps> = ({ price, originalPrice, className = '', size = 'md' }) => {
  const sizeStyles = {
    sm: { price: 'text-sm', original: 'text-xs' },
    md: { price: 'text-base', original: 'text-sm' },
    lg: { price: 'text-xl', original: 'text-base' },
  };

  return (
    <div className={`flex items-baseline gap-2 font-sans ${className}`}>
      <span className={`${sizeStyles[size].price} font-medium text-soft-black`}>${price.toFixed(2)}</span>
      {originalPrice && (
        <span className={`${sizeStyles[size].original} text-gray-500 line-through`}>${originalPrice.toFixed(2)}</span>
      )}
    </div>
  );
};

export default PriceDisplay;
