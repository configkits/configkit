/**
 * Configuration parser
 */

import type { ConfigKitConfig } from "./types";
import { ConfigValidator } from "./validator";

export class ConfigParser {
  private validator: ConfigValidator;

  constructor(validator?: ConfigValidator) {
    this.validator = validator || new ConfigValidator();
  }

  /**
   * Parse a JSON string into a validated ConfigKitConfig
   */
  parseFromString(jsonString: string): ConfigKitConfig {
    try {
      const parsed = JSON.parse(jsonString);
      this.validator.validateOrThrow(parsed);
      return parsed as ConfigKitConfig;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error(`Invalid JSON: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Parse a JSON object into a validated ConfigKitConfig
   */
  parseFromObject(json: unknown): ConfigKitConfig {
    this.validator.validateOrThrow(json);
    return json as ConfigKitConfig;
  }

  /**
   * Stringify a ConfigKitConfig to JSON
   */
  stringify(config: ConfigKitConfig, pretty?: boolean): string {
    return pretty ? JSON.stringify(config, null, 2) : JSON.stringify(config);
  }
}

export const defaultParser = new ConfigParser();

