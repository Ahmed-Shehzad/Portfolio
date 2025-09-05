# Contact Feature

A comprehensive contact management system with form validation, email integration, and user experience optimization. Handles contact form submissions with robust validation and email delivery.

## 🎯 Purpose

This feature provides a secure, user-friendly contact system that validates user input, prevents spam, and delivers messages reliably via email integration.

## 🏗️ Architecture

```
contact/
├── components/          # React components
│   ├── ContactModal.tsx
│   └── ContactForm.tsx
├── hooks/              # Custom React hooks
│   ├── useContactForm.tsx
│   ├── useContactQuery.tsx
│   └── useContactValidation.tsx
├── constants.ts        # Configuration and validation rules
├── types.ts           # TypeScript definitions
├── utils.ts           # Utility functions
└── index.ts           # Feature exports
```

## 🧩 Components

### ContactModal

**Purpose**: Modal wrapper for contact form with optimized UX

- **Location**: `components/ContactModal.tsx`
- **Features**:
  - Modal overlay and backdrop
  - Escape key and click-outside handling
  - Loading states and animations
  - Mobile-responsive design

### ContactForm

**Purpose**: Main contact form with validation and submission

- **Location**: `components/ContactForm.tsx`
- **Features**:
  - Real-time field validation
  - Error state management
  - Success/failure feedback
  - Accessibility optimizations

## 🪝 Hooks

### useContactForm

**Purpose**: Form state management and submission logic

- **Location**: `hooks/useContactForm.tsx`
- **Features**:
  - Form state management
  - Field validation handling
  - Submission flow control
  - Error state management

### useContactQuery

**Purpose**: API integration with React Query for contact submissions

- **Location**: `hooks/useContactQuery.tsx`
- **Features**:
  - Optimistic updates
  - Request/response caching
  - Error handling and retry logic
  - Loading state management

### useContactValidation

**Purpose**: Client-side validation logic

- **Location**: `hooks/useContactValidation.tsx`
- **Features**:
  - Field-level validation
  - Real-time validation feedback
  - Custom validation rules
  - Accessibility compliance

## 📊 Types

```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
}

interface ContactFormState {
  data: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitCount: number;
}

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}
```

## ⚙️ Configuration

### Validation Rules

```typescript
export const VALIDATION_RULES: ValidationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    required: true,
    pattern: SAFE_EMAIL_REGEX,
    maxLength: MAX_EMAIL_LENGTH,
  },
  subject: {
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
};
```

### Security Features

- **Email Validation**: RFC-compliant email regex
- **Input Sanitization**: XSS prevention
- **Rate Limiting**: Submission throttling
- **CSRF Protection**: Token-based validation

## 🎨 Features

- **✅ Real-time Validation**: Instant feedback on form fields
- **📧 Email Integration**: Reliable email delivery via Nodemailer
- **🔒 Security**: Input sanitization and spam prevention
- **♿ Accessibility**: WCAG compliant form design
- **📱 Responsive**: Mobile-optimized interface
- **🌐 Internationalization**: Multi-language support
- **⚡ Performance**: Optimized with React Query
- **🎭 UX Optimization**: Loading states and success feedback

## 🔧 Usage

```tsx
import { ContactModal, useContactForm } from "@/features/contact";

// Basic usage
function ContactSection() {
  return <ContactModal />;
}

// Advanced usage with custom hook
function CustomContactForm() {
  const { formData, errors, isSubmitting, handleChange, handleSubmit, resetForm } =
    useContactForm();

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

## 🌐 API Integration

### Contact Submission Endpoint

- **URL**: `/api/contact`
- **Method**: `POST`
- **Locale Support**: `/[locale]/api/contact`

### Request Format

```typescript
{
  name: string;
  email: string;
  subject: string;
  message: string;
}
```

### Response Format

```typescript
{
  success: boolean;
  message: string;
  data?: {
    id: string;
    timestamp: string;
  };
  error?: string;
}
```

## 🔍 Validation Features

1. **Client-side Validation**:
   - Real-time field validation
   - Custom validation rules
   - Accessibility-friendly error messages

2. **Server-side Validation**:
   - Input sanitization
   - Security checks
   - Rate limiting

3. **Email Validation**:
   - RFC-compliant regex
   - Domain verification
   - Disposable email detection

## 🚀 Future Enhancements

- [ ] File attachment support
- [ ] CAPTCHA integration
- [ ] Real-time chat widget
- [ ] Contact analytics dashboard
- [ ] Auto-responder emails
- [ ] Contact categorization
- [ ] Integration with CRM systems
- [ ] Webhook notifications
