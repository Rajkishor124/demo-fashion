import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import PriceDisplay from './PriceDisplay';
import Badge from '../ui/Badge';
import IconButton from '../ui/IconButton';

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 01-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 01-6.364 0z" />
  </svg>
);

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasWishlisted = isInWishlist(product.id);
    toggleWishlist(product);
    if (!wasWishlisted) {
      addToast(`${product.name} saved to wishlist`);
    }
  };

  const isSale = product.originalPrice && product.originalPrice > product.price;
  // Filter out 'sale' tag to avoid duplicates, as it's now handled dynamically
  const otherTags = product.tags.filter(tag => tag.toLowerCase() !== 'sale');


  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
        <div 
          className="aspect-[3/4] w-full overflow-hidden bg-light-gray"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isSale && <Badge variant="sale">Sale</Badge>}
          {otherTags.map(tag => (
            <Badge key={tag} variant={tag as 'new' | 'limited'}>{tag}</Badge>
          ))}
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <IconButton onClick={handleWishlistToggle}>
            <HeartIcon filled={isWishlisted} />
          </IconButton>
        </div>
        <div className="mt-4 text-center">
          <h3 className="font-serif text-lg text-soft-black">{product.name}</h3>
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} className="justify-center mt-1" />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;