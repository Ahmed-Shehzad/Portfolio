/**
 * About Feature Types
 */

export interface ToolboxItem {
  readonly title: string;
  readonly iconType: string;
}

export interface AboutSectionProps {
  readonly className?: string;
}

export interface MapConfig {
  readonly center: readonly [number, number];
  readonly zoom: number;
  readonly className?: string;
}
