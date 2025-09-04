// Comprehensive type declarations for @react-leaflet/core context module
declare module "@react-leaflet/core/lib/context" {
  export interface ControlledLayer {
    addTo?: (map: unknown) => void;
    removeFrom?: (map: unknown) => void;
  }

  export interface LayerContextValue {
    layerContainer?: ControlledLayer;
  }
}

// Export empty to make this a module
export {};
