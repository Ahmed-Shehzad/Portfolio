// UI-related type definitions

export interface ToolboxItem {
  title: string;
  iconType: React.ElementType;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon?: React.ElementType;
}
