/**
 * Web Worker Types and Interfaces
 */

export interface WorkerTask {
  id: string;
  type: string;
  data: unknown;
  resolve: (value: { data: unknown; processingTime?: number | undefined }) => void;
  reject: (reason: Error) => void;
}

export interface WorkerResponse<TData = unknown> {
  type: string;
  data: TData;
  id?: string;
  processingTime?: number;
}

export interface WorkerStats {
  tasksCompleted: number;
  averageTaskTime: number;
  totalProcessingTime: number;
}
