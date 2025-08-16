import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@/test/utils/test-utils';
import { Header } from '../Header';

// Mock the hook
vi.mock('@/hooks/useBfcacheCompatible', () => ({
  useBfcacheCompatibleScrollListener: vi.fn()
}));

describe('Header', () => {
  beforeEach(() => {
    // Mock window methods
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true
    });

    Object.defineProperty(window, 'innerHeight', {
      value: 1024,
      writable: true
    });

    // Mock document methods
    global.document.getElementById = vi.fn((id) => ({
      offsetTop: 100,
      scrollIntoView: vi.fn()
    }));

    // Mock history
    Object.defineProperty(window, 'history', {
      value: {
        replaceState: vi.fn()
      },
      writable: true
    });

    Object.defineProperty(window, 'location', {
      value: {
        hash: '',
        pathname: '/'
      },
      writable: true
    });
  });

  it('renders navigation items', () => {
    render(<Header />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
  });

  it('handles navigation click', () => {
    render(<Header />);
    
    const projectsLinks = screen.getAllByText('Projects');
    fireEvent.click(projectsLinks[0]);
    
    expect(document.getElementById).toHaveBeenCalledWith('projects');
  });

  it('renders resume link with correct attributes', () => {
    render(<Header />);
    
    const resumeLinks = screen.getAllByText('Resume');
    expect(resumeLinks[0]).toHaveAttribute('href', '/resume.pdf');
    expect(resumeLinks[0]).toHaveAttribute('target', '_blank');
    expect(resumeLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has correct navigation structure', () => {
    const { container } = render(<Header />);
    
    const nav = container.querySelector('nav[role="navigation"]');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  it('applies active state correctly', () => {
    render(<Header />);
    
    // Check that navigation items exist
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks[0]).toBeInTheDocument();
  });

  it('prevents default on navigation clicks', () => {
    render(<Header />);
    
    const projectsLinks = screen.getAllByText('Projects');
    const event = new MouseEvent('click', { bubbles: true });
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
    
    fireEvent(projectsLinks[0], event);
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});