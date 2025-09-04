"use client";

import { LanguageSwitcher } from "@/components";
import Link from "next/link";
import { FC } from "react";

interface HeaderOption {
  title: string;
  href: string;
  id: string;
  isExternal?: boolean;
  showInNavigation?: boolean;
}

interface NavigationProps {
  /** Whether mobile menu is open */
  isMobileMenuOpen: boolean;
  /** Whether to show mobile UI */
  showMobileUI: boolean;
  /** Active navigation option */
  activeOption: HeaderOption;
  /** Available navigation options */
  headerOptions: HeaderOption[];
  /** Handler for mobile menu toggle */
  onMobileMenuToggle: () => void;
  /** Handler for navigation item click */
  onNavigationClick: (option: HeaderOption) => void;
}

interface NavigationItemProps {
  option: HeaderOption;
  isActive: boolean;
  onClick: (option: HeaderOption) => void;
}

/**
 * NavigationItem – individual nav pill. Applies active styling and
 * smooth-scroll behavior via parent click handler.
 */
const NavigationItem: FC<NavigationItemProps> = ({ option, isActive, onClick }) => {
  const isExternalPage = option.isExternal || false;
  const className = `nav-item block w-full text-left py-3 px-4 rounded-lg transition-colors duration-200 md:w-auto md:text-center md:py-2 md:rounded-full ${
    isActive && !isExternalPage
      ? "bg-white text-gray-900 hover:bg-white/90"
      : "text-white hover:bg-white/10 md:hover:bg-white/20"
  }`;

  if (isExternalPage) {
    const ariaLabel = `View ${option.title} Page`;
    return (
      <Link className={className} href={option.href} aria-label={ariaLabel}>
        {option.title}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={option.href}
      onClick={(e) => {
        e.preventDefault();
        onClick(option);
      }}
      aria-current={isActive ? "page" : undefined}
      aria-label={`Navigate to ${option.title} section`}
    >
      {option.title}
    </a>
  );
};

/**
 * Navigation Component
 *
 * Pure presentational component for rendering desktop and mobile navigation.
 * Handles visual states and user interactions through props callbacks.
 *
 * Features:
 * - Responsive desktop/mobile navigation UI
 * - Active state highlighting
 * - Smooth transition animations
 * - External link handling
 * - Language switcher integration
 *
 * All business logic (scroll detection, active section management) is handled
 * by the NavigationContainer parent component.
 */
export const Navigation: FC<NavigationProps> = ({
  isMobileMenuOpen,
  showMobileUI,
  activeOption,
  headerOptions,
  onMobileMenuToggle,
  onNavigationClick,
}) => {
  // Filter options for navigation display
  const navigationOptions = headerOptions.filter((option) => option.showInNavigation !== false);

  return (
    <header className="fixed top-3 left-1/2 z-10 w-full max-w-xs -translate-x-1/2 transform px-3 md:max-w-md lg:max-w-lg">
      <div className="relative overflow-hidden rounded-full bg-white/10 p-4 backdrop-blur transition-all duration-300 md:px-6">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          {!showMobileUI && (
            <nav
              className="flex items-center space-x-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {navigationOptions.map((option) => (
                <NavigationItem
                  key={option.id}
                  option={option}
                  isActive={activeOption.id === option.id}
                  onClick={onNavigationClick}
                />
              ))}
            </nav>
          )}

          {/* Mobile Menu Button */}
          {showMobileUI && (
            <button
              type="button"
              onClick={onMobileMenuToggle}
              className="flex flex-col items-center justify-center space-y-1 text-white"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </button>
          )}

          {/* Language Switcher */}
          <div className="ml-auto">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileUI && (
          <div
            className={`absolute top-full right-0 left-0 mt-2 transform overflow-hidden rounded-2xl bg-white/10 backdrop-blur transition-all duration-300 ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <nav
              className="flex flex-col space-y-1 p-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navigationOptions.map((option) => (
                <NavigationItem
                  key={option.id}
                  option={option}
                  isActive={activeOption.id === option.id}
                  onClick={(opt) => {
                    onNavigationClick(opt);
                    onMobileMenuToggle(); // Close menu after navigation
                  }}
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
