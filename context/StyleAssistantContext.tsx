
import React, { createContext, useContext, useState, PropsWithChildren, useCallback } from 'react';

interface StyleAssistantContextType {
  isAssistantOpen: boolean;
  openAssistant: () => void;
  closeAssistant: () => void;
}

const StyleAssistantContext = createContext<StyleAssistantContextType | undefined>(undefined);

export const StyleAssistantProvider = ({ children }: PropsWithChildren) => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const openAssistant = useCallback(() => setIsAssistantOpen(true), []);
  const closeAssistant = useCallback(() => setIsAssistantOpen(false), []);

  return (
    <StyleAssistantContext.Provider value={{ isAssistantOpen, openAssistant, closeAssistant }}>
      {children}
    </StyleAssistantContext.Provider>
  );
};

export const useStyleAssistant = () => {
  const context = useContext(StyleAssistantContext);
  if (context === undefined) {
    throw new Error('useStyleAssistant must be used within a StyleAssistantProvider');
  }
  return context;
};