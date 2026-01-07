
import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../../components/ui/Container';
import ProductCard from '../../components/product/ProductCard';
import { products } from '../../data/products';

// Helper to get unique values for filters
const getUniqueValues = (items: any[], key: string) => [...new Set(items.flatMap(item => item[key]))].sort();

// Color name to hex/tailwind color mapping for swatches
const colorMap: { [key: string]: string } = {
  'Blush': 'bg-blush',
  'Ivory': 'bg-ivory',
  'Sage': 'bg-sage',
  'Cream': 'bg-cream',
  'Beige': 'bg-beige',
  'Charcoal': 'bg-charcoal',
  'Multi': 'bg-gradient-to-r from-rose to-lavender',
  'Lavender': 'bg-lavender',
  'Rose': 'bg-rose',
};


interface FilterPanelProps {
    allCategories: string[];
    selectedCategories: string[];
    handleCategoryToggle: (category: string) => void;
    
    allSizes: string[];
    selectedSizes: string[];
    handleSizeToggle: (size: string) => void;

    allColors: string[];
    selectedColors: string[];
    handleColorToggle: (color: string) => void;

    maxPrice: number;
    price: number;
    handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

    clearFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    allCategories, selectedCategories, handleCategoryToggle,
    allSizes, selectedSizes, handleSizeToggle,
    allColors, selectedColors, handleColorToggle,
    maxPrice, price, handlePriceChange,
    clearFilters
}) => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                 <h3 className="font-serif text-2xl">Filters</h3>
                 <button onClick={clearFilters} className="text-sm font-sans text-rose hover:underline">Clear All</button>
            </div>
            <div className="space-y-6">
                {/* Categories */}
                <div>
                    <h4 className="font-sans font-semibold mb-3">Category</h4>
                    <ul className="space-y-2 text-sm">
                        {allCategories.map(category => (
                            <li key={category}>
                                <label className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => handleCategoryToggle(category)}
                                        className="h-4 w-4 rounded border-gray-300 text-rose focus:ring-rose"
                                    />
                                    <span className="ml-3 text-charcoal">{category}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sizes */}
                <div>
                    <h4 className="font-sans font-semibold mb-3">Size</h4>
                    <div className="flex flex-wrap gap-2">
                        {allSizes.map(size => (
                            <button 
                                key={size}
                                onClick={() => handleSizeToggle(size)}
                                className={`w-10 h-10 border text-sm transition-colors ${selectedSizes.includes(size) ? 'bg-soft-black text-cream border-soft-black' : 'border-beige hover:border-soft-black'}`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Colors */}
                <div>
                    <h4 className="font-sans font-semibold mb-3">Color</h4>
                    <div className="flex flex-wrap gap-3">
                        {allColors.map(color => (
                             <button 
                                key={color}
                                onClick={() => handleColorToggle(color as string)}
                                className={`w-8 h-8 rounded-full border border-beige transition-all ${colorMap[color as string] || 'bg-gray-200'} ${selectedColors.includes(color as string) ? 'ring-2 ring-offset-1 ring-soft-black' : ''}`}
                                title={color as string}
                             />
                        ))}
                    </div>
                </div>

                {/* Price */}
                 <div>
                    <h4 className="font-sans font-semibold mb-3">Price</h4>
                    <input 
                        type="range" 
                        min="0" 
                        max={maxPrice}
                        value={price}
                        onChange={handlePriceChange}
                        className="w-full h-2 bg-beige rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose"
                    />
                    <div className="text-sm text-right mt-1 text-charcoal">Up to ${price}</div>
                </div>
            </div>
        </div>
    );
};

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Derive all possible filter options from the full product list once
  const { allCategories, allSizes, allColors, maxPrice } = useMemo(() => {
    return {
      allCategories: getUniqueValues(products, 'category'),
      allSizes: getUniqueValues(products, 'sizes'),
      allColors: getUniqueValues(products, 'colors'),
      maxPrice: Math.ceil(Math.max(...products.map(p => p.price)) / 10) * 10, // Round up to nearest 10
    };
  }, []);

  // State for user's selected filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [price, setPrice] = useState<number>(maxPrice);

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      const matchedCategory = allCategories.find(c => c.toLowerCase() === categoryFromUrl);
      if (matchedCategory) setSelectedCategories([matchedCategory]);
    }
  }, [searchParams, allCategories]);

  // Handlers to update filter state
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };
  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };
  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPrice(maxPrice);
  };
  
  const filteredProducts = useMemo(() => {
    let items = products;

    // Handle special URL params like 'new' or 'sale' first
    const specialFilter = searchParams.get('category');
    if (specialFilter === 'new') items = items.filter(p => p.tags.includes('new'));
    if (specialFilter === 'sale') items = items.filter(p => p.tags.includes('sale'));
    
    // Apply stateful filters
    if (selectedCategories.length > 0) items = items.filter(p => selectedCategories.includes(p.category));
    if (selectedSizes.length > 0) items = items.filter(p => p.sizes.some(s => selectedSizes.includes(s)));
    if (selectedColors.length > 0) items = items.filter(p => p.colors.some(c => selectedColors.includes(c)));
    items = items.filter(p => p.price <= price);

    // Apply sorting logic
    return [...items].sort((a, b) => {
        switch (sortOption) {
            case 'price-asc': return a.price - b.price;
            case 'price-desc': return b.price - a.price;
            case 'newest': return b.id.localeCompare(a.id); // Simple newest sort by id
            default: return 0;
        }
    });
  }, [searchParams, selectedCategories, selectedSizes, selectedColors, price, sortOption]);

  const pageTitle = searchParams.get('category')?.replace('-', ' ') || 'All Products';

  const filterPanelProps = {
    allCategories, selectedCategories, handleCategoryToggle,
    allSizes, selectedSizes, handleSizeToggle,
    allColors, selectedColors, handleColorToggle,
    maxPrice, price, handlePriceChange,
    clearFilters
  };

  return (
    <>
      <Container className="py-12">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl capitalize">{pageTitle}</h1>
          <p className="text-charcoal mt-2">{filteredProducts.length} items</p>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => setIsFilterOpen(true)} className="lg:hidden font-sans text-sm font-medium uppercase tracking-wider flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M7 12h10m-7 8h4" /></svg>
            Filters
          </button>
          <div className="flex-1 hidden lg:block"></div>
          <div>
              <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="font-sans text-sm border-beige focus:ring-rose focus:border-rose bg-cream"
              >
                  <option value="featured">Sort: Featured</option>
                  <option value="newest">Sort: Newest</option>
                  <option value="price-asc">Sort: Price Low to High</option>
                  <option value="price-desc">Sort: Price High to Low</option>
              </select>
          </div>
        </div>

        <div className="flex">
          <div className="hidden lg:block w-64 pr-8">
            <FilterPanel {...filterPanelProps} />
          </div>
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 flex flex-col items-center">
                <h2 className="font-serif text-3xl">No Products Found</h2>
                <p className="mt-2 text-charcoal max-w-xs">Try adjusting your filters or clearing them to see all products.</p>
                <button onClick={clearFilters} className="mt-6 font-sans text-sm font-medium uppercase tracking-wider text-rose hover:underline">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </Container>
      
      {/* Mobile Filter Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)}></div>
          <div className="relative w-full max-w-sm bg-white shadow-2xl h-full overflow-y-auto p-6 animate-slideInRight">
            <div className="flex justify-end mb-4">
              <button onClick={() => setIsFilterOpen(false)} className="p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <FilterPanel {...filterPanelProps} />
             <div className="mt-8">
                <button onClick={() => setIsFilterOpen(false)} className="w-full bg-soft-black text-cream py-3 font-sans text-sm font-medium tracking-wider uppercase">
                    Apply Filters
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;