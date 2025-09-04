"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useState, useMemo } from "react";

const convertToString = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
};

const extractSrc = (source: unknown): string => {
  if (typeof source === "string") return source;
  if (typeof source === "number") return String(source);
  if (!source || typeof source !== "object") return "";

  const obj = source as Record<string, unknown>;
  if (obj["src"]) return convertToString(obj["src"]);
  if (obj["default"]) {
    if (typeof obj["default"] === "string") return obj["default"];
    if (obj["default"] && typeof obj["default"] === "object" && "src" in obj["default"]) {
      return convertToString((obj["default"] as { src: unknown }).src);
    }
  }
  return "";
};

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

  const { srcString, webpString, avifString, finalFallbackSrc } = useMemo(() => {
    const srcStr = extractSrc(src);
    return {
      srcString: srcStr,
      webpString: webpSrc ? extractSrc(webpSrc) : undefined,
      avifString: avifSrc ? extractSrc(avifSrc) : undefined,
      finalFallbackSrc: fallbackSrc ? extractSrc(fallbackSrc) : srcStr,
    };
  }, [src, webpSrc, avifSrc, fallbackSrc]);
  const handleImageError = () => {
    setImageError(true);
  };

  // If there's an error, use fallback
  if (imageError) {
    return <Image src={finalFallbackSrc} alt={alt} {...props} />;
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
