import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { ContactSection } from '../Contact';

// Mock SVG imports
vi.mock('@/assets/icons/arrow-up-right.svg', () => ({
  default: vi.fn(() => <div data-testid="arrow-up-right-icon" />)
}));

// Mock image imports
vi.mock('@/assets/images/grain.jpg', () => ({
  default: { src: '/grain.jpg' }
}));

// Mock components
vi.mock('@/components/features', () => ({
  ContactModal: vi.fn(({ isOpen, onClose }) => 
    isOpen ? <div data-testid="contact-modal" onClick={onClose}>Contact Modal</div> : null
  )
}));

vi.mock('@/wrappers', () => ({
  ScrollAnimationWrapper: vi.fn(({ children }) => <div data-testid="scroll-wrapper">{children}</div>)
}));

describe('ContactSection', () => {
  it('renders contact section content', () => {
    render(<ContactSection />);
    
    expect(screen.getByText("Let's create something amazing together")).toBeInTheDocument();
    expect(screen.getByText(/Ready to bring your project to life/)).toBeInTheDocument();
  });

  it('renders contact button', () => {
    render(<ContactSection />);
    
    const contactButtons = screen.getAllByRole('button', { name: /contact me/i });
    expect(contactButtons[0]).toBeInTheDocument();
  });

  it('opens contact modal when button clicked', async () => {
    render(<ContactSection />);
    
    const contactButtons = screen.getAllByRole('button', { name: /contact me/i });
    fireEvent.click(contactButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('contact-modal')).toBeInTheDocument();
    });
  });

  it('closes contact modal', async () => {
    render(<ContactSection />);
    
    const contactButtons = screen.getAllByRole('button', { name: /contact me/i });
    fireEvent.click(contactButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId('contact-modal')).toBeInTheDocument();
    });

    const modal = screen.getByTestId('contact-modal');
    fireEvent.click(modal);
    
    await waitFor(() => {
      expect(screen.queryByTestId('contact-modal')).not.toBeInTheDocument();
    });
  });

  it('renders scroll animation wrapper', () => {
    render(<ContactSection />);
    
    expect(screen.getAllByTestId('scroll-wrapper')[0]).toBeInTheDocument();
  });

  it('has correct section id', () => {
    const { container } = render(<ContactSection />);
    const section = container.querySelector('#contact');
    expect(section).toBeInTheDocument();
  });
});