// Animation-related type definitions

export interface AnimationVariant {
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition?: Record<string, any>;
}

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}
