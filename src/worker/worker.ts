// NOTE: This file is the single source of truth for the web worker logic.
// It compiles to public/worker.js via `npm run build:worker`.
// Do not edit public/worker.js directly.
// Logic preserved; this refactor strengthens types and applies small perf-oriented cleanups.

// -----------------------------------------------------------------------------
// Constants & Enumerations
// -----------------------------------------------------------------------------
// Note: no module exports to allow compilation as a classic worker script

const MESSAGE_TYPES = {
  PROCESS_ANIMATIONS: "PROCESS_ANIMATIONS",
  OPTIMIZE_SCROLL_CALCULATIONS: "OPTIMIZE_SCROLL_CALCULATIONS",
  CALCULATE_PERFORMANCE_METRICS: "CALCULATE_PERFORMANCE_METRICS",
  PROCESS_TESTIMONIALS: "PROCESS_TESTIMONIALS",
  OPTIMIZE_PROJECT_DATA: "OPTIMIZE_PROJECT_DATA",
  CALCULATE_STAR_RATINGS: "CALCULATE_STAR_RATINGS",
  PROCESS_CONTACT_VALIDATION: "PROCESS_CONTACT_VALIDATION",
  OPTIMIZE_IMAGES: "OPTIMIZE_IMAGES",
  GET_PERFORMANCE_STATS: "GET_PERFORMANCE_STATS",
  CLEAR_CACHE: "CLEAR_CACHE",
} as const;

const OUT_TYPES = {
  ANIMATIONS_PROCESSED: "ANIMATIONS_PROCESSED",
  SCROLL_OPTIMIZED: "SCROLL_OPTIMIZED",
  METRICS_CALCULATED: "METRICS_CALCULATED",
  TESTIMONIALS_PROCESSED: "TESTIMONIALS_PROCESSED",
  PROJECTS_OPTIMIZED: "PROJECTS_OPTIMIZED",
  STAR_RATINGS_CALCULATED: "STAR_RATINGS_CALCULATED",
  CONTACT_VALIDATED: "CONTACT_VALIDATED",
  IMAGES_OPTIMIZED: "IMAGES_OPTIMIZED",
  PERFORMANCE_STATS: "PERFORMANCE_STATS",
  CACHE_CLEARED: "CACHE_CLEARED",
  ERROR: "ERROR",
  WORKER_ERROR: "WORKER_ERROR",
  WORKER_HEALTH_CHECK: "WORKER_HEALTH_CHECK",
  WORKER_READY: "WORKER_READY",
  WORKER_LOG: "WORKER_LOG",
} as const;

// Explicit key & value type helpers (improves DX in editor hints)
type MessageTypesMap = typeof MESSAGE_TYPES;
type MessageTypeKey = keyof MessageTypesMap;
type MessageType = MessageTypesMap[MessageTypeKey];

type OutTypesMap = typeof OUT_TYPES;
type OutTypeKey = keyof OutTypesMap;
type OutType = OutTypesMap[OutTypeKey];

const HEALTH_CHECK_INTERVAL_MS = 30_000; // 30s

// Payload & Domain Interfaces

type ID = string | number | undefined;

interface PerformanceMetrics {
  tasksCompleted: number;
  totalProcessingTime: number;
  averageTaskTime: number;
}

interface ProcessAnimationsPayload {
  elements: Array<{
    startOffset: number;
    endOffset: number;
    properties: Record<string, { start: unknown; end: unknown }>;
    // passthrough props allowed
    [key: string]: unknown;
  }>;
  scrollProgress: number;
}

interface OptimizeScrollPayload {
  scrollY: number;
  windowHeight: number;
  elements: Array<{
    offsetTop: number;
    offsetHeight: number;
    threshold?: number;
    [key: string]: unknown;
  }>;
}

interface PerfTimings {
  domContentLoadedEventEnd?: number;
  navigationStart?: number;
  loadEventEnd?: number;
  [k: string]: any;
}

interface PerformancePayload {
  navigationTiming?: PerfTimings;
  paintTiming?: Record<string, number>;
  resourceTiming?: Array<{ duration: number; [k: string]: any }>;
}

interface TestimonialsPayload {
  testimonials: Array<{
    rating: number;
    text: string;
    name: string;
    company: string;
    [k: string]: any;
  }>;
}

interface ProjectsPayload {
  projects: Array<{
    title: string;
    technologies: string[];
    image: { width: number; height: number; [k: string]: any };
    links: Array<{ href: string; [k: string]: any }>;
    [k: string]: any;
  }>;
}

interface StarRatingsPayload {
  ratings: Array<{ rating: number; id: string | number }>;
}

interface ContactValidationPayload {
  fields: Record<string, string>;
}

interface ImagesPayload {
  images: Array<{ src: string; width: number; height: number; format: string; [k: string]: any }>;
}

// Outgoing message payloads (result data shapes kept broad for flexibility)
interface OutgoingMessageMap {
  [OUT_TYPES.ANIMATIONS_PROCESSED]: ReturnType<typeof processAnimationData>;
  [OUT_TYPES.SCROLL_OPTIMIZED]: ReturnType<typeof optimizeScrollCalculations>;
  [OUT_TYPES.METRICS_CALCULATED]: ReturnType<typeof calculatePerformanceMetrics>;
  [OUT_TYPES.TESTIMONIALS_PROCESSED]: ReturnType<typeof processTestimonialsData>;
  [OUT_TYPES.PROJECTS_OPTIMIZED]: ReturnType<typeof optimizeProjectData>;
  [OUT_TYPES.STAR_RATINGS_CALCULATED]: ReturnType<typeof calculateStarRatings>;
  [OUT_TYPES.CONTACT_VALIDATED]: ReturnType<typeof processContactValidation>;
  [OUT_TYPES.IMAGES_OPTIMIZED]: ReturnType<typeof processImageOptimization>;
  [OUT_TYPES.PERFORMANCE_STATS]: PerformanceMetrics;
  [OUT_TYPES.CACHE_CLEARED]: boolean;
  [OUT_TYPES.ERROR]: string;
  [OUT_TYPES.WORKER_ERROR]: {
    message?: string;
    filename?: string;
    lineno?: number;
    colno?: number;
  };
  [OUT_TYPES.WORKER_HEALTH_CHECK]: PerformanceMetrics & { cacheSize: number; memoryUsage: any };
  [OUT_TYPES.WORKER_READY]: boolean;
  [OUT_TYPES.WORKER_LOG]: string;
}

// Central mapping of message type -> payload; keeps unions in sync automatically
interface MessagePayloadMap {
  [MESSAGE_TYPES.PROCESS_ANIMATIONS]: ProcessAnimationsPayload;
  [MESSAGE_TYPES.OPTIMIZE_SCROLL_CALCULATIONS]: OptimizeScrollPayload;
  [MESSAGE_TYPES.CALCULATE_PERFORMANCE_METRICS]: PerformancePayload;
  [MESSAGE_TYPES.PROCESS_TESTIMONIALS]: TestimonialsPayload;
  [MESSAGE_TYPES.OPTIMIZE_PROJECT_DATA]: ProjectsPayload;
  [MESSAGE_TYPES.CALCULATE_STAR_RATINGS]: StarRatingsPayload;
  [MESSAGE_TYPES.PROCESS_CONTACT_VALIDATION]: ContactValidationPayload;
  [MESSAGE_TYPES.OPTIMIZE_IMAGES]: ImagesPayload;
  [MESSAGE_TYPES.GET_PERFORMANCE_STATS]: undefined;
  [MESSAGE_TYPES.CLEAR_CACHE]: undefined;
}

type InboundMessage<T extends MessageType = MessageType> = {
  type: T;
  data: MessagePayloadMap[T];
  id?: ID;
};

type InboundPayloads = {
  [K in MessageType]: InboundMessage<K>;
}[MessageType];

// Utility: fast control-char stripping via regex
const sanitize = (input: unknown): string => {
  const raw = typeof input === "string" ? input : String(input ?? "");
  // Build regex at runtime to avoid control character parsing issues
  const controlRanges = [
    [0x0000, 0x001f],
    [0x007f, 0x009f],
  ];
  const pattern = new RegExp(
    controlRanges
      .map(([a, b]) => `[#${a.toString(16)}-#${b.toString(16)}]`)
      .join("|")
      .replace(/#/g, "\\x"),
    "g"
  );
  return raw.replace(pattern, "");
};

// Safe base64 encode (btoa can throw for unicode) – degrade gracefully.
const safeBtoa = (str: string): string => {
  try {
    return btoa(str);
  } catch {
    try {
      const utf8 = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      );
      return btoa(utf8);
    } catch {
      return ""; // last resort empty placeholder
    }
  }
};

// Worker state management
interface WorkerState {
  isProcessing: boolean;
  taskQueue: unknown[];
  cache: Map<string, unknown>;
  performanceMetrics: PerformanceMetrics;
}

const workerState: WorkerState = {
  isProcessing: false,
  taskQueue: [],
  cache: new Map(),
  performanceMetrics: {
    tasksCompleted: 0,
    totalProcessingTime: 0,
    averageTaskTime: 0,
  },
};

// Handler map to reduce switch complexity
const handlers: {
  [K in MessageType]: (data: MessagePayloadMap[K], id: ID, start?: number) => void;
} = {
  [MESSAGE_TYPES.PROCESS_ANIMATIONS]: (data, id, start) =>
    postResult(OUT_TYPES.ANIMATIONS_PROCESSED, processAnimationData(data), id, start!),
  [MESSAGE_TYPES.OPTIMIZE_SCROLL_CALCULATIONS]: (data, id, start) =>
    postResult(OUT_TYPES.SCROLL_OPTIMIZED, optimizeScrollCalculations(data), id, start!),
  [MESSAGE_TYPES.CALCULATE_PERFORMANCE_METRICS]: (data, id, start) =>
    postResult(OUT_TYPES.METRICS_CALCULATED, calculatePerformanceMetrics(data), id, start!),
  [MESSAGE_TYPES.PROCESS_TESTIMONIALS]: (data, id, start) =>
    postResult(OUT_TYPES.TESTIMONIALS_PROCESSED, processTestimonialsData(data), id, start!),
  [MESSAGE_TYPES.OPTIMIZE_PROJECT_DATA]: (data, id, start) =>
    postResult(OUT_TYPES.PROJECTS_OPTIMIZED, optimizeProjectData(data), id, start!),
  [MESSAGE_TYPES.CALCULATE_STAR_RATINGS]: (data, id, start) =>
    postResult(OUT_TYPES.STAR_RATINGS_CALCULATED, calculateStarRatings(data), id, start!),
  [MESSAGE_TYPES.PROCESS_CONTACT_VALIDATION]: (data, id, start) =>
    postResult(OUT_TYPES.CONTACT_VALIDATED, processContactValidation(data), id, start!),
  [MESSAGE_TYPES.OPTIMIZE_IMAGES]: (data, id, start) =>
    postResult(OUT_TYPES.IMAGES_OPTIMIZED, processImageOptimization(data), id, start!),
  [MESSAGE_TYPES.GET_PERFORMANCE_STATS]: (_data, id) =>
    self.postMessage({
      type: OUT_TYPES.PERFORMANCE_STATS,
      data: workerState.performanceMetrics,
      id,
    }),
  [MESSAGE_TYPES.CLEAR_CACHE]: (_data, id) => {
    workerState.cache.clear();
    self.postMessage({ type: OUT_TYPES.CACHE_CLEARED, data: true, id });
  },
};

// Main message handler (single responsibility + validation)
// Type guard to validate inbound message
function isInboundMessage(msg: any): msg is InboundPayloads {
  return !!msg && typeof msg.type === "string" && (msg.type as string) in handlers;
}

self.onmessage = (e: MessageEvent<InboundPayloads | Record<string, unknown>>) => {
  const raw = (e?.data || {}) as Record<string, unknown>;
  if (!isInboundMessage(raw)) {
    self.postMessage({
      type: OUT_TYPES.ERROR,
      data: "Missing or unknown message type",
      id: (raw as any)?.id,
    });
    return;
  }
  const { type, data, id } = raw;
  const startTime = performance.now();
  try {
    (handlers as any)[type](data, id, startTime);
  } catch (err: any) {
    self.postMessage({
      type: OUT_TYPES.ERROR,
      data: sanitize(err?.message || "Unknown error"),
      id,
    });
  }
};

// Helper function to post results with performance tracking
function postResult<T extends OutType>(
  type: T,
  data: OutgoingMessageMap[T],
  id: ID,
  startTime: number
) {
  const processingTime = performance.now() - startTime;

  // Update performance metrics
  workerState.performanceMetrics.tasksCompleted++;
  workerState.performanceMetrics.totalProcessingTime += processingTime;
  workerState.performanceMetrics.averageTaskTime =
    workerState.performanceMetrics.totalProcessingTime /
    workerState.performanceMetrics.tasksCompleted;

  self.postMessage({
    type,
    data,
    id,
    processingTime: Math.round(processingTime * 100) / 100, // Round to 2 decimal places
  });
}

// Animation processing functions
function processAnimationData(data: ProcessAnimationsPayload) {
  const cacheKey = `animation_${JSON.stringify(data)}`;

  if (workerState.cache.has(cacheKey)) {
    return workerState.cache.get(cacheKey);
  }

  const { elements, scrollProgress } = data;

  const processed = elements.map((element) => {
    const { startOffset, endOffset, properties } = element;

    // Calculate animation progress based on scroll position
    const elementProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - startOffset) / (endOffset - startOffset))
    );

    // Apply easing functions
    const easedProgress = easeInOutCubic(elementProgress);

    // Calculate property values
    const computedProperties: Record<string, unknown> = {};
    Object.entries(properties).forEach(([prop, value]) => {
      const { start, end } = value as { start: unknown; end: unknown };
      if (typeof start === "number" && typeof end === "number") {
        computedProperties[prop] = interpolateNumber(start, end, easedProgress);
      } else {
        computedProperties[prop] = easedProgress > 0.5 ? end : start;
      }
    });

    return {
      ...element,
      progress: easedProgress,
      properties: computedProperties,
      isVisible: elementProgress > 0 && elementProgress < 1,
    };
  });

  workerState.cache.set(cacheKey, processed);
  return processed;
}

// Scroll calculations optimization
function optimizeScrollCalculations(data: OptimizeScrollPayload) {
  const { scrollY, windowHeight, elements } = data;

  return elements.map((element) => {
    const { offsetTop, offsetHeight, threshold = 0.1 } = element;

    const elementTop = offsetTop;
    const elementBottom = offsetTop + offsetHeight;
    const viewportTop = scrollY;
    const viewportBottom = scrollY + windowHeight;

    // Calculate intersection ratio
    const intersectionTop = Math.max(elementTop, viewportTop);
    const intersectionBottom = Math.min(elementBottom, viewportBottom);
    const intersectionHeight = Math.max(0, intersectionBottom - intersectionTop);
    const intersectionRatio = intersectionHeight / offsetHeight;

    // Extract nested ternary operation into an independent statement
    let distanceFromViewport = 0;
    if (elementTop < viewportTop) {
      distanceFromViewport = viewportTop - elementTop;
    } else if (elementTop > viewportBottom) {
      distanceFromViewport = elementTop - viewportBottom;
    }

    return {
      ...element,
      isVisible: intersectionRatio > threshold,
      intersectionRatio,
      distanceFromViewport,
    };
  });
}

// Performance metrics calculation
function calculatePerformanceMetrics(data: PerformancePayload) {
  const { navigationTiming, paintTiming, resourceTiming } = data;

  const metrics: any = {
    // Core Web Vitals approximations
    fcp: paintTiming?.["first-contentful-paint"] || 0,
    lcp: paintTiming?.["largest-contentful-paint"] || 0,

    // Navigation timing metrics
    domContentLoaded:
      (navigationTiming?.domContentLoadedEventEnd ?? 0) - (navigationTiming?.navigationStart ?? 0),
    loadComplete: (navigationTiming?.loadEventEnd ?? 0) - (navigationTiming?.navigationStart ?? 0),

    // Resource loading analysis
    totalResources: resourceTiming?.length || 0,
    slowResources: resourceTiming?.filter((r) => r.duration > 1000).length || 0,

    // Performance score estimation
    performanceScore: 0,
  };

  // Calculate simple performance score
  let score = 100;
  if (metrics.fcp > 1800) score -= 20;
  if (metrics.lcp > 2500) score -= 25;
  if (metrics.domContentLoaded > 1500) score -= 15;
  if (metrics.slowResources > 0) score -= metrics.slowResources * 5;

  metrics.performanceScore = Math.max(0, score);

  return metrics;
}

// Testimonials data processing
function processTestimonialsData(data: TestimonialsPayload) {
  const { testimonials } = data;

  return testimonials.map((testimonial) => {
    const { rating, text, name, company } = testimonial;

    return {
      ...(testimonial as any),
      // Pre-calculate star display data
      stars: Array.from({ length: 5 }, (_, i) => ({
        filled: i < rating,
        index: i,
        key: `star-${name}-${i}`,
      })),
      // Calculate text metrics for layout
      textMetrics: {
        length: (text as string).length,
        wordCount: (text as string).split(" ").length,
        estimatedReadTime: Math.ceil((text as string).split(" ").length / 200),
      },
      // Generate company badge color
      companyColor: generateCompanyColor(company),
      // Pre-process for accessibility
      ariaLabel: `${rating} star rating from ${name} at ${company}`,
    };
  });
}

// Project data optimization
function optimizeProjectData(data: ProjectsPayload) {
  const { projects } = data;

  return projects.map((project) => {
    const { title, technologies, image, links } = project;

    return {
      ...(project as any),
      // Pre-calculate technology chips
      technologyChips: technologies.map((tech, index) => ({
        name: tech,
        color: generateTechColor(tech),
        index,
        key: `tech-${title}-${tech}`,
      })),
      // Optimize image data
      imageData: {
        ...image,
        aspectRatio: image.width / image.height,
        placeholder: generateImagePlaceholder(image),
      },
      // Pre-process links for security
      secureLinks: links.map((link) => ({
        ...link,
        rel: link.href.startsWith("http") ? "noopener noreferrer" : undefined,
        target: link.href.startsWith("http") ? "_blank" : "_self",
      })),
    };
  });
}

// Star ratings calculation with memoization
function calculateStarRatings(data: StarRatingsPayload) {
  const { ratings } = data;

  return ratings.map(({ rating, id }) => {
    const cacheKey = `stars_${id}_${rating}`;

    if (workerState.cache.has(cacheKey)) {
      return workerState.cache.get(cacheKey);
    }

    const stars = Array.from({ length: 5 }, (_, index) => ({
      filled: index < Math.floor(rating),
      halfFilled: index < rating && index >= Math.floor(rating),
      empty: index >= Math.ceil(rating),
      index,
      key: `star-${id}-${index}`,
    }));

    const result = { id, rating, stars } as const;
    workerState.cache.set(cacheKey, result);

    return result;
  });
}

// Contact form validation
function processContactValidation(data: ContactValidationPayload) {
  const { fields } = data;
  const validation: Record<string, { isValid: boolean; message: string }> = {};

  const SAFE_EMAIL_REGEX =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63})+$/;

  const MAX_EMAIL_LENGTH = 254;

  Object.entries(fields).forEach(([fieldName, value]) => {
    switch (fieldName) {
      case "email": {
        const trimmed = String(value).trim();
        const isReasonableLength = trimmed.length <= MAX_EMAIL_LENGTH;
        const isValid = isReasonableLength && SAFE_EMAIL_REGEX.test(trimmed);
        validation[fieldName] = {
          isValid,
          message: isValid ? "" : "Please enter a valid email address",
        };
        break;
      }

      case "name":
        validation[fieldName] = {
          isValid: String(value).trim().length >= 2,
          message:
            String(value).trim().length >= 2 ? "" : "Name must be at least 2 characters long",
        };
        break;

      case "message":
        validation[fieldName] = {
          isValid: String(value).trim().length >= 10,
          message:
            String(value).trim().length >= 10 ? "" : "Message must be at least 10 characters long",
        };
        break;

      default:
        validation[fieldName] = { isValid: true, message: "" };
    }
  });

  const isFormValid = Object.values(validation).every((field) => field.isValid);

  return { validation, isFormValid };
}

// Image optimization calculations
const IMAGE_OPTIMIZED_SIZES: ReadonlyArray<{ width: number; quality: number }> = [
  { width: 640, quality: 85 },
  { width: 768, quality: 85 },
  { width: 1024, quality: 80 },
  { width: 1280, quality: 80 },
  { width: 1920, quality: 75 },
];

function processImageOptimization(data: ImagesPayload) {
  const { images } = data;

  return images.map((image) => {
    const { src, width, height, format } = image;

    const optimizedSizes = IMAGE_OPTIMIZED_SIZES;

    return {
      ...image,
      optimizedSizes,
      estimatedSavings: calculateImageSavings(format, width, height),
      srcset: optimizedSizes
        .filter((size: { width: number; quality: number }) => size.width <= width)
        .map(
          (size: { width: number; quality: number }) =>
            `${src}?w=${size.width}&q=${size.quality} ${size.width}w`
        )
        .join(", "),
    };
  });
}

// Utility functions
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function interpolateNumber(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function generateCompanyColor(company: string) {
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = company.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 60%)`;
}

function generateTechColor(tech: string) {
  const colorMap: Record<string, string> = {
    TypeScript: "#3178c6",
    React: "#61dafb",
    "Next.js": "#000000",
    "Tailwind CSS": "#06b6d4",
    "Node.js": "#339933",
    "C#": "#239120",
    ".NET": "#512bd4",
    PostgreSQL: "#336791",
    Docker: "#2496ed",
  };
  return colorMap[tech] || generateCompanyColor(tech);
}

function generateImagePlaceholder(image: { width: number; height: number }) {
  const width = Number(image.width) || 1;
  const height = Number(image.height) || 1;
  const safeWidth = Math.max(1, Math.min(width, 4000));
  const safeHeight = Math.max(1, Math.min(height, 4000));
  const svgParts = [
    `<svg width="${safeWidth}" height="${safeHeight}" viewBox="0 0 ${safeWidth} ${safeHeight}" xmlns="http://www.w3.org/2000/svg">`,
    '<rect width="100%" height="100%" fill="#f3f4f6"/>',
    '<text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="system-ui" font-size="14">',
    "Loading...",
    "</text>",
    "</svg>",
  ];
  const svg = svgParts.join("");
  return `data:image/svg+xml;base64,${safeBtoa(svg)}`;
}

function calculateImageSavings(format: string, width: number, height: number) {
  const pixelCount = width * height;
  const originalSize = pixelCount * 3; // Approximate original size in bytes (RGB)

  const compressionRates: Record<string, number> = {
    webp: 0.25,
    avif: 0.15,
    jpeg: 0.3,
    png: 0.8,
  };

  const compressedSize = originalSize * (compressionRates[format] || 0.5);
  const savings = Math.max(0, originalSize - compressedSize);

  return {
    originalSize: Math.round(originalSize / 1024), // KB
    compressedSize: Math.round(compressedSize / 1024), // KB
    savings: Math.round(savings / 1024), // KB
    compressionRatio: Math.round((savings / originalSize) * 100), // Percentage
  };
}

// Error handling
self.onerror = function (error: any) {
  const err = typeof error === "string" ? { message: error } : (error as any);
  self.postMessage({
    type: OUT_TYPES.WORKER_ERROR,
    data: {
      message: err?.message,
      filename: err?.filename,
      lineno: err?.lineno,
      colno: err?.colno,
    },
  });
};

// Performance monitoring
setInterval(() => {
  if (workerState.performanceMetrics.tasksCompleted <= 0) return;
  const mem = (performance as any)?.memory
    ? {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit,
      }
    : null;
  self.postMessage({
    type: OUT_TYPES.WORKER_HEALTH_CHECK,
    data: {
      ...workerState.performanceMetrics,
      cacheSize: workerState.cache.size,
      memoryUsage: mem,
    },
  });
}, HEALTH_CHECK_INTERVAL_MS);

// Initialize worker
self.postMessage({
  type: OUT_TYPES.WORKER_LOG,
  data: "Portfolio Web Worker initialized successfully",
});
self.postMessage({ type: OUT_TYPES.WORKER_READY, data: true });
