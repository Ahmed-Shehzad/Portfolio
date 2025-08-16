/**
 * Performance Feature Types
 */

export interface PerformanceMetrics {
  readonly fcp: number; // First Contentful Paint
  readonly lcp: number; // Largest Contentful Paint
  readonly fid: number; // First Input Delay
  readonly cls: number; // Cumulative Layout Shift
  readonly ttfb: number; // Time to First Byte
}

export interface WebWorkerTask {
  readonly id: string;
  readonly type: string;
  readonly data: unknown;
}

export interface WebWorkerResponse {
  readonly type: string;
  readonly data: unknown;
  readonly id?: string;
  readonly processingTime?: number;
}

export interface UseWebWorkerReturn {
  readonly executeTask: (type: string, data: unknown) => Promise<WebWorkerResponse>;
  readonly isProcessing: boolean;
  readonly error: string | null;
  readonly terminate: () => void;
}
