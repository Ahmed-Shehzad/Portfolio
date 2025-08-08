"use client";

import { useEffect, useRef, useState } from "react";
import { useBfcacheCompatibleTimeout } from "./useBfcacheCompatible";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = "0px 0px -100px 0px",
    triggerOnce = true,
    delay = 0,
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const { setBfcacheTimeout } = useBfcacheCompatibleTimeout();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const createObserver = () => {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setBfcacheTimeout(() => setIsVisible(true), delay);
            } else {
              setIsVisible(true);
            }

            if (triggerOnce && observerRef.current) {
              observerRef.current.unobserve(currentElement);
            }
          } else if (!triggerOnce) {
            setIsVisible(false);
          }
        },
        { threshold, rootMargin }
      );
    };

    const startObserving = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      observerRef.current = createObserver();
      observerRef.current.observe(currentElement);
    };

    const stopObserving = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      // Re-create observer if page was restored from bfcache
      if (event.persisted) {
        startObserving();
      }
    };

    const handlePageHide = () => {
      // Disconnect observer when page is hidden for bfcache
      stopObserving();
    };

    // Initial setup
    startObserving();

    // Bfcache event listeners
    window.addEventListener("pageshow", handlePageShow, { passive: true });
    window.addEventListener("pagehide", handlePageHide, { passive: true });

    return () => {
      stopObserving();
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [threshold, rootMargin, triggerOnce, delay, setBfcacheTimeout]);

  return { elementRef, isVisible };
};
