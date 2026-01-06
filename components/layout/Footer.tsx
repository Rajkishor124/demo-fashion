
import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-beige text-charcoal pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-xl mb-4">Join our world</h3>
            <p className="text-sm mb-4 max-w-md">Be the first to know about new collections, special events, and what’s inspiring us.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Enter your email" className="flex-grow bg-cream border border-transparent focus:border-rose focus:ring-0 p-3 text-sm" />
              <Button type="submit" variant="primary" className="whitespace-nowrap">Subscribe</Button>
            </form>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:underline">All Products</Link></li>
              <li><Link to="/collections" className="hover:underline">Collections</Link></li>
              <li><Link to="/products?category=new" className="hover:underline">New Arrivals</Link></li>
              <li><Link to="/products?category=sale" className="hover:underline">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">Our Story</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:underline">Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-rose/20 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Demo. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Instagram</span>
            <span>Pinterest</span>
            <span>Facebook</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
