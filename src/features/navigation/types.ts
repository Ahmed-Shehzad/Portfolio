/**
 * Navigation Feature Types
 */

export interface NavigationItem {
  readonly title: string;
  readonly href: string;
  readonly id: string;
}

export interface NavigationItemProps {
  readonly item: NavigationItem;
  readonly isActive: boolean;
  readonly onClick: (href: string, id: string) => void;
}

export interface HeaderProps {
  readonly className?: string;
}

export interface SectionElement {
  readonly element: Element;
  readonly id: string;
  readonly top: number;
  readonly height: number;
}
