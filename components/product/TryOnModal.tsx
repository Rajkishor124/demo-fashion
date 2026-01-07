
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Product } from '../../types';
import { fileToBase64, imageUrlToBase64 } from '../../utils/imageHelpers';
import Button from '../ui/Button';

// --- ICONS ---
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>;

interface TryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

const TryOnModal: React.FC<TryOnModalProps> = ({ isOpen, onClose, product }) => {
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelImagePreview, setModelImagePreview] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setModelImage(null);
        setModelImagePreview(null);
        setGeneratedImage(null);
        setError(null);
        setIsLoading(false);
      }, 300); // Allow for closing animation
    }
  }, [isOpen]);

  const reset = () => {
    setModelImage(null);
    setModelImagePreview(null);
    setGeneratedImage(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const handleFileChange = (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPEG, PNG, WEBP).');
      return;
    }
    reset();
    setModelImage(file);
    setModelImagePreview(URL.createObjectURL(file));
  };

  const handleGenerate = async () => {
    if (!modelImage) return;

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const modelImageBase64 = await fileToBase64(modelImage);
      const { base64: productImageBase64, mimeType: productMimeType } = await imageUrlToBase64(product.images[0]);

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
      
      const prompt = `Take the person from the first image (the model) and realistically dress them in the clothing item from the second image (the product). The final image should maintain the person's original pose, body shape, and background as much as possible. The clothing should fit naturally on their body.`;
      
      const modelImagePart = { inlineData: { mimeType: modelImage.type, data: modelImageBase64 } };
      const productImagePart = { inlineData: { mimeType: productMimeType, data: productImageBase64 } };
      const textPart = { text: prompt };
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [modelImagePart, productImagePart, textPart] },
      });
      
      const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
      if (imagePart?.inlineData) {
        setGeneratedImage(`data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`);
      } else {
        throw new Error("AI did not return an image. Please try a different photo.");
      }

    } catch (err) {
      console.error("Error generating try-on image:", err);
      setError("Sorry, something went wrong. Please try another image or check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 animate-fadeIn" onClick={onClose}>
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-beige">
          <h2 className="font-serif text-2xl">Virtual Try-On</h2>
          <button onClick={onClose} className="p-2"><CloseIcon /></button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 mt-6 max-h-[70vh] overflow-y-auto">
          {/* Left: Product Image */}
          <div className="text-center">
            <h3 className="font-sans font-semibold mb-2">Selected Item</h3>
            <div className="aspect-[3/4] bg-light-gray">
              <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <p className="font-serif text-lg mt-2">{product.name}</p>
          </div>

          {/* Right: User Interaction */}
          <div>
            {!generatedImage && (
                <>
                <h3 className="font-sans font-semibold mb-2">Your Image</h3>
                {!modelImagePreview ? (
                    <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-rose transition-colors aspect-[3/4] flex flex-col justify-center items-center"
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={(e) => { e.preventDefault(); handleFileChange(e.dataTransfer.files?.[0] || null); }}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <input type="file" ref={fileInputRef} onChange={(e) => handleFileChange(e.target.files?.[0] || null)} className="hidden" accept="image/*"/>
                        <UploadIcon />
                        <p className="mt-2 font-semibold text-soft-black">Upload a photo</p>
                        <p className="text-xs text-gray-500 mt-1">For best results, use a clear, full-body image.</p>
                    </div>
                ) : (
                    <div className="aspect-[3/4] bg-light-gray">
                        <img src={modelImagePreview} alt="Model preview" className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="mt-4 flex gap-4">
                  <Button onClick={handleGenerate} disabled={!modelImage || isLoading} className="flex-1">
                    {isLoading ? 'Generating...' : 'Generate Try-On'}
                  </Button>
                   {modelImage && <Button onClick={reset} variant="ghost">Clear</Button>}
                </div>
                </>
            )}

            {isLoading && (
                 <div className="aspect-[3/4] bg-light-gray flex flex-col items-center justify-center rounded-lg">
                    <div className="w-8 h-8 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-charcoal mt-3 text-sm">Creating your try-on...</p>
                 </div>
            )}
            
            {!isLoading && generatedImage && (
                <div className="text-center">
                    <h3 className="font-sans font-semibold mb-2">Your Try-On Result</h3>
                    <div className="aspect-[3/4] bg-light-gray">
                        <img src={generatedImage} alt="Virtual try-on result" className="w-full h-full object-cover" />
                    </div>
                    <Button onClick={reset} variant="secondary" className="mt-4">Try Another Image</Button>
                </div>
            )}
            
            {error && <p className="text-center text-rose mt-4 text-sm">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOnModal;
