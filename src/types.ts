/**
 * Configuration options for the responsive panel
 */
export interface ResponsivePanelConfig {
  /** Array of breakpoint widths in pixels */
  breakpoints?: number[];
  /** Position of the floating trigger button */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Theme for the panel UI */
  theme?: 'light' | 'dark' | 'auto';
  /** Whether to enable live sync between viewports */
  liveSync?: boolean;
  /** Custom CSS class for the panel container */
  className?: string;
  /** Whether to show labels for each breakpoint */
  showLabels?: boolean;
  /** Custom labels for breakpoints */
  labels?: string[];
  /** Z-index for the panel overlay */
  zIndex?: number;
  /** Custom breakpoint configurations */
  customBreakpoints?: BreakpointConfig[];
}

/**
 * Configuration for individual breakpoints
 */
export interface BreakpointConfig {
  /** Width in pixels */
  width: number;
  /** Height in pixels (optional, defaults to auto) */
  height?: number;
  /** Custom label for this breakpoint */
  label?: string;
  /** Whether this breakpoint should be shown by default */
  enabled?: boolean;
}

/**
 * Default breakpoint configurations
 */
export interface DefaultBreakpoints {
  mobile: BreakpointConfig;
  mobileLandscape: BreakpointConfig;
  tablet: BreakpointConfig;
  laptop: BreakpointConfig;
  desktop: BreakpointConfig;
}

/**
 * Panel state interface
 */
export interface PanelState {
  isOpen: boolean;
  isDragging: boolean;
  position: { x: number; y: number };
  activeBreakpoints: number[];
  isFullscreen: boolean;
  fullscreenViewport?: ViewportInfo;
}

/**
 * Viewport information
 */
export interface ViewportInfo {
  width: number;
  height: number;
  label: string;
  scale: number;
}

/**
 * Event types for panel interactions
 */
export type PanelEventType = 'open' | 'close' | 'drag' | 'breakpointToggle' | 'enterFullscreen' | 'exitFullscreen';

/**
 * Event handler function type
 */
export type PanelEventHandler = (event: PanelEventType, data?: unknown) => void;

/**
 * Internal panel instance interface
 */
export interface ResponsivePanelInstance {
  open(): void;
  close(): void;
  toggle(): void;
  destroy(): void;
  updateConfig(config: Partial<ResponsivePanelConfig>): void;
  on(event: PanelEventType, handler: PanelEventHandler): void;
  off(event: PanelEventType, handler: PanelEventHandler): void;
}