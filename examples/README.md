# Responsive Panel Examples

This directory contains examples of how to use the responsive-panel package in different scenarios.

## Basic HTML Example

See `basic.html` for a simple implementation using script tags.

## React Example

See `react-example.tsx` for usage in a React application.

## Vue.js Example

```vue
<template>
  <div id="app">
    <h1>Vue.js + Responsive Panel</h1>
    <p>Your Vue app content here...</p>
  </div>
</template>

<script>
import { injectResponsivePanel } from "responsive-panel";

export default {
  name: "App",
  mounted() {
    if (process.env.NODE_ENV !== "production") {
      this.panel = injectResponsivePanel({
        breakpoints: [320, 480, 768, 1024, 1280],
        theme: "auto",
        liveSync: true,
      });
    }
  },
  beforeDestroy() {
    if (this.panel) {
      this.panel.destroy();
    }
  },
};
</script>
```

## Angular Example

```typescript
// app.component.ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  injectResponsivePanel,
  ResponsivePanelInstance,
} from "responsive-panel";

@Component({
  selector: "app-root",
  template: `
    <div>
      <h1>Angular + Responsive Panel</h1>
      <p>Your Angular app content here...</p>
    </div>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private panel: ResponsivePanelInstance | null = null;

  ngOnInit() {
    if (process.env["NODE_ENV"] !== "production") {
      this.panel = injectResponsivePanel({
        breakpoints: [320, 480, 768, 1024, 1280],
        theme: "dark",
        position: "bottom-right",
      });
    }
  }

  ngOnDestroy() {
    if (this.panel) {
      this.panel.destroy();
    }
  }
}
```

## Next.js Example

```jsx
// pages/_app.js
import { useEffect } from "react";
import { injectResponsivePanel } from "responsive-panel";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const panel = injectResponsivePanel({
        breakpoints: [320, 480, 768, 1024, 1280, 1440],
        theme: "auto",
        liveSync: true,
        showLabels: true,
      });

      return () => {
        panel?.destroy();
      };
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
```

## Vite Example

```javascript
// main.js
import { injectResponsivePanel } from "responsive-panel";

// Inject only in development
if (import.meta.env.DEV) {
  injectResponsivePanel({
    breakpoints: [320, 480, 768, 1024, 1280],
    theme: "auto",
    position: "bottom-right",
  });
}
```

## Webpack Example

```javascript
// webpack.config.js
const webpack = require("webpack");

module.exports = {
  // ... other config
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    }),
  ],
};

// main.js
import { injectResponsivePanel } from "responsive-panel";

if (process.env.NODE_ENV !== "production") {
  injectResponsivePanel();
}
```

## Custom Configuration Examples

### Mobile-First Development

```javascript
injectResponsivePanel({
  breakpoints: [320, 375, 414, 768],
  labels: ["iPhone SE", "iPhone 8", "iPhone 11", "iPad"],
  theme: "dark",
  liveSync: true,
});
```

### Desktop-Focused Development

```javascript
injectResponsivePanel({
  breakpoints: [1024, 1280, 1440, 1920],
  labels: ["Small Laptop", "Medium Desktop", "Large Desktop", "4K"],
  theme: "light",
  position: "top-left",
});
```

### Custom Breakpoints with Specific Devices

```javascript
injectResponsivePanel({
  customBreakpoints: [
    { width: 320, height: 568, label: "iPhone SE", enabled: true },
    { width: 375, height: 667, label: "iPhone 8", enabled: true },
    { width: 375, height: 812, label: "iPhone X", enabled: true },
    { width: 414, height: 896, label: "iPhone 11", enabled: true },
    { width: 768, height: 1024, label: "iPad", enabled: true },
    { width: 1024, height: 1366, label: "iPad Pro", enabled: false },
    { width: 1440, height: 900, label: "MacBook", enabled: true },
  ],
  theme: "auto",
  liveSync: true,
});
```

## Event Handling

```javascript
const panel = injectResponsivePanel();

// Listen for panel events
panel.on("open", () => {
  console.log("Panel opened");
});

panel.on("close", () => {
  console.log("Panel closed");
});

panel.on("minimize", () => {
  console.log("Panel minimized");
});

panel.on("drag", (data) => {
  console.log("Panel dragged to:", data.position);
});

// Programmatic control
setTimeout(() => {
  panel.open();
}, 2000);

// Update configuration
panel.updateConfig({
  theme: "dark",
  breakpoints: [320, 768, 1024],
});
```

## CDN Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Responsive Panel CDN Example</title>
  </head>
  <body>
    <h1>My Website</h1>
    <p>Content here...</p>

    <!-- Load from CDN -->
    <script type="module">
      import { injectResponsivePanel } from "https://unpkg.com/responsive-panel@latest/dist/index.esm.js";

      injectResponsivePanel({
        breakpoints: [320, 768, 1024, 1280],
        theme: "auto",
      });
    </script>
  </body>
</html>
```

## Script Tag with Data Attributes

```html
<script
  src="https://unpkg.com/responsive-panel@latest/dist/index.esm.js"
  type="module"
  data-breakpoints="[320, 480, 768, 1024, 1280]"
  data-theme="dark"
  data-position="bottom-right"
  data-live-sync="true"
  data-show-labels="true"
></script>
```
