export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; error: ValidationError };

export interface ValidationError {
  message: string;
  path: string[];
  code: string;
}

export type Validator<T> = (value: unknown, path?: string[]) => ValidationResult<T>;

export interface Schema<T> {
  _validator: Validator<T>;
  parse: (value: unknown) => T;
  safeParse: (value: unknown) => ValidationResult<T>;
  optional: () => Schema<T | undefined>;
}

export type Infer<T extends Schema<any>> = T extends Schema<infer U> ? U : never;
