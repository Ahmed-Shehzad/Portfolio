# Muhammad Ahmed Shehzad - Backend Developer Portfolio

![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.12-38B2AC?style=flat-square&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=flat-square&logo=vercel)

A modern, high-performance portfolio website showcasing backend development expertise with a focus on performance optimization, accessibility, and professional presentation.

## 🌟 **Live Demo**

**🔗 [https://portfolio-azure-five-75.vercel.app](https://portfolio-azure-five-75.vercel.app)**

---

## 🚀 **Key Features & Highlights**

### **✨ Technical Excellence**

- **⚡ Performance Optimized**: Web Workers, lazy loading, image optimization
- **🔒 Security First**: Content Security Policy, XSS protection, secure headers
- **♿ Accessibility**: WCAG compliant, semantic HTML, screen reader friendly
- **🌐 Internationalization**: Multi-language support with next-intl
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS

### **🛠️ Development Experience**

- **🔨 TypeScript Strict Mode**: Complete type safety
- **🧪 Testing**: Vitest with coverage reports
- **🔍 Code Quality**: ESLint, Prettier, SonarJS rules
- **⚙️ CI/CD**: Automated deployment with GitHub Actions
- **🐙 Git Hooks**: Pre-commit linting and formatting

### **🎨 UI/UX Features**

- **✨ Modern Animations**: Smooth scroll, orbital elements, staggered reveals
- **🌙 Glassmorphism Design**: Modern card layouts with backdrop blur
- **🖼️ Optimized Images**: WebP/AVIF support with blur placeholders
- **📊 Interactive Components**: Contact forms, project showcases, testimonials
- **🗺️ Dynamic Maps**: OpenStreetMap integration with SSR handling

---

## 🏗️ **Architecture & Tech Stack**

### **🔧 Core Technologies**

```json
{
  "framework": "Next.js 15.5.2 (App Router)",
  "language": "TypeScript 5.9.2",
  "styling": "Tailwind CSS 4.1.12",
  "runtime": "React 19.1.1",
  "deployment": "Vercel",
  "testing": "Vitest + Testing Library"
}
```

### **📦 Key Dependencies**

- **🖼️ Images**: `sharp` for optimization, `next/image` for lazy loading
- **🗺️ Maps**: `react-leaflet` + `leaflet` for interactive maps
- **📡 Data Fetching**: `@tanstack/react-query` for server state
- **🌐 i18n**: `next-intl` for internationalization
- **🤖 PDF Generation**: `puppeteer` + `@sparticuz/chromium` for resume PDF
- **📊 Analytics**: `@vercel/analytics` + `@vercel/speed-insights`

### **🧪 Development Tools**

- **🔍 Linting**: ESLint 9.34.0 with SonarJS quality rules
- **🎨 Formatting**: Prettier with Tailwind CSS plugin
- **🧪 Testing**: Vitest with V8 coverage
- **🪝 Git Hooks**: Husky + lint-staged
- **🔧 Bundling**: Built-in Next.js with custom worker compilation

---

## 📁 **Project Structure**

### **🏛️ Bulletproof React Architecture**

```
📂 src/
├── 📱 app/                    # Next.js App Router pages
│   ├── 📄 [locale]/           # Internationalized routes
│   └── 🔗 api/                # API routes (resume PDF)
├── 🎯 features/               # Feature-based modules (BULLETPROOF CORE)
│   ├── 📧 contact/            # Contact form feature
│   │   ├── components/        # ContactModal, etc.
│   │   ├── hooks/             # useContactForm, useSubmitContactForm
│   │   ├── types.ts           # ContactFormData, ValidationRules
│   │   ├── constants.ts       # Validation rules, endpoints
│   │   ├── utils.ts           # Form validation, sanitization
│   │   └── index.ts           # Feature barrel exports
│   ├── 💼 portfolio/          # Portfolio projects feature
│   │   ├── components/        # Project showcase components
│   │   ├── hooks/             # usePortfolioQuery, useProjectData
│   │   ├── types.ts           # Project, PortfolioProject types
│   │   └── constants.ts       # Project endpoints, configs
│   ├── 🧭 navigation/         # Navigation feature
│   │   ├── hooks/             # useNavigation, useScrollNav
│   │   ├── types.ts           # Navigation types
│   │   └── utils.ts           # Navigation utilities
│   ├── 📊 performance/        # Performance monitoring feature
│   ├── 👤 about/              # About section feature
│   │   ├── components/        # ToolboxItems, DynamicMap, PersonalIntro
│   │   ├── types.ts           # AboutSection, ToolboxItem types
│   │   └── index.ts           # Feature exports
│   └── ⭐ testimonials/       # Testimonials feature
│       ├── components/        # TestimonialCard, Carousel
│       ├── hooks/             # useTestimonials, useCarousel
│       ├── types.ts           # Testimonial types
│       └── utils.ts           # Testimonial formatting
├── 🧩 components/             # Reusable UI components
│   ├── 🎨 ui/                 # Generic UI components
│   │   ├── Card.tsx           # Glassmorphism cards
│   │   ├── Modal.tsx          # Accessible modals
│   │   ├── OptimizedImage.tsx # Performance-optimized images
│   │   └── SectionHeader.tsx  # Consistent section headers
│   ├── 📐 layout/             # Layout components
│   │   └── HeroOrbit.tsx      # Animated orbital elements
│   ├── 🤝 shared/             # Cross-feature components
│   └── 🛡️ boundaries/         # Error boundaries
│       ├── ErrorBoundary.tsx  # Generic error boundary
│       └── FeatureErrorBoundary.tsx # Feature-specific errors
├── 📑 sections/               # Page sections
│   ├── Hero.tsx               # Landing hero section
│   ├── About.tsx              # About me section
│   ├── Projects.tsx           # Portfolio showcase
│   ├── Contact.tsx            # Contact information
│   ├── Testimonials.tsx       # Client testimonials
│   ├── Header.tsx             # Navigation header
│   ├── Footer.tsx             # Site footer
│   └── Tape.tsx               # Animated tech tape
├── 🎨 assets/                 # Static assets
│   ├── �️ images/             # Optimized images
│   ├── 🎯 icons/              # SVG icons
│   └── 📄 documents/          # PDF files
├── 🔧 lib/                    # Utility libraries
│   └── 🌐 api/                # Centralized API client
│       ├── client.ts          # API client with error handling
│       ├── contact.ts         # Contact API methods
│       └── index.ts           # API exports
├── 🤝 shared/                 # Shared resources
│   ├── � types/              # Global type definitions
│   ├── 🔧 constants/          # Global constants
│   └── 🛠️ utils/              # Global utility functions
├── ⚙️ config/                 # Application configuration
├── 🪝 hooks/                  # Global custom hooks
├── 🌐 i18n/                   # Internationalization
├── 📚 types/                  # TypeScript declarations
├── 🔄 worker/                 # Web Worker scripts
└── 📖 docs/                   # Architecture documentation
    └── architecture/          # Bulletproof React docs
```

│ ├── Contact.tsx # Contact information
│ ├── Testimonials.tsx # Client testimonials
│ ├── Header.tsx # Navigation header
│ ├── Footer.tsx # Site footer
│ └── Tape.tsx # Animated tech tape
├── 🎨 assets/ # Static assets
│ ├── 🖼️ images/ # Optimized images
│ ├── 🎯 icons/ # SVG icons
│ └── 📄 documents/ # PDF files
├── 🔧 lib/ # Utility libraries
├── 🪝 hooks/ # Custom React hooks
├── 🌐 i18n/ # Internationalization
├── 📚 types/ # TypeScript declarations
└── 🔄 worker/ # Web Worker scripts

````

---

## 🎯 **Core Sections**

### **🏠 Hero Section**

- **Personal Introduction**: Professional tagline and call-to-action
- **Animated Elements**: Orbital technology icons with smooth animations
- **Navigation**: Smooth scroll to contact and projects sections
- **Visual Appeal**: Grain texture background with gradient overlays

### **💼 Projects Showcase**

- **Sticky Scroll Effect**: Layered project cards with progressive reveal
- **Performance Data**: Real project results and metrics
- **Interactive Previews**: MacBook-framed project screenshots
- **External Links**: Secure external project links

### **👤 About Me**

- **Professional Journey**: Backend development expertise
- **Core Values**: Technical philosophy and approach
- **Interactive Map**: Location display with OpenStreetMap
- **Technology Stack**: Animated toolbox items

### **📧 Contact Section**

- **Direct Communication**: Professional contact information
- **Resume Access**: Dynamically generated PDF resume
- **Social Links**: Professional social media profiles
- **Availability**: Current work status and availability

### **⭐ Testimonials**

- **Client Feedback**: Real testimonials from past clients
- **Animated Carousel**: Smooth testimonial transitions
- **Professional Validation**: Industry recognition

---

## ⚙️ **Development Setup**

### **📋 Prerequisites**

```bash
Node.js >= 18.17.0
npm >= 9.0.0
Git
````

### **🚀 Quick Start**

```bash
# Clone repository
git clone https://github.com/Ahmed-Shehzad/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

### **🌍 Environment Variables**

Create `.env.local` with the following variables:

```env
# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_APP_VERSION=1.1.0

# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Contact Form (Optional)
CONTACT_EMAIL=your.email@domain.com

# Map Configuration (Optional)
NEXT_PUBLIC_MAP_CENTER_LAT=52.520008
NEXT_PUBLIC_MAP_CENTER_LNG=13.404954
```

---

## 🔨 **Available Scripts**

### **🔄 Development**

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### **🧪 Testing & Quality**

```bash
npm run test         # Run tests with coverage
npm run test:watch   # Run tests in watch mode
npm run check        # Run format check + lint
npm run fix          # Fix formatting + linting issues
```

### **⚙️ Build Tools**

```bash
npm run build:worker    # Compile Web Worker
npm run worker:watch    # Watch Web Worker changes
```

### **🚀 Deployment**

```bash
npm run vercel:build        # Build for Vercel
npm run vercel:deploy       # Deploy to Vercel preview
npm run deploy:production   # Deploy to production
```

---

## 🧪 **Testing Strategy**

### **✅ Testing Framework**

- **Vitest**: Fast unit testing with native ESM support
- **Testing Library**: Component testing utilities
- **V8 Coverage**: Built-in code coverage reports
- **JSDOM**: Browser environment simulation

### **📊 Coverage Reports**

```bash
npm run test        # Generates coverage/index.html
npm run test:ci     # CI-optimized test run with SonarQube format
```

### **🎯 Testing Patterns**

- **Component Testing**: UI component behavior validation
- **Hook Testing**: Custom hook functionality verification
- **Integration Testing**: Feature-level testing
- **Accessibility Testing**: WCAG compliance validation

---

## 🚀 **Deployment & CI/CD**

### **🔧 Automated Deployment**

- **Platform**: Vercel with GitHub integration
- **Triggers**: Automatic on main branch push
- **Environments**: Preview branches + production
- **Performance**: Automatic optimization and caching

### **⚙️ GitHub Actions Workflow**

```yaml
# Automated CI/CD Pipeline:
✅ Code quality validation (ESLint + Prettier)
✅ Type checking (TypeScript strict mode)
✅ Test execution with coverage reports
✅ Security scanning (npm audit)
✅ Build verification
✅ Automated deployment to Vercel
✅ Post-deployment health checks
```

### **📊 Performance Monitoring**

- **Vercel Analytics**: Real user monitoring
- **Speed Insights**: Core Web Vitals tracking
- **Bundle Analysis**: Package size optimization

---

## 🔒 **Security & Best Practices**

### **🛡️ Security Headers**

```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Content-Security-Policy": "configured"
}
```

### **🔐 Additional Security**

- **Dependency Scanning**: Automated vulnerability detection
- **Input Validation**: Form input sanitization
- **External Links**: Secure `rel="noopener noreferrer"`
- **PDF Generation**: Sandboxed Puppeteer execution

---

## 🎨 **Design System & Styling**

### **🎯 Design Principles**

- **Glassmorphism**: Modern card designs with backdrop blur
- **Dark Theme**: Professional dark color palette
- **Smooth Animations**: 60fps CSS transitions and transforms
- **Responsive Grid**: Mobile-first responsive design
- **Accessibility**: High contrast ratios and keyboard navigation

### **🌈 Color Palette**

```css
/* Primary Colors */
--emerald-300: #6ee7b7 /* Accent/CTA */ --sky-400: #38bdf8 /* Secondary accent */
  --neutral-900: #171717 /* Dark background */ --white/5: rgba(255, 255, 255, 0.05)
  /* Subtle borders */ --white/50: rgba(255, 255, 255, 0.5) /* Secondary text */;
```

### **🔤 Typography**

- **Primary**: Inter (system UI alternative)
- **Serif**: Calistoga (headings and emphasis)
- **Scale**: Modular typography scale (14px - 48px)
- **Line Height**: Optimized for readability (1.4-1.6)

---

## ⚡ **Performance Optimizations**

### **📊 Key Metrics**

```
🎯 Core Web Vitals: All metrics within target ranges
⚡ Time to Interactive: < 3.0s
🚀 First Contentful Paint: < 1.5s
💾 Main-thread Work: Reduced 60-70% with Web Workers
📦 Bundle Size: Optimized with tree-shaking
```

### **🔧 Optimization Techniques**

- **Image Optimization**: Next.js Image with WebP/AVIF
- **Code Splitting**: Dynamic imports for non-critical components
- **Web Workers**: Background processing for heavy computations
- **Lazy Loading**: Progressive content loading
- **CDN Delivery**: Global edge caching via Vercel

---

## 🌐 **Internationalization (i18n)**

### **🗣️ Supported Languages**

- **English (en)**: Default language
- **Extensible**: Ready for additional languages

### **📝 Translation Structure**

```
📂 src/i18n/messages/
├── 🇺🇸 en.json          # English translations
└── 🏗️ [locale].json     # Additional languages
```

### **🔧 Usage Pattern**

```tsx
import { useTranslations } from "next-intl";

function Component() {
  const t = useTranslations("section-key");
  return <h1>{t("title")}</h1>;
}
```

---

## 📚 **Additional Resources**

### **📖 Documentation**

- **Component Docs**: Detailed component specifications
- **API Reference**: Comprehensive API documentation
- **Architecture Guide**: System design decisions
- **Performance Guide**: Optimization strategies

### **🔗 External Links**

- **[Next.js Documentation](https://nextjs.org/docs)**
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)**
- **[Tailwind CSS](https://tailwindcss.com/docs)**
- **[Vercel Platform](https://vercel.com/docs)**

---

## 🤝 **Contributing**

### **📋 Development Guidelines**

1. **Fork the repository** and create a feature branch
2. **Follow code style** (ESLint + Prettier configurations)
3. **Write tests** for new features and bug fixes
4. **Update documentation** for significant changes
5. **Submit pull request** with clear description

### **🧪 Quality Standards**

- ✅ TypeScript strict mode compliance
- ✅ ESLint + SonarJS rules passing
- ✅ Test coverage > 80%
- ✅ Performance budgets maintained
- ✅ Accessibility guidelines followed

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 **Author**

**Muhammad Ahmed Shehzad**  
_Backend Developer & Software Engineer_

- 🌐 **Portfolio**: [https://portfolio-azure-five-75.vercel.app](https://portfolio-azure-five-75.vercel.app)
- 💼 **LinkedIn**: [Connect on LinkedIn](https://linkedin.com/in/ahmed-shehzad)
- 📧 **Email**: [Contact directly](mailto:your.email@domain.com)
- 🐙 **GitHub**: [@Ahmed-Shehzad](https://github.com/Ahmed-Shehzad)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

_Built with ❤️ using Next.js, TypeScript, and modern web technologies_

</div>
