
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import PriceDisplay from '../../components/product/PriceDisplay';
import ProductCard from '../../components/product/ProductCard';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { useCartDrawer } from '../../context/CartDrawerContext';
import IconButton from '../../components/ui/IconButton';
import StarRating from '../../components/product/StarRating';
import Reviews from '../../components/product/Reviews';

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w.org/2000/svg" className="h-6 w-6" fill={filled ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 01-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 01-6.364 0z" />
  </svg>
);

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const { openCart } = useCartDrawer();

  if (!product) {
    return (
      <Container className="text-center py-20">
        <h1 className="font-serif text-4xl">Product not found</h1>
      </Container>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, selectedSize, selectedColor);
      addToast(`${product.name} added to bag`);
      openCart();
    } else {
      addToast('Please select a size and color', 'error');
    }
  };

  const handleWishlistToggle = () => {
    const wasWishlisted = isInWishlist(product.id);
    toggleWishlist(product);
    if (!wasWishlisted) {
      addToast(`${product.name} saved to wishlist`);
    }
  };

  return (
    <div className="bg-cream">
        <Container className="py-12 sm:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div>
                <div className="aspect-[3/4] w-full bg-light-gray overflow-hidden mb-4">
                    <img src={product.images[selectedImage]} alt={`${product.name} view ${selectedImage + 1}`} className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {product.images.map((img, index) => (
                    <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square bg-light-gray ${index === selectedImage ? 'ring-2 ring-rose' : ''}`}>
                        <img src={img} alt="" className="w-full h-full object-cover"/>
                    </button>
                    ))}
                </div>
                </div>

                {/* Product Info */}
                <div className="lg:pt-8">
                <h1 className="font-serif text-4xl md:text-5xl">{product.name}</h1>
                <div className="flex items-center gap-4 mt-4">
                    <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" />
                     {product.reviewCount > 0 && (
                        <a href="#reviews" className="flex items-center gap-1 text-sm text-charcoal hover:underline">
                            <StarRating rating={product.averageRating} />
                            <span>({product.reviewCount} Reviews)</span>
                        </a>
                    )}
                </div>
                
                <p className="mt-6 text-charcoal">{product.description}</p>

                <div className="mt-8">
                    <h3 className="font-sans text-sm font-medium">Color: <span className="font-normal">{selectedColor}</span></h3>
                    <div className="flex items-center space-x-3 mt-2">
                    {product.colors.map(color => (
                        <button key={color} onClick={() => setSelectedColor(color)} className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-soft-black' : 'border-beige'}`} style={{ backgroundColor: color.toLowerCase() === 'ivory' ? '#FFFCF5' : color.toLowerCase() }}></button>
                    ))}
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="font-sans text-sm font-medium">Size: <span className="font-normal">{selectedSize}</span></h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                    {product.sizes.map(size => (
                        <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 border text-sm ${selectedSize === size ? 'bg-soft-black text-cream border-soft-black' : 'border-beige hover:border-soft-black'}`}>
                        {size}
                        </button>
                    ))}
                    </div>
                </div>

                <div className="mt-10 flex items-center gap-4">
                    <Button onClick={handleAddToCart} className="flex-1">Add to Bag</Button>
                    <IconButton onClick={handleWishlistToggle}>
                        <HeartIcon filled={isWishlisted} />
                    </IconButton>
                </div>

                <div className="mt-10">
                    <h4 className="font-semibold mb-2">Details</h4>
                    <ul className="list-disc list-inside text-sm text-charcoal space-y-1">
                    {product.details.map((detail, i) => <li key={i}>{detail}</li>)}
                    </ul>
                </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div id="reviews" className="mt-24">
                <Reviews product={product} />
            </div>
        </Container>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
            <section className="py-16 sm:py-24 bg-ivory">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl">You Might Also Like</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </Container>
            </section>
        )}
    </div>
  );
};

export default ProductDetail;