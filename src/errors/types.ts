export interface ZodError {
  name: 'ZodError';
  message: string;
  errors: Array<{
    message: string;
    path: string[];
    code: string;
  }>;
}
