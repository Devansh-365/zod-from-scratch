export type { ValidationResult, ValidationError } from './core';
export type { Infer } from './types';
export { StringSchema } from './builders/index.ts';
import { string } from './builders/factory.ts';

export const z = {
  string,
} as const;

export default z;
