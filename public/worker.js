// Web Worker for handling heavy JavaScript computations.
// Refactored to reduce cognitive complexity (handler map instead of large switch),
// centralize constants, and sanitize outbound messages for SonarQube compliance.

// -----------------------------------------------------------------------------
// Constants & Enumerations
// -----------------------------------------------------------------------------
/** @type {const} */
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

/** @type {const} */
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

const HEALTH_CHECK_INTERVAL_MS = 30_000; // 30s

// Utility: safe string conversion & control char stripping
const sanitize = (input) => {
  const raw = typeof input === "string" ? input : String(input ?? "");
  return raw
    .split("")
    .filter((c) => {
      const code = c.charCodeAt(0);
      return !(code <= 31 || (code >= 127 && code <= 159));
    })
    .join("");
};

// Safe base64 encode (btoa can throw for unicode) – degrade gracefully.
const safeBtoa = (str) => {
  try {
    return btoa(str);
  } catch {
    // Fallback: percent-encode then base64 of bytes
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
const workerState = {
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
self.onmessage = (e) => {
  const payload = e?.data || {};
  const { type, data, id } = payload;
  if (!type) {
    self.postMessage({ type: OUT_TYPES.ERROR, data: "Missing message type", id });
    return;
  }
  const handler = handlers[type];
  if (!handler) {
    self.postMessage({ type: OUT_TYPES.ERROR, data: `Unknown task type: ${sanitize(type)}`, id });
    return;
  }
  const startTime = performance.now();
  try {
    handler(data, id, startTime);
  } catch (err) {
    self.postMessage({
      type: OUT_TYPES.ERROR,
      data: sanitize(err?.message || "Unknown error"),
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

  const { elements, scrollProgress } = data; // removed unused viewport

  const processed = elements.map((element) => {
    const { startOffset, endOffset, properties } = element; // removed unused type

    // Calculate animation progress based on scroll position
    const elementProgress = Math.max(
      0,
      Math.min(1, (scrollProgress - startOffset) / (endOffset - startOffset))
    );

    // Apply easing functions
    const easedProgress = easeInOutCubic(elementProgress);

    // Calculate property values
    const computedProperties = {};
    Object.entries(properties).forEach(([prop, { start, end }]) => {
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
function optimizeScrollCalculations(data) {
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
function calculatePerformanceMetrics(data) {
  const { navigationTiming, paintTiming, resourceTiming } = data;

  const metrics = {
    // Core Web Vitals approximations
    fcp: paintTiming?.["first-contentful-paint"] || 0,
    lcp: paintTiming?.["largest-contentful-paint"] || 0,

    // Navigation timing metrics
    domContentLoaded:
      navigationTiming?.domContentLoadedEventEnd - navigationTiming?.navigationStart || 0,
    loadComplete: navigationTiming?.loadEventEnd - navigationTiming?.navigationStart || 0,

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
function processTestimonialsData(data) {
  const { testimonials } = data;

  return testimonials.map((testimonial) => {
    const { rating, text, name, company } = testimonial;

    return {
      ...testimonial,
      // Pre-calculate star display data
      stars: Array.from({ length: 5 }, (_, i) => ({
        filled: i < rating,
        index: i,
        key: `star-${name}-${i}`,
      })),
      // Calculate text metrics for layout
      textMetrics: {
        length: text.length,
        wordCount: text.split(" ").length,
        estimatedReadTime: Math.ceil(text.split(" ").length / 200), // ~200 words per minute
      },
      // Generate company badge color
      companyColor: generateCompanyColor(company),
      // Pre-process for accessibility
      ariaLabel: `${rating} star rating from ${name} at ${company}`,
    };
  });
}

// Project data optimization
function optimizeProjectData(data) {
  const { projects } = data;

  return projects.map((project) => {
    const { title, technologies, image, links } = project; // removed unused description

    return {
      ...project,
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
function calculateStarRatings(data) {
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

    const result = { id, rating, stars };
    workerState.cache.set(cacheKey, result);

    return result;
  });
}

// Contact form validation
function processContactValidation(data) {
  const { fields } = data;
  const validation = {};

  // Precompiled safe (linear) email pattern:
  // - Single character classes with + (no nested quantifiers / backtracking hotspots)
  // - Restricts local part (1-64) & domain labels (1-63) to mitigate extremely long inputs
  // - Requires at least one dot in the domain
  // NOTE: This is a pragmatic validation (not full RFC 5322) focused on safety & performance.
  const SAFE_EMAIL_REGEX =
    /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[A-Za-z0-9-]{1,63}(?:\.[A-Za-z0-9-]{1,63})+$/;

  // Hard length cap to avoid excessive processing (defense-in-depth)
  const MAX_EMAIL_LENGTH = 254; // Common practical limit

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
          isValid: value.trim().length >= 2,
          message: value.trim().length >= 2 ? "" : "Name must be at least 2 characters long",
        };
        break;

      case "message":
        validation[fieldName] = {
          isValid: value.trim().length >= 10,
          message: value.trim().length >= 10 ? "" : "Message must be at least 10 characters long",
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
function processImageOptimization(data) {
  const { images } = data;

  return images.map((image) => {
    const { src, width, height, format } = image;

    // Calculate optimal dimensions based on viewport
    const optimizedSizes = [
      { width: 640, quality: 85 },
      { width: 768, quality: 85 },
      { width: 1024, quality: 80 },
      { width: 1280, quality: 80 },
      { width: 1920, quality: 75 },
    ];

    return {
      ...image,
      optimizedSizes,
      // Calculate estimated file size reduction
      estimatedSavings: calculateImageSavings(format, width, height),
      // Generate responsive image srcset
      srcset: optimizedSizes
        .filter((size) => size.width <= width)
        .map((size) => `${src}?w=${size.width}&q=${size.quality} ${size.width}w`)
        .join(", "),
    };
  });
}

// Utility functions
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function interpolateNumber(start, end, progress) {
  return start + (end - start) * progress;
}

function generateCompanyColor(company) {
  // Generate consistent color based on company name hash
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
  self.postMessage({
    type: "WORKER_ERROR",
    data: {
      message: error.message,
      filename: error.filename,
      lineno: error.lineno,
      colno: error.colno,
    },
  });
};

// Performance monitoring
setInterval(() => {
  if (workerState.performanceMetrics.tasksCompleted <= 0) return;
  self.postMessage({
    type: OUT_TYPES.WORKER_HEALTH_CHECK,
    data: {
      ...workerState.performanceMetrics,
      cacheSize: workerState.cache.size,
      memoryUsage: performance.memory
        ? {
            used: performance.memory.usedJSHeapSize,
            total: performance.memory.totalJSHeapSize,
            limit: performance.memory.jsHeapSizeLimit,
          }
        : null,
    },
  });
}, HEALTH_CHECK_INTERVAL_MS);

// Initialize worker
self.postMessage({
  type: OUT_TYPES.WORKER_LOG,
  data: "Portfolio Web Worker initialized successfully",
});
self.postMessage({ type: OUT_TYPES.WORKER_READY, data: true });
