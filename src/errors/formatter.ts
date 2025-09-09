import type { ValidationError } from '@/core';

export const formatError = (error: ValidationError): string => {
  const pathString = error.path.length > 0 ? ` at ${error.path.join('.')}` : '';
  return `${error.message}${pathString}`;
};

export const createZodError = (errors: ValidationError[]): Error => {
  const message = errors.map(formatError).join('\n');
  const error = new Error(message);
  error.name = 'ZodError';
  return error;
};
