import React from 'react';
import Skeleton from '../ui/Skeleton';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div>
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="mt-4 flex flex-col items-center">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2 mt-2" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
