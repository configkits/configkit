/**
 * Configuration validator
 */

import { z } from "zod";
import { ConfigKitConfigSchema } from "./schema";
import type { ValidationResult, ValidationError } from "./types";

export class ConfigValidator {
  private schema: z.ZodSchema;

  constructor() {
    this.schema = ConfigKitConfigSchema;
  }

  /**
   * Validate a configuration object
   */
  validate(config: unknown): ValidationResult {
    try {
      this.schema.parse(config);
      return {
        valid: true,
        errors: [],
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationError[] = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
          code: err.code,
        }));

        return {
          valid: false,
          errors,
        };
      }

      return {
        valid: false,
        errors: [{
          path: "unknown",
          message: error instanceof Error ? error.message : "Unknown validation error",
        }],
      };
    }
  }

  /**
   * Validate and throw if invalid
   */
  validateOrThrow(config: unknown): void {
    const result = this.validate(config);
    if (!result.valid) {
      const errorMessages = result.errors.map((e) => `${e.path}: ${e.message}`).join("\n");
      throw new Error(`Configuration validation failed:\n${errorMessages}`);
    }
  }
}

export const defaultValidator = new ConfigValidator();

