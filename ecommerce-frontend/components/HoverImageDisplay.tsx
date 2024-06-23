/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useHoverImage } from "../context/HoverImageContext";

const HoverImageDisplay = () => {
    const { hoveredImage } = useHoverImage();
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
  
    useEffect(() => {
      if (hoveredImage) {
        setCurrentImage(hoveredImage);
        setVisible(true);
      } else {
        setVisible(false);
      }
    }, [hoveredImage]);
  
    return (
      <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-50">
        {currentImage && (
          <img
            src={currentImage}
            alt="Hovered Item"
            className={`max-w-md max-h-md transition-opacity duration-500 p-5 sm:p-1 sm:max-w-4xl sm:max-h-4xl ${visible ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>
    );
  };
  
  export default HoverImageDisplay;