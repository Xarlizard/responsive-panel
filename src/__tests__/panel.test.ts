import { ResponsivePanel } from '../panel';
import { injectResponsivePanel } from '../inject';

describe('ResponsivePanel', () => {
  beforeEach(() => {
    // Clear DOM
    document.body.innerHTML = '';

    // Reset environment
    process.env.NODE_ENV = 'development';
  });

  afterEach(() => {
    // Clean up any instances
    jest.clearAllMocks();
  });

  test('should create instance with default config', () => {
    const panel = new ResponsivePanel();
    expect(panel).toBeDefined();
    expect(panel).toBeInstanceOf(ResponsivePanel);
  });
  test('should create instance with custom config', () => {
    const config = {
      breakpoints: [320, 768, 1024],
      position: 'top-left' as const,
      theme: 'dark' as const,
      liveSync: true,
    };

    const panel = new ResponsivePanel(config);
    expect(panel).toBeDefined();
    panel.destroy();
  });
  test('should not initialize in production mode', () => {
    process.env.NODE_ENV = 'production';
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const panel = new ResponsivePanel();
    expect(panel).toBeDefined();
    expect(consoleSpy).toHaveBeenCalledWith('ResponsivePanel: Skipping initialization in production mode');

    consoleSpy.mockRestore();
  });
  test('should have open/close methods', () => {
    const panel = new ResponsivePanel();
    expect(typeof panel.open).toBe('function');
    expect(typeof panel.close).toBe('function');
    expect(typeof panel.toggle).toBe('function');
  });

  test('should have fullscreen methods', () => {
    const panel = new ResponsivePanel();
    expect(typeof panel.enterFullscreen).toBe('function');
    expect(typeof panel.exitFullscreen).toBe('function');
  });

  test('should have event methods', () => {
    const panel = new ResponsivePanel();
    expect(typeof panel.on).toBe('function');
    expect(typeof panel.off).toBe('function');
  });
  test('should have destroy method', () => {
    const panel = new ResponsivePanel();
    expect(typeof panel.destroy).toBe('function');
    panel.destroy();
  });

  test('should have updateConfig method', () => {
    const panel = new ResponsivePanel();
    expect(typeof panel.updateConfig).toBe('function');

    panel.updateConfig({ theme: 'dark' });
    panel.destroy();
  });
});

describe('injectResponsivePanel', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'development';
  });
  test('should inject panel in development mode', () => {
    const panel = injectResponsivePanel();
    expect(panel).toBeInstanceOf(ResponsivePanel);
    panel?.destroy();
  });

  test('should not inject panel in production mode', () => {
    process.env.NODE_ENV = 'production';
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    const panel = injectResponsivePanel();
    expect(panel).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('ResponsivePanel: Skipping initialization in production mode');

    consoleSpy.mockRestore();
  });
  test('should inject panel with custom config', () => {
    const config = {
      breakpoints: [320, 768],
      theme: 'dark' as const,
    };

    const panel = injectResponsivePanel(config);
    expect(panel).toBeInstanceOf(ResponsivePanel);
    panel?.destroy();
  });
});
