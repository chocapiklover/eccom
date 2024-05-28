import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create a context for managing the hovered image
const HoverImageContext = createContext<any>(null);

export const HoverImageProvider = ({ children }: { children: ReactNode }) => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  return (
    <HoverImageContext.Provider value={{ hoveredImage, setHoveredImage }}>
      {children}
    </HoverImageContext.Provider>
  );
};

// Custom hook for using the context
export const useHoverImage = () => {
  return useContext(HoverImageContext);
};