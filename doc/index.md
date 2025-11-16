# ConfigKits

> A developer-focused, configuration-driven rendering framework

ConfigKits empowers teams to define entire user interfaces, behaviors, and feature states through declarative configuration files—allowing applications to adapt dynamically without code changes or redeployments.

## Quick Start

```bash
npm install @configkits/core @configkits/react @configkits/flags
```

```typescript
import { ConfigParser, ConfigValidator } from '@configkits/core';
import { ConfigRenderer } from '@configkits/react';

// Parse and validate configuration
const parser = new ConfigParser();
const config = parser.parseFromString(jsonString);

// Render with React
<ConfigRenderer config={config.components} />
```

## Features

- 🎯 **Schema Validation** - Robust validation using Zod
- ⚛️ **React Renderer** - Transform JSON to React components
- 🚩 **Feature Flags** - Rollout control and A/B testing
- 🔌 **Extensible** - Plugin system for custom integrations
- 📦 **Modular** - Composable, independent packages

## Packages

- [@configkits/core](/api/core) - Core engine and validation
- [@configkits/react](/api/react) - React renderer
- [@configkits/flags](/api/flags) - Feature flags and A/B testing

[Get Started →](/guide/)

