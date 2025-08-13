// Performance metrics domain types (UI abstraction of worker output)

export interface CalculatedPerformanceMetricsUI {
  fcp: number;
  lcp: number;
  domContentLoaded: number;
  loadComplete: number;
  totalResources: number;
  slowResources: number;
  performanceScore: number;
}

export interface WorkerPerformanceStats {
  tasksCompleted: number;
  totalProcessingTime: number;
  averageTaskTime: number;
}
