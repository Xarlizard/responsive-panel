import { ResponsivePanelConfig } from './types';
import { getTheme, generateId } from './utils';

/**
 * Create the floating trigger button
 */
export function createTriggerButton(config: Required<ResponsivePanelConfig>): HTMLElement {
  const button = document.createElement('button');
  const id = generateId('trigger');

  button.id = id;
  button.className = `rp-trigger rp-trigger--${config.theme}`;
  button.type = 'button';
  button.setAttribute('aria-label', 'Toggle responsive panel');
  button.setAttribute('title', 'Toggle responsive panel');

  // Add icon
  button.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  // Apply styles
  Object.assign(button.style, getTriggerButtonStyles(config));

  return button;
}

/**
 * Create the main panel HTML structure
 */
export function createPanelHTML(config: Required<ResponsivePanelConfig>): HTMLElement {
  const panel = document.createElement('div');
  const id = generateId('panel');
  const theme = getTheme(config.theme);

  panel.id = id;
  panel.className = `rp-panel rp-panel--${theme} ${config.className}`.trim();

  panel.innerHTML = `    <div class="rp-header">
      <div class="rp-header-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>Responsive Panel</span>
      </div>
      <div class="rp-header-actions">
        <button class="rp-close-btn" type="button" aria-label="Close panel" title="Close panel">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="rp-content">
      <div class="rp-viewports"></div>
    </div>
  `;

  // Apply styles
  Object.assign(panel.style, getPanelStyles(config));

  // Inject CSS if not already present
  injectCSS();

  return panel;
}

/**
 * Get trigger button styles
 */
function getTriggerButtonStyles(config: Required<ResponsivePanelConfig>): Partial<CSSStyleDeclaration> {
  const theme = getTheme(config.theme);

  return {
    position: 'fixed',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: config.zIndex.toString(),
    backgroundColor: theme === 'dark' ? '#2d3748' : '#ffffff',
    color: theme === 'dark' ? '#ffffff' : '#2d3748',
  };
}

/**
 * Get panel styles
 */
function getPanelStyles(config: Required<ResponsivePanelConfig>): Partial<CSSStyleDeclaration> {
  return {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90vw',
    maxWidth: '1200px',
    height: '80vh',
    maxHeight: '800px',
    borderRadius: '12px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    zIndex: config.zIndex.toString(),
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  };
}

/**
 * Inject CSS styles if not already present
 */
function injectCSS(): void {
  const existingStyle = document.querySelector('#rp-styles');
  if (existingStyle) return;

  const style = document.createElement('style');
  style.id = 'rp-styles';
  style.textContent = CSS_STYLES;
  document.head.appendChild(style);
}

/**
 * CSS styles for the responsive panel
 */
const CSS_STYLES = `
  .rp-trigger {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  
  .rp-trigger:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  .rp-trigger:active {
    transform: scale(0.95);
  }
  
  .rp-panel {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    line-height: 1.4;
    color: #2d3748;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    animation: rp-fade-in 0.3s ease;
  }
  
  .rp-panel--dark {
    color: #ffffff;
    background: #2d3748;
    border-color: #4a5568;  }
  
  .rp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid #e2e8f0;
    background: #f7fafc;
    cursor: move;
    min-height: 48px;
    box-sizing: border-box;
  }
  
  .rp-panel--dark .rp-header {
    background: #1a202c;
    border-bottom-color: #4a5568;
  }
  
  .rp-header-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    font-size: 14px;
  }
  
  .rp-header-actions {
    display: flex;
    gap: 4px;
  }
    .rp-close-btn {
    width: 24px;
    height: 24px;
    border: none;
    border-radius: 4px;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;
    color: inherit;
  }
  
  .rp-close-btn:hover {
    background: rgba(0, 0, 0, 0.1);
  }
  
  .rp-panel--dark .rp-close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .rp-content {
    flex: 1;
    overflow: auto;
    padding: 16px;
  }
  
  .rp-viewports {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    align-items: start;
  }
  
  .rp-viewport {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .rp-panel--dark .rp-viewport {
    border-color: #4a5568;
    background: #1a202c;
  }
    .rp-viewport-label {
    padding: 8px 12px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
    color: #4a5568;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .rp-viewport-label:hover {
    background: #edf2f7;
  }
  
  .rp-panel--dark .rp-viewport-label {
    background: #2d3748;
    border-bottom-color: #4a5568;
    color: #a0aec0;
  }

  .rp-panel--dark .rp-viewport-label:hover {
    background: #4a5568;
  }

  .rp-fullscreen .rp-viewports {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .rp-back-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    color: #4a5568;
    transition: all 0.2s ease;
    margin-bottom: 16px;
  }

  .rp-back-btn:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
  }

  .rp-panel--dark .rp-back-btn {
    background: #2d3748;
    border-color: #4a5568;
    color: #a0aec0;
  }

  .rp-panel--dark .rp-back-btn:hover {
    background: #4a5568;
    border-color: #718096;
  }

  .rp-fullscreen-viewport {
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    background: #ffffff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  .rp-panel--dark .rp-fullscreen-viewport {
    border-color: #4a5568;
    background: #1a202c;
  }

  .rp-fullscreen-viewport iframe {
    display: block;
    border: none;
    width: 100%;
    height: 100%;
    background: #ffffff;
  }
  
  .rp-viewport iframe {
    display: block;
    border: none;
    width: 100%;
    height: 100%;
    background: #ffffff;
  }
  
  @keyframes rp-fade-in {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @media (max-width: 768px) {
    .rp-panel {
      width: 95vw;
      height: 85vh;
    }
    
    .rp-viewports {
      grid-template-columns: 1fr;
    }
  }
    @media (prefers-reduced-motion: reduce) {
    .rp-trigger,
    .rp-panel,
    .rp-close-btn {
      transition: none;
    }
    
    .rp-panel {
      animation: none;
    }
  }
`;

/**
 * Create a loading spinner element
 */
export function createLoadingSpinner(): HTMLElement {
  const spinner = document.createElement('div');
  spinner.className = 'rp-loading-spinner';
  spinner.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="60 40" opacity="0.3"/>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  return spinner;
}

/**
 * Create an error message element
 */
export function createErrorMessage(message: string): HTMLElement {
  const error = document.createElement('div');
  error.className = 'rp-error-message';
  error.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
    </svg>
    <span>${message}</span>
  `;

  return error;
}
