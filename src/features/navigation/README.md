# Navigation Feature

A sophisticated navigation system with smooth scrolling, active section detection, internationalization support, and responsive design. Provides seamless user experience across desktop and mobile devices.

## 🎯 Purpose

This feature creates an intelligent navigation system that enhances user experience through smooth scrolling, section awareness, and adaptive design patterns.

## 🏗️ Architecture

```
navigation/
├── hooks/              # Custom navigation hooks
│   ├── useActiveSection.tsx
│   ├── useSmoothScroll.tsx
│   └── useNavigationState.tsx
├── constants.ts        # Navigation configuration
├── types.ts           # TypeScript definitions
├── utils.ts           # Navigation utilities
└── index.ts           # Feature exports
```

## 🪝 Hooks

### useActiveSection

**Purpose**: Detects and tracks the currently active section based on scroll position

- **Location**: `hooks/useActiveSection.tsx`
- **Features**:
  - Intersection Observer API integration
  - Scroll position awareness
  - Active section highlighting
  - Performance optimization with throttling

### useSmoothScroll

**Purpose**: Provides smooth scrolling functionality with offset compensation

- **Location**: `hooks/useSmoothScroll.tsx`
- **Features**:
  - Smooth scrolling animation
  - Header offset compensation
  - Cross-browser compatibility
  - Custom easing functions

### useNavigationState

**Purpose**: Manages navigation state and user interactions

- **Location**: `hooks/useNavigationState.tsx`
- **Features**:
  - Mobile menu state management
  - Navigation item state tracking
  - Responsive behavior handling
  - History integration

## 📊 Types

```typescript
interface NavigationItem {
  id: string;
  label: string;
  href: string;
  isActive: boolean;
  isExternal?: boolean;
}

interface NavigationConfig {
  items: NavigationItem[];
  scrollOffset: number;
  smoothScrollDuration: number;
  activeThreshold: number;
}

interface ScrollOptions {
  behavior: "smooth" | "auto";
  block: "start" | "center" | "end";
  inline: "start" | "center" | "end";
  offset?: number;
}

interface NavigationState {
  activeSection: string | null;
  isMobileMenuOpen: boolean;
  isScrolling: boolean;
  scrollDirection: "up" | "down" | null;
}
```

## ⚙️ Configuration

### Navigation Items

```typescript
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "about", label: "About", href: "#about" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
  { id: "resume", label: "Resume", href: "/resume", isExternal: true },
];
```

### Scroll Configuration

```typescript
export const SCROLL_CONFIG = {
  OFFSET: 100, // Header height compensation
  DURATION: 800, // Smooth scroll duration (ms)
  THRESHOLD: 0.3, // Active section threshold
  THROTTLE_DELAY: 16, // Scroll event throttling (ms)
};
```

## 🎨 Features

- **🎯 Active Section Detection**: Automatically highlights current section
- **✨ Smooth Scrolling**: Buttery smooth navigation between sections
- **📱 Responsive Design**: Mobile-optimized navigation patterns
- **🌐 Internationalization**: Multi-language navigation support
- **⚡ Performance Optimized**: Throttled scroll events and efficient updates
- **♿ Accessibility**: Keyboard navigation and screen reader support
- **🔄 History Management**: URL hash updates without page reloads
- **🎭 Animation Support**: Smooth transitions and micro-interactions

## 🔧 Usage

```tsx
import {
  useActiveSection,
  useSmoothScroll,
  useNavigationState,
  NAVIGATION_ITEMS,
} from "@/features/navigation";

// Active section detection
function NavigationMenu() {
  const activeSection = useActiveSection();

  return (
    <nav>
      {NAVIGATION_ITEMS.map((item) => (
        <NavItem key={item.id} item={item} isActive={activeSection === item.id} />
      ))}
    </nav>
  );
}

// Smooth scrolling
function NavItem({ item, isActive }) {
  const scrollToSection = useSmoothScroll();

  const handleClick = (e) => {
    e.preventDefault();
    scrollToSection(item.href);
  };

  return (
    <a href={item.href} onClick={handleClick}>
      {item.label}
    </a>
  );
}

// Navigation state management
function MobileNav() {
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useNavigationState();

  return (
    <div>
      <button onClick={toggleMobileMenu}>Menu</button>
      {isMobileMenuOpen && <MobileMenu onClose={closeMobileMenu} />}
    </div>
  );
}
```

## 🔍 Key Features

### Active Section Detection

- **Intersection Observer**: Efficient scroll position tracking
- **Threshold Configuration**: Customizable activation zones
- **Performance Optimization**: Debounced scroll events
- **Visual Feedback**: Smooth active state transitions

### Smooth Scrolling

- **Custom Easing**: Natural scrolling animations
- **Offset Compensation**: Accounts for fixed headers
- **Cross-browser Support**: Fallbacks for older browsers
- **Interruption Handling**: Graceful handling of user interruptions

### Mobile Navigation

- **Hamburger Menu**: Touch-friendly mobile navigation
- **Gesture Support**: Swipe to close functionality
- **Responsive Breakpoints**: Adaptive design patterns
- **Touch Optimization**: Optimized for mobile interactions

### Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling
- **Screen Reader Support**: ARIA labels and landmarks
- **Skip Links**: Quick navigation for assistive technology

## 🌐 Internationalization

### Route Localization

```typescript
const localizedRoutes = {
  en: { about: "#about", projects: "#projects" },
  de: { about: "#über-uns", projects: "#projekte" },
};
```

### Dynamic Labels

```typescript
const getNavigationLabel = (item: string, locale: string) => {
  return navigationLabels[locale][item] || item;
};
```

## ⚡ Performance

- **Intersection Observer**: Efficient scroll tracking
- **Event Throttling**: Optimized scroll event handling
- **Memoization**: Cached navigation calculations
- **Lazy Loading**: Dynamic import of navigation components

## 🚀 Future Enhancements

- [ ] Breadcrumb navigation
- [ ] Progressive web app navigation
- [ ] Voice navigation commands
- [ ] Gesture-based navigation
- [ ] Navigation analytics
- [ ] A/B testing for navigation patterns
- [ ] Advanced scroll animations
- [ ] Context-aware navigation
