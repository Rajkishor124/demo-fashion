
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { Product } from '../../types';
import { useDebounce } from '../../hooks/useDebounce';
import PriceDisplay from '../product/PriceDisplay';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const lowercasedTerm = debouncedSearchTerm.toLowerCase();
      const filteredResults = products.filter(product =>
        product.name.toLowerCase().includes(lowercasedTerm) ||
        product.category.toLowerCase().includes(lowercasedTerm) ||
        product.description.toLowerCase().includes(lowercasedTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);
  
  // Clear search term when overlay closes
  useEffect(() => {
      if(!isOpen) {
          setTimeout(() => setSearchTerm(''), 300); // delay to allow fade out
      }
  }, [isOpen])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 animate-fadeIn" onClick={onClose}>
      <div 
        className="absolute top-0 left-0 right-0 bg-cream shadow-lg p-6 animate-slideInDown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input
              type="text"
              placeholder="Find dresses, tops, accessories, and more..."
              className="w-full bg-transparent border-0 focus:ring-0 p-2 font-serif text-2xl text-soft-black placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            <button onClick={onClose} className="p-2 text-charcoal">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="mt-6 border-t border-beige pt-6 max-h-[60vh] overflow-y-auto">
            {debouncedSearchTerm && results.length > 0 && (
              <ul className="space-y-4">
                {results.map(product => (
                  <li key={product.id}>
                    <Link to={`/product/${product.id}`} onClick={onClose} className="flex items-center gap-4 group p-2 hover:bg-beige/50">
                      <img src={product.images[0]} alt={product.name} className="w-16 h-20 object-cover" />
                      <div className="flex-1">
                        <h3 className="font-serif text-lg text-soft-black group-hover:underline">{product.name}</h3>
                        <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            {debouncedSearchTerm && results.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-charcoal">No results found for "{debouncedSearchTerm}"</p>
                </div>
            )}
            {!debouncedSearchTerm && (
                 <div className="text-center py-10">
                    <p className="text-charcoal">Start typing to see product results.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
