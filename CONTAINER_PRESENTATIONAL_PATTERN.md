# Container/Presentational Component Pattern Implementation

## Overview

This implementation follows the Container/Presentational component pattern (also known as Smart/Dumb components) to achieve better separation of concerns, improved testability, and enhanced maintainability.

## Pattern Definition

### Container Components (Smart Components)

**Location**: `src/components/client/containers/`

**Responsibilities**:

- Handle business logic and state management
- Fetch data and manage API calls
- Handle user interactions and side effects
- Connect with external services (i18n, React Query, etc.)
- Pass data and callbacks to presentational components

**Characteristics**:

- Use hooks for state and effects
- Connect to external data sources
- Handle complex business logic
- Minimal or no styling/markup
- Provide data and behavior to presentational components

### Presentational Components (Dumb Components)

**Location**: `src/components/client/presentational/`

**Responsibilities**:

- Render UI based on props
- Handle visual styling and layout
- Manage local UI state (animations, toggles)
- Provide user interaction handlers via props
- Focus solely on presentation logic

**Characteristics**:

- Receive data via props
- Stateless or minimal local UI state
- No external dependencies
- Highly reusable
- Easy to test and reason about

**Naming Convention**:

- Components are named directly (e.g., `Contact`, `Projects`, `Navigation`)
- No "Presentational" suffix needed since directory location makes purpose clear
- Clean, simple names that match their primary domain function

## Implementation Examples

### 1. Contact Section

#### Container: `ContactContainer.tsx`

```typescript
export const ContactContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("contact");

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const translations = {
    title: t("title"),
    description: t("description"),
    buttonText: t("buttonText"),
  };

  return (
    <Contact
      translations={translations}
      isModalOpen={isModalOpen}
      onOpenModal={handleOpenModal}
      onCloseModal={handleCloseModal}
      ContactModalComponent={DynamicContactModal}
    />
  );
};
```

#### Presentational: `Contact.tsx`

```typescript
export const Contact: FC<ContactProps> = ({
```

#### Presentational: `ContactPresentational.tsx`

```typescript
export const ContactPresentational: FC<ContactPresentationalProps> = ({
  translations,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  ContactModalComponent,
}) => {
  return (
    <div id="contact" className="py-16 pt-12 md:px-24 lg:py-24 lg:pt-20">
      {/* Pure UI rendering based on props */}
    </div>
  );
};
```

### 2. Projects Section

#### Container: `ProjectsContainer.tsx`

- Handles React Query data fetching
- Manages loading and error states
- Provides translations
- No UI rendering logic

#### Presentational: `ProjectsPresentational.tsx`

- Renders different states (loading, error, success)
- Handles responsive design
- Manages visual animations
- No data fetching or business logic

### 3. Navigation System

#### Container: `NavigationContainer.tsx`

- Manages scroll position detection
- Handles active section highlighting
- Controls mobile menu state
- Manages smooth scrolling behavior
- Handles URL hash updates

#### Presentational: `NavigationPresentational.tsx`

- Renders desktop and mobile navigation UI
- Handles visual animations and transitions
- Manages responsive layout
- No scroll detection or business logic

## Benefits Achieved

### 1. **Separation of Concerns**

- Business logic separated from presentation
- Data management isolated from UI rendering
- Clear boundaries between different responsibilities

### 2. **Enhanced Testability**

```typescript
// Easy to test presentational components
describe('Contact', () => {
  it('renders contact section with translations', () => {
    const props = {
      translations: { title: 'Contact', description: 'Get in touch' },
      isModalOpen: false,
      onOpenModal: jest.fn(),
      onCloseModal: jest.fn(),
      ContactModalComponent: MockModal,
    };

    render(<Contact {...props} />);
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});// Easy to test container logic
describe('ContactContainer', () => {
  it('opens modal when handleOpenModal is called', () => {
    // Test business logic without UI concerns
  });
});
```

### 3. **Improved Reusability**

- Presentational components can be reused with different data sources
- Container logic can be shared across different UIs
- Easy to create variations (mobile vs desktop, different themes)

### 4. **Better Performance**

- Easier to optimize re-renders with React.memo on presentational components
- Container components can implement sophisticated memoization
- Clear optimization boundaries

### 5. **Enhanced Developer Experience**

- Clearer component purposes and responsibilities
- Easier to reason about data flow
- Simplified debugging (UI vs logic issues)
- Better code organization

## Directory Structure

```
src/components/client/
├── containers/           # Smart components with business logic
│   ├── ContactContainer.tsx
│   ├── ProjectsContainer.tsx
│   ├── NavigationContainer.tsx
│   └── index.ts
├── presentational/       # Dumb components for UI rendering
│   ├── Contact.tsx
│   ├── Projects.tsx
│   ├── Navigation.tsx
│   └── index.ts
├── ui/                  # Generic UI components
├── boundaries/          # Error boundaries
└── index.ts
```

## Usage Guidelines

### When to Use This Pattern

✅ **Good Use Cases**:

- Components with complex business logic
- Data fetching components
- Components with multiple interaction states
- Features requiring different UI variations
- Components that need extensive testing

❌ **Avoid When**:

- Simple display components with no logic
- Components with minimal or no state
- One-off components with no reuse potential
- Over-engineering simple features

### Best Practices

1. **Keep Presentational Components Pure**
   - No API calls or complex business logic
   - Props should be simple, serializable data
   - Focus on rendering and user interactions

2. **Make Containers Focused**
   - Single responsibility for data/logic management
   - Minimal UI rendering (ideally just rendering presentational component)
   - Handle all side effects and external dependencies

3. **Use TypeScript Interfaces**
   - Define clear prop interfaces for presentational components
   - Document expected data shapes and callback signatures
   - Use generic types where appropriate

4. **Optimize Performance**
   - Wrap presentational components with React.memo
   - Use useCallback for stable function references
   - Implement custom comparison functions when needed

## Integration with Existing Architecture

This pattern integrates seamlessly with the existing component structure:

- **Client/Server Separation**: Both containers and presentational components respect the client/server boundary
- **Feature Organization**: Can be applied within feature directories
- **Barrel Exports**: Clean imports through index files
- **TypeScript**: Full type safety maintained throughout

## Migration Path

To migrate existing components:

1. **Identify Complex Components**: Look for components with both UI and business logic
2. **Extract Business Logic**: Move state, effects, and data fetching to container
3. **Create Presentational Component**: Pure UI rendering based on props
4. **Define Clear Interfaces**: TypeScript interfaces for data flow
5. **Update Tests**: Separate tests for logic and UI concerns
6. **Optimize Performance**: Add memoization and optimization patterns

This pattern provides a solid foundation for maintainable, testable, and performant React components while maintaining the existing architectural benefits.
