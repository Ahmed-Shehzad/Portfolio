"use strict";
// NOTE: This file is the single source of truth for the web worker logic. (Consolidated: previous partial files worker.constants.ts / worker.types.ts removed to prevent duplicate global declarations.)
// It compiles to public/worker.js via `npm run build:worker`.
// Do not edit public/worker.js directly.
// Logic preserved; this refactor strengthens types and applies small perf-oriented cleanups.
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
};
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
};
const HEALTH_CHECK_INTERVAL_MS = 30000; // 30s
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
// Utility: fast control-char stripping via regex
const sanitize = (input) => {
  const raw =
    typeof input === "string" ? input : String(input !== null && input !== void 0 ? input : "");
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
const safeBtoa = (str) => {
  try {
    return btoa(str);
  } catch (_a) {
    try {
      const utf8 = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      );
      return btoa(utf8);
    } catch (_b) {
      return ""; // last resort empty placeholder
    }
  }
};
const workerState = {
  cache: new Map(),
  performanceMetrics: {
    tasksCompleted: 0,
    totalProcessingTime: 0,
    averageTaskTime: 0,
  },
};
// Handler map to reduce switch complexity
const handlers = {
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
function isInboundMessage(msg) {
  if (!msg || typeof msg !== "object") return false;
  const t = msg.type;
  return typeof t === "string" && t in handlers;
}
self.onmessage = (e) => {
  const raw = (e === null || e === void 0 ? void 0 : e.data) || {};
  if (!isInboundMessage(raw)) {
    self.postMessage({
      type: OUT_TYPES.ERROR,
      data: "Missing or unknown message type",
      id: raw.id,
    });
    return;
  }
  const { type, id } = raw; // raw is now narrowed to InboundPayloads
  const startTime = performance.now();
  try {
    // Union of handler function parameter types collapses to never when indexed by a union key.
    // Use a controlled cast here; payload already validated by isInboundMessage.
    const handler = handlers[type];
    if (handler) {
      handler(raw.data, id, startTime);
    }
  } catch (err) {
    self.postMessage({
      type: OUT_TYPES.ERROR,
      data: sanitize(err instanceof Error ? err.message : String(err)),
      id,
    });
  }
};
// Helper function to post results with performance tracking
function postResult(type, data, id, startTime) {
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
function processAnimationData(data) {
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
    const computedProperties = {};
    Object.entries(properties).forEach(([prop, value]) => {
      const { start, end } = value;
      if (typeof start === "number" && typeof end === "number") {
        computedProperties[prop] = interpolateNumber(start, end, easedProgress);
      } else {
        computedProperties[prop] = easedProgress > EASING_THRESHOLD ? end : start;
      }
    });
    return Object.assign(Object.assign({}, element), {
      progress: easedProgress,
      properties: computedProperties,
      isVisible: elementProgress > 0 && elementProgress < 1,
    });
  });
  workerState.cache.set(cacheKey, processed);
  return processed;
}
// Scroll calculations optimization
function optimizeScrollCalculations(data) {
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
    return Object.assign(Object.assign({}, element), {
      isVisible: intersectionRatio > threshold,
      intersectionRatio,
      distanceFromViewport,
    });
  });
}
function calculatePerformanceMetrics(data) {
  var _a, _b, _c, _d;
  const { navigationTiming, paintTiming, resourceTiming } = data;
  const metrics = {
    // Core Web Vitals approximations
    fcp:
      (paintTiming === null || paintTiming === void 0
        ? void 0
        : paintTiming["first-contentful-paint"]) || 0,
    lcp:
      (paintTiming === null || paintTiming === void 0
        ? void 0
        : paintTiming["largest-contentful-paint"]) || 0,
    // Navigation timing metrics
    domContentLoaded:
      ((_a =
        navigationTiming === null || navigationTiming === void 0
          ? void 0
          : navigationTiming.domContentLoadedEventEnd) !== null && _a !== void 0
        ? _a
        : 0) -
      ((_b =
        navigationTiming === null || navigationTiming === void 0
          ? void 0
          : navigationTiming.navigationStart) !== null && _b !== void 0
        ? _b
        : 0),
    loadComplete:
      ((_c =
        navigationTiming === null || navigationTiming === void 0
          ? void 0
          : navigationTiming.loadEventEnd) !== null && _c !== void 0
        ? _c
        : 0) -
      ((_d =
        navigationTiming === null || navigationTiming === void 0
          ? void 0
          : navigationTiming.navigationStart) !== null && _d !== void 0
        ? _d
        : 0),
    // Resource loading analysis
    totalResources:
      (resourceTiming === null || resourceTiming === void 0 ? void 0 : resourceTiming.length) || 0,
    slowResources:
      (resourceTiming === null || resourceTiming === void 0
        ? void 0
        : resourceTiming.filter((r) => r.duration > SLOW_RESOURCE_LIMIT).length) || 0,
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
function processTestimonialsData(data) {
  const { testimonials } = data;
  return testimonials.map((testimonial) => {
    const { rating, text, name, company } = testimonial;
    return Object.assign(Object.assign({}, testimonial), {
      // Pre-calculate star display data
      stars: Array.from({ length: STAR_DISPLAY_COUNT }, (_, i) => ({
        filled: i < rating,
        index: i,
        key: `star-${name}-${i}`,
      })),
      // Calculate text metrics for layout
      textMetrics: {
        length: text.length,
        wordCount: text.split(" ").length,
        estimatedReadTime: Math.ceil(text.split(" ").length / READING_WPM),
      },
      // Generate company badge color
      companyColor: generateCompanyColor(company),
      // Pre-process for accessibility
      ariaLabel: `${rating} star rating from ${name} at ${company}`,
    });
  });
}
// Project data optimization
function optimizeProjectData(data) {
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
    const secureLinks = links.map((link) => ({
      href: link.href,
      rel: link.href.startsWith(HTTP_PREFIX) ? "noopener noreferrer" : undefined,
      target: link.href.startsWith(HTTP_PREFIX) ? "_blank" : "_self",
    }));
    return {
      title,
      technologies: [...technologies],
      image: { width: image.width, height: image.height },
      links: links.map((l) => ({
        href: l.href,
        target: l.href.startsWith(HTTP_PREFIX) ? "_blank" : "_self",
        rel: l.href.startsWith(HTTP_PREFIX) ? "noopener noreferrer" : undefined,
      })),
      technologyChips,
      imageData,
      secureLinks,
    };
  });
}
function calculateStarRatings(data) {
  const { ratings } = data;
  return ratings.map(({ rating, id }) => {
    const cacheKey = `stars_${id}_${rating}`;
    if (workerState.cache.has(cacheKey)) {
      return workerState.cache.get(cacheKey);
    }
    const stars = Array.from({ length: STAR_DISPLAY_COUNT }, (_, index) => ({
      filled: index < Math.floor(rating),
      halfFilled: index < rating && index >= Math.floor(rating),
      empty: index >= Math.ceil(rating),
      index,
      key: `star-${id}-${index}`,
    }));
    const result = { id, rating, stars };
    workerState.cache.set(cacheKey, result);
    return result;
  });
}
// Contact form validation
function processContactValidation(data) {
  const { fields } = data;
  const validation = {};
  const SAFE_EMAIL_REGEX =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63})+$/;
  // Removed local numeric literal; referencing EMAIL_MAX_LEN constant
  const MAX_EMAIL_LENGTH = EMAIL_MAX_LEN;
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
const IMAGE_OPTIMIZED_SIZES = [
  { width: 640, quality: 85 },
  { width: 768, quality: 85 },
  { width: 1024, quality: 80 },
  { width: 1280, quality: 80 },
  { width: 1920, quality: 75 },
];
function processImageOptimization(data) {
  const { images } = data;
  return images.map((image) => {
    const { src, width, height, format } = image;
    const optimizedSizes = IMAGE_OPTIMIZED_SIZES;
    return Object.assign(Object.assign({}, image), {
      optimizedSizes,
      estimatedSavings: calculateImageSavings(format, width, height),
      srcset: optimizedSizes
        .filter((size) => size.width <= width)
        .map((size) => `${src}?w=${size.width}&q=${size.quality} ${size.width}w`)
        .join(", "),
    });
  });
}
// Utility functions
function easeInOutCubic(t) {
  return t < EASING_THRESHOLD
    ? EASING_IN_COEFF * t * t * t
    : 1 - Math.pow(-EASING_OUT_BASE * t + EASING_OUT_BASE, EASING_OUT_EXP) / 2;
}
function interpolateNumber(start, end, progress) {
  return start + (end - start) * progress;
}
function generateCompanyColor(company) {
  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = company.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 60%)`;
}
function generateTechColor(tech) {
  const colorMap = {
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
function generateImagePlaceholder(image) {
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
function calculateImageSavings(format, width, height) {
  const pixelCount = width * height;
  const originalSize = pixelCount * 3; // Approximate original size in bytes (RGB)
  const compressionRates = {
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
self.onerror = function (error) {
  const err = error instanceof Error ? error : new Error(String(error));
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
  const perfWithMem = performance;
  const mem = perfWithMem.memory
    ? {
        used: perfWithMem.memory.usedJSHeapSize,
        total: perfWithMem.memory.totalJSHeapSize,
        limit: perfWithMem.memory.jsHeapSizeLimit,
      }
    : null;
  self.postMessage({
    type: OUT_TYPES.WORKER_HEALTH_CHECK,
    data: Object.assign(Object.assign({}, workerState.performanceMetrics), {
      cacheSize: workerState.cache.size,
      memoryUsage: mem,
    }),
  });
}, HEALTH_CHECK_INTERVAL_MS);
// Initialize worker
self.postMessage({
  type: OUT_TYPES.WORKER_LOG,
  data: "Portfolio Web Worker initialized successfully",
});
self.postMessage({ type: OUT_TYPES.WORKER_READY, data: true });
