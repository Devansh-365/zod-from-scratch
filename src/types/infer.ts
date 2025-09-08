import type { Schema } from '../core/schema-base.ts';

// Main type inference utility
export type Infer<T extends Schema<any>> = T extends Schema<infer U> ? U : never;

// Specific inference types for different schema types
export type InferString<T> = T extends Schema<string> ? string : never;
export type InferNumber<T> = T extends Schema<number> ? number : never;
export type InferBoolean<T> = T extends Schema<boolean> ? boolean : never;
export type InferArray<T> = T extends Schema<(infer U)[]> ? U[] : never;
// export type InferObject<T extends ObjectShape> = InferObjectType<T>;
