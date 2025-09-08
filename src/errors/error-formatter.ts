import type { ValidationError } from '../core/result.ts';

export class ErrorFormatter {
  static formatSingleError(error: ValidationError): string {
    const pathStr = error.path.length > 0 ? ` at path: ${error.path.join('.')}` : '';
    return `${error.message}${pathStr}`;
  }

  static formatMultipleErrors(errors: ValidationError[]): string {
    return errors.map(this.formatSingleError).join('\n');
  }

  static createError(message: string, code: string, path: (string | number)[] = []): ValidationError {
    return { message, code, path };
  }
}
