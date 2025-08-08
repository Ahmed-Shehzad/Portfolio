"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useState } from "react";

interface OptimizedImageProps extends ImageProps {
  webpSrc?: string | StaticImageData;
  avifSrc?: string | StaticImageData;
  fallbackSrc?: string | StaticImageData;
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
  const webpString = typeof webpSrc === "string" ? webpSrc : (webpSrc as any)?.src;
  const avifString = typeof avifSrc === "string" ? avifSrc : (avifSrc as any)?.src;
  let finalFallbackSrc;
  if (fallbackSrc) {
    finalFallbackSrc = typeof fallbackSrc === "string" ? fallbackSrc : (fallbackSrc as any)?.src;
  } else {
    finalFallbackSrc = srcString;
  }

  const handleImageError = () => {
    setImageError(true);
  };

  // If there's an error, use fallback
  if (imageError) {
    return <Image src={finalFallbackSrc} alt={alt} onError={handleImageError} {...props} />;
  }

  // If custom next-gen formats are provided, use picture element
  if (avifString || webpString) {
    return (
      <picture>
        {/* AVIF format - best compression */}
        {avifString && <source srcSet={avifString} type="image/avif" />}

        {/* WebP format - good compression and wide support */}
        {webpString && <source srcSet={webpString} type="image/webp" />}

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
