export interface ValidationErrorOptions {
  message: string;
  path: (string | number)[];
  code: string;
}

export class ZodError extends Error {
  public readonly errors: ValidationErrorOptions[];

  constructor(errors: ValidationErrorOptions[]) {
    const message = errors.map(err =>
      `${err.message} at path: ${err.path.join('.')}`
    ).join('\n');

    super(message);
    this.name = 'ZodError';
    this.errors = errors;
  }
}
