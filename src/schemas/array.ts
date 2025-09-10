import { success, failure, type Validator, type Schema, createSchema } from '../core';

export const createArrayValidator = <T>(
  elementSchema: Schema<T>,
  minLength?: number,
  maxLength?: number
): Validator<T[]> => (value, path = []) => {

  if (!Array.isArray(value)) {
    return failure(`Expected array, got ${typeof value}`, 'invalid_type', path);
  }

  if (minLength !== undefined && value.length < minLength) {
    return failure(`Array too short (min: ${minLength})`, 'too_small', path);
  }

  if (maxLength !== undefined && value.length > maxLength) {
    return failure(`Array too long (max: ${maxLength})`, 'too_big', path);
  }

  const result: T[] = [];

  for (let i = 0; i < value.length; i++) {
    const elementPath = [...path, i.toString()];
    const elementResult = elementSchema._validator(value[i], elementPath);

    if (!elementResult.success) {
      return elementResult as any;
    }

    result.push(elementResult.data);
  }

  return success(result);
};

export const createArraySchema = <T>(elementSchema: Schema<T>) => {
  let minLength: number | undefined;
  let maxLength: number | undefined;

  const schema = {
    min: (n: number) => {
      minLength = n;
      return schema;
    },
    max: (n: number) => {
      maxLength = n;
      return schema;
    },
    ...createSchema(createArrayValidator(elementSchema, minLength, maxLength)),
  };

  return schema;
};
