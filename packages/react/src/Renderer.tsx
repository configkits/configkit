/**
 * React renderer for ConfigKits
 */

import React, { useMemo } from "react";
import type { ComponentConfig } from "@configkits/core";
import type { ConfigRendererProps, RendererOptions } from "./types";
import { DefaultComponentRegistry, defaultRegistry } from "./ComponentRegistry";

const ConfigRenderer: React.FC<ConfigRendererProps> = ({ config, options }) => {
  const registry = useMemo(() => {
    if (options?.componentRegistry) {
      const customRegistry = new DefaultComponentRegistry();
      Object.entries(options.componentRegistry).forEach(([type, component]) => {
        customRegistry.register(type, component);
      });
      return customRegistry;
    }
    return defaultRegistry;
  }, [options?.componentRegistry]);

  const renderComponent = (componentConfig: ComponentConfig): React.ReactElement | null => {
    const { type, props = {}, children = [], styles, events } = componentConfig;

    // Check if component is registered
    const Component = registry.get(type);
    if (!Component) {
      console.warn(`Component type "${type}" is not registered`);
      return null;
    }

    // Render children recursively
    const renderedChildren = children.map((child) => renderComponent(child)).filter(Boolean) as React.ReactElement[];

    // Merge props with styles and event handlers
    const componentProps: any = {
      ...props,
      ...(styles && { style: styles }),
      ...(events && events.reduce((acc, event) => {
        acc[event.type] = (e?: any) => {
          if (options?.onEvent) {
            options.onEvent(event.type, event.handler, {
              ...event.payload,
              event: e,
            });
          }
        };
        return acc;
      }, {} as Record<string, any>)),
    };

    return React.createElement(Component, componentProps, renderedChildren);
  };

  const configArray = Array.isArray(config) ? config : [config];
  const renderedComponents = configArray.map((comp) => renderComponent(comp)).filter(Boolean);

  return <>{renderedComponents}</>;
};

export { ConfigRenderer };
export default ConfigRenderer;

