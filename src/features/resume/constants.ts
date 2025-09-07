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
  FPT_SOFTWARE: "September 2021 – November 2021 (Contract)",
  SODEFA_GMBH: "August 2019 – September 2021",
  CYBERSOFT_NORTH_AMERICA: "April 2018 – October 2018",
  SIX_LOGICS: "November 2016 – April 2018",
} as const;

// Common technology constants to avoid duplication
const INTEGRATION_TESTING = "Integration Testing" as const;
const TEST_DRIVEN_DEVELOPMENT = "Test-Driven Development" as const;
const CICD_PIPELINES = "CI/CD Pipelines" as const;
const AZURE_DEVOPS = "Azure DevOps" as const;
const AGILE_SCRUM = "Agile/Scrum" as const;
const ENTITY_FRAMEWORK_CORE = "Entity Framework Core" as const;

const ATS_RESUME_KEYWORD = "ATS resume" as const;

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
      "Results-driven Senior Frontend Developer with 5+ years delivering scalable React.js applications. Proven track record: 40% performance improvements, 25,000+ user platforms, 99.2% uptime. Expert in TypeScript, Next.js, and modern CI/CD practices across healthcare, fintech, and enterprise sectors.",
    summary:
      "Senior Frontend Developer specializing in React ecosystem and modern web technologies. Delivered high-performance applications serving 25,000+ users with 99.2% uptime. Expert in component architecture, state management, and CI/CD optimization. Proven ability to reduce load times by 70% and improve user engagement by 45%.",
    skills: {
      frontend: [
        "React.js",
        "TypeScript",
        "Next.js",
        "JavaScript (ES6+)",
        "HTML5/CSS3",
        "Tailwind CSS",
        "Redux/Context API",
      ],
      development: [
        "Component Architecture",
        "State Management",
        "Performance Optimization",
        "Responsive Design",
        "RESTful API Integration",
        "GraphQL",
        "Progressive Web Apps",
      ],
      testing: [
        "Jest",
        "React Testing Library",
        "Cypress",
        "Unit Testing",
        INTEGRATION_TESTING,
        TEST_DRIVEN_DEVELOPMENT,
      ],
      devops: [
        CICD_PIPELINES,
        "Docker",
        "Git/GitHub Actions",
        "Webpack/Vite",
        "ESLint/Prettier",
        AZURE_DEVOPS,
      ],
      tools: ["VS Code", "Chrome DevTools", "Storybook", "npm/yarn/pnpm", "Figma", AGILE_SCRUM],
    },
    experience: [
      {
        position: POSITIONS.FRONTEND_DEVELOPER,
        company: COMPANIES.VERBUND_PFLEGEHILFE,
        duration: DURATIONS.VERBUND_PFLEGEHILFE,
        location: "Mainz",
        technologies: [SKILLS.REACT, SKILLS.TYPESCRIPT, SKILLS.NEXT_JS],
        achievements: [
          "Architected React.js healthcare platform frontend serving 25,000+ patients achieving 99.2% uptime and 1.2s load time",
          "Redesigned CRM interface with TypeScript reducing consultant response time by 75% (12min→3min), improving operational efficiency",
          "Integrated Twilio API with React components increasing client contact success rate by 73% (45%→78%), boosting conversion rates",
          "Delivered component library with 95% test coverage using Jest/Testing Library, eliminating production bugs for 18 months",
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
          "Engineered React.js sustainability platform driving employee engagement from 23% to 67% across 5,000+ users, generating €2M+ investments",
          "Developed gamification features with Redux state management resulting in 300% increase in learning completion rates",
          "Built React Native mobile app with TypeScript achieving 4.7/5 App Store rating and 50,000+ downloads in 6 months",
          "Optimized performance through code splitting and lazy loading reducing load times by 74% (4.2s→1.1s), improving user retention",
        ],
      },
      {
        position: POSITIONS.FRONTEND_DEVELOPER,
        company: COMPANIES.FPT_SOFTWARE,
        duration: DURATIONS.FPT_SOFTWARE,
        location: "Essen",
        technologies: [SKILLS.REACT, SKILLS.TYPESCRIPT, SKILLS.NODE_JS],
        achievements: [
          "Built responsive React dashboard for wind farm monitoring displaying real-time IoT sensor data for operational efficiency",
          "Developed interactive Lidar data visualization components reducing operator analysis time by 82% through improved UX design",
          "Created reusable TypeScript UI component library improving frontend development consistency and speed by 40%",
          "Implemented comprehensive testing strategy with Jest reducing frontend defects by 65% during contract period",
        ],
      },
      {
        position: POSITIONS.FRONTEND_DEVELOPER,
        company: COMPANIES.SODEFA_GMBH,
        duration: DURATIONS.SODEFA_GMBH,
        location: "Hürth",
        technologies: [SKILLS.TYPESCRIPT, SKILLS.REACT, "PostgreSQL"],
        achievements: [
          "Developed SaaS logistics platform frontend serving 10+ oil companies with fleet management solutions",
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
          "Healthcare platform connecting 25,000+ patients with certified care providers across Germany",
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
    description:
      "Senior Backend Engineer with 5+ years building scalable .NET/C# applications. Delivered enterprise solutions serving 25,000+ users with 99.8% uptime. Expert in CQRS, DDD, microservices, and cloud-native architectures across healthcare, energy, and logistics sectors.",
    summary:
      "Backend Software Engineer specializing in .NET ecosystem and cloud-native architectures. Architected systems serving 25,000+ users with 99.8% uptime. Expert in CQRS, Domain-Driven Design, and Event-Driven Architecture. Proven track record reducing API response times by 82% and system defects by 65%.",
    skills: {
      backend: [
        SKILLS.DOTNET,
        SKILLS.CSHARP,
        ".NET Web API",
        ENTITY_FRAMEWORK_CORE,
        SKILLS.SQL_SERVER,
        "RESTful APIs",
        "GraphQL",
      ],
      architecture: [
        "CQRS",
        "Domain-Driven Design",
        "Event-Driven Architecture",
        "Microservices Architecture",
        "Modular Monolith",
        "Clean Architecture",
        "Hexagonal Architecture",
      ],
      cloud: [
        "Azure",
        "Azure DevOps",
        "Docker",
        "Kubernetes",
        "Azure Functions",
        "Azure Service Bus",
        "Application Insights",
      ],
      databases: [
        SKILLS.SQL_SERVER,
        "Redis",
        ENTITY_FRAMEWORK_CORE,
        "Database Design",
        "Query Optimization",
        "Data Migrations",
      ],
      testing: [
        "xUnit",
        "Test Containers",
        INTEGRATION_TESTING,
        TEST_DRIVEN_DEVELOPMENT,
        "Automated Testing",
      ],
      devops: [
        CICD_PIPELINES,
        "Git/GitHub Actions",
        AZURE_DEVOPS,
        "Docker",
        "Monitoring & Observability",
      ],
      tools: [
        "Visual Studio",
        "JetBrains Rider",
        "VS Code",
        "Postman",
        "Swagger",
        "Git/GitHub",
        "Azure Portal",
        "SQL Server Management Studio",
        "Redis CLI",
        AGILE_SCRUM,
      ],
    },
    experience: [
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.VERBUND_PFLEGEHILFE,
        duration: DURATIONS.VERBUND_PFLEGEHILFE,
        location: "Mainz",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, SKILLS.SQL_SERVER],
        achievements: [
          "Implemented CQRS pattern with Domain Driven Design improving code maintainability by 60%",
          "Built Event Driven Architecture using custom implementation for decoupled healthcare workflow processing",
          "Developed RESTful APIs following OpenAPI standards serving 25,000+ healthcare consultations monthly",
          "Optimized Entity Framework Core queries after .NET 8 upgrade reducing memory usage by 45%",
          "Implemented Redis caching layer decreasing database load by 55%",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.SUSTAYN_GMBH,
        duration: DURATIONS.SUSTAYN_GMBH,
        location: "Essen",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, SKILLS.SQL_SERVER, SKILLS.AZURE],
        achievements: [
          "Architected and developed scalable backend APIs in C# and .NET 5 to support an employee engagement platform used by 5,000+ users, increasing participation from 23% to 67%",
          "Implemented gamification logic and event-driven features on the server side, contributing to a 3x increase in learning module completion rates",
          "Designed and maintained secure, high-performance backend services supporting mobile clients (React Native), contributing to a 4.7/5 App Store rating and 50,000+ downloads",
          "Optimized database queries, API response times, and caching strategies using Entity Framework Core and Redis, reducing overall application load time by 74% (from 4.2s to 1.1s)",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.FPT_SOFTWARE,
        duration: DURATIONS.FPT_SOFTWARE,
        location: "Essen",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, "Azure"],
        achievements: [
          "Engineered scalable backend services in C# and .NET for real-time wind farm monitoring, enabling high-throughput data ingestion and processing from IoT sensors",
          "Designed and implemented RESTful APIs to serve lidar analytics data, reducing operator analysis time by 82% through optimized data access patterns",
          "Developed reusable .NET libraries for data validation, logging, and error handling for the wind farm monitoring project, accelerating backend development by 40%",
          "Enforced strong typing, integration testing, and CI pipelines using .NET testing frameworks and static code analysis tools, leading to a 65% reduction in backend defects",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_DEVELOPER,
        company: COMPANIES.SODEFA_GMBH,
        duration: DURATIONS.SODEFA_GMBH,
        location: "Hürth",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, SKILLS.SQL_SERVER],
        achievements: [
          "Developed and maintained backend services for a SaaS logistics platform in C# and .NET Core 3.1, supporting fleet management for 10+ oil companies",
          "Engineered real-time vehicle tracking and dispatch coordination APIs, reducing client response times by 60% (from 15 min to 6 min) through optimized data streaming and event handling",
          "Built fleet optimization algorithms and backend reporting tools that contributed to over €2.5M in annual client cost savings",
          "Ensured high availability and system reliability through proactive monitoring, automated failover, and load balancing, maintaining 99.8% uptime across 500+ daily logistics operations",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.CYBERSOFT_NORTH_AMERICA,
        duration: DURATIONS.CYBERSOFT_NORTH_AMERICA,
        location: "Lahore",
        technologies: [SKILLS.CSHARP, ".NET Framework", SKILLS.SQL_SERVER],
        achievements: [
          "Designed and built backend architecture for a Digital Signage CMS in C# and ASP .NET MVC Core, serving 500+ locations across banks, restaurants, and retail outlets",
          "Integrated SignalR for real-time content updates, achieving a 99.9% delivery success rate and ensuring timely content delivery to all connected devices",
          "Developed backend APIs for a custom CMS interface, reducing content management time by 70% through streamlined workflows and automated content distribution",
          "Delivered 15+ client-specific customizations on time and under budget by leveraging modular, maintainable code and adhering to agile practices, maintaining a 98% client satisfaction rate",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.SIX_LOGICS,
        duration: DURATIONS.SIX_LOGICS,
        location: "Lahore",
        technologies: [SKILLS.CSHARP, SKILLS.SQL_SERVER, SKILLS.TYPESCRIPT],
        achievements: [
          "Assisted in the development and maintenance of backend systems for 365Scores, supporting 2M+ daily active users across 15+ countries, using C# and .NET 6 under senior mentorship",
          "Contributed to the design and implementation of personalized sports feed features, optimizing data flow and supporting a 180% increase in user engagement",
          "Supported the creation of publisher integration tools and data pipelines, contributing to a $2.3M+ increase in revenue through data licensing",
          "Worked on backend performance improvements, such as database query optimization and caching, helping achieve a 98% user retention rate and a 4.6/5 App Store rating",
        ],
      },
    ],
    projects: [
      {
        name: "Verbund Pflegehilfe - Healthcare Backend Platform",
        technologies: [
          SKILLS.DOTNET,
          SKILLS.CSHARP,
          SKILLS.SQL_SERVER,
          "Redis",
          ENTITY_FRAMEWORK_CORE,
        ],
        description:
          "Modular monolith backend system for healthcare platform using advanced architectural patterns",
        achievements: [
          "Implemented CQRS pattern with Domain Driven Design improving code maintainability by 60%",
          "Built Event Driven Architecture using custom implementation for healthcare workflow processing",
          "Developed RESTful APIs following OpenAPI standards serving 25,000+ healthcare consultations monthly",
          "Optimized Entity Framework Core queries after .NET 8 upgrade reducing memory usage by 45%",
        ],
      },
      {
        name: "Sustayn - Employee Engagement Backend",
        technologies: [
          SKILLS.DOTNET,
          SKILLS.CSHARP,
          SKILLS.SQL_SERVER,
          SKILLS.AZURE,
          ENTITY_FRAMEWORK_CORE,
          "Redis",
        ],
        description:
          "Scalable backend APIs supporting employee engagement platform with gamification features",
        achievements: [
          "Architected and developed scalable backend APIs in C# and .NET 6 supporting 5,000+ users",
          "Implemented gamification logic and event-driven features on the server side",
          "Designed secure, high-performance backend services supporting mobile clients",
          "Optimized database queries, API response times, and caching strategies reducing load time by 74%",
        ],
      },
      {
        name: "FPT Software - Wind Farm Monitoring Backend",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, "Azure", ".NET Testing Frameworks"],
        description:
          "Real-time backend services for wind farm monitoring with IoT sensor integration",
        achievements: [
          "Engineered scalable backend services for real-time wind farm monitoring enabling high-throughput IoT data processing",
          "Designed RESTful APIs to serve lidar analytics data reducing operator analysis time by 82%",
          "Developed reusable .NET libraries for data validation, logging, and error handling for the wind farm monitoring project",
          "Enforced integration testing and CI pipelines leading to 65% reduction in backend defects",
        ],
      },
      {
        name: "SODEFA - SaaS Logistics Platform Backend",
        technologies: [SKILLS.DOTNET, SKILLS.CSHARP, SKILLS.SQL_SERVER, "SignalR"],
        description:
          "Backend services for SaaS logistics platform supporting fleet management and real-time tracking",
        achievements: [
          "Developed backend services for SaaS logistics platform supporting fleet management for 10+ oil companies",
          "Engineered real-time vehicle tracking and dispatch coordination APIs reducing response times by 60%",
          "Built fleet optimization algorithms and reporting tools contributing to €2.5M+ annual cost savings",
          "Ensured 99.8% uptime through proactive monitoring, automated failover, and load balancing",
        ],
      },
    ],
  },

  fullstack: {
    type: "fullstack",
    title: "Full-Stack Software Engineer",
    description:
      "Senior Full-Stack Engineer with 5+ years building end-to-end applications. Delivered scalable solutions serving 25,000+ users with 99.8% uptime. Expert in React.js/.NET Core stack, CQRS architecture, and cloud deployment across healthcare, fintech, and enterprise sectors.",
    summary:
      "Full-Stack Software Engineer with expertise in React.js frontend and .NET Core backend development. Architected complete solutions serving 25,000+ users with 99.8% uptime. Proven track record delivering CI/CD pipelines reducing deployment time by 85% and improving system performance by 70%.",
    skills: {
      frontend: [
        SKILLS.REACT,
        SKILLS.TYPESCRIPT,
        SKILLS.NEXT_JS,
        "React Hooks & Context",
        "State Management (Redux)",
        "HTML5/CSS3",
        "Responsive Design",
      ],
      backend: [
        SKILLS.DOTNET,
        SKILLS.CSHARP,
        ".NET Web API",
        ENTITY_FRAMEWORK_CORE,
        "RESTful API Design",
        "GraphQL",
        "SignalR",
      ],
      databases: [
        SKILLS.SQL_SERVER,
        "Redis",
        "Database Design",
        "Query Optimization",
        ENTITY_FRAMEWORK_CORE,
      ],
      architecture: [
        "Microservices Architecture",
        "CQRS",
        "Domain-Driven Design",
        "Event-Driven Architecture",
        "Clean Architecture",
        "API-First Design",
      ],
      cloud: [
        "Azure",
        AZURE_DEVOPS,
        "Docker",
        "Azure Functions",
        "Application Insights",
        CICD_PIPELINES,
      ],
      testing: [
        "Jest",
        "React Testing Library",
        "xUnit",
        INTEGRATION_TESTING,
        TEST_DRIVEN_DEVELOPMENT,
        "Automated Testing",
      ],
      tools: [
        "Visual Studio",
        "VS Code",
        "Chrome DevTools",
        "Postman",
        "Git/GitHub",
        "Azure Portal",
        "SQL Server Management Studio",
        AGILE_SCRUM,
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
          "Built full-stack wind farm monitoring system with React frontend and .NET Core backend",
          "Developed responsive dashboard with real-time IoT data visualization reducing analysis time by 82%",
          "Implemented Azure-hosted solution with automated data processing and alerting systems",
          "Created reusable components and libraries improving development efficiency by 40%",
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
          "Developed full-stack web applications using C# backend and TypeScript frontend",
          "Built responsive user interfaces with Material-UI improving user experience and accessibility",
          "Implemented RESTful APIs and database integration for complete application architectures",
          "Collaborated on full-cycle development projects from requirements to deployment",
        ],
      },
      {
        position: POSITIONS.SOFTWARE_ENGINEER,
        company: COMPANIES.SIX_LOGICS,
        duration: DURATIONS.SIX_LOGICS,
        location: "Lahore",
        technologies: [SKILLS.TYPESCRIPT, SKILLS.CSHARP, SKILLS.SQL_SERVER],
        achievements: [
          "Built complete web applications using TypeScript frontend and C# backend with SQL Server",
          "Developed end-to-end solutions from database design to user interface implementation",
          "Implemented client-specific features and integrations from concept to deployment",
          "Provided ongoing technical support, maintenance, and feature enhancements",
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
        description: "Sports platform with live scores and personalized content features",
        achievements: [
          "Contributed to full-stack sports platform development under senior mentorship",
          "Built React components and C# backend services for sports data processing",
          "Implemented real-time data updates and personalized feed features",
          "Supported platform serving millions of users with optimized data flow",
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
      "event-driven architecture",
      "CQRS",
      "microservices architecture",
      "serverless architecture",
      "service-oriented architecture",
      "modular monolith architecture",
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
