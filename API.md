# API Documentation

## Table of Contents

- [Main Functions](#main-functions)
- [Configuration Options](#configuration-options)
- [ResponsivePanel Class](#responsivepanel-class)
- [Type Definitions](#type-definitions)
- [Constants](#constants)

## Main Functions

### `injectResponsivePanel(config?)`

The primary function to inject the responsive panel into your application.

**Parameters:**

- `config` (optional): `ResponsivePanelConfig` - Configuration options

**Returns:** `ResponsivePanel | null`

- Returns a `ResponsivePanel` instance in development mode
- Returns `null` in production mode

**Example:**

```javascript
import { injectResponsivePanel } from "responsive-panel";

const panel = injectResponsivePanel({
  breakpoints: [320, 768, 1024],
  theme: "dark",
});
```

### `getResponsivePanelInstance()`

Get the current global panel instance.

**Returns:** `ResponsivePanel | null`

**Example:**

```javascript
import { getResponsivePanelInstance } from "responsive-panel";

const panel = getResponsivePanelInstance();
if (panel) {
  panel.open();
}
```

### `destroyResponsivePanel()`

Destroy the current global panel instance.

**Returns:** `void`

**Example:**

```javascript
import { destroyResponsivePanel } from "responsive-panel";

destroyResponsivePanel();
```

### `isResponsivePanelActive()`

Check if responsive panel is currently active.

**Returns:** `boolean`

**Example:**

```javascript
import { isResponsivePanelActive } from "responsive-panel";

if (isResponsivePanelActive()) {
  console.log("Panel is active");
}
```

## Configuration Options

### `ResponsivePanelConfig`

```typescript
interface ResponsivePanelConfig {
  breakpoints?: number[];
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  theme?: "light" | "dark" | "auto";
  liveSync?: boolean;
  className?: string;
  showLabels?: boolean;
  labels?: string[];
  zIndex?: number;
  startMinimized?: boolean;
  customBreakpoints?: BreakpointConfig[];
}
```

#### Properties

**`breakpoints`** (optional)

- Type: `number[]`
- Default: `[320, 480, 768, 1024, 1280]`
- Description: Array of viewport widths in pixels

**`position`** (optional)

- Type: `'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'`
- Default: `'bottom-right'`
- Description: Position of the floating trigger button

**`theme`** (optional)

- Type: `'light' | 'dark' | 'auto'`
- Default: `'auto'`
- Description: Theme for the panel UI. 'auto' uses system preference

**`liveSync`** (optional)

- Type: `boolean`
- Default: `false`
- Description: Enable real-time synchronization between viewports

**`className`** (optional)

- Type: `string`
- Default: `''`
- Description: Custom CSS class for the panel container

**`showLabels`** (optional)

- Type: `boolean`
- Default: `true`
- Description: Whether to show labels for each breakpoint

**`labels`** (optional)

- Type: `string[]`
- Default: `[]`
- Description: Custom labels for breakpoints

**`zIndex`** (optional)

- Type: `number`
- Default: `999999`
- Description: Z-index for the panel overlay

**`startMinimized`** (optional)

- Type: `boolean`
- Default: `false`
- Description: Whether the panel starts in minimized state

**`customBreakpoints`** (optional)

- Type: `BreakpointConfig[]`
- Default: `[]`
- Description: Custom breakpoint configurations

### `BreakpointConfig`

```typescript
interface BreakpointConfig {
  width: number;
  height?: number;
  label?: string;
  enabled?: boolean;
}
```

#### Properties

**`width`** (required)

- Type: `number`
- Description: Viewport width in pixels

**`height`** (optional)

- Type: `number`
- Description: Viewport height in pixels (defaults to auto)

**`label`** (optional)

- Type: `string`
- Description: Custom label for this breakpoint

**`enabled`** (optional)

- Type: `boolean`
- Default: `true`
- Description: Whether this breakpoint is enabled by default

## ResponsivePanel Class

### Methods

#### `open()`

Opens the responsive panel.

**Returns:** `void`

**Example:**

```javascript
panel.open();
```

#### `close()`

Closes the responsive panel.

**Returns:** `void`

**Example:**

```javascript
panel.close();
```

#### `toggle()`

Toggles the responsive panel open/closed state.

**Returns:** `void`

**Example:**

```javascript
panel.toggle();
```

#### `minimize()`

Minimizes the responsive panel.

**Returns:** `void`

**Example:**

```javascript
panel.minimize();
```

#### `maximize()`

Maximizes the responsive panel.

**Returns:** `void`

**Example:**

```javascript
panel.maximize();
```

#### `destroy()`

Destroys the responsive panel and cleans up all resources.

**Returns:** `void`

**Example:**

```javascript
panel.destroy();
```

#### `updateConfig(newConfig)`

Updates the panel configuration.

**Parameters:**

- `newConfig`: `Partial<ResponsivePanelConfig>`

**Returns:** `void`

**Example:**

```javascript
panel.updateConfig({
  theme: "dark",
  breakpoints: [320, 768, 1024],
});
```

#### `on(event, handler)`

Adds an event listener.

**Parameters:**

- `event`: `PanelEventType`
- `handler`: `PanelEventHandler`

**Returns:** `void`

**Example:**

```javascript
panel.on("open", () => {
  console.log("Panel opened");
});
```

#### `off(event, handler)`

Removes an event listener.

**Parameters:**

- `event`: `PanelEventType`
- `handler`: `PanelEventHandler`

**Returns:** `void`

**Example:**

```javascript
const handler = () => console.log("Panel opened");
panel.on("open", handler);
panel.off("open", handler);
```

### Events

#### `PanelEventType`

```typescript
type PanelEventType =
  | "open"
  | "close"
  | "minimize"
  | "maximize"
  | "drag"
  | "breakpointToggle";
```

#### Event Details

**`open`**

- Fired when the panel is opened
- No additional data

**`close`**

- Fired when the panel is closed
- No additional data

**`minimize`**

- Fired when the panel is minimized
- No additional data

**`maximize`**

- Fired when the panel is maximized
- No additional data

**`drag`**

- Fired when the panel is being dragged
- Data: `{ type: 'start' | 'move' | 'end', position: { x: number, y: number } }`

**`breakpointToggle`**

- Fired when a breakpoint is toggled
- Data: `{ width: number, enabled: boolean }`

## Type Definitions

### `PanelEventHandler`

```typescript
type PanelEventHandler = (event: PanelEventType, data?: any) => void;
```

### `PanelState`

```typescript
interface PanelState {
  isOpen: boolean;
  isMinimized: boolean;
  isDragging: boolean;
  position: { x: number; y: number };
  activeBreakpoints: number[];
}
```

### `ViewportInfo`

```typescript
interface ViewportInfo {
  width: number;
  height: number;
  label: string;
  scale: number;
}
```

### `ResponsivePanelInstance`

```typescript
interface ResponsivePanelInstance {
  open(): void;
  close(): void;
  toggle(): void;
  minimize(): void;
  maximize(): void;
  destroy(): void;
  updateConfig(config: Partial<ResponsivePanelConfig>): void;
  on(event: PanelEventType, handler: PanelEventHandler): void;
  off(event: PanelEventType, handler: PanelEventHandler): void;
}
```

## Constants

### `DEFAULT_BREAKPOINTS`

```typescript
const DEFAULT_BREAKPOINTS: DefaultBreakpoints = {
  mobile: { width: 320, height: 568, label: "Mobile Portrait", enabled: true },
  mobileLandscape: {
    width: 480,
    height: 320,
    label: "Mobile Landscape",
    enabled: true,
  },
  tablet: { width: 768, height: 1024, label: "Tablet", enabled: true },
  laptop: { width: 1024, height: 768, label: "Small Laptop", enabled: true },
  desktop: { width: 1280, height: 800, label: "Desktop", enabled: true },
};
```

### `DEFAULT_BREAKPOINT_WIDTHS`

```typescript
const DEFAULT_BREAKPOINT_WIDTHS: number[] = [320, 480, 768, 1024, 1280];
```

## Utility Functions

While these are internal utilities, they're exported for advanced usage:

### `getTheme(configTheme)`

Get the resolved theme based on configuration and system preference.

**Parameters:**

- `configTheme`: `'light' | 'dark' | 'auto'`

**Returns:** `'light' | 'dark'`

### `isProduction()`

Check if running in production environment.

**Returns:** `boolean`

### `generateId(prefix?)`

Generate a unique ID with optional prefix.

**Parameters:**

- `prefix` (optional): `string` - Default: `'rp'`

**Returns:** `string`

### `clamp(value, min, max)`

Clamp a value between min and max.

**Parameters:**

- `value`: `number`
- `min`: `number`
- `max`: `number`

**Returns:** `number`
