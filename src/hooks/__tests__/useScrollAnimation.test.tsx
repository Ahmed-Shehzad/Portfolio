import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollAnimation } from '../useScrollAnimation';

describe('useScrollAnimation', () => {
  beforeEach(() => {
    // Mock IntersectionObserver
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      // Store callback for manual triggering
      _callback: callback
    }));
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useScrollAnimation());
    
    expect(result.current.isVisible).toBe(false);
    expect(typeof result.current.ref).toBe('object');
  });

  it('creates IntersectionObserver with correct options', () => {
    const options = { threshold: 0.5, rootMargin: '10px' };
    renderHook(() => useScrollAnimation(options));
    
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining(options)
    );
  });

  it('creates observer but does not observe without element', () => {
    const mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    };
    
    (IntersectionObserver as any).mockImplementation(() => mockObserver);
    
    const { result } = renderHook(() => useScrollAnimation());
    
    // Observer is created but observe is not called without element
    expect(IntersectionObserver).toHaveBeenCalled();
    expect(mockObserver.observe).not.toHaveBeenCalled();
    expect(result.current.ref.current).toBe(null);
  });

  it('callback function is properly set up', () => {
    let observerCallback: IntersectionObserverCallback;
    
    (IntersectionObserver as any).mockImplementation((callback: IntersectionObserverCallback) => {
      observerCallback = callback;
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn()
      };
    });
    
    renderHook(() => useScrollAnimation());
    
    // Verify callback was set up
    expect(observerCallback!).toBeDefined();
    expect(typeof observerCallback!).toBe('function');
  });

  it('disconnects observer on unmount', () => {
    const mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn()
    };
    
    (IntersectionObserver as any).mockImplementation(() => mockObserver);
    
    const { unmount } = renderHook(() => useScrollAnimation());
    
    unmount();
    
    expect(mockObserver.disconnect).toHaveBeenCalled();
  });

  it('handles multiple threshold values', () => {
    const options = { threshold: [0, 0.25, 0.5, 0.75, 1] };
    renderHook(() => useScrollAnimation(options));
    
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining(options)
    );
  });

  it('handles custom root element', () => {
    const rootElement = document.createElement('div');
    const options = { root: rootElement };
    
    renderHook(() => useScrollAnimation(options));
    
    expect(IntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining(options)
    );
  });
});