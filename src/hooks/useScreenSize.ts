import { useState, useEffect } from "react";

export type ScreenSize = "mobile" | "tablet" | "desktop";

interface UseScreenSizeReturn {
  screenSize: ScreenSize;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
  isHydrated: boolean;
  isLoading: boolean;
}

/**
 * Custom hook to detect screen size and provide responsive utilities
 *
 * Breakpoints:
 * - Mobile: < 768px
 * - Tablet: 768px - 1023px
 * - Desktop: >= 1024px
 */
export const useScreenSize = (): UseScreenSizeReturn => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("desktop");
  const [dimensions, setDimensions] = useState({ width: 1024, height: 768 });
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to determine screen size based on width
    const getScreenSize = (width: number): ScreenSize => {
      if (width < 768) return "mobile";
      if (width < 1024) return "tablet";
      return "desktop";
    };

    // Function to update screen size and dimensions
    const updateScreenSize = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setDimensions({ width, height });
        setScreenSize(getScreenSize(width));

        // Mark as hydrated on first update
        if (!isHydrated) {
          setIsHydrated(true);
          // Add a small delay to ensure smooth transition
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
        }
      }
    };

    // Set initial values
    updateScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", updateScreenSize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, [isHydrated]);

  return {
    screenSize,
    isMobile: screenSize === "mobile",
    isTablet: screenSize === "tablet",
    isDesktop: screenSize === "desktop",
    width: dimensions.width,
    height: dimensions.height,
    isHydrated,
    isLoading,
  };
};
