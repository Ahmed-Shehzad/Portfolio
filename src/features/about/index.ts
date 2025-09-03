/**
 * About Feature Exports
 */

// Types
export type { ToolboxItem, AboutSectionProps, MapConfig } from "./types";

// Components
export {
  PersonalIntroduction,
  ProfessionalGrowth,
  CoreValues,
  CoreStrengths,
  BeyondWork,
  ToolboxItems,
  DynamicMap,
} from "./components";

// Re-export shared types and constants that are related to the about section
export type { ToolboxItem as SharedToolboxItem } from "@/shared/types";
