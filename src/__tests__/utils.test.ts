import {
  getDefaultConfig,
  calculateScale,
  throttle,
  debounce,
  isProduction,
  getTheme,
  generateId,
  clamp,
  deepMerge,
  formatBytes
} from '../utils';

describe('Utils', () => {
  describe('getDefaultConfig', () => {
    test('should return default configuration', () => {
      const config = getDefaultConfig();

      expect(config).toHaveProperty('breakpoints');
      expect(config).toHaveProperty('position');
      expect(config).toHaveProperty('theme');
      expect(config).toHaveProperty('liveSync');
      expect(config).toHaveProperty('showLabels');
      expect(config).toHaveProperty('zIndex');
      expect(config.breakpoints).toEqual([320, 480, 768, 1024, 1280]);
      expect(config.position).toBe('bottom-right');
      expect(config.theme).toBe('auto');
      expect(config.liveSync).toBe(false);
      expect(config.showLabels).toBe(true);
    });
  });

  describe('calculateScale', () => {
    test('should calculate correct scale factor', () => {
      expect(calculateScale(320, 320)).toBe(1);
      expect(calculateScale(320, 640)).toBe(0.5);
      expect(calculateScale(640, 320)).toBe(1);
    });

    test('should not exceed scale of 1', () => {
      expect(calculateScale(100, 50)).toBe(1);
      expect(calculateScale(200, 100)).toBe(1);
    });
  });

  describe('throttle', () => {
    test('should throttle function calls', (done) => {
      const mockFn = jest.fn();
      const throttledFn = throttle(mockFn, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(mockFn).toHaveBeenCalledTimes(1);

      setTimeout(() => {
        throttledFn();
        expect(mockFn).toHaveBeenCalledTimes(2);
        done();
      }, 150);
    });
  });

  describe('debounce', () => {
    test('should debounce function calls', (done) => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).toHaveBeenCalledTimes(0);

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1);
        done();
      }, 150);
    });
  });
  describe('isProduction', () => {
    const originalEnv = process.env.NODE_ENV;

    afterEach(() => {
      process.env.NODE_ENV = originalEnv;
    });

    test('should return true in production', () => {
      process.env.NODE_ENV = 'production';
      expect(isProduction()).toBe(true);
    });

    test('should return false in development', () => {
      process.env.NODE_ENV = 'development';
      expect(isProduction()).toBe(false);
    }); test.skip('should return false for localhost', () => {
      process.env.NODE_ENV = 'production';

      // Mock location.hostname using jest.spyOn
      const locationSpy = jest.spyOn(window, 'location', 'get').mockReturnValue({
        ...window.location,
        hostname: 'localhost'
      });

      expect(isProduction()).toBe(false);

      locationSpy.mockRestore();
    });
  });
  describe('getTheme', () => {
    test('should return specified theme', () => {
      expect(getTheme('light')).toBe('light');
      expect(getTheme('dark')).toBe('dark');
    });

    test('should return system preference for auto', () => {
      // Mock matchMedia for this test
      const mockMatchMedia = jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
      }));

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: mockMatchMedia,
      });

      expect(getTheme('auto')).toBe('dark');
    });
  });

  describe('generateId', () => {
    test('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).not.toBe(id2);
      expect(id1).toMatch(/^rp-\d+-[a-z0-9]+$/);
    });

    test('should use custom prefix', () => {
      const id = generateId('custom');
      expect(id).toMatch(/^custom-\d+-[a-z0-9]+$/);
    });
  });

  describe('clamp', () => {
    test('should clamp values correctly', () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });
  }); describe('deepMerge', () => {
    test('should merge objects deeply', () => {
      const target = {
        a: 1,
        b: {
          c: 2,
          d: 3,
        },
      };

      const source = {
        a: 5,
        b: {
          c: 4,
        },
      } as Partial<typeof target>;

      const result = deepMerge(target, source);

      expect(result).toEqual({
        a: 5,
        b: {
          c: 4,
          d: 3,
        },
      });
    });
  });

  describe('formatBytes', () => {
    test('should format bytes correctly', () => {
      expect(formatBytes(0)).toBe('0 Bytes');
      expect(formatBytes(1024)).toBe('1 KB');
      expect(formatBytes(1024 * 1024)).toBe('1 MB');
      expect(formatBytes(1024 * 1024 * 1024)).toBe('1 GB');
    });

    test('should handle decimals', () => {
      expect(formatBytes(1536, 1)).toBe('1.5 KB');
      expect(formatBytes(1536, 0)).toBe('2 KB');
    });
  });
});
