# Portfolio Project Structure

This project follows industry best practices for organizing code in a scalable, maintainable Next.js application.

## 📁 Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles and Tailwind CSS
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Home page
│   ├── error.tsx           # Route-level error handling
│   ├── global-error.tsx    # Global error boundary
│   ├── not-found.tsx       # Custom 404 page
│   ├── loading.tsx         # Loading UI
│   └── favicon.ico         # Site favicon
├── assets/                 # Static assets
│   ├── icons/              # SVG icons (technology icons)
│   └── images/             # Images (project screenshots, avatars)
├── components/             # Reusable UI components (organized by type)
│   ├── ui/                 # Basic UI components
│   │   ├── Card.tsx        # Reusable card component
│   │   ├── CardHeader.tsx  # Card header with consistent styling
│   │   ├── Modal.tsx       # Modal/dialog component
│   │   ├── SectionHeader.tsx # Section headers with consistent styling
│   │   ├── TechIcon.tsx    # Technology icons with gradients
│   │   └── index.ts        # Export all UI components
│   ├── features/           # Feature-specific components
│   │   ├── ContactModal.tsx # Contact form modal
│   │   ├── DynamicMap.tsx  # Map component with SSR handling
│   │   ├── OpenStreetMap.tsx # Interactive map implementation
│   │   ├── ToolboxItems.tsx # Technology showcase component
│   │   └── index.ts        # Export all feature components
│   └── layout/             # Layout-related components
│       ├── HeroOrbit.tsx   # Animated orbital elements for hero
│       └── index.ts        # Export all layout components
├── hooks/                  # Custom React hooks
│   └── useScrollAnimation.ts # Scroll-triggered animations hook
├── lib/                    # Shared libraries and configurations
│   ├── animations.ts       # Animation variants and configurations
│   └── index.ts            # Export all lib utilities
├── pages/                  # Page sections (main content areas)
│   ├── About.tsx           # About section with skills and hobbies
│   ├── Contact.tsx         # Contact section with form
│   ├── Footer.tsx          # Site footer with social links
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with introduction
│   ├── Projects.tsx        # Portfolio projects showcase
│   ├── Tape.tsx            # Moving tape with technologies
│   ├── Testimonials.tsx    # Client testimonials
│   └── index.ts            # Export all page sections
├── shared/                 # Shared utilities, types, and constants
│   ├── constants/          # Application constants
│   │   └── index.ts        # Navigation, toolbox, hobbies, config
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Shared interfaces and types
│   └── utils/              # Utility functions
│       └── index.ts        # Helper functions (cn, debounce, etc.)
└── wrappers/               # Higher-order components and wrappers
    ├── ErrorBoundary.tsx   # Error boundary class component
    ├── ErrorBoundaryWrapper.tsx # Client-side error boundary wrapper
    ├── ScrollAnimationWrapper.tsx # Scroll animation wrapper
    └── index.ts            # Export all wrappers
```

## 🎯 Organization Principles

### **Components Structure**

- **`ui/`** - Basic, reusable UI components (Card, Modal, Button, etc.)
- **`features/`** - Feature-specific components that contain business logic
- **`layout/`** - Layout and structural components

### **Pages vs App**

- **`pages/`** - Content sections that make up the main page
- **`app/`** - Next.js App Router specific files (layout, error handling, metadata)

### **Shared Resources**

- **`shared/constants/`** - Application-wide constants (navigation, data)
- **`shared/types/`** - TypeScript interfaces and type definitions
- **`shared/utils/`** - Utility functions used across the application

### **Separation of Concerns**

- **`hooks/`** - Custom React hooks for stateful logic
- **`lib/`** - Third-party integrations and configurations
- **`wrappers/`** - Higher-order components and context providers

## 📦 Import Strategy

### **Barrel Exports**

Each directory includes an `index.ts` file that re-exports components:

```typescript
// components/ui/index.ts
export { Card } from "./Card";
export { CardHeader } from "./CardHeader";
export { Modal } from "./Modal";
```

### **Clean Imports**

Use directory imports for cleaner, more maintainable code:

```typescript
// ✅ Good - Clean and organized
import { Card, CardHeader, SectionHeader } from "@/components/ui";
import { DynamicMap, ToolboxItems } from "@/components/features";
import { ScrollAnimationWrapper } from "@/wrappers";

// ❌ Avoid - Multiple individual imports
import { Card } from "@/components/ui/Card";
import { CardHeader } from "@/components/ui/CardHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
```

### **Path Mapping**

TypeScript path mapping is configured for clean imports:

```typescript
// tsconfig.json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

## 🔧 Usage Examples

### **Using UI Components**

```typescript
import { Card, CardHeader } from "@/components/ui";

const MyComponent = () => (
  <Card>
    <CardHeader title="My Title" description="Description" />
  </Card>
);
```

### **Using Shared Constants**

```typescript
import { TOOLBOX_ITEMS, NAV_ITEMS } from "@/shared/constants";
import type { ToolboxItem } from "@/shared/types";

const toolboxItems: ToolboxItem[] = TOOLBOX_ITEMS;
```

### **Using Utilities**

```typescript
import { cn, debounce, scrollToElement } from "@/shared/utils";

const className = cn("base-class", condition && "conditional-class");
const debouncedFunction = debounce(() => console.log("Called"), 300);
```

## 🎨 Benefits

### **Scalability**

- Easy to add new components in the right category
- Clear separation of concerns
- Predictable file locations

### **Maintainability**

- Barrel exports reduce import complexity
- Shared constants prevent duplication
- Type definitions ensure consistency

### **Developer Experience**

- Intuitive file organization
- Clean import statements
- Auto-completion support
- Easy to navigate and find files

### **Team Collaboration**

- Clear conventions for where to add new code
- Consistent patterns across the codebase
- Easy onboarding for new developers

## 🔄 Migration Benefits

This reorganization provides:

- ✅ Better code organization and discoverability
- ✅ Reduced import statement complexity
- ✅ Improved maintainability and scalability
- ✅ Industry-standard project structure
- ✅ Enhanced developer experience
- ✅ Easier testing and debugging
- ✅ Better separation of concerns
