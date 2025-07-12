import { ResponsivePanelConfig } from './types';
import { DEFAULT_BREAKPOINT_WIDTHS, DEFAULT_Z_INDEX } from './constants';

/**
 * Get default configuration merged with user config
 */
export function getDefaultConfig(): Required<ResponsivePanelConfig> {
  return {
    breakpoints: DEFAULT_BREAKPOINT_WIDTHS,
    position: 'bottom-right',
    theme: 'auto',
    liveSync: false,
    className: '',
    showLabels: true,
    labels: [],
    zIndex: DEFAULT_Z_INDEX,
    customBreakpoints: []
  };
}

/**
 * Calculate scale factor for viewport
 */
export function calculateScale(containerWidth: number, viewportWidth: number): number {
  return Math.min(1, containerWidth / viewportWidth);
}

/**
 * Throttle function to limit execution frequency
 */
export function throttle<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Debounce function to delay execution
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Detect if running in production environment
 */
export function isProduction(): boolean {
  // Check Node.js environment
  if (typeof process !== 'undefined' && process.env) {
    return process.env.NODE_ENV === 'production';
  }

  // Check browser environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return !hostname.includes('localhost') &&
      !hostname.includes('127.0.0.1') &&
      !hostname.includes('.local') &&
      !hostname.includes('dev.');
  }

  return false;
}

/**
 * Get current theme preference
 */
export function getTheme(configTheme: 'light' | 'dark' | 'auto'): 'light' | 'dark' {
  if (configTheme !== 'auto') {
    return configTheme;
  }

  // Check system preference
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  return 'light';
}

/**
 * Generate unique ID for elements
 */
export function generateId(prefix: string = 'rp'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Get element position relative to viewport
 */
export function getElementPosition(element: Element): { x: number; y: number } {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY
  };
}

/**
 * Check if element is in viewport
 */
export function isElementInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Deep merge objects
 */
export function deepMerge<T>(target: T, source: Partial<T>): T {
  const result = { ...target };

  Object.keys(source).forEach(key => {
    const sourceValue = source[key as keyof T];
    const targetValue = result[key as keyof T];

    if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
      result[key as keyof T] = deepMerge(targetValue || {} as T[keyof T], sourceValue);
    } else {
      result[key as keyof T] = sourceValue as T[keyof T];
    }
  });

  return result;
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get CSS custom property value
 */
export function getCSSCustomProperty(property: string, element?: Element): string {
  const target = element || document.documentElement;
  return getComputedStyle(target).getPropertyValue(property).trim();
}

/**
 * Set CSS custom property
 */
export function setCSSCustomProperty(property: string, value: string, element?: Element): void {
  const target = element || document.documentElement;
  (target as HTMLElement).style.setProperty(property, value);
}
