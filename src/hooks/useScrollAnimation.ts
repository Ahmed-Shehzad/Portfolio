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
    const el = elementRef.current;
    if (!el) return; // Nothing to observe yet

    // Guard for non-browser or missing API; mark visible immediately (progressive enhancement)
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    // Single observer callback (reduces nested functions & cognitive complexity for Sonar)
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const entry = entries[0];
      if (!entry) return;
      if (entry.isIntersecting) {
        if (delay > 0) {
          setBfcacheTimeout(() => setIsVisible(true), delay);
        } else {
          setIsVisible(true);
        }
        if (triggerOnce && observerRef.current) {
          observerRef.current.unobserve(el);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    // (Re)create observer
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(observerCallback, { threshold, rootMargin });
    observerRef.current.observe(el);

    // BFCache aware events (re-create or disconnect as needed)
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        observerRef.current?.disconnect();
        observerRef.current = new IntersectionObserver(observerCallback, { threshold, rootMargin });
        observerRef.current.observe(el);
      }
    };
    const onPageHide = () => {
      observerRef.current?.disconnect();
    };
    window.addEventListener("pageshow", onPageShow, { passive: true });
    window.addEventListener("pagehide", onPageHide, { passive: true });

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [threshold, rootMargin, triggerOnce, delay, setBfcacheTimeout]);

  return { elementRef, isVisible };
};
