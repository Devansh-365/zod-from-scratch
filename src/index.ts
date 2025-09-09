export type { Schema, ValidationResult, ValidationError, Infer } from '@/core';
import { createStringSchema } from '@/schemas';

export const z = {
  string: createStringSchema,
} as const;

