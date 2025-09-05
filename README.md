# Portfolio

A modern, responsive portfolio website built with Next.js 15, featuring internationalization, dynamic PDF generation, and a clean, professional design.

## ✨ Features

- **🌐 Internationalization**: Full support for English and German locales
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **📄 Dynamic PDF Generation**: Generate and download resume/CV as PDF
- **🎨 Modern UI**: Clean design with Tailwind CSS and smooth animations
- **⚡ Performance Optimized**: Built with Next.js 15 App Router for optimal performance
- **🔍 SEO Friendly**: Proper meta tags, sitemap, and robots.txt
- **📧 Contact Form**: Integrated contact form with email functionality
- **🌙 Professional Sections**: About, Projects, Resume, and Contact sections

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.2](https://nextjs.org/) with App Router
- **Language**: [TypeScript 5.9.2](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.1.12](https://tailwindcss.com/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **PDF Generation**: [Puppeteer](https://pptr.dev/) with Chromium
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)
- **Email**: [Nodemailer](https://nodemailer.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Analytics**: Vercel Analytics & Speed Insights

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ahmed-Shehzad/Portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:

   ```env
   # Email Configuration
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_USER=your-email
   SMTP_PASS=your-password
   EMAIL_FROM=your-email
   EMAIL_TO=recipient-email

   # App Configuration
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── api/           # API routes (contact, PDF generation)
│   │   ├── resume/        # Resume page
│   │   └── cover-letter/  # Cover letter page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── client/           # Client-side components
│   └── server/           # Server-side components
├── features/             # Feature-based modules
├── i18n/                # Internationalization config
├── lib/                 # Utility libraries
├── sections/            # Page sections (Header, Footer, etc.)
├── shared/              # Shared utilities
└── types/               # TypeScript type definitions
```

## 🌐 Internationalization

The portfolio supports multiple languages:

- **English** (`/en`) - Default locale
- **German** (`/de`) - Secondary locale

Language switching is available through the header navigation.

## 📄 PDF Generation

Dynamic PDF generation for resume and cover letter using Puppeteer:

- **Resume PDF**: `/[locale]/api/resume-pdf`
- **Cover Letter PDF**: `/[locale]/api/cover-letter-pdf`

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**

   ```bash
   npm run deploy:production
   ```

2. **Environment Variables**
   Configure the same environment variables in your Vercel dashboard.

### Manual Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 📧 Contact Form

The contact form integrates with email services:

- Server-side validation
- Spam protection
- Email notifications
- Form state management

## 🔍 SEO Features

- Dynamic meta tags for each page
- Sitemap generation (`/sitemap.xml`)
- Robots.txt configuration
- Internationalized URLs
- Open Graph and Twitter Card support

## 🎨 Customization

### Themes and Styling

- Modify `tailwind.config.ts` for design system changes
- Update color schemes in CSS variables
- Customize animations and transitions

### Content

- Update personal information in configuration files
- Modify sections in `src/sections/`
- Add or remove projects and skills

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with code splitting and tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ahmed Shehzad**

- GitHub: [@Ahmed-Shehzad](https://github.com/Ahmed-Shehzad)
- Portfolio: [ahmed-shehzad.vercel.app](https://ahmed-shehzad.vercel.app)

---

⭐ **Star this repository if you found it helpful!**
