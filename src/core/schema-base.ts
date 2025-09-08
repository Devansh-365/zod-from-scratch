import type { ValidationResult } from './result';

export abstract class Schema<T> {
  abstract _parse(value: unknown, path: (string | number)[]): ValidationResult<T>;

  parse(value: unknown): T {
    const result = this.safeParse(value);
    if (result.success) {
      return result.data;
    }
    if (result.error) {
      throw new Error(`Validation failed: ${result.error.message} at path: ${result.error.path.join('.')}`);
    }
    throw new Error('Validation failed');
  }

  safeParse(value: unknown): ValidationResult<T> {
    return this._parse(value, []);
  }

  // Composition methods
  optional(): Schema<T | undefined> {
    return new OptionalSchema(this);
  }
}

class OptionalSchema<T> extends Schema<T | undefined> {
  constructor(private schema: Schema<T>) {
    super();
  }

  _parse(value: unknown, path: (string | number)[]): ValidationResult<T | undefined> {
    if (value === undefined) {
      return { success: true, data: undefined };
    }
    return this.schema._parse(value, path);
  }
}
