/**
 * Shared Component Types
 *
 * Global component type definitions that are used across multiple features.
 * Following bulletproof architecture by centralizing common types.
 */

import { ComponentPropsWithoutRef, ReactNode } from "react";

// Base component props that most components extend
export interface BaseComponentProps {
  readonly className?: string;
  readonly children?: ReactNode;
}

// Component props that extend HTML elements
export type DivComponentProps = ComponentPropsWithoutRef<"div">;
export type ButtonComponentProps = ComponentPropsWithoutRef<"button">;

// Modal/Dialog related types
export interface ModalBaseProps extends BaseComponentProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

// Animation related types
export interface AnimationProps {
  readonly animation?: string;
  readonly delay?: number;
  readonly duration?: number;
}

// Loading state types
export interface LoadingState {
  readonly isLoading: boolean;
  readonly error?: string | null;
}

// Generic API response type
export interface ApiResponse<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly message?: string;
  readonly error?: string;
}

// Generic list component props
export interface ListComponentProps<T> extends BaseComponentProps {
  readonly items: readonly T[];
  readonly renderItem: (item: T, index: number) => ReactNode;
  readonly keyExtractor?: (item: T, index: number) => string;
}

// Form-related base types
export interface FormFieldProps extends BaseComponentProps {
  readonly name: string;
  readonly label?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly error?: string;
}

// SEO/Meta types
export interface SEOProps {
  readonly title?: string;
  readonly description?: string;
  readonly keywords?: readonly string[];
  readonly ogImage?: string;
}
