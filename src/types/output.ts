import type { ValidationResult } from '../core/result.js';

// Utility type to extract the success type from a ValidationResult
export type Output<T extends ValidationResult<any>> = T extends ValidationResult<infer U> ? U : never;

// Helper type for safe parsing
export type SafeParseResult<T> = ValidationResult<T>;
