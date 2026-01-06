
import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import ProductCard from '../../components/product/ProductCard';

const Wishlist: React.FC = () => {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <Container className="py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl">My Wishlist</h1>
        <p className="mt-2 text-charcoal">{wishlistCount} items saved</p>
      </div>

      {wishlistCount > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="font-serif text-3xl">Your Wishlist is Empty</h2>
          <p className="mt-4 text-charcoal">Save your favourite pieces to your wishlist to shop them later.</p>
          <Button className="mt-8">
            <Link to="/products">Explore Products</Link>
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Wishlist;
