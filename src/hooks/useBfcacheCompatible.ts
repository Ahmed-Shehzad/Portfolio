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
    if (typeof window === "undefined") return;

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
    if (typeof window === "undefined") return;

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
