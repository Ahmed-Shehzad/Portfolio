/**
 * Resume Configuration Data
 */

import type { ResumeConfig } from "./types";

// Common constants to avoid duplication
const SKILLS = {
  // Backend Technologies
  DOTNET: ".NET",
  CSHARP: "C#",
  NODE_JS: "Node.js",
  PYTHON: "Python",
  EXPRESS: "Express.js",

  // Frontend Technologies
  REACT: "React",
  REACT_NATIVE: "React Native",
  EXPO: "Expo",
  TYPESCRIPT: "TypeScript",
  JAVASCRIPT: "JavaScript",
  NEXT_JS: "Next.js",
  HTML_CSS: "HTML/CSS",
  TAILWIND: "Tailwind CSS",
  MATERIAL_UI: "Material UI",
  ANT_DESIGN: "Ant Design",

  // Database & Tools
  SQL_SERVER: "SQL Server",
  POSTGRESQL: "PostgreSQL",
  MONGODB: "MongoDB",
  GIT: "Git",
  DOCKER: "Docker",
  AZURE: "Azure",
  AWS_AMPLIFY: "AWS Amplify",
} as const;

// Professional experience constants
const POSITIONS = {
  SOFTWARE_ENGINEER: "Software Engineer",
  FULLSTACK_DEVELOPER: "Full Stack Developer",
  SENIOR_SOFTWARE_ENGINEER: "Senior Software Engineer",
  SOFTWARE_DEVELOPER: "Software Developer",
  FRONTEND_DEVELOPER: "Frontend Developer",
  SENIOR_FRONTEND_DEVELOPER: "Senior Frontend Developer",
} as const;

const COMPANIES = {
  VERBUND_PFLEGEHILFE: "Verbund Pflegehilfe",
  SUSTAYN_GMBH: "Sustayn GmbH",
  FPT_SOFTWARE: "FPT Software",
  SODEFA_GMBH: "SODEFA GmbH Co. & KG",
  CYBERSOFT_NORTH_AMERICA: "Cybersoft North America Inc.",
  SIX_LOGICS: "Six Logics",
} as const;

const DURATIONS = {
  VERBUND_PFLEGEHILFE: "July 2023 – Present",
  SUSTAYN_GMBH: "February 2022 – July 2023",
  FPT_SOFTWARE: "September 2021 – November 2021",
  SODEFA_GMBH: "August 2019 – September 2021",
  CYBERSOFT_NORTH_AMERICA: "April 2018 – October 2018",
  SIX_LOGICS: "November 2016 – April 2018",
} as const;

const EXPERIENCE_LEVEL = "5+ years of experience" as const;
const ATS_RESUME_KEYWORD = "ATS resume" as const;
const PERFORMANCE_OPTIMIZATION = "Performance Optimization" as const;

/**
 * Resume type constants
 */
export const RESUME_TYPES = ["frontend", "backend", "fullstack"] as const;

/**
 * Resume configurations for different specializations
 */
export const RESUME_CONFIGS: Record<(typeof RESUME_TYPES)[number], ResumeConfig> = {
  frontend: {
    type: "frontend",
    title: "Senior Frontend Developer",
    description:
      "Experienced Frontend Developer specializing in React.js, Tailwind CSS, TypeScript, and modern web technologies. 5+ years building scalable web applications for healthcare, fintech, and enterprise clients with proven track record of delivering high-performance user interfaces and improving business metrics.",
    skills: {
      primary: [
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "TypeScript",
        "React.js",
        "Next.js",
        "HTML5/CSS3",
        "Node.js",
      ],
      secondary: [
        "Responsive Web Design",
        "Component-Based Architecture",
        "State Management (Redux, Context API)",
        "RESTful API Integration",
        "GraphQL",
        "Performance Optimization",
        "Cross-Browser Compatibility",
        "Storybook",
      ],
      tools: [
        "Git/GitHub",
        "CI/CD Pipelines",
        "Docker",
        "Webpack",
        "Vite",
        "Jest/Testing Library",
        "ESLint/Prettier",
        "Chrome DevTools",
        "VS Code",
        "npm/yarn/pnpm",
        "Agile/Scrum",
      ],
    },
    experience: [
      {
        position: POSITIONS.FRONTEND_DEVELOPER,
        company: COMPANIES.VERBUND_PFLEGEHILFE,
        duration: DURATIONS.VERBUND_PFLEGEHILFE,
        location: "Mainz",
        technologies: [SKILLS.REACT, SKILLS.TYPESCRIPT, SKILLS.NEXT_JS],
        achievements: [
          "Developed healthcare platform frontend serving 25,000+ active users with 99.2% uptime",
          "Built CRM interface reducing consultant response time from 12 minutes to 3 minutes (75% improvement)",
          "Implemented Twilio API integration increasing client contact success rate from 45% to 78%",
          "Delivered React components with TypeScript achieving 95% code coverage and zero production bugs",
        ],
      },
      {
        position: POSITIONS.FRONTEND_DEVELOPER,
        company: COMPANIES.SUSTAYN_GMBH,
        duration: DURATIONS.SUSTAYN_GMBH,
        location: "Essen",
        technologies: [
          SKILLS.REACT,
          SKILLS.REACT_NATIVE,
          SKILLS.EXPO,
          SKILLS.TYPESCRIPT,
          SKILLS.AWS_AMPLIFY,
        ],
        achievements: [
          "Built employee engagement platform increasing participation from 23% to 67% across 5,000+ employees",
          "Developed gamification features resulting in 3x increase in learning module completion rates",
          "Created React Native mobile app achieving 4.7/5 App Store rating with 50,000+ downloads",
          "Optimized application performance reducing load times from 4.2s to 1.1s (74% improvement)",
        ],
      },
      {
        position: POSITIONS.FRONTEND_DEVELOPER,
        company: COMPANIES.FPT_SOFTWARE,
        duration: DURATIONS.FPT_SOFTWARE,
        location: "Essen",
        technologies: [SKILLS.REACT, SKILLS.TYPESCRIPT, SKILLS.NODE_JS],
        achievements: [
          "Developed Lidar management system processing 2.5TB+ daily sensor data with 99.8% accuracy",
          "Built React dashboard reducing wind farm monitoring time from 45 minutes to 8 minutes (82% efficiency gain)",
          "Implemented real-time data visualization handling 50,000+ concurrent sensor streams",
          "Delivered project 2 weeks ahead of schedule, saving client €150,000 in operational costs",
        ],
      },
      {
        position: POSITIONS.FRONTEND_DEVELOPER,
        company: COMPANIES.SODEFA_GMBH,
        duration: DURATIONS.SODEFA_GMBH,
        location: "Hürth",
        technologies: [SKILLS.TYPESCRIPT, SKILLS.REACT, "PostgreSQL"],
        achievements: [
          "Developed SaaS logistics platform frontend serving 50+ oil companies with fleet management solutions",
          "Built real-time tracking interface reducing client dispatch response times by 60% (15 min to 6 min)",
          "Created fleet optimization dashboard saving clients €2.5M+ annually in operational costs",
          "Maintained 99.8% platform uptime supporting 5,000+ daily logistics operations across client networks",
        ],
      },
      {
        position: POSITIONS.FRONTEND_DEVELOPER,
        company: COMPANIES.CYBERSOFT_NORTH_AMERICA,
        duration: DURATIONS.CYBERSOFT_NORTH_AMERICA,
        location: "Lahore",
        technologies: [SKILLS.TYPESCRIPT, SKILLS.TAILWIND, SKILLS.MATERIAL_UI],
        achievements: [
          "Developed Digital Signage CMS serving 500+ locations across banks, restaurants, and retail outlets",
          "Implemented SignalR real-time updates achieving 99.9% content delivery success rate",
          "Built custom CMS interface reducing content management time by 70% for operations team",
          "Delivered 15+ client customizations on-time and under budget, maintaining 98% client satisfaction",
        ],
      },
      {
        position: POSITIONS.FRONTEND_DEVELOPER,
        company: COMPANIES.SIX_LOGICS,
        duration: DURATIONS.SIX_LOGICS,
        location: "Lahore",
        technologies: [SKILLS.TYPESCRIPT, SKILLS.HTML_CSS, SKILLS.ANT_DESIGN],
        achievements: [
          "Developed 365Scores frontend features serving 2M+ daily active users across 15+ countries",
          "Built personalized sports feeds increasing user engagement by 180% and session duration by 3.5 minutes",
          "Created publisher integration tools generating $2.3M+ additional revenue through data licensing",
          "Optimized application performance achieving 98% user retention rate and 4.6/5 App Store rating",
        ],
      },
    ],
    projects: [
      {
        name: "Verbund Pflegehilfe - Healthcare Platform",
        technologies: ["React.js", "TypeScript", "Next.js", "Twilio API", "REST APIs"],
        description:
          "Healthcare platform connecting 25,000+ patients with care providers across Germany",
        achievements: [
          "Delivered platform serving 25,000+ users with 99.2% uptime and 1.2s average load time",
          "Built CRM reducing consultant response time by 75% (12 min to 3 min)",
          "Implemented Twilio integration increasing contact success rate from 45% to 78%",
          "Achieved 95% code coverage with zero critical production bugs in 18 months",
        ],
      },
      {
        name: "Sustayn - Employee Engagement Platform",
        technologies: ["React.js", "React Native", "TypeScript", "AWS Amplify", "Redux"],
        description: "Corporate learning platform with gamification serving 5,000+ employees",
        achievements: [
          "Increased employee engagement from 23% to 67% across 15+ enterprise clients",
          "Built features driving 3x increase in learning completion rates",
          "Launched mobile app with 4.7/5 rating and 50,000+ downloads",
          "Reduced page load times by 74% (4.2s to 1.1s) through optimization",
        ],
      },
      {
        name: "RWE Lidar Management System",
        technologies: ["React.js", "TypeScript", "D3.js", ".NET Core", "WebSocket"],
        description: "Industrial IoT platform processing 2.5TB+ daily wind energy data",
        achievements: [
          "Built system processing 2.5TB+ daily data with 99.8% accuracy",
          "Reduced monitoring time by 82% (45 min to 8 min) for operators",
          "Handled 50,000+ concurrent sensor streams with real-time visualization",
          "Delivered 2 weeks early, saving client €150,000 in operational costs",
        ],
      },
      {
        name: "SODEFA Logistics Management SaaS",
        technologies: ["React.js", "TypeScript", "PostgreSQL", "REST APIs", "Real-time Tracking"],
        description:
          "SaaS platform providing logistics, fleet management, and tracking services for oil companies",
        achievements: [
          "Built responsive frontend interfaces for fleet management dashboard used by 25+ logistics companies",
          "Developed real-time tracking components displaying live vehicle locations and delivery status updates",
          "Created route optimization tools helping dispatchers reduce planning time from 45 minutes to 12 minutes",
          "Implemented responsive design supporting desktop and mobile workflows for field operations teams",
        ],
      },
    ],
  },

  backend: {
    type: "backend",
    title: "Backend Software Engineer",
    description: `Expert in building scalable server-side applications with .NET/C# and modern backend technologies. ${EXPERIENCE_LEVEL} across healthcare, energy, and logistics sectors delivering robust API solutions.`,
    skills: {
      primary: [
        SKILLS.DOTNET,
        SKILLS.CSHARP,
        SKILLS.NODE_JS,
        SKILLS.TYPESCRIPT,
        SKILLS.SQL_SERVER,
        SKILLS.POSTGRESQL,
      ],
      secondary: [
        "ASP.NET Core",
        "Entity Framework",
        "Web API",
        "Microservices Architecture",
        "RESTful APIs",
        "GraphQL",
        "Azure Cloud Services",
        "Redis Caching",
        "Message Queues",
        "Unit Testing (xUnit, NUnit)",
        PERFORMANCE_OPTIMIZATION,
        "Database Design",
      ],
      tools: [
        "VS Code",
        "Postman",
        "pgAdmin",
        "MongoDB Compass",
        SKILLS.GIT,
        "AWS CLI",
        SKILLS.DOCKER,
        "Kubernetes",
      ],
    },
    experience: [
      {
        position: POSITIONS.SENIOR_SOFTWARE_ENGINEER,
        company: COMPANIES.VERBUND_PFLEGEHILFE,
        duration: DURATIONS.VERBUND_PFLEGEHILFE,
        location: "Mainz",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, SKILLS.SQL_SERVER],
        achievements: [
          "Architected .NET Core microservices processing 2M+ healthcare records daily",
          "Optimized SQL Server queries reducing API response times by 70% (3.2s to 0.9s)",
          "Built OAuth 2.0 authentication system supporting 15,000+ concurrent users",
          "Implemented Redis caching layer decreasing database load by 55%",
        ],
      },
      {
        position: POSITIONS.FULLSTACK_DEVELOPER,
        company: COMPANIES.SUSTAYN_GMBH,
        duration: DURATIONS.SUSTAYN_GMBH,
        location: "Essen",
        technologies: [SKILLS.REACT, SKILLS.REACT_NATIVE, SKILLS.TYPESCRIPT, SKILLS.AWS_AMPLIFY],
        achievements: [
          "Developed ASP.NET Core Web APIs for energy management platform serving 8,000+ users",
          "Designed Entity Framework data models handling 100GB+ energy consumption data",
          "Implemented automated testing achieving 92% code coverage with xUnit framework",
          "Integrated 25+ third-party energy provider APIs with comprehensive error handling",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.FPT_SOFTWARE,
        duration: DURATIONS.FPT_SOFTWARE,
        location: "Essen",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, "Azure"],
        achievements: [
          "Built scalable .NET Core backend services for e-learning platform",
          "Implemented Azure Service Bus messaging handling 50,000+ daily events",
          "Developed RESTful APIs with Swagger documentation for 12 development teams",
          "Optimized Entity Framework queries reducing memory usage by 40%",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_DEVELOPER,
        company: COMPANIES.SODEFA_GMBH,
        duration: DURATIONS.SODEFA_GMBH,
        location: "Hürth",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, SKILLS.SQL_SERVER],
        achievements: [
          "Developed logistics management APIs processing 5,000+ daily shipment transactions",
          "Implemented stored procedures optimizing database performance by 60%",
          "Built real-time tracking system using SignalR for instant status updates",
          "Maintained 99.7% API uptime through comprehensive monitoring and alerting",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_DEVELOPER,
        company: COMPANIES.CYBERSOFT_NORTH_AMERICA,
        duration: DURATIONS.CYBERSOFT_NORTH_AMERICA,
        location: "Lahore",
        technologies: [SKILLS.CSHARP, ".NET Framework", SKILLS.SQL_SERVER],
        achievements: [
          "Created backend systems for web application infrastructure",
          "Developed data processing and automation scripts",
          "Implemented database design and optimization strategies",
          "Collaborated on system architecture and technical decisions",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.SIX_LOGICS,
        duration: DURATIONS.SIX_LOGICS,
        location: "Lahore",
        technologies: [SKILLS.CSHARP, SKILLS.SQL_SERVER, SKILLS.TYPESCRIPT],
        achievements: [
          "Built backend systems and database architectures",
          "Implemented server-side logic and API integrations",
          "Developed data management and storage solutions",
          "Provided technical support for deployed server applications",
        ],
      },
    ],
    projects: [
      {
        name: "Verbund Pflegehilfe - Healthcare API Platform",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, SKILLS.SQL_SERVER],
        description:
          "Enterprise healthcare backend processing patient data and care provider matching",
        achievements: [
          "Architected .NET Core APIs processing 2M+ healthcare records with HIPAA compliance",
          "Built scalable microservices handling 15,000+ concurrent care consultations",
          "Implemented OAuth 2.0 authentication serving 25,000+ registered users",
          "Optimized SQL Server queries reducing response times by 80% (5.2s to 1.0s)",
        ],
      },
      {
        name: "Sustayn - Sustainability Data Engine",
        technologies: [SKILLS.TYPESCRIPT, SKILLS.REACT_NATIVE, SKILLS.AWS_AMPLIFY],
        description:
          "High-performance backend for employee sustainability engagement and analytics",
        achievements: [
          "Developed ASP.NET Core APIs processing 100GB+ daily engagement analytics",
          "Built Azure Service Bus messaging system handling 200,000+ daily events",
          "Implemented Entity Framework with automated performance optimization",
          "Created Redis caching layer reducing database load by 65%",
        ],
      },
      {
        name: "Extraleicht - E-commerce Backend",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, SKILLS.SQL_SERVER],
        description: "Robust e-commerce platform for heating oil ordering and price calculations",
        achievements: [
          "Built .NET Core backend processing €5M+ annual heating oil transactions",
          "Implemented real-time pricing engine with 99.8% accuracy for regional calculations",
          "Developed inventory management system tracking 50,000+ product variants",
          "Created automated invoicing system reducing processing time by 90%",
        ],
      },
    ],
  },

  fullstack: {
    type: "fullstack",
    title: "Full-Stack Software Engineer",
    description: `Expert full-stack engineer with .NET/C# backend and React/TypeScript frontend expertise. ${EXPERIENCE_LEVEL} delivering end-to-end solutions across healthcare, energy, and logistics sectors.`,
    skills: {
      primary: [
        SKILLS.DOTNET,
        SKILLS.CSHARP,
        SKILLS.REACT,
        SKILLS.TYPESCRIPT,
        SKILLS.SQL_SERVER,
        SKILLS.NEXT_JS,
      ],
      secondary: [
        "ASP.NET Core Web API",
        "Entity Framework Core",
        "React Hooks & Context",
        "State Management (Redux)",
        "RESTful API Design",
        "Microservices Architecture",
        "Azure Cloud Platform",
        "CI/CD Pipelines",
        PERFORMANCE_OPTIMIZATION,
        "Responsive Web Design",
        "Database Design",
        "Automated Testing",
      ],
      tools: [
        "Visual Studio",
        "VS Code",
        "SQL Server Management Studio",
        "Azure DevOps",
        "Chrome DevTools",
        "Postman",
        SKILLS.GIT,
        "Docker Desktop",
      ],
    },
    experience: [
      {
        position: POSITIONS.SENIOR_SOFTWARE_ENGINEER,
        company: COMPANIES.VERBUND_PFLEGEHILFE,
        duration: DURATIONS.VERBUND_PFLEGEHILFE,
        location: "Mainz",
        technologies: [SKILLS.DOTNET, SKILLS.REACT, SKILLS.TYPESCRIPT],
        achievements: [
          "Led full-stack development of healthcare platform serving 25,000+ patients and providers",
          "Built .NET Core APIs and React frontend reducing patient registration time by 60%",
          "Implemented real-time notifications using SignalR improving user engagement by 45%",
          "Delivered CI/CD pipeline with Azure DevOps reducing deployment time from 4h to 15min",
        ],
      },
      {
        position: POSITIONS.FULLSTACK_DEVELOPER,
        company: COMPANIES.SUSTAYN_GMBH,
        duration: DURATIONS.SUSTAYN_GMBH,
        location: "Essen",
        technologies: [
          SKILLS.REACT,
          SKILLS.REACT_NATIVE,
          SKILLS.EXPO,
          SKILLS.TYPESCRIPT,
          SKILLS.AWS_AMPLIFY,
        ],
        achievements: [
          "Developed end-to-end energy management solution processing €2M+ monthly transactions",
          "Built React dashboard with .NET Core backend supporting 12,000+ concurrent users",
          "Optimized full-stack performance reducing page load times by 70% (4.1s to 1.2s)",
          "Integrated 30+ energy provider APIs with comprehensive error handling and retry logic",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.FPT_SOFTWARE,
        duration: DURATIONS.FPT_SOFTWARE,
        location: "Essen",
        technologies: [SKILLS.DOTNET, SKILLS.REACT, SKILLS.AZURE],
        achievements: [
          "Built scalable e-learning platform supporting 15,000+ students and 500+ instructors",
          "Developed React SPA with .NET Core microservices achieving 99.8% uptime",
          "Implemented Azure-hosted solution with auto-scaling handling 3x traffic spikes",
          "Created reusable component library adopted by 6 development teams",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_DEVELOPER,
        company: COMPANIES.SODEFA_GMBH,
        duration: DURATIONS.SODEFA_GMBH,
        location: "Hürth",
        technologies: [SKILLS.DOTNET, SKILLS.REACT, SKILLS.SQL_SERVER],
        achievements: [
          "Delivered logistics management system tracking 50,000+ shipments monthly",
          "Built responsive React frontend with .NET Core API reducing order processing by 40%",
          "Implemented real-time tracking dashboard with live GPS integration",
          "Maintained 99.5% system availability through comprehensive monitoring and alerting",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_DEVELOPER,
        company: COMPANIES.CYBERSOFT_NORTH_AMERICA,
        duration: DURATIONS.CYBERSOFT_NORTH_AMERICA,
        location: "Lahore",
        technologies: [SKILLS.CSHARP, SKILLS.TYPESCRIPT, SKILLS.MATERIAL_UI],
        achievements: [
          "Developed full-stack web applications and systems",
          "Created both frontend interfaces and backend services",
          "Implemented complete application architectures",
          "Collaborated on full-cycle software development projects",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.SIX_LOGICS,
        duration: DURATIONS.SIX_LOGICS,
        location: "Lahore",
        technologies: [SKILLS.TYPESCRIPT, SKILLS.CSHARP, SKILLS.SQL_SERVER],
        achievements: [
          "Built complete web applications for diverse client needs",
          "Developed both frontend user interfaces and backend systems",
          "Implemented end-to-end solutions from concept to deployment",
          "Provided comprehensive technical support and maintenance",
        ],
      },
    ],
    projects: [
      {
        name: "Verbund Pflegehilfe - Full-Stack Healthcare Platform",
        technologies: [SKILLS.DOTNET, SKILLS.REACT, SKILLS.TYPESCRIPT],
        description: "Complete healthcare solution with React frontend and .NET Core backend",
        achievements: [
          "Delivered end-to-end platform serving 25,000+ patients with 99.8% uptime",
          "Built React SPA with .NET Core APIs reducing care consultation time by 60%",
          "Implemented real-time notifications using SignalR for instant provider updates",
          "Created CI/CD pipeline with Azure DevOps reducing deployment time by 85%",
        ],
      },
      {
        name: "Sustayn - Employee Engagement Ecosystem",
        technologies: [SKILLS.REACT, SKILLS.REACT_NATIVE, SKILLS.TYPESCRIPT, SKILLS.AWS_AMPLIFY],
        description: "Comprehensive sustainability platform with gamification and analytics",
        achievements: [
          "Built full-stack solution processing €2M+ company sustainability investments",
          "Developed React dashboard with .NET Core backend supporting 12,000+ employees",
          "Implemented real-time leaderboards and challenge system with 95% engagement",
          "Created Azure-hosted microservices architecture with auto-scaling capabilities",
        ],
      },
      {
        name: "365Scores - Sports Data Platform",
        technologies: [SKILLS.REACT, SKILLS.CSHARP, "Real-time APIs"],
        description: "High-performance sports platform with live scores and personalized content",
        achievements: [
          "Delivered full-stack sports platform serving millions of global users daily",
          "Built real-time React frontend with C# backend processing 500,000+ live updates",
          "Implemented WebSocket infrastructure supporting 100,000+ concurrent connections",
          "Created personalized feed system increasing user engagement by 75%",
        ],
      },
    ],
  },
};

/**
 * Resume metadata for SEO and page generation
 */
export const RESUME_METADATA = {
  frontend: {
    title: "Frontend Developer Resume | Muhammad Ahmed Shehzad",
    description:
      "Specialized frontend developer resume showcasing React, TypeScript, and modern web development skills. ATS-ready format with PDF download.",
    keywords: [
      "frontend developer",
      "react developer",
      "typescript",
      "next.js",
      "web development",
      "UI/UX",
      "responsive design",
      ATS_RESUME_KEYWORD,
    ],
  },
  backend: {
    title: "Backend Developer Resume | Muhammad Ahmed Shehzad",
    description:
      "Professional backend developer resume highlighting Node.js, Python, and API development expertise. Optimized for ATS systems.",
    keywords: [
      "backend developer",
      "node.js",
      "python",
      "api development",
      "database design",
      "microservices",
      "system architecture",
      ATS_RESUME_KEYWORD,
    ],
  },
  fullstack: {
    title: "Full-Stack Developer Resume | Muhammad Ahmed Shehzad",
    description:
      "Comprehensive full-stack developer resume covering frontend, backend, and DevOps skills. ATS-compatible with PDF download.",
    keywords: [
      "full-stack developer",
      "react",
      "node.js",
      "typescript",
      "web development",
      "full stack",
      "end-to-end development",
      ATS_RESUME_KEYWORD,
    ],
  },
} as const;
