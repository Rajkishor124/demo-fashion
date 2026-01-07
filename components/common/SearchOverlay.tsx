
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';

import { useDebounce } from '../../hooks/useDebounce';
import { products } from '../../data/products';
import { Product } from '../../types';
import PriceDisplay from '../product/PriceDisplay';
import { fileToBase64 } from '../../utils/imageHelpers';


// --- ICONS ---
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;


interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  // FIX: Added useState to component state management.
  const [activeTab, setActiveTab] = useState<'text' | 'visual'>('text');
  
  // State for Text Search
  const [searchTerm, setSearchTerm] = useState('');
  const [textResults, setTextResults] = useState<Product[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // State for Visual Search
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [visualResults, setVisualResults] = useState<Product[]>([]);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Effect to close overlay on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Effect for body scroll and Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
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
  
  // Effect to reset state when overlay closes or tab changes
  useEffect(() => {
      if(!isOpen) {
          setTimeout(() => {
            setSearchTerm('');
            resetVisualSearch();
            setActiveTab('text');
          }, 300);
      }
  }, [isOpen]);

  // Text search logic
  useEffect(() => {
    if (debouncedSearchTerm) {
      const lowercasedTerm = debouncedSearchTerm.toLowerCase();
      const filteredResults = products.filter(product =>
        product.name.toLowerCase().includes(lowercasedTerm) ||
        product.category.toLowerCase().includes(lowercasedTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
      );
      setTextResults(filteredResults);
    } else {
      setTextResults([]);
    }
  }, [debouncedSearchTerm]);
  
  const resetVisualSearch = () => {
    setImagePreview(null);
    setIsAnalyzing(false);
    setVisualResults([]);
    setAiResponse('');
    setError(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };
  
  const handleFileChange = async (file: File | null) => {
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        setError('Please upload a valid image file (JPEG, PNG, WEBP).');
        return;
      }
      
      resetVisualSearch();
      setImagePreview(URL.createObjectURL(file));
      setIsAnalyzing(true);
      
      try {
        const base64Data = await fileToBase64(file);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        
        const productsForPrompt = products.map(({ id, name, description, category, tags, colors }) => ({
          id, name, description, category, tags, colors,
        }));
        
        const textPart = {
            text: `You are a fashion expert for 'Demo', a premium womenswear brand. Analyze the style, colors, patterns, and garment types in this image. Based on your analysis, find the most similar items from the provided product catalog.

            Respond with ONLY a valid JSON object in the following format: { "response": "A short, friendly, and conversational sentence describing the findings.", "productIds": ["id1", "id2", ...] }. 
            Do not include markdown backticks or any other text outside of the JSON object.

            Product Catalog:
            ${JSON.stringify(productsForPrompt)}`
        };

        const imagePart = {
            inlineData: {
                mimeType: file.type,
                data: base64Data,
            },
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [imagePart, textPart] },
        });

        const resultJson = JSON.parse(response.text);
        const recommendedIds: string[] = resultJson.productIds || [];
        const recommendedProducts = products.filter(p => recommendedIds.includes(p.id))
                                            .sort((a, b) => recommendedIds.indexOf(a.id) - recommendedIds.indexOf(b.id));

        setAiResponse(resultJson.response || "Here are some pieces inspired by your image:");
        setVisualResults(recommendedProducts);

      } catch(err) {
        console.error("Error analyzing image:", err);
        setError("Sorry, we couldn't analyze that image. Please try another one.");
      } finally {
        setIsAnalyzing(false);
      }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 animate-fadeIn" onClick={onClose}>
      <div 
        className="absolute top-0 left-0 right-0 bg-white shadow-lg p-6 animate-slideInDown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header & Tabs */}
          <div className="flex justify-between items-start">
            <div className="border-b border-beige">
                <button onClick={() => setActiveTab('text')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'text' ? 'border-b-2 border-rose text-soft-black' : 'text-gray-500'}`}>Text Search</button>
                <button onClick={() => setActiveTab('visual')} className={`px-4 py-2 text-sm font-medium ${activeTab === 'visual' ? 'border-b-2 border-rose text-soft-black' : 'text-gray-500'}`}>Visual Search</button>
            </div>
            <button onClick={onClose} className="p-2 text-charcoal"><CloseIcon /></button>
          </div>

          {/* Text Search UI */}
          <div className={activeTab === 'text' ? 'block' : 'hidden'}>
            <div className="flex items-center gap-4 pt-4">
              <SearchIcon />
              <input
                type="text"
                placeholder="Find dresses, tops, accessories..."
                className="w-full bg-transparent border-0 focus:ring-0 p-2 font-serif text-2xl text-soft-black placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <div className="mt-6 border-t border-beige pt-6 max-h-[60vh] overflow-y-auto">
              {debouncedSearchTerm && textResults.length > 0 && (
                <ul className="space-y-4">
                  {textResults.map(product => (
                    <li key={product.id}>
                      <Link to={`/product/${product.id}`} className="flex items-center gap-4 group p-2 hover:bg-beige/50">
                        <img src={product.images[0]} alt={product.name} className="w-16 h-20 object-cover" />
                        <div>
                          <h3 className="font-serif text-lg text-soft-black group-hover:underline">{product.name}</h3>
                          <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {debouncedSearchTerm && textResults.length === 0 && (
                  <div className="text-center py-10"><p className="text-charcoal">No results for "{debouncedSearchTerm}"</p></div>
              )}
              {!debouncedSearchTerm && (
                   <div className="text-center py-10"><p className="text-charcoal">Start typing to see product results.</p></div>
              )}
            </div>
          </div>
          
          {/* Visual Search UI */}
          <div className={activeTab === 'visual' ? 'block' : 'hidden'}>
            <div className="mt-6 max-h-[70vh] overflow-y-auto">
              {!imagePreview && (
                <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-rose transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef}
                        onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                        className="hidden" 
                        accept="image/png, image/jpeg, image/webp"
                    />
                    <UploadIcon />
                    <p className="mt-2 font-semibold text-soft-black">Drag & drop an image</p>
                    <p className="text-sm text-gray-500">or click to upload</p>
                </div>
              )}

              {imagePreview && (
                 <div className="relative w-full max-w-sm mx-auto">
                    <img src={imagePreview} alt="Preview" className="w-full h-auto object-contain max-h-64 rounded-lg"/>
                    {isAnalyzing && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center rounded-lg">
                           <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                           <p className="text-white mt-3 text-sm">Analyzing your style...</p>
                        </div>
                    )}
                </div>
              )}

              {error && <p className="text-center text-rose mt-4">{error}</p>}
              
              {!isAnalyzing && visualResults.length > 0 && (
                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-charcoal italic">"{aiResponse}"</p>
                     <button onClick={resetVisualSearch} className="text-sm font-sans text-rose hover:underline">Clear</button>
                  </div>
                  <ul className="mt-4 space-y-4 border-t border-beige pt-4">
                     {visualResults.map(product => (
                      <li key={product.id}>
                        <Link to={`/product/${product.id}`} className="flex items-center gap-4 group p-2 hover:bg-beige/50">
                          <img src={product.images[0]} alt={product.name} className="w-16 h-20 object-cover" />
                          <div>
                            <h3 className="font-serif text-lg text-soft-black group-hover:underline">{product.name}</h3>
                            <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!isAnalyzing && imagePreview && visualResults.length === 0 && !error && (
                 <div className="text-center py-10">
                    <p className="text-charcoal">We couldn't find any direct matches for your image.</p>
                     <button onClick={resetVisualSearch} className="mt-2 text-sm font-sans text-rose hover:underline">Try another image</button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;