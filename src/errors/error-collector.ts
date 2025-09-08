import type { ValidationError } from '../core/result.ts';

export class ErrorCollector {
  private errors: ValidationError[] = [];

  addError(error: ValidationError): void {
    this.errors.push(error);
  }

  addErrorAtPath(message: string, code: string, path: (string | number)[]): void {
    this.errors.push({ message, code, path });
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }

  getErrors(): ValidationError[] {
    return [...this.errors];
  }

  clear(): void {
    this.errors = [];
  }
}
