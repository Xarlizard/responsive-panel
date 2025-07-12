import { DefaultBreakpoints } from './types';

/**
 * Default breakpoint configurations
 */
export const DEFAULT_BREAKPOINTS: DefaultBreakpoints = {
  mobile: {
    width: 320,
    height: 568,
    label: 'Mobile Portrait',
    enabled: true
  },
  mobileLandscape: {
    width: 480,
    height: 320,
    label: 'Mobile Landscape',
    enabled: true
  },
  tablet: {
    width: 768,
    height: 1024,
    label: 'Tablet',
    enabled: true
  },
  laptop: {
    width: 1024,
    height: 768,
    label: 'Small Laptop',
    enabled: true
  },
  desktop: {
    width: 1280,
    height: 800,
    label: 'Desktop',
    enabled: true
  }
};

/**
 * Default breakpoint widths as array
 */
export const DEFAULT_BREAKPOINT_WIDTHS: number[] = [320, 480, 768, 1024, 1280];

/**
 * Default z-index for panel overlay
 */
export const DEFAULT_Z_INDEX = 999999;

/**
 * Default panel dimensions
 */
export const PANEL_DIMENSIONS = {
  minWidth: 300,
  minHeight: 200,
  maxWidth: 1200,
  maxHeight: 800
};

/**
 * Animation durations in milliseconds
 */
export const ANIMATION_DURATIONS = {
  open: 300,
  close: 200,
  minimize: 150,
  drag: 0
};

/**
 * Throttle delays in milliseconds
 */
export const THROTTLE_DELAYS = {
  scroll: 50,
  resize: 100,
  drag: 16
};
