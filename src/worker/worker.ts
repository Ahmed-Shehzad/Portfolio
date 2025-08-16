// NOTE: This file is the single source of truth for the web worker logic. (Consolidated: previous partial files worker.constants.ts / worker.types.ts removed to prevent duplicate global declarations.)
// It compiles to public/worker.js via `npm run build:worker`.
// Do not edit public/worker.js directly.
// Logic preserved; this refactor strengthens types and applies small perf-oriented cleanups.

// -----------------------------------------------------------------------------
// Constants & Enumerations
// -----------------------------------------------------------------------------
// Note: no module exports to allow compilation as a classic worker script

interface MessageTypesShape {
  PROCESS_ANIMATIONS: "PROCESS_ANIMATIONS";
  OPTIMIZE_SCROLL_CALCULATIONS: "OPTIMIZE_SCROLL_CALCULATIONS";
  CALCULATE_PERFORMANCE_METRICS: "CALCULATE_PERFORMANCE_METRICS";
  PROCESS_TESTIMONIALS: "PROCESS_TESTIMONIALS";
  OPTIMIZE_PROJECT_DATA: "OPTIMIZE_PROJECT_DATA";
  CALCULATE_STAR_RATINGS: "CALCULATE_STAR_RATINGS";
  PROCESS_CONTACT_VALIDATION: "PROCESS_CONTACT_VALIDATION";
  OPTIMIZE_IMAGES: "OPTIMIZE_IMAGES";
  GET_PERFORMANCE_STATS: "GET_PERFORMANCE_STATS";
  CLEAR_CACHE: "CLEAR_CACHE";
}
const MESSAGE_TYPES: MessageTypesShape = {
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
};

interface OutTypesShape {
  ANIMATIONS_PROCESSED: "ANIMATIONS_PROCESSED";
  SCROLL_OPTIMIZED: "SCROLL_OPTIMIZED";
  METRICS_CALCULATED: "METRICS_CALCULATED";
  TESTIMONIALS_PROCESSED: "TESTIMONIALS_PROCESSED";
  PROJECTS_OPTIMIZED: "PROJECTS_OPTIMIZED";
  STAR_RATINGS_CALCULATED: "STAR_RATINGS_CALCULATED";
  CONTACT_VALIDATED: "CONTACT_VALIDATED";
  IMAGES_OPTIMIZED: "IMAGES_OPTIMIZED";
  PERFORMANCE_STATS: "PERFORMANCE_STATS";
  CACHE_CLEARED: "CACHE_CLEARED";
  ERROR: "ERROR";
  WORKER_ERROR: "WORKER_ERROR";
  WORKER_HEALTH_CHECK: "WORKER_HEALTH_CHECK";
  WORKER_READY: "WORKER_READY";
  WORKER_LOG: "WORKER_LOG";
}
const OUT_TYPES: OutTypesShape = {
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
};

// Explicit key & value type helpers (improves DX in editor hints)
type MessageTypesMap = typeof MESSAGE_TYPES;
type MessageType = MessageTypesMap[keyof MessageTypesMap];
type OutTypesMap = typeof OUT_TYPES;
type OutType = OutTypesMap[keyof OutTypesMap];

const HEALTH_CHECK_INTERVAL_MS = 30_000; // 30s
// Centralized constants (eliminate magic numbers for maintainability / Sonar)
const EASING_THRESHOLD = 0.5;
const EASING_IN_COEFF = 4;
const EASING_OUT_BASE = 2;
const EASING_OUT_EXP = 3;
const STAR_DISPLAY_COUNT = 5;
const PERF_FCP_LIMIT = 1800;
const PERF_LCP_LIMIT = 2500;
const PERF_DCL_LIMIT = 1500;
const SLOW_RESOURCE_LIMIT = 1000;
const DEFAULT_VISIBILITY_THRESHOLD = 0.1;
const HTTP_PREFIX = "http";
const EMAIL_MAX_LEN = 254;
const READING_WPM = 200; // average reading speed words/minute

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
  [k: string]: unknown;
}

interface PerformancePayload {
  navigationTiming?: PerfTimings;
  paintTiming?: Record<string, number>;
  resourceTiming?: Array<{ duration: number; [k: string]: unknown }>;
}

interface TestimonialsPayload {
  testimonials: Array<{
    rating: number;
    text: string;
    name: string;
    company: string;
    [k: string]: unknown;
  }>;
}

interface ProjectsPayload {
  projects: Array<{
    title: string;
    technologies: string[];
    image: { width: number; height: number; [k: string]: unknown };
    links: Array<{ href: string; [k: string]: unknown }>;
    [k: string]: unknown;
  }>;
}

interface StarRatingsPayload {
  ratings: Array<{ rating: number; id: string | number }>;
}

interface ContactValidationPayload {
  fields: Record<string, string>;
}

interface ImagesPayload {
  images: Array<{
    src: string;
    width: number;
    height: number;
    format: string;
    [k: string]: unknown;
  }>;
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
  [OUT_TYPES.WORKER_HEALTH_CHECK]: PerformanceMetrics & { cacheSize: number; memoryUsage: unknown };
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
  let raw: string;
  if (typeof input === "string") {
    raw = input;
  } else if (typeof input === "number" || typeof input === "boolean") {
    raw = String(input);
  } else if (
    input &&
    typeof input === "object" &&
    "toString" in input &&
    typeof input.toString === "function"
  ) {
    raw = input.toString();
  } else {
    raw = input ? "[object]" : "";
  }
  // Build regex at runtime to avoid control character parsing issues
  const controlRanges = [
    [0x0000, 0x001f],
    [0x007f, 0x009f],
  ];
  const pattern = new RegExp(
    controlRanges
      .map(([a, b]) => {
        if (a !== undefined && b !== undefined) {
          return `[#${a.toString(16)}-#${b.toString(16)}]`;
        }
        return "";
      })
      .filter(Boolean)
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
  cache: Map<string, unknown>;
  performanceMetrics: PerformanceMetrics;
}

const workerState: WorkerState = {
  cache: new Map(),
  performanceMetrics: {
    tasksCompleted: 0,
    totalProcessingTime: 0,
    averageTaskTime: 0,
  },
};

// Handler map to reduce switch complexity
const handlers: {
  [K in MessageType]: (data: MessagePayloadMap[K], id: ID, start: number) => void;
} = {
  [MESSAGE_TYPES.PROCESS_ANIMATIONS]: (data, id, start) =>
    postResult(OUT_TYPES.ANIMATIONS_PROCESSED, processAnimationData(data), id, start),
  [MESSAGE_TYPES.OPTIMIZE_SCROLL_CALCULATIONS]: (data, id, start) =>
    postResult(OUT_TYPES.SCROLL_OPTIMIZED, optimizeScrollCalculations(data), id, start),
  [MESSAGE_TYPES.CALCULATE_PERFORMANCE_METRICS]: (data, id, start) =>
    postResult(OUT_TYPES.METRICS_CALCULATED, calculatePerformanceMetrics(data), id, start),
  [MESSAGE_TYPES.PROCESS_TESTIMONIALS]: (data, id, start) =>
    postResult(OUT_TYPES.TESTIMONIALS_PROCESSED, processTestimonialsData(data), id, start),
  [MESSAGE_TYPES.OPTIMIZE_PROJECT_DATA]: (data, id, start) =>
    postResult(OUT_TYPES.PROJECTS_OPTIMIZED, optimizeProjectData(data), id, start),
  [MESSAGE_TYPES.CALCULATE_STAR_RATINGS]: (data, id, start) =>
    postResult(OUT_TYPES.STAR_RATINGS_CALCULATED, calculateStarRatings(data), id, start),
  [MESSAGE_TYPES.PROCESS_CONTACT_VALIDATION]: (data, id, start) =>
    postResult(OUT_TYPES.CONTACT_VALIDATED, processContactValidation(data), id, start),
  [MESSAGE_TYPES.OPTIMIZE_IMAGES]: (data, id, start) =>
    postResult(OUT_TYPES.IMAGES_OPTIMIZED, processImageOptimization(data), id, start),
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
function isInboundMessage(msg: unknown): msg is InboundPayloads {
  if (!msg || typeof msg !== "object") return false;
  const t = (msg as { type?: unknown }).type;
  return typeof t === "string" && t in handlers;
}

self.onmessage = (e: MessageEvent<InboundPayloads | Record<string, unknown>>) => {
  const raw = (e?.data || {}) as Record<string, unknown>;
  if (!isInboundMessage(raw)) {
    self.postMessage({
      type: OUT_TYPES.ERROR,
      data: "Missing or unknown message type",
      id: (raw as { id?: ID }).id,
    });
    return;
  }
  const { type, id } = raw; // raw is now narrowed to InboundPayloads
  const startTime = performance.now();
  try {
    // Union of handler function parameter types collapses to never when indexed by a union key.
    // Use a controlled cast here; payload already validated by isInboundMessage.
    const handler = (handlers as Record<string, (d: unknown, id: ID, s: number) => void>)[type];
    if (handler) {
      handler(raw.data, id, startTime);
    }
  } catch (err) {
    let errorMessage: string;
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (err && typeof err === "object" && "toString" in err) {
      errorMessage = err.toString();
    } else {
      errorMessage = "[object]";
    }

    self.postMessage({
      type: OUT_TYPES.ERROR,
      data: sanitize(errorMessage),
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
  const cacheKey = `animation_${data.scrollProgress}_${data.elements.length}`;

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
        computedProperties[prop] = easedProgress > EASING_THRESHOLD ? end : start;
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
    const { offsetTop, offsetHeight, threshold = DEFAULT_VISIBILITY_THRESHOLD } = element;

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
interface CalculatedPerformanceMetrics {
  fcp: number;
  lcp: number;
  domContentLoaded: number;
  loadComplete: number;
  totalResources: number;
  slowResources: number;
  performanceScore: number;
}
function calculatePerformanceMetrics(data: PerformancePayload): CalculatedPerformanceMetrics {
  const { navigationTiming, paintTiming, resourceTiming } = data;
  const metrics: CalculatedPerformanceMetrics = {
    // Core Web Vitals approximations
    fcp: paintTiming?.["first-contentful-paint"] || 0,
    lcp: paintTiming?.["largest-contentful-paint"] || 0,

    // Navigation timing metrics
    domContentLoaded:
      (navigationTiming?.domContentLoadedEventEnd ?? 0) - (navigationTiming?.navigationStart ?? 0),
    loadComplete: (navigationTiming?.loadEventEnd ?? 0) - (navigationTiming?.navigationStart ?? 0),

    // Resource loading analysis
    totalResources: resourceTiming?.length || 0,
    slowResources: resourceTiming?.filter((r) => r.duration > SLOW_RESOURCE_LIMIT).length || 0,

    // Performance score estimation
    performanceScore: 0,
  };

  // Calculate simple performance score
  let score = 100;
  if (metrics.fcp > PERF_FCP_LIMIT) score -= 20;
  if (metrics.lcp > PERF_LCP_LIMIT) score -= 25;
  if (metrics.domContentLoaded > PERF_DCL_LIMIT) score -= 15;
  if (metrics.slowResources > 0) score -= metrics.slowResources * 5;

  metrics.performanceScore = Math.max(0, score);

  return metrics;
}

// Testimonials data processing
interface ProcessedTestimonial {
  rating: number;
  text: string;
  name: string;
  company: string;
  stars: Array<{ filled: boolean; index: number; key: string }>;
  textMetrics: { length: number; wordCount: number; estimatedReadTime: number };
  companyColor: string;
  ariaLabel: string;
  [k: string]: unknown;
}
function processTestimonialsData(data: TestimonialsPayload): ProcessedTestimonial[] {
  const { testimonials } = data;

  return testimonials.map((testimonial) => {
    const { rating, text, name, company } = testimonial;

    return {
      ...testimonial,
      // Pre-calculate star display data
      stars: Array.from({ length: STAR_DISPLAY_COUNT }, (_, i) => ({
        filled: i < rating,
        index: i,
        key: `star-${name}-${i}`,
      })),
      // Calculate text metrics for layout
      textMetrics: (() => {
        const wordCount = text.split(" ").length;
        return {
          length: text.length,
          wordCount,
          estimatedReadTime: Math.ceil(wordCount / READING_WPM),
        };
      })(),
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

    const technologyChips = technologies.map((tech, index) => ({
      name: tech,
      color: generateTechColor(tech),
      index,
      key: `tech-${title}-${tech}`,
    }));

    const imageData = {
      width: image.width,
      height: image.height,
      aspectRatio: image.width / image.height,
      placeholder: generateImagePlaceholder(image),
    };

    const secureLinks = links.map((link) => {
      const isExternal = link.href.startsWith(HTTP_PREFIX);
      return {
        href: link.href,
        rel: isExternal ? "noopener noreferrer" : undefined,
        target: isExternal ? "_blank" : "_self",
      };
    });

    return {
      title,
      technologies: [...technologies],
      image: { width: image.width, height: image.height },
      links: secureLinks,
      technologyChips,
      imageData,
      secureLinks,
    };
  });
}

// Star ratings calculation with memoization
interface StarEntry {
  filled: boolean;
  halfFilled: boolean;
  empty: boolean;
  index: number;
  key: string;
}
interface StarRatingResult {
  id: string | number;
  rating: number;
  stars: StarEntry[];
}
function calculateStarRatings(data: StarRatingsPayload): StarRatingResult[] {
  const { ratings } = data;

  return ratings.map(({ rating, id }): StarRatingResult => {
    const cacheKey = `stars_${id}_${rating}`;

    if (workerState.cache.has(cacheKey)) {
      return workerState.cache.get(cacheKey) as StarRatingResult;
    }

    const floorRating = Math.floor(rating);
    const ceilRating = Math.ceil(rating);
    const stars: StarEntry[] = Array.from({ length: STAR_DISPLAY_COUNT }, (_, index) => ({
      filled: index < floorRating,
      halfFilled: index < rating && index >= floorRating,
      empty: index >= ceilRating,
      index,
      key: `star-${id}-${index}`,
    }));
    const result: StarRatingResult = { id, rating, stars };
    workerState.cache.set(cacheKey, result);

    return result;
  });
}

// Contact form validation helpers
const validateEmail = (value: string): { isValid: boolean; message: string } => {
  const SAFE_EMAIL_REGEX =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63})+$/;
  const trimmed = (typeof value === "string" ? value : "").trim();
  const isValid = trimmed.length <= EMAIL_MAX_LEN && SAFE_EMAIL_REGEX.test(trimmed);
  return { isValid, message: isValid ? "" : "Please enter a valid email address" };
};

const validateName = (value: string): { isValid: boolean; message: string } => {
  const isValid = (typeof value === "string" ? value : "").trim().length >= 2;
  return { isValid, message: isValid ? "" : "Name must be at least 2 characters long" };
};

const validateMessage = (value: string): { isValid: boolean; message: string } => {
  const isValid = (typeof value === "string" ? value : "").trim().length >= 10;
  return { isValid, message: isValid ? "" : "Message must be at least 10 characters long" };
};

// Contact form validation
function processContactValidation(data: ContactValidationPayload) {
  const { fields } = data;
  const validationMap: Record<string, (value: string) => { isValid: boolean; message: string }> = {
    email: validateEmail,
    name: validateName,
    message: validateMessage,
  };

  const validation: Record<string, { isValid: boolean; message: string }> = {};
  Object.entries(fields).forEach(([fieldName, value]) => {
    const validator = validationMap[fieldName];
    validation[fieldName] = validator ? validator(value) : { isValid: true, message: "" };
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

    return {
      ...image,
      IMAGE_OPTIMIZED_SIZES,
      estimatedSavings: calculateImageSavings(format, width, height),
      srcset: IMAGE_OPTIMIZED_SIZES.filter(
        (size: { width: number; quality: number }) => size.width <= width
      )
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
  return t < EASING_THRESHOLD
    ? EASING_IN_COEFF * t * t * t
    : 1 - Math.pow(-EASING_OUT_BASE * t + EASING_OUT_BASE, EASING_OUT_EXP) / 2;
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
  const safeWidth = Math.max(1, Math.min(Math.floor(width), 4000));
  const safeHeight = Math.max(1, Math.min(Math.floor(height), 4000));
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
self.onerror = function (error: unknown) {
  let err: Error;
  if (error instanceof Error) {
    err = error;
  } else {
    let errorMessage: string;
    if (error && typeof error === "object" && "toString" in error) {
      errorMessage = error.toString();
    } else {
      errorMessage = "[object]";
    }
    err = new Error(errorMessage);
  }

  self.postMessage({
    type: OUT_TYPES.WORKER_ERROR,
    data: {
      message: err.message,
    },
  });
};

// Performance monitoring
setInterval(() => {
  if (workerState.performanceMetrics.tasksCompleted <= 0) return;
  interface PerfMemory {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  }
  const perfWithMem = performance as Performance & { memory?: PerfMemory };
  const mem = perfWithMem.memory
    ? {
        used: perfWithMem.memory.usedJSHeapSize,
        total: perfWithMem.memory.totalJSHeapSize,
        limit: perfWithMem.memory.jsHeapSizeLimit,
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
