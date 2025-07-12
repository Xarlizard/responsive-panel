// Test setup file for DOM environment

// Mock process.env
Object.defineProperty(process, 'env', {
  value: {
    NODE_ENV: 'development',
    ...process.env,
  },
  writable: true,
});

// Mock global objects that might be used
Object.defineProperty(global, 'ResizeObserver', {
  value: class ResizeObserver {
    constructor() { }
    observe(): void { }
    unobserve(): void { }
    disconnect(): void { }
  },
  writable: true,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

// Mock console methods to avoid noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
