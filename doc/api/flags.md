# @configkits/flags

Feature flags, conditional rendering, A/B testing, and permission-based visibility.

## FeatureFlagManager

Manage feature flags with rollout control.

```typescript
import { FeatureFlagManager } from '@configkits/flags';

const manager = new FeatureFlagManager({
  userId: 'user123',
  environment: 'production'
});

manager.register({
  id: 'new-feature',
  name: 'New Feature',
  enabled: true,
  rollout: { percentage: 50 }
});

const isEnabled = manager.isEnabled('new-feature');
```

## ABTestManager

A/B testing with weighted variants.

```typescript
import { ABTestManager } from '@configkits/flags';

const abTest = new ABTestManager();
abTest.register({
  id: 'button-color',
  name: 'Button Color Test',
  enabled: true,
  variants: [
    { id: 'blue', name: 'Blue', weight: 50 },
    { id: 'green', name: 'Green', weight: 50 },
  ],
});

const variant = abTest.getVariant('button-color');
```

## PermissionManager

Role-based access control.

```typescript
import { PermissionManager } from '@configkits/flags';

const permissions = new PermissionManager();
permissions.register({
  id: 'admin-panel',
  name: 'Admin Panel Access',
  roles: ['admin'],
});

const hasAccess = permissions.hasPermission('admin-panel');
```

