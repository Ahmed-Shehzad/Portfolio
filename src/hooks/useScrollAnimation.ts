import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: options.threshold || 0.1,
        root: options.root || null,
        rootMargin: options.rootMargin || "0px",
      }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
      observer.disconnect();
    };
  }, [options.threshold, options.root, options.rootMargin]);

  return { isVisible, ref };
};
