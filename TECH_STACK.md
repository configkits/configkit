# Tech Stack

This document outlines the technology and tool choices for ConfigKits.

## Build System

### Vite + TypeScript

- **Vite**: Used for the playground app and documentation site
- **TypeScript**: Full TypeScript support across all packages
- **tsup**: Library build tool for packages (uses esbuild, Vite-compatible)

## Testing

### Vitest

- **Vitest**: Modern, fast test runner (Vite-native)
- **Coverage**: @vitest/coverage-v8 for code coverage
- **Testing Library**: @testing-library/react for React component tests
- **Environment**: jsdom for browser simulation in React tests

All packages include:
- Test scripts: `test`, `test:watch`, `test:coverage`
- Vitest configuration files
- Example test files

## Documentation

### VitePress

- **VitePress**: Documentation site generator (Vue/Nuxt team)
- **Location**: `/docs` directory
- **Scripts**: `docs:dev`, `docs:build`

Documentation includes:
- Getting started guide
- API reference for all packages
- Configuration examples
- Integration guides

## Configuration Validation

### Zod

- **Zod**: TypeScript-first schema validation
- **Location**: `@configkits/core` package
- **Usage**: Schema definitions for configuration validation

Benefits:
- Type-safe schemas
- Runtime validation
- Excellent TypeScript inference

## CI/CD

### GitHub Actions

Two main workflows:

1. **CI Workflow** (`.github/workflows/ci.yml`):
   - Build verification
   - Test execution
   - Linting
   - Documentation build

2. **Release Workflow** (`.github/workflows/release.yml`):
   - Automated npm publishing
   - Tag-based releases

## Monorepo Management

### Turborepo

- **Turborepo**: High-performance build system for JavaScript/TypeScript monorepos
- **Configuration**: `turbo.json`
- **Pipelines**: build, test, lint, type-check, docs

Features:
- Parallel task execution
- Intelligent caching
- Dependency graph optimization

## Package Structure

```
configkit/
├── packages/
│   ├── core/          # Core engine (Zod, validation)
│   ├── react/         # React renderer
│   └── flags/         # Feature flags
├── apps/
│   ├── playground/    # Vite + React app
│   └── docs/          # VitePress documentation
└── .github/
    └── workflows/     # GitHub Actions
```

## Development Scripts

```bash
# Build all packages
npm run build

# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run documentation
npm run docs:dev

# Type checking
npm run type-check

# Linting
npm run lint
```

## Why These Tools?

1. **Vite**: Fast development experience, excellent HMR
2. **Vitest**: Vite-native testing, no extra config needed
3. **VitePress**: Clean, fast documentation with Vue ecosystem integration
4. **Zod**: Best-in-class schema validation for TypeScript
5. **GitHub Actions**: Industry standard, excellent integration
6. **Turborepo**: Best monorepo tool for JavaScript/TypeScript projects

All tools are chosen for their:
- Modern, maintained codebase
- Excellent TypeScript support
- Great developer experience
- Performance
- Ecosystem compatibility

