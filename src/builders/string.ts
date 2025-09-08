import { Schema } from '../core/schema-base.ts';
import { success, failure, type ValidationResult } from '../core/result.ts';
import { ErrorFormatter } from '../errors/error-formatter.ts';
import { isString } from '../utils/type-guards.ts';
import { ERROR_CODES } from '../utils/constants.ts';

export class StringSchema extends Schema<string> {
  private minLength?: number;
  private maxLength?: number;
  private emailValidation = false;

  _parse(value: unknown, path: (string | number)[]): ValidationResult<string> {
    if (!isString(value)) {
      return failure(ErrorFormatter.createError(
        `Expected string, received ${typeof value}`,
        ERROR_CODES.INVALID_TYPE,
        path
      ));
    }

    // Length validation
    if (this.minLength !== undefined && value.length < this.minLength) {
      return failure(ErrorFormatter.createError(
        `String must be at least ${this.minLength} characters long`,
        ERROR_CODES.TOO_SMALL,
        path
      ));
    }

    if (this.maxLength !== undefined && value.length > this.maxLength) {
      return failure(ErrorFormatter.createError(
        `String must be at most ${this.maxLength} characters long`,
        ERROR_CODES.TOO_BIG,
        path
      ));
    }

    // Email validation
    if (this.emailValidation && !this.isValidEmail(value)) {
      return failure(ErrorFormatter.createError(
        'Invalid email format',
        ERROR_CODES.INVALID_FORMAT,
        path
      ));
    }

    return success(value);
  }

  // Chainable methods
  min(length: number): StringSchema {
    const clone = this.clone();
    clone.minLength = length;
    return clone;
  }

  max(length: number): StringSchema {
    const clone = this.clone();
    clone.maxLength = length;
    return clone;
  }

  email(): StringSchema {
    const clone = this.clone();
    clone.emailValidation = true;
    return clone;
  }

  private clone(): StringSchema {
    const clone = new StringSchema();
    clone.minLength = this.minLength;
    clone.maxLength = this.maxLength;
    clone.emailValidation = this.emailValidation;
    return clone;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
