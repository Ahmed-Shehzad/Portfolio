# Muhammad Ahmed Shehzad - Portfolio

A modern, responsive portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4.

## ✨ Features

- 🎨 **Modern Design**: Clean, professional design with beautiful animations
- 📱 **Fully Responsive**: Optimized for all device sizes
- ⚡ **Performance Optimized**: Built with Next.js 15 for optimal performance
- 🎯 **SEO Friendly**: Comprehensive metadata and structured data
- 🛡️ **Type Safe**: Built with TypeScript for reliability
- 🎭 **Interactive Animations**: Smooth CSS animations and transitions
- 📧 **Contact Form**: Functional contact form with validation
- 🧭 **Smooth Navigation**: Smooth scrolling navigation between sections

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Custom SVG icons with SVGR
- **Fonts**: Inter & Calistoga (Google Fonts)
- **Deployment**: Configured for GitHub Pages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Ahmed-Shehzad/Portfolio.git
cd Portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
│   ├── Card.tsx
│   ├── ContactForm.tsx
│   ├── ErrorBoundary.tsx
│   └── ...
├── sections/          # Page sections
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── ...
└── assets/           # Static assets
    ├── icons/        # SVG icons
    └── images/       # Images
```

## 🔧 Customization

### Personal Information
Update the following files with your information:
- `src/sections/Hero.tsx` - Name and introduction
- `src/sections/About.tsx` - About section and skills
- `src/sections/Projects.tsx` - Portfolio projects
- `src/app/layout.tsx` - SEO metadata

### Styling
- Global styles: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Custom animations and utilities in CSS

### Contact Form
Update the email address in `src/components/ContactForm.tsx` to receive form submissions.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
The project is configured for GitHub Pages deployment with static export:

1. Push to your repository
2. Enable GitHub Pages in repository settings
3. The site will be available at `https://yourusername.github.io/Portfolio`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

Muhammad Ahmed Shehzad - [your-email@example.com](mailto:your-email@example.com)

Project Link: [https://github.com/Ahmed-Shehzad/Portfolio](https://github.com/Ahmed-Shehzad/Portfolio)

---

⭐ Star this repository if you found it helpful!
