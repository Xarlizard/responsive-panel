# Responsive Panel 🎯

[![npm version](https://badge.fury.io/js/responsive-panel.svg?refresh=1)](https://badge.fury.io/js/responsive-panel)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A powerful development tool that helps frontend developers visualize and test responsive design breakpoints in real-time. It provides a floating panel that shows your webpage across multiple viewport sizes simultaneously, with fullscreen mode for detailed testing.

## 🚀 Features

- **📱 Multi-viewport preview** - See your site across different breakpoints simultaneously
- **🖱️ Fullscreen mode** - Click viewport headers for detailed breakpoint testing
- **🎯 Smart trigger hiding** - No recursive panels in iframe views
- **🔧 Draggable interface** - Move panel and floating button independently
- **⚡ Live sync** - Synchronized scrolling and form inputs across viewports
- **🎨 Theme support** - Light, dark, or auto themes
- **🛡️ Dev-only** - Automatically disabled in production
- **📦 Framework agnostic** - Works with React, Vue, Angular, vanilla JS

## 📦 Installation

```bash
npm install responsive-panel --save-dev
```

## 🎯 Quick Start

### ES Modules

```javascript
import { ResponsivePanel } from "responsive-panel";

const panel = new ResponsivePanel({
  position: "top-right",
  showLabels: true,
  breakpoints: [320, 576, 768, 992, 1200, 1400],
  labels: ["Mobile", "Small", "Medium", "Large", "XL", "XXL"],
});
```

### Auto-injection

```javascript
import { injectResponsivePanel } from "responsive-panel";

// Simple injection with defaults
injectResponsivePanel();

// With custom config
injectResponsivePanel({
  position: "bottom-left",
  theme: "dark",
  liveSync: true,
});
```

## ⚙️ Configuration

| Option        | Type       | Default                       | Description                             |
| ------------- | ---------- | ----------------------------- | --------------------------------------- |
| `breakpoints` | `number[]` | `[320, 480, 768, 1024, 1280]` | Viewport widths in pixels               |
| `labels`      | `string[]` | `[]`                          | Custom labels for breakpoints           |
| `position`    | `string`   | `'bottom-right'`              | Position of floating button             |
| `theme`       | `string`   | `'auto'`                      | UI theme: `'light'`, `'dark'`, `'auto'` |
| `liveSync`    | `boolean`  | `false`                       | Sync interactions across viewports      |
| `showLabels`  | `boolean`  | `true`                        | Show breakpoint labels                  |
| `zIndex`      | `number`   | `10000`                       | Z-index for panel overlay               |

## 🎮 Usage

1. **Open Panel**: Click the floating button
2. **Fullscreen Mode**: Click any viewport header for detailed view
3. **Navigate Back**: Use "Back to Dashboard" button
4. **Drag Panel**: Click and drag the panel header
5. **Move Button**: Drag the floating button to reposition

## 🔧 API Reference

### Methods

```javascript
const panel = new ResponsivePanel(config);

panel.open(); // Open the panel
panel.close(); // Close the panel
panel.toggle(); // Toggle panel visibility
panel.destroy(); // Clean up and remove panel

// Event handling
panel.on("open", () => console.log("Panel opened"));
panel.on("enterFullscreen", (event, viewport) =>
  console.log("Fullscreen:", viewport)
);
```

### Events

- `open` - Panel opened
- `close` - Panel closed
- `enterFullscreen` - Entered fullscreen mode
- `exitFullscreen` - Exited fullscreen mode
- `drag` - Panel or button dragged

## 🎨 Themes

The panel supports three themes:

- **Light**: Clean light interface
- **Dark**: Dark mode for night development
- **Auto**: Follows system preference

## 🛡️ Production Safety

The responsive panel automatically detects production environments and disables itself to prevent accidental inclusion in production builds.

## 📄 License

MIT © [Responsive Panel](LICENSE)

## 🤝 Contributing

Contributions are welcome! Please read our [Code of Conduct](CODE_OF_CONDUCT.md) and check the [API documentation](API.md) for development guidelines.

### pnpm

```bash
pnpm add responsive-panel --save-dev
```

### GitHub Packages

```bash
npm install @xarlizard/responsive-panel
```

> **Note**: For GitHub Packages, you'll need to configure your `.npmrc` file. See [PUBLISHING.md](./PUBLISHING.md) for details.

## 🚀 Quick Start

### Basic Usage

```javascript
// index.js or main entry point
import { injectResponsivePanel } from "responsive-panel";

if (process.env.NODE_ENV !== "production") {
  injectResponsivePanel();
}
```

### React Example

```jsx
import React, { useEffect } from "react";
import { injectResponsivePanel } from "responsive-panel";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const panel = injectResponsivePanel({
        breakpoints: [320, 480, 768, 1024, 1280],
        theme: "auto",
        liveSync: true,
      });

      return () => panel?.destroy();
    }
  }, []);

  return <div>Your app content</div>;
}
```

### Vue Example

```vue
<template>
  <div>Your app content</div>
</template>

<script>
import { injectResponsivePanel } from "responsive-panel";

export default {
  mounted() {
    if (process.env.NODE_ENV !== "production") {
      this.panel = injectResponsivePanel();
    }
  },
  beforeDestroy() {
    this.panel?.destroy();
  },
};
</script>
```

### Script Tag Usage

```html
<script
  src="https://unpkg.com/responsive-panel@latest/dist/index.esm.js"
  type="module"
  data-breakpoints="[320, 480, 768, 1024, 1280]"
  data-theme="dark"
  data-position="bottom-right"
></script>
```

## 📚 Configuration

```javascript
injectResponsivePanel({
  // Array of breakpoint widths in pixels
  breakpoints: [320, 480, 768, 1024, 1280],

  // Position of the floating trigger button
  position: "bottom-right", // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

  // Theme for the panel UI
  theme: "auto", // 'light' | 'dark' | 'auto'

  // Whether to enable live sync between viewports
  liveSync: false,

  // Custom CSS class for the panel container
  className: "my-custom-panel",

  // Whether to show labels for each breakpoint
  showLabels: true,

  // Custom labels for breakpoints
  labels: ["Mobile", "Tablet", "Desktop"],

  // Z-index for the panel overlay
  zIndex: 999999,

  // Whether the panel starts minimized
  startMinimized: false,

  // Custom breakpoint configurations
  customBreakpoints: [
    { width: 320, height: 568, label: "iPhone SE", enabled: true },
    { width: 768, height: 1024, label: "iPad", enabled: true },
    { width: 1440, height: 900, label: "MacBook", enabled: true },
  ],
});
```

## 📖 API Reference

### `injectResponsivePanel(config?)`

Injects the responsive panel into the current page.

**Parameters:**

- `config` (optional): Configuration object

**Returns:** `ResponsivePanel` instance or `null` in production

### `ResponsivePanel` Methods

```javascript
const panel = injectResponsivePanel();

// Control panel visibility
panel.open();
panel.close();
panel.toggle();

// Control panel state
panel.minimize();
panel.maximize();

// Update configuration
panel.updateConfig({ theme: "dark" });

// Event listeners
panel.on("open", () => console.log("Panel opened"));
panel.on("close", () => console.log("Panel closed"));
panel.off("open", handler);

// Cleanup
panel.destroy();
```

### Events

- `open`: Panel is opened
- `close`: Panel is closed
- `minimize`: Panel is minimized
- `maximize`: Panel is maximized
- `drag`: Panel is being dragged
- `breakpointToggle`: Breakpoint visibility toggled

## 🔧 Advanced Usage

### Custom Breakpoints

```javascript
injectResponsivePanel({
  customBreakpoints: [
    { width: 320, height: 568, label: "iPhone SE", enabled: true },
    { width: 375, height: 667, label: "iPhone 8", enabled: true },
    { width: 414, height: 896, label: "iPhone 11", enabled: true },
    { width: 768, height: 1024, label: "iPad", enabled: true },
    { width: 1024, height: 768, label: "iPad Landscape", enabled: false },
    { width: 1440, height: 900, label: "MacBook", enabled: true },
  ],
});
```

### Programmatic Control

```javascript
const panel = injectResponsivePanel();

// Open panel programmatically
setTimeout(() => {
  panel.open();
}, 2000);

// Listen for events
panel.on("open", () => {
  console.log("Panel is now open");
});

panel.on("breakpointToggle", (data) => {
  console.log(`Breakpoint ${data.width}px toggled`);
});
```

### Integration with Build Tools

#### Webpack

```javascript
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
  ],
};
```

#### Vite

```javascript
// vite.config.js
export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
  },
});
```

## 🤝 TypeScript Support

The package includes full TypeScript definitions:

```typescript
import { ResponsivePanelConfig, ResponsivePanel } from "responsive-panel";

const config: ResponsivePanelConfig = {
  breakpoints: [320, 768, 1024],
  theme: "dark",
  liveSync: true,
};

const panel: ResponsivePanel | null = injectResponsivePanel(config);
```

## 🛠️ Requirements

- **Node.js**: 14+ (for build tools)
- **Browser**: Modern browsers with ES2018+ support
- **Framework**: Works with any or no framework

## 🎯 Use Cases

- **QA Testing**: Visual layout testing across devices
- **Development**: Real-time responsive design feedback
- **Design Systems**: Building responsive UI components
- **Client Demos**: Showcasing responsive behavior
- **Debugging**: Identifying layout issues quickly

## 📱 Browser Support

- Chrome 63+
- Firefox 67+
- Safari 12+
- Edge 79+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by browser developer tools
- Built with modern web standards
- Designed for developer productivity

---

Made with ❤️ by [Xarlizard](https://github.com/xarlizard)
