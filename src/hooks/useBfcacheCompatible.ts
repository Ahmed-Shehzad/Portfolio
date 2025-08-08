"use client";

import { useEffect, useRef } from "react";

/**
 * Hook to manage bfcache-compatible timeouts that are automatically cleared
 * when the page is hidden to prevent bfcache blocking
 */
export const useBfcacheCompatibleTimeout = () => {
  const timeoutIds = useRef<Set<NodeJS.Timeout>>(new Set());

  const setBfcacheTimeout = (callback: () => void, delay: number): NodeJS.Timeout => {
    const timeoutId = setTimeout(() => {
      timeoutIds.current.delete(timeoutId);
      callback();
    }, delay);

    timeoutIds.current.add(timeoutId);
    return timeoutId;
  };

  const clearBfcacheTimeout = (timeoutId: NodeJS.Timeout) => {
    clearTimeout(timeoutId);
    timeoutIds.current.delete(timeoutId);
  };

  const clearAllTimeouts = () => {
    timeoutIds.current.forEach((id) => clearTimeout(id));
    timeoutIds.current.clear();
  };

  useEffect(() => {
    const handlePageHide = () => {
      // Clear all timeouts when page is hidden for bfcache compatibility
      clearAllTimeouts();
    };

    // Listen for pagehide event to clean up for bfcache
    window.addEventListener("pagehide", handlePageHide, { passive: true });

    return () => {
      window.removeEventListener("pagehide", handlePageHide);
      clearAllTimeouts();
    };
  }, []);

  return {
    setBfcacheTimeout,
    clearBfcacheTimeout,
    clearAllTimeouts,
  };
};

/**
 * Hook for bfcache-compatible scroll event listeners
 */
export const useBfcacheCompatibleScrollListener = (callback: () => void) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          callbackRef.current();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      // Re-attach scroll listener if page was restored from bfcache
      if (event.persisted) {
        window.addEventListener("scroll", handleScroll, { passive: true });
      }
    };

    const handlePageHide = () => {
      // Remove scroll listener when page is hidden
      window.removeEventListener("scroll", handleScroll);
    };

    // Initial listener setup
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Bfcache event listeners
    window.addEventListener("pageshow", handlePageShow, { passive: true });
    window.addEventListener("pagehide", handlePageHide, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, []);
};

/**
 * Hook for bfcache-compatible intersection observers
 */
export const useBfcacheCompatibleIntersectionObserver = (
  elementRef: React.RefObject<HTMLElement>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const createObserver = () => {
      return new IntersectionObserver((entries) => callbackRef.current(entries), options);
    };

    const startObserving = () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      observerRef.current = createObserver();
      observerRef.current.observe(element);
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
      // Disconnect observer when page is hidden
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
  }, [elementRef, options]);

  return observerRef;
};
