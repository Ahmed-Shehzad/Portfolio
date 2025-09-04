# Component Architecture Reorganization

## Overview

Components have been reorganized to clearly separate client-side and server-side components, improving code maintainability and Next.js 13+ App Router optimization.

## New Directory Structure

### Client Components (`src/components/client/`)

Components that use the `"use client"` directive and require browser APIs, hooks, or user interactions:

#### UI Components (`src/components/client/ui/`)

- `Card.tsx` - Interactive card component
- `CardHeader.tsx` - Card header with potential interactions
- `LanguageSwitcher.tsx` - Language toggle component
- `Modal.tsx` - Modal with event handlers
- `OptimizedImage.tsx` - Image component with client-side optimizations
- `SectionHeader.tsx` - Section header component
- `TechIcon.tsx` - Tech icon with interactive features

#### Error Boundaries (`src/components/client/boundaries/`)

- `ErrorBoundary.tsx` - Main error boundary component
- `FeatureErrorBoundary.tsx` - Feature-specific error boundary

#### Dynamic Components (`src/components/client/`)

- `DynamicHeader.tsx` - Dynamic import wrapper for header (requires client-side rendering)
- `DynamicContactModal.tsx` - Dynamic import wrapper for contact modal (requires client-side rendering)

### Server Components (`src/components/server/`)

Components that render on the server and don't require client-side JavaScript:

#### Shared Components (`src/components/server/shared/`)

- `ContactDetails.tsx` - Static contact information display
- `Links.tsx` - Navigation links (server-side rendered)
- `ProfileImage.tsx` - Static profile image component

#### Pages (`src/components/server/pages/`)

- `DynamicResumePage.tsx` - Dynamic import wrapper for resume page

#### Individual Server Components

- `HeroOrbit.tsx` - Static orbit animation component

## Import Usage

### Recommended Imports

```typescript
// Import from main components barrel (recommended)
import { Card, Modal, LanguageSwitcher } from "@/components";

// Or import from specific subdirectories if needed
import { Card } from "@/components/client/ui";
import { ProfileImage } from "@/components/server/shared";
```

### Benefits

1. **Clear Separation**: Easy to identify which components are client vs server
2. **Better Performance**: Server components reduce client bundle size
3. **Type Safety**: Maintained full TypeScript support
4. **Backward Compatibility**: Main barrel exports still work for existing imports
5. **Next.js Optimization**: Better alignment with App Router patterns

## Migration Notes

- All existing imports continue to work through the main `@/components` barrel export
- The reorganization maintains full backward compatibility
- Components are logically grouped by their rendering context
- Index files provide clean exports for each category

## Best Practices

1. Use server components by default unless client-side features are needed
2. Add `"use client"` directive only when necessary
3. Import from `@/components` for most use cases
4. Consider component placement based on interactivity requirements
