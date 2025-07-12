# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-13

### Added

- **Fullscreen viewport mode** - Click viewport headers for detailed breakpoint testing
- **Back navigation** - "Back to Dashboard" button for easy navigation between views
- **Smart trigger hiding** - Prevents recursive panels in iframe views using URL parameters
- **Independent dragging** - Separate drag logic for floating button and panel header
- **Live sync functionality** - Synchronized scrolling and form inputs across viewports
- **Theme support** - Light, dark, and auto themes with system preference detection
- **Multi-viewport preview** - Preview multiple breakpoints simultaneously
- **Custom configuration** - Configurable breakpoints, labels, positioning, and z-index
- **Production safety** - Automatically disabled in production environments
- **Framework agnostic** - Works with React, Vue, Angular, vanilla JS
- **TypeScript support** - Full type definitions and IntelliSense support

### Features

- **Floating draggable button** for panel toggle with customizable positioning
- **Multiple viewport preview** showing your site across different breakpoints
- **Fullscreen mode** for detailed testing of individual breakpoints
- **Smart URL parameter detection** (`?rp-hide-trigger=true`) to prevent recursive panels
- **Event system** with support for open, close, fullscreen, and drag events
- **Responsive panel interface** that works on all screen sizes
- **Auto-injection** with script tag configuration support
- **Custom breakpoint support** with flexible width and label configuration

### Developer Experience

- **Clean API** with both class-based and injection methods
- **Comprehensive documentation** with examples and API reference
- **Event handling** for custom integrations and workflows
- **Error boundaries** and safe fallbacks for cross-origin scenarios
- **Development-friendly** with detailed console logging and debugging support
- **Production optimization** with automatic detection and disabling
