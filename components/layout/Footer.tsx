import React from 'react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';

// FIX: Made the 'children' prop optional to resolve a TypeScript error where the compiler incorrectly infers that it is missing.
const FooterLink = ({ to, children, className }: { to: string; children?: React.ReactNode; className?: string }) => {
    const location = useLocation();
    const handleClick = () => {
        const fullPath = location.pathname + location.search;
        if (fullPath === to) {
            window.scrollTo(0, 0);
        }
    };
    return (
        <Link to={to} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
};

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
              <li><FooterLink to="/products" className="hover:underline">All Products</FooterLink></li>
              <li><FooterLink to="/collections" className="hover:underline">Collections</FooterLink></li>
              <li><FooterLink to="/products?category=new" className="hover:underline">New Arrivals</FooterLink></li>
              <li><FooterLink to="/products?category=sale" className="hover:underline">Sale</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-xl mb-4">About</h3>
            <ul className="space-y-2 text-sm">
              <li><FooterLink to="/about" className="hover:underline">Our Story</FooterLink></li>
              <li><FooterLink to="/contact" className="hover:underline">Contact Us</FooterLink></li>
              <li><FooterLink to="/faq" className="hover:underline">FAQ</FooterLink></li>
              <li><FooterLink to="/shipping" className="hover:underline">Shipping & Returns</FooterLink></li>
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
