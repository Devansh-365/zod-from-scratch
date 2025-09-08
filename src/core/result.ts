export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: ValidationError;
}

export interface ValidationError {
  message: string;
  path: (string | number)[];
  code: string;
}

export class ValidationSuccess<T> implements ValidationResult<T> {
  public readonly success = true;

  constructor(public readonly data: T) {}
}

export class ValidationFailure implements ValidationResult<never> {
  public readonly success = false;
  public readonly data = undefined;

  constructor(public readonly error: ValidationError) {}
}

// Helper functions for creating results
export const success = <T>(data: T): ValidationSuccess<T> =>
  new ValidationSuccess(data);

export const failure = (error: ValidationError): ValidationFailure =>
  new ValidationFailure(error);
