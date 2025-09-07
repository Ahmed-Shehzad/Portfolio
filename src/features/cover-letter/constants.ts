/**
 * Cover Letter Configuration Data
 */

import type { CoverLetterConfig } from "@/features/cover-letter/types";

/**
 * Cover Letter type constants
 */
export const COVER_LETTER_TYPES = ["frontend", "backend", "fullstack"] as const;

/**
 * Cover Letter configurations for different specializations
 */
export const COVER_LETTER_CONFIGS: Record<(typeof COVER_LETTER_TYPES)[number], CoverLetterConfig> =
  {
    frontend: {
      type: "frontend",
      title: "Frontend Developer Application",
      position: "Frontend Developer",
      introduction:
        "I am writing to express my strong interest in the Frontend Developer position at your company. With over 5 years of specialized experience in React.js, TypeScript, and modern web development, I have consistently delivered high-performance user interfaces that drive business success.",

      keyHighlights: [
        "5+ years of React.js and TypeScript expertise with proven track record serving 25,000+ users",
        "Reduced application load times by 70% through performance optimization and modern build tools",
        "Led development of healthcare platform achieving 99.2% uptime and 1.2s average load time",
        "Built award-winning mobile apps with 4.7/5 App Store ratings and 50,000+ downloads",
        "Expert in component architecture, state management, and responsive design principles",
      ],

      technicalExpertise: [
        "Frontend Technologies: React.js, TypeScript, Next.js, JavaScript (ES6+), HTML5/CSS3",
        "Styling & Design: Tailwind CSS, Material-UI, Responsive Design, Progressive Web Apps",
        "State Management: Redux, Context API, Zustand for complex application state",
        "Testing & Quality: Jest, React Testing Library, Cypress, 95% code coverage standards",
        "Build Tools & DevOps: Webpack, Vite, Docker, CI/CD pipelines, GitHub Actions",
      ],

      achievements: [
        "Healthcare Platform Success: Architected React.js frontend serving 25,000+ patients with 99.2% uptime",
        "Performance Excellence: Optimized applications reducing load times by 70% (4.2s to 1.1s)",
        "User Engagement: Built gamification features increasing completion rates by 300%",
        "Mobile Success: Developed React Native apps achieving 4.7/5 ratings and 50,000+ downloads",
        "Team Impact: Created reusable component libraries improving team development speed by 40%",
      ],

      companyAlignment:
        "I am particularly drawn to your company's commitment to innovative user experiences and cutting-edge frontend technologies. My experience building scalable React applications and optimizing user interfaces aligns perfectly with your team's focus on delivering exceptional digital experiences.",

      valueProposition:
        "I bring a unique combination of technical excellence and user-focused design thinking. My proven ability to translate complex requirements into intuitive interfaces, coupled with my expertise in performance optimization, would contribute immediately to your frontend development goals.",

      closingStatement:
        "I would welcome the opportunity to discuss how my frontend expertise and passion for creating exceptional user experiences can contribute to your team's continued success.",
    },

    backend: {
      type: "backend",
      title: "Backend Developer Application",
      position: "Backend Developer",
      introduction:
        "I am excited to apply for the Backend Developer position at your organization. With over 5 years of specialized experience in .NET/C# development and cloud-native architectures, I have successfully designed and implemented scalable backend systems serving thousands of users with exceptional reliability.",

      keyHighlights: [
        "5+ years of .NET/C# expertise with proven track record serving 25,000+ users at 99.8% uptime",
        "Architected CQRS and Event-Driven systems improving code maintainability by 60%",
        "Reduced API response times by 82% and system defects by 65% through optimization",
        "Expert in microservices, domain-driven design, and cloud-native architectures",
        "Delivered enterprise solutions across healthcare, energy, and logistics sectors",
      ],

      technicalExpertise: [
        "Backend Technologies: .NET 8, C#, .NET Web API, Entity Framework Core, RESTful APIs",
        "Architecture Patterns: CQRS, Domain-Driven Design, Event-Driven Architecture, Microservices",
        "Cloud & DevOps: Azure, AWS, Docker, Kubernetes, Azure Functions, CI/CD pipelines",
        "Databases: SQL Server, PostgreSQL, Redis, database design, query optimization",
        "Testing & Quality: xUnit, Test Containers, integration testing, automated testing",
      ],

      achievements: [
        "Healthcare System: Implemented CQRS/DDD architecture serving 25,000+ consultations monthly",
        "Performance Optimization: Reduced memory usage by 45% after .NET 8 upgrade",
        "Scalability Success: Built event-driven systems handling 50,000+ concurrent operations",
        "Cost Savings: Developed algorithms contributing to €2.5M+ annual client cost reductions",
        "System Reliability: Maintained 99.8% uptime across mission-critical logistics platforms",
      ],

      companyAlignment:
        "Your company's focus on robust, scalable backend infrastructure and modern architectural patterns resonates strongly with my experience. My expertise in building enterprise-grade .NET applications and implementing clean architecture principles aligns perfectly with your technical requirements.",

      valueProposition:
        "I bring deep technical expertise in modern backend development combined with a strong understanding of business requirements. My experience designing resilient systems and optimizing performance would contribute immediately to your backend infrastructure goals.",

      closingStatement:
        "I am eager to discuss how my backend development expertise and commitment to architectural excellence can help drive your technical initiatives forward.",
    },

    fullstack: {
      type: "fullstack",
      title: "Full-Stack Developer Application",
      position: "Full-Stack Developer",
      introduction:
        "I am writing to express my enthusiasm for the Full-Stack Developer position at your company. With over 5 years of comprehensive experience spanning React.js frontend and .NET Core backend development, I have successfully delivered end-to-end solutions that serve thousands of users while maintaining exceptional performance and reliability.",

      keyHighlights: [
        "5+ years full-stack expertise delivering complete solutions serving 25,000+ users",
        "Reduced deployment times by 85% and improved system performance by 70%",
        "Expert in React.js/.NET Core stack with proven CQRS and microservices experience",
        "Built healthcare, fintech, and enterprise platforms with 99.8% uptime",
        "Led cross-functional teams from concept to production deployment",
      ],

      technicalExpertise: [
        "Frontend: React.js, TypeScript, Next.js, Redux, responsive design, progressive web apps",
        "Backend: .NET Core, C#, Web APIs, Entity Framework Core, microservices architecture",
        "Databases: SQL Server, PostgreSQL, Redis, database design, performance optimization",
        "Cloud & DevOps: Azure, AWS, Docker, Kubernetes, CI/CD pipelines, monitoring",
        "Architecture: CQRS, Domain-Driven Design, Event-Driven Architecture, API-first design",
      ],

      achievements: [
        "Complete Platform Delivery: Built end-to-end healthcare solution serving 25,000+ patients",
        "Performance Excellence: Reduced patient registration time by 60% through full-stack optimization",
        "DevOps Innovation: Created CI/CD pipelines reducing deployment time from 4h to 15min",
        "Scalability Success: Designed systems supporting 12,000+ concurrent users",
        "Integration Mastery: Connected 30+ energy provider APIs with comprehensive error handling",
      ],

      companyAlignment:
        "Your company's commitment to delivering comprehensive digital solutions and embracing modern full-stack technologies aligns perfectly with my experience. My ability to work across the entire technology stack while maintaining architectural integrity would be valuable to your development initiatives.",

      valueProposition:
        "I offer the unique advantage of deep expertise across both frontend and backend technologies, enabling me to architect cohesive solutions and bridge communication between different technical teams. My proven track record of delivering complete applications from concept to production would contribute immediately to your project goals.",

      closingStatement:
        "I would be thrilled to discuss how my full-stack development expertise and passion for creating complete, user-focused solutions can contribute to your team's success.",
    },
  };

/**
 * Cover Letter metadata for SEO and page generation
 */
export const COVER_LETTER_METADATA = {
  frontend: {
    title: "Frontend Developer Cover Letter | Muhammad Ahmed Shehzad",
    description:
      "Professional frontend developer cover letter highlighting React, TypeScript, and modern web development expertise. ATS-ready format.",
    keywords: [
      "frontend developer cover letter",
      "react developer",
      "typescript",
      "web development cover letter",
      "UI/UX developer",
    ],
  },
  backend: {
    title: "Backend Developer Cover Letter | Muhammad Ahmed Shehzad",
    description:
      "Professional backend developer cover letter showcasing .NET, C#, and cloud architecture expertise. ATS-optimized format.",
    keywords: [
      "backend developer cover letter",
      ".NET developer",
      "C# developer",
      "API development",
      "microservices cover letter",
    ],
  },
  fullstack: {
    title: "Full-Stack Developer Cover Letter | Muhammad Ahmed Shehzad",
    description:
      "Comprehensive full-stack developer cover letter covering frontend, backend, and DevOps skills. ATS-compatible format.",
    keywords: [
      "full-stack developer cover letter",
      "react .net developer",
      "full stack engineer",
      "end-to-end development",
      "complete solutions developer",
    ],
  },
} as const;

/**
 * Get cover letter configuration by type
 */
export function getCoverLetterConfig(
  type: "frontend" | "backend" | "fullstack"
): CoverLetterConfig {
  const config = COVER_LETTER_CONFIGS[type];
  if (!config) {
    throw new Error(`Invalid cover letter type: ${type}`);
  }
  return config;
}
