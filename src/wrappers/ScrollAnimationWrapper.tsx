"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimationVariantName, scrollAnimationVariants } from "@/lib";
import { ElementType, FC, ReactNode, RefObject, memo, useMemo } from "react";

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: AnimationVariantName;
  delay?: number;
  className?: string;
  staggerChildren?: boolean;
  threshold?: number;
  as?: ElementType;
}

export const ScrollAnimationWrapper: FC<ScrollAnimationWrapperProps> = memo(
  ({
    children,
    animation = "fadeInUp",
    delay = 0,
    className = "",
    staggerChildren = false,
    threshold = 0.1,
    as: Component = "div",
  }) => {
    const { elementRef, isVisible } = useScrollAnimation({
      threshold,
      delay,
      triggerOnce: true,
      rootMargin: "0px 0px -20px 0px",
    });

    // Memoize class name computation to prevent re-renders
    const combinedClassName = useMemo(() => {
      const animationVariant = animation ? scrollAnimationVariants[animation] : null;
      const staggerClass = staggerChildren ? "stagger-children" : "";
      const visibilityClass = isVisible && animationVariant ? `animate-${animation}` : "";

      return ["animate-on-scroll", staggerClass, visibilityClass, className]
        .filter(Boolean)
        .join(" ");
    }, [animation, staggerChildren, isVisible, className]);

    return (
      <Component ref={elementRef as RefObject<HTMLElement>} className={combinedClassName}>
        {children}
      </Component>
    );
  }
);

ScrollAnimationWrapper.displayName = "ScrollAnimationWrapper";
