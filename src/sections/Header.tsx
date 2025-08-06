"use client";

import { useState, useEffect, useMemo, useCallback, FC } from "react";

interface HeaderOption {
  title: string;
  href: string;
  id: string; // Pre-computed id
}

interface SectionElement {
  id: string;
  element: HTMLElement;
  offsetTop: number; // Cache offsetTop
}

interface NavigationItemProps {
  option: HeaderOption;
  isActive: boolean;
  onClick: (option: HeaderOption) => void;
}

// Constants for better maintainability
const SCROLL_OFFSET = 150;
const HEADER_OFFSET = 100;
const BOTTOM_THRESHOLD = 10;

const headerOptions: HeaderOption[] = [
  {
    title: "Home",
    href: "#home",
    id: "home",
  },
  {
    title: "Projects",
    href: "#projects",
    id: "projects",
  },
  {
    title: "About",
    href: "#about",
    id: "about",
  },
  {
    title: "Contact",
    href: "#contact",
    id: "contact",
  },
];

/**
 * Individual navigation item component
 */
const NavigationItem: FC<NavigationItemProps> = (props) => {
  const { option, isActive, onClick } = props;
  const className = `nav-item ${
    isActive
      ? "bg-white text-gray-900 hover:bg-white/70 hover:text-gray-900"
      : ""
  }`;

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
 * Optimized header navigation bar for the portfolio site.
 * Features: Auto-scroll detection, URL sync, smooth scrolling
 */
export const Header = () => {
  const [activeOption, setActiveOption] = useState<HeaderOption>(
    headerOptions[0]
  );
  const [sectionElements, setSectionElements] = useState<SectionElement[]>([]);

  // Initialize section elements after component mounts (client-side only)
  useEffect(() => {
    const elements = headerOptions
      .map((option) => {
        const element = document.getElementById(option.id);
        return element
          ? {
              id: option.id,
              element,
              offsetTop: element.offsetTop,
            }
          : null;
      })
      .filter((section): section is SectionElement => section !== null);

    setSectionElements(elements);
  }, []);

  // Memoize contact section for bottom detection
  const contactSection = useMemo(
    () => headerOptions.find((option) => option.id === "contact"),
    []
  );

  // Optimized URL update function
  const updateURL = useCallback((section: HeaderOption) => {
    if (typeof window === "undefined") return; // SSR check

    const currentHash = window.location.hash;
    if (currentHash !== section.href) {
      const newUrl = `${window.location.pathname}${section.href}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, []);

  // Optimized active section detection
  const updateActiveSection = useCallback(() => {
    if (typeof window === "undefined" || sectionElements.length === 0) return; // SSR check

    let currentSection = headerOptions[0];
    const scrollPosition = window.scrollY + SCROLL_OFFSET;

    // Check if at bottom of page
    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - BOTTOM_THRESHOLD;

    if (isAtBottom && contactSection) {
      currentSection = contactSection;
    } else {
      // Find active section using cached offsetTop values
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (scrollPosition >= section.offsetTop) {
          const matchingOption = headerOptions.find(
            (option) => option.id === section.id
          );
          if (matchingOption) {
            currentSection = matchingOption;
            break;
          }
        }
      }
    }

    updateURL(currentSection);
    setActiveOption(currentSection);
  }, [sectionElements, contactSection, updateURL]);

  // Throttled scroll handler
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR check

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Set initial state after elements are loaded
    if (sectionElements.length > 0) {
      updateActiveSection();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [updateActiveSection, sectionElements]);

  // Optimized navigation click handler
  const handleNavClick = useCallback(
    (option: HeaderOption) => {
      setActiveOption(option);
      updateURL(option);

      if (typeof window === "undefined") return; // SSR check

      const element = document.getElementById(option.id);
      if (element) {
        const scrollToPosition = element.offsetTop - HEADER_OFFSET;
        window.scrollTo({
          top: Math.max(0, scrollToPosition),
          behavior: "smooth",
        });
      }
    },
    [updateURL]
  );

  return (
    <header
      className="fixed top-0 w-full z-10 bg-black/10 backdrop-blur-sm border-b border-white/10"
      role="banner"
    >
      <div className="flex justify-center items-center w-full pt-8 pb-4 px-4 md:px-24">
        <nav
          className="flex gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur"
          role="navigation"
          aria-label="Main navigation"
        >
          {headerOptions.map((option) => (
            <NavigationItem
              key={option.title}
              option={option}
              isActive={activeOption.title === option.title}
              onClick={handleNavClick}
            />
          ))}
        </nav>
      </div>
    </header>
  );
};
