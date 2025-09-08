import { Schema } from './schema-base.ts';
import type { ValidationResult } from './result.ts';

export class ValidationEngine {
  static execute<T>(schema: Schema<T>, value: unknown): ValidationResult<T> {
    return schema.safeParse(value);
  }

  static executeStrict<T>(schema: Schema<T>, value: unknown): T {
    return schema.parse(value);
  }
}
