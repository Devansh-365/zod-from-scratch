import type { ValidationResult, Validator, Schema } from './types.js';

export const success = <T>(data: T): ValidationResult<T> => ({
  success: true,
  data
});

export const failure = (message: string, code: string, path: string[] = []): ValidationResult<never> => ({
  success: false,
  error: { message, code, path }
});

export const createSchema = <T>(validator: Validator<T>): Schema<T> => ({
  _validator: validator,

  parse: (value: unknown): T => {
    const result = validator(value, []);
    if (result.success) return result.data;
    throw new Error(`${result.error.message} at ${result.error.path.join('.')}`);
  },

  safeParse: (value: unknown): ValidationResult<T> => {
    return validator(value, []);
  },

  optional: (): Schema<T | undefined> => {
    return createSchema<T | undefined>((value, path = []) => {
      if (value === undefined) return success(undefined);
      return validator(value, path);
    });
  }
});
