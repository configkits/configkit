# @configkits/core

Core engine for ConfigKits - schema validation, configuration parsing, and lifecycle control.

## ConfigParser

Parses and validates configuration from JSON strings or objects.

```typescript
import { ConfigParser } from '@configkits/core';

const parser = new ConfigParser();
const config = parser.parseFromString(jsonString);
```

## ConfigValidator

Validates configuration against the schema.

```typescript
import { ConfigValidator } from '@configkits/core';

const validator = new ConfigValidator();
const result = validator.validate(config);
```

## LifecycleManager

Manages lifecycle hooks for configuration processing.

```typescript
import { DefaultLifecycleManager } from '@configkits/core';

const manager = new DefaultLifecycleManager();
manager.register('onParse', (config) => {
  console.log('Config parsed:', config);
});
```

