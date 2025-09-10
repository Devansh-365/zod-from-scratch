export type { Schema, ValidationResult, ValidationError, Infer } from './core';
import { createBooleanSchema, createNumberSchema, createStringSchema, createArraySchema } from './schemas';

export const z = {
  string: createStringSchema,
  number: createNumberSchema,
  boolean: createBooleanSchema,
  array: createArraySchema,
} as const;
