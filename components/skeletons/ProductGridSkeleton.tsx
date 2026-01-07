import React from 'react';
import Container from '../ui/Container';
import Skeleton from '../ui/Skeleton';
import ProductCardSkeleton from './ProductCardSkeleton';

const FilterPanelSkeleton: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <Skeleton className="h-5 w-1/3 mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductGridSkeleton: React.FC = () => {
  return (
    <Container className="py-12">
      <div className="text-center mb-12">
        <Skeleton className="h-12 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-24 mx-auto mt-2" />
      </div>
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-8 w-24 lg:hidden" />
        <div className="flex-1 hidden lg:block"></div>
        <Skeleton className="h-10 w-48" />
      </div>
      <div className="flex">
        <div className="hidden lg:block w-64 pr-8">
          <FilterPanelSkeleton />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
            {[...Array(6)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductGridSkeleton;
