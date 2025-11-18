/**
 * React renderer for ConfigKits
 */

import React, { useMemo } from "react";
import type { ComponentConfig, EventConfig } from "@configkits/core";
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
    const renderedChildren = children.length > 0
      ? children.map((child: ComponentConfig) => renderComponent(child)).filter(Boolean) as React.ReactElement[]
      : null;

    // Merge props with styles and event handlers
    const { children: propsChildren, ...restProps } = props;
    const componentProps: any = {
      ...restProps,
      ...(styles && { style: styles }),
      ...(events && events.reduce((acc: Record<string, any>, event: EventConfig) => {
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

    // Determine what to pass as children
    // Priority: rendered children (from children array) > props.children (text content)
    if (renderedChildren && renderedChildren.length > 0) {
      // If we have rendered child components, spread them as separate arguments
      return React.createElement(Component, componentProps, ...renderedChildren);
    }
    
    // If no rendered children, use props.children (for text content in leaf nodes)
    // Only pass if it's defined (string, number, or other valid React child)
    if (propsChildren !== undefined && propsChildren !== null) {
      return React.createElement(Component, componentProps, propsChildren);
    }
    
    // No children at all
    return React.createElement(Component, componentProps);
  };

  const configArray = Array.isArray(config) ? config : [config];
  const renderedComponents = configArray.map((comp) => renderComponent(comp)).filter(Boolean);

  return <>{renderedComponents}</>;
};

export { ConfigRenderer };
export default ConfigRenderer;

