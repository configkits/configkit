# ConfigKits

> A developer-focused, configuration-driven rendering framework that redefines how modern applications are built, deployed, and personalized.

ConfigKits empowers teams to define entire user interfaces, behaviors, and feature states through declarative configuration files—allowing applications to adapt dynamically without code changes or redeployments.

## 🚀 Overview

ConfigKits is built as a modular, composable architecture consisting of independent yet interoperable packages that form the foundation of configuration-first development:

- **@configkits/core** - Core engine managing schema validation, configuration parsing, and lifecycle control
- **@configkits/react** - React renderer that transforms JSON-based configurations into live UI components
- **@configkits/flags** - Feature flags, conditional rendering, A/B testing, and permission-based visibility

## 📦 Packages

### @configkits/core

The core engine provides schema validation, configuration parsing, and lifecycle management.

```typescript
import { ConfigParser, ConfigValidator } from '@configkits/core';

const parser = new ConfigParser();
const config = parser.parseFromString(jsonString);

const validator = new ConfigValidator();
const result = validator.validate(config);
```

### @configkits/react

React renderer for transforming configurations into React components.

```typescript
import { ConfigRenderer } from '@configkits/react';
import { defaultRegistry } from '@configkits/react';

// Register components
defaultRegistry.register('button', Button);

// Render configuration
<ConfigRenderer 
  config={config.components}
  options={{
    onEvent: (eventType, handler, payload) => {
      // Handle events
    }
  }}
/>
```

### @configkits/flags

Feature flags, A/B testing, and permission management.

```typescript
import { FeatureFlagManager, ABTestManager, PermissionManager } from '@configkits/flags';

const flagManager = new FeatureFlagManager({
  userId: 'user123',
  environment: 'production'
});

flagManager.register({
  id: 'new-feature',
  name: 'New Feature',
  enabled: true,
  rollout: {
    percentage: 50
  }
});

const isEnabled = flagManager.isEnabled('new-feature');
```

## 🏗️ Architecture

ConfigKits follows a monorepo structure using [Turborepo](https://turbo.build/repo):

```
configkit/
├── packages/
│   ├── core/          # Core engine
│   ├── react/         # React renderer
│   └── flags/         # Feature flags
├── apps/
│   └── playground/    # Interactive playground
└── turbo.json         # Turborepo configuration
```

## 🛠️ Tech Stack

ConfigKits is built with modern, developer-friendly tools:

- **Build**: Vite + TypeScript
- **Testing**: Vitest with coverage
- **Documentation**: VitePress
- **Config Validation**: Zod
- **CI/CD**: GitHub Actions
- **Monorepo Management**: Turborepo

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Setup

```bash
# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run playground in development mode
npm run dev

# Run documentation site
npm run docs:dev

# Run type checking
npm run type-check

# Run linting
npm run lint
```

### Playground

The playground app provides an interactive environment for testing configurations:

```bash
cd apps/playground
npm run dev
```

Visit `http://localhost:3000` to see the playground interface.

## 📝 Configuration Schema

ConfigKits uses a declarative JSON configuration format:

```json
{
  "version": "1.0.0",
  "metadata": {
    "name": "My App",
    "description": "App description"
  },
  "components": [
    {
      "id": "header",
      "type": "div",
      "styles": {
        "padding": "20px"
      },
      "children": [
        {
          "id": "title",
          "type": "h1",
          "props": {
            "children": "Welcome"
          }
        }
      ],
      "conditions": [
        {
          "type": "featureFlag",
          "key": "show-header",
          "operator": "eq",
          "value": true
        }
      ],
      "events": [
        {
          "type": "onClick",
          "handler": "handleClick",
          "payload": {}
        }
      ]
    }
  ],
  "features": [
    {
      "id": "new-feature",
      "name": "New Feature",
      "enabled": true,
      "rollout": {
        "percentage": 50
      }
    }
  ]
}
```

## 🎯 Key Features

- **Schema Validation** - Robust validation using Zod schemas
- **Component Registry** - Flexible component registration system
- **Feature Flags** - Rollout control, A/B testing, and conditional rendering
- **Lifecycle Hooks** - Extensible lifecycle management
- **TypeScript** - Full TypeScript support with type safety
- **Modular Architecture** - Independent, composable packages

## 🔌 Extensibility

ConfigKits is designed for extensibility:

- **Plugins** - Support for analytics, condition evaluators, remote configuration sources
- **Custom Components** - Register any React component
- **Custom Evaluators** - Build custom condition evaluators
- **Lifecycle Hooks** - Extend functionality at key lifecycle points

## 📚 Documentation

- [Core API Documentation](./packages/core/README.md)
- [React Renderer Documentation](./packages/react/README.md)
- [Feature Flags Documentation](./packages/flags/README.md)

## 🚧 Roadmap

- [ ] Remote configuration sources
- [ ] Analytics integration
- [ ] Version control and history
- [ ] Collaborative dashboard
- [ ] Real-time configuration updates
- [ ] Cloud-based configuration management platform

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions and support, please open an issue on GitHub.
