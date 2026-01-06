
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Button from '../../components/ui/Button';
import ProductCard from '../../components/product/ProductCard';
import { products } from '../../data/products';
import { categories } from '../../data/categories';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.filter(p => p.tags.includes('new')).slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[80vh] min-h-[500px] flex items-center bg-beige">
        <img src="https://picsum.photos/id/1011/1800/1000" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-50"/>
        <Container className="relative z-10 text-center text-soft-black">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl">Effortless Elegance</h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">Discover timeless pieces, crafted with intention. For the modern woman who values style and substance.</p>
          <Button className="mt-8" variant="primary">
            <Link to="/collections">Explore the Collection</Link>
          </Button>
        </Container>
      </div>

      {/* Categories Section */}
      <section className="py-16 sm:py-24 bg-cream">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl">Shop by Category</h2>
            <p className="mt-2 text-charcoal">Find what you're looking for, with ease.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {categories.map(category => (
              <Link key={category.id} to={`/products?category=${category.name.toLowerCase()}`} className="group relative aspect-[3/4] overflow-hidden">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4">
                  <h3 className="font-serif text-2xl text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24 bg-ivory">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl">Featured Pieces</h2>
            <p className="mt-2 text-charcoal">Curated essentials for your wardrobe.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Collection Highlight */}
      <section className="bg-blush">
        <Container className="grid md:grid-cols-2 items-center gap-12 py-16 sm:py-24">
          <div className="order-2 md:order-1">
            <h3 className="font-serif text-sm uppercase tracking-widest text-rose">Summer 2024</h3>
            <h2 className="font-serif text-4xl md:text-5xl mt-4">The Solstice Collection</h2>
            <p className="mt-4 text-charcoal">Embrace the warmth with light, airy fabrics and sun-kissed hues. An ode to long days and balmy evenings, designed for effortless elegance.</p>
            <Button variant="secondary" className="mt-8">
              <Link to="/collections">View Lookbook</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2">
            <img src="https://picsum.photos/id/21/800/1000" alt="Collection highlight" className="w-full h-full object-cover"/>
          </div>
        </Container>
      </section>

      {/* New Arrivals */}
      <section className="py-16 sm:py-24 bg-cream">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl">New Arrivals</h2>
            <p className="mt-2 text-charcoal">The latest additions to the Demo world.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="secondary">
              <Link to="/products">Shop All New</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
