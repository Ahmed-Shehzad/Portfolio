import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils/test-utils';
import { Card } from '../Card';

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Test content</Card>);
    
    const card = screen.getByText('Test content');
    expect(card).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">Test content</Card>
    );
    
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass('custom-class');
  });

  it('renders as div element', () => {
    const { container } = render(
      <Card>Card content</Card>
    );
    
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('passes through additional props', () => {
    render(
      <Card data-testid="test-card" aria-label="Test card">
        Test content
      </Card>
    );
    
    const card = screen.getByTestId('test-card');
    expect(card).toHaveAttribute('aria-label', 'Test card');
  });

  it('handles complex children', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Description</p>
        <button>Action</button>
      </Card>
    );
    
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('applies default styling classes', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    
    // Check for common card styling classes
    expect(card.className).toContain('bg-');
    expect(card.className).toContain('border');
    expect(card.className).toContain('rounded');
  });
});