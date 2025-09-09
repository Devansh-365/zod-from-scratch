export type { Schema, ValidationResult, ValidationError, Infer } from './core';
import { createBooleanSchema, createNumberSchema, createStringSchema } from './schemas';

export const z = {
  string: createStringSchema,
  number: createNumberSchema,
  boolean: createBooleanSchema,
} as const;
