
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Container from '../ui/Container';
import IconButton from '../ui/IconButton';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import SearchOverlay from '../common/SearchOverlay';

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" /></svg>
);
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
);
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 01-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 01-6.364 0z" /></svg>
);
const BagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/products' },
  { name: 'Collections', path: '/collections' },
  { name: 'About', path: '/about' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const activeLinkStyle = { textDecoration: 'underline', textUnderlineOffset: '8px' };

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/80 backdrop-blur-md border-b border-beige">
        <Container className="flex items-center justify-between h-20">
          <div className="md:hidden">
            <IconButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <MenuIcon />
            </IconButton>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
            <Link to="/" className="font-serif text-3xl tracking-widest text-soft-black">
              DEMO
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="font-sans uppercase text-sm tracking-wider text-charcoal hover:text-soft-black transition-colors"
                style={({ isActive }) => isActive ? activeLinkStyle : {}}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <IconButton className="hidden md:inline-flex" onClick={() => setIsSearchOpen(true)}><SearchIcon /></IconButton>
            <Link to="/login"><IconButton><UserIcon /></IconButton></Link>
            <Link to="/wishlist" className="relative">
              <IconButton><HeartIcon /></IconButton>
              {wishlistCount > 0 && <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-rose text-white text-xs text-center">{wishlistCount}</span>}
            </Link>
            <Link to="/cart" className="relative">
              <IconButton><BagIcon /></IconButton>
              {cartCount > 0 && <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-rose text-white text-xs text-center">{cartCount}</span>}
            </Link>
          </div>
        </Container>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden bg-cream border-t border-beige">
              <nav className="flex flex-col items-center space-y-4 py-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-sans uppercase text-lg tracking-wider text-charcoal hover:text-soft-black transition-colors"
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
            </div>
        )}
      </header>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
