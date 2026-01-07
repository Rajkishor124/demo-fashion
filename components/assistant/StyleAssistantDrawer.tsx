
import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleGenAI, Type } from '@google/genai';

import { useStyleAssistant } from '../../context/StyleAssistantContext';
import { Product } from '../../types';
import { products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import ChatBubble from './ChatBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  products?: Product[];
}

const examplePrompts = [
    "I'm looking for a dress for a summer wedding in Italy.",
    "Show me something professional but chic for a work event.",
    "I need cozy knitwear for a weekend getaway.",
];

const productsForPrompt = products.map(({ id, name, description, category, tags, colors }) => ({
    id, name, description, category, tags, colors,
}));

const systemInstruction = "You are a friendly and knowledgeable fashion style assistant for 'Demo', a premium womenswear brand. Your goal is to help users find the perfect items based on their requests. Analyze the user's query and the provided product list. Return a conversational and helpful response, and a list of product IDs that are the best matches. If no products are a good match, say so politely.";

const StyleAssistantDrawer: React.FC = () => {
    const { isAssistantOpen, closeAssistant } = useStyleAssistant();
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const prevPathname = useRef(location.pathname);

    useEffect(() => {
        if (isAssistantOpen && location.pathname !== prevPathname.current) {
            closeAssistant();
        }
        prevPathname.current = location.pathname;
    }, [location.pathname, isAssistantOpen, closeAssistant]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    useEffect(() => {
        if (!isAssistantOpen) {
            setTimeout(() => {
                setMessages([]);
                setUserInput('');
                setIsLoading(false);
            }, 300); // Allow for animation
        }
    }, [isAssistantOpen]);

    const handleSend = async (promptText: string = userInput) => {
        if (!promptText.trim() || isLoading) return;

        const newMessages: Message[] = [...messages, { role: 'user', content: promptText }];
        setMessages(newMessages);
        setUserInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: `User request: "${promptText}"\n\nProduct Catalog:\n${JSON.stringify(productsForPrompt)}`,
                config: {
                    systemInstruction,
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            response: { type: Type.STRING, description: "A friendly, conversational response to the user's query." },
                            productIds: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING },
                                description: "An array of product IDs that best match the user's query. Return an empty array if no matches are found."
                            }
                        },
                        required: ['response', 'productIds']
                    },
                },
            });
            
            const resultJson = JSON.parse(response.text);
            const assistantResponse: string = resultJson.response;
            const recommendedIds: string[] = resultJson.productIds;
            const recommendedProducts = products.filter(p => recommendedIds.includes(p.id)).sort((a, b) => recommendedIds.indexOf(a.id) - recommendedIds.indexOf(b.id));

            const assistantMessage: Message = {
                role: 'assistant',
                content: assistantResponse,
                products: recommendedProducts
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: Message = {
                role: 'assistant',
                content: "I'm sorry, I'm having a little trouble right now. Please try again later."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-500 ${isAssistantOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeAssistant}
            />
            
            <div className={`fixed top-0 right-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isAssistantOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-beige">
                        <h2 className="font-serif text-2xl flex items-center gap-2">
                            <span className="text-rose">✨</span> Style Assistant
                        </h2>
                        <button onClick={closeAssistant} className="p-2 text-charcoal hover:text-soft-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                        <div className="flex flex-col gap-3">
                            {messages.length === 0 && !isLoading && (
                                <div className="text-center p-4 text-charcoal animate-fadeIn">
                                    <p className="font-serif text-lg">How can I help you today?</p>
                                    <p className="text-sm mt-2">Try asking for something like:</p>
                                    <div className="mt-4 flex flex-col items-center space-y-2">
                                        {examplePrompts.map(prompt => (
                                            <button 
                                                key={prompt}
                                                onClick={() => handleSend(prompt)} 
                                                className="text-sm text-rose italic hover:underline"
                                            >
                                                "{prompt}"
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {messages.map((msg, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <ChatBubble message={msg.content} role={msg.role} />
                                    {msg.role === 'assistant' && msg.products && msg.products.length > 0 && (
                                        <div className="overflow-x-auto py-2 -mx-4 px-4">
                                            <div className="flex gap-4 w-max">
                                                {msg.products.map(p => (
                                                    <div key={p.id} className="w-48">
                                                        <ProductCard product={p} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <ChatBubble message="" role="assistant" isLoading={true} />
                            )}
                        </div>
                    </div>
                    
                    {/* Input */}
                    <div className="border-t border-beige p-4">
                        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Describe a style or occasion..."
                                className="flex-1 bg-ivory border border-beige focus:ring-rose focus:border-rose p-3 text-sm"
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={isLoading || !userInput.trim()} className="p-3 bg-soft-black text-white hover:bg-charcoal disabled:bg-gray-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" transform="rotate(90 12 12)" /></svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StyleAssistantDrawer;