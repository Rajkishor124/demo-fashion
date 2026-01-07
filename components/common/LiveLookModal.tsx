
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Product } from '../../types';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import Button from '../ui/Button';

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
const CameraIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>;

// Helper to convert a blob to a base64 string
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(blob);
  });
};

interface LiveLookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LiveLookModal: React.FC<LiveLookModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access the camera. Please check your browser permissions.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
      // Reset state on close
      setTimeout(() => {
        setCapturedImage(null);
        setIsLoading(false);
        setResults([]);
        setAiResponse('');
        setError(null);
      }, 300);
    }
    return () => stopCamera();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const imageUrl = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageUrl);
    analyzeImage(imageUrl);
  };

  const analyzeImage = async (imageUrl: string) => {
    setIsLoading(true);
    setResults([]);
    setError(null);

    try {
        const blob = await (await fetch(imageUrl)).blob();
        const base64Data = await blobToBase64(blob);

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        const productsForPrompt = products.map(({ id, name, description, category, tags, colors }) => ({ id, name, description, category, tags, colors }));
        
        const textPart = {
            text: `You are a fashion expert for 'Demo'. Analyze the style, items, colors, and patterns in the captured image. Find similar items from the product catalog. Respond with ONLY a valid JSON object like: { "response": "A short, conversational sentence.", "productIds": ["id1", "id2", ...] }. Do not use markdown. Catalog: ${JSON.stringify(productsForPrompt)}`
        };
        const imagePart = { inlineData: { mimeType: 'image/jpeg', data: base64Data } };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [imagePart, textPart] },
        });

        const resultJson = JSON.parse(response.text);
        const recommendedIds: string[] = resultJson.productIds || [];
        const recommendedProducts = products.filter(p => recommendedIds.includes(p.id))
                                            .sort((a, b) => recommendedIds.indexOf(a.id) - recommendedIds.indexOf(b.id));

        setAiResponse(resultJson.response || "Inspired by this look, here are some pieces you might love:");
        setResults(recommendedProducts);

    } catch (err) {
        console.error("Error analyzing image:", err);
        setError("We couldn't find any matches for that look. Please try again.");
    } finally {
        setIsLoading(false);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setResults([]);
    setAiResponse('');
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center animate-fadeIn" onClick={onClose}>
        <canvas ref={canvasRef} className="hidden" />
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center text-white z-20">
            <h2 className="font-serif text-2xl">Live Look</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10"><CloseIcon /></button>
        </div>

        {/* Content */}
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-8 p-4 pt-20">
            {/* Camera View / Captured Image */}
            <div className="w-full md:w-1/2 h-full max-h-[70vh] aspect-[9/16] bg-black rounded-lg overflow-hidden relative shadow-lg">
                <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover transition-opacity duration-300 ${capturedImage ? 'opacity-0' : 'opacity-100'}`} />
                {capturedImage && <img src={capturedImage} alt="Captured Look" className="absolute inset-0 w-full h-full object-cover animate-fadeIn" />}
                {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-white mt-3 text-sm">Finding your look...</p>
                    </div>
                )}
            </div>

            {/* Controls & Results */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center text-white">
                {!capturedImage && (
                    <div className="text-center">
                        <p className="mb-8">Point your camera at an outfit to get recommendations.</p>
                        <Button onClick={handleCapture} className="w-20 h-20 rounded-full !p-0 border-4 border-white bg-white/20 hover:bg-white/30" disabled={!stream}>
                            <span className="w-16 h-16 block bg-white rounded-full"></span>
                        </Button>
                        <p className="mt-4 font-sans uppercase tracking-wider">Scan Look</p>
                        {error && <p className="text-rose mt-4">{error}</p>}
                    </div>
                )}
                {capturedImage && !isLoading && (
                    <div className="animate-fadeIn w-full">
                        <button onClick={handleRetake} className="flex items-center gap-2 mb-4 font-sans text-sm hover:underline"><BackIcon /> Retake</button>
                        {results.length > 0 ? (
                            <>
                                <p className="italic mb-4">"{aiResponse}"</p>
                                <div className="overflow-x-auto py-2 -mx-4 px-4">
                                    <div className="flex gap-4 w-max">
                                        {results.map(p => (
                                            <div key={p.id} className="w-48 bg-cream rounded-md overflow-hidden">
                                                <ProductCard product={p} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-4 bg-white/10 rounded-lg">
                                <p>{error || "No direct matches found."}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default LiveLookModal;
