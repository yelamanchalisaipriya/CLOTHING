import React, { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: '4/5' | '1/1' | '16/9' | '3/4';
  title?: string;
  category?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '4/5',
  title,
  category
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectClass = {
    '4/5': 'aspect-[4/5]',
    '1/1': 'aspect-square',
    '16/9': 'aspect-[16/9]',
    '3/4': 'aspect-[3/4]'
  }[aspectRatio];

  if (hasError || !src) {
    return (
      <div
        className={`w-full ${aspectClass} bg-[#F4F2EC] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#EFECE3]/30 to-[#E5E0D2]/50 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-serif italic text-2xl text-[#8E8B82] tracking-wider mb-2">VÉLORA</span>
          {category && (
            <span className="text-[11px] uppercase tracking-widest text-[#7D7A71] font-medium mb-1">
              {category}
            </span>
          )}
          {title && (
            <span className="text-xs text-[#52504A] font-medium max-w-[180px] line-clamp-2">
              {title}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F4F2EC] ${aspectClass} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#F4F2EC] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
      />
    </div>
  );
};
