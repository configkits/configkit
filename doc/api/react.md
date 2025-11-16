# @configkits/react

React renderer that transforms JSON-based configurations into React components.

## ConfigRenderer

Main component for rendering configurations.

```typescript
import { ConfigRenderer } from '@configkits/react';

<ConfigRenderer 
  config={components}
  options={{
    onEvent: (eventType, handler, payload) => {
      // Handle events
    }
  }}
/>
```

## Component Registry

Register components for rendering.

```typescript
import { defaultRegistry } from '@configkits/react';

defaultRegistry.register('button', Button);
defaultRegistry.register('card', Card);
```

## Hooks

### useConfig

Parse configuration from JSON string.

```typescript
import { useConfig } from '@configkits/react';

const { config, loading, error } = useConfig(jsonString);
```

