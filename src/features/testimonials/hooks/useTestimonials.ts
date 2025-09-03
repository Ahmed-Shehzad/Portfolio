/**
 * Testimonials Feature Hooks
 *
 * Custom hooks for testimonials functionality.
 */

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { Testimonial } from "../types";
import { TESTIMONIALS_CONFIG } from "../constants";

/**
 * Hook to fetch testimonials data
 */
export const useTestimonials = () => {
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      // In a real app, this would fetch from API
      // For now, return mock data or static data
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to manage testimonial carousel state
 */
export const useTestimonialCarousel = (testimonials: Testimonial[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, TESTIMONIALS_CONFIG.autoPlayInterval);

    return () => clearInterval(interval);
  }, [testimonials.length, isPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    currentIndex,
    isPlaying,
    goToNext,
    goToPrevious,
    goToIndex,
    togglePlayback,
  };
};
