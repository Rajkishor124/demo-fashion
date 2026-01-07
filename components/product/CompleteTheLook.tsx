
import React from 'react';
import { Product } from '../../types';
import ProductCard from './ProductCard';
import PriceDisplay from './PriceDisplay';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';
import { Link } from 'react-router-dom';

interface CompleteTheLookProps {
  mainProduct: Product;
  recommendedLook: { rationale: string; products: Product[] } | null;
  isLoading: boolean;
  onAddLookToCart: () => void;
}

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-beige" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const LookItem: React.FC<{ product: Product, isMain?: boolean }> = ({ product, isMain = false }) => (
    <div className="w-48 sm:w-56 flex-shrink-0">
        <Link to={`/product/${product.id}`} className="block group">
            <div className={`aspect-[3/4] w-full bg-light-gray overflow-hidden ${isMain ? 'shadow-lg' : ''}`}>
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
            </div>
             <div className="mt-2 text-center">
                <h3 className="font-serif text-md text-soft-black truncate group-hover:underline">{product.name}</h3>
                <PriceDisplay price={product.price} originalPrice={product.originalPrice} className="justify-center mt-1" size="sm" />
            </div>
        </Link>
    </div>
);

const CompleteTheLookSkeleton: React.FC = () => (
    <div className="bg-ivory border border-beige p-6 sm:p-8">
        <Skeleton className="h-8 w-1/3 mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto mt-4" />
        <div className="mt-8 flex justify-center items-center gap-4 sm:gap-6 overflow-hidden">
            {[...Array(3)].map(i => (
                <React.Fragment key={i}>
                    <div className="w-48 sm:w-56 flex-shrink-0">
                        <Skeleton className="aspect-[3/4]" />
                        <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
                        <Skeleton className="h-3 w-1/2 mx-auto mt-1" />
                    </div>
                    {i < 2 && <PlusIcon />}
                </React.Fragment>
            ))}
        </div>
         <div className="mt-8 flex flex-col items-center">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-12 w-64 mt-4" />
        </div>
    </div>
);

const CompleteTheLook: React.FC<CompleteTheLookProps> = ({ mainProduct, recommendedLook, isLoading, onAddLookToCart }) => {
  if (isLoading) {
    return <CompleteTheLookSkeleton />;
  }

  if (!recommendedLook || recommendedLook.products.length === 0) {
    return null; // Don't render anything if there's no look
  }

  const allLookProducts = [mainProduct, ...recommendedLook.products];
  const totalLookPrice = allLookProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="bg-ivory border border-beige p-6 sm:p-8">
      <div className="text-center">
        <h2 className="font-serif text-3xl sm:text-4xl">Complete the Look</h2>
        <p className="mt-2 text-charcoal italic max-w-2xl mx-auto">"{recommendedLook.rationale}"</p>
      </div>

      <div className="mt-8 overflow-x-auto pb-4 -mx-6 sm:-mx-8 px-6 sm:px-8">
        <div className="flex justify-center items-center gap-4 sm:gap-6 w-max mx-auto">
          {allLookProducts.map((p, index) => (
            <React.Fragment key={p.id}>
              <LookItem product={p} isMain={index === 0} />
              {index < allLookProducts.length - 1 && <PlusIcon />}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <p className="text-sm">
            Total for the look: <span className="font-bold">${totalLookPrice.toFixed(2)}</span>
        </p>
        <Button onClick={onAddLookToCart} className="mt-4">Add Full Look to Bag</Button>
      </div>
    </div>
  );
};

export default CompleteTheLook;
