import React from 'react';
import Container from '../ui/Container';
import Skeleton from '../ui/Skeleton';

const ProductDetailSkeleton: React.FC = () => {
  return (
    <Container className="py-12 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery Skeleton */}
        <div>
          <Skeleton className="aspect-[3/4] w-full mb-4" />
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className="lg:pt-8">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-8 w-1/3 mt-4" />
          <Skeleton className="h-5 w-full mt-6" />
          <Skeleton className="h-5 w-full mt-2" />
          <Skeleton className="h-5 w-2/3 mt-2" />

          <div className="mt-8 space-y-8">
            <div>
              <Skeleton className="h-5 w-1/4 mb-3" />
              <div className="flex items-center space-x-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-1/4 mb-3" />
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-10 w-14" />
                <Skeleton className="h-10 w-14" />
                <Skeleton className="h-10 w-14" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetailSkeleton;
