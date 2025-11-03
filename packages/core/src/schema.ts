/**
 * Schema definitions using Zod for validation
 */

import { z } from "zod";

// Base component schema
const ComponentConfigSchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    id: z.string(),
    type: z.string(),
    props: z.record(z.unknown()).optional(),
    children: z.array(ComponentConfigSchema).optional(),
    conditions: z.array(z.object({
      type: z.enum(["featureFlag", "permission", "environment", "custom"]),
      key: z.string(),
      operator: z.enum(["eq", "ne", "gt", "gte", "lt", "lte", "in", "contains"]).optional(),
      value: z.unknown(),
      evaluator: z.string().optional(),
    })).optional(),
    styles: z.record(z.union([z.string(), z.number()])).optional(),
    events: z.array(z.object({
      type: z.string(),
      handler: z.string(),
      payload: z.record(z.unknown()).optional(),
    })).optional(),
  })
);

const LayoutConfigSchema = z.object({
  type: z.enum(["grid", "flex", "absolute", "relative"]),
  columns: z.union([z.number(), z.string()]).optional(),
  rows: z.union([z.number(), z.string()]).optional(),
  gap: z.union([z.number(), z.string()]).optional(),
  direction: z.enum(["row", "column"]).optional(),
  alignItems: z.string().optional(),
  justifyContent: z.string().optional(),
  padding: z.union([z.string(), z.number()]).optional(),
  margin: z.union([z.string(), z.number()]).optional(),
}).optional();

const FeatureConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  enabled: z.boolean(),
  rollout: z.object({
    percentage: z.number().min(0).max(100).optional(),
    userIds: z.array(z.string()).optional(),
    environments: z.array(z.string()).optional(),
  }).optional(),
  metadata: z.record(z.unknown()).optional(),
}).optional();

const PluginConfigSchema = z.object({
  id: z.string(),
  type: z.string(),
  config: z.record(z.unknown()).optional(),
}).optional();

export const ConfigKitConfigSchema = z.object({
  version: z.string(),
  metadata: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
  }).optional(),
  components: z.array(ComponentConfigSchema),
  layout: LayoutConfigSchema,
  features: z.array(FeatureConfigSchema).optional(),
  plugins: z.array(PluginConfigSchema).optional(),
});

export type ConfigKitConfigType = z.infer<typeof ConfigKitConfigSchema>;

