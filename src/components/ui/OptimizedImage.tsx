"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends ImageProps {
  webpSrc?: string;
  avifSrc?: string;
  fallbackSrc?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  avifSrc,
  fallbackSrc,
  alt,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  // Extract src string from either string or import object
  const srcString = typeof src === "string" ? src : (src as any)?.src || src;
  const finalFallbackSrc = fallbackSrc || srcString;

  const handleImageError = () => {
    setImageError(true);
  };

  // If there's an error, use fallback
  if (imageError) {
    return <Image src={finalFallbackSrc} alt={alt} onError={handleImageError} {...props} />;
  }

  // If custom next-gen formats are provided, use picture element
  if (avifSrc || webpSrc) {
    return (
      <picture>
        {/* AVIF format - best compression */}
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}

        {/* WebP format - good compression and wide support */}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}

        {/* Fallback to original format */}
        <Image src={finalFallbackSrc} alt={alt} onError={handleImageError} {...props} />
      </picture>
    );
  }

  // Use Next.js built-in optimization for better performance
  return (
    <Image
      src={srcString}
      alt={alt}
      onError={handleImageError}
      {...props}
      // Enable Next.js image optimization with enhanced settings
      quality={props.quality || 85}
      // Prevent layout shift with proper sizing
      sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
    />
  );
};

export default OptimizedImage;
