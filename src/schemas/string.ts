import { success, failure, type Validator, type Schema, createSchema } from '../core';

export const createStringValidator = (
  minLength?: number,
  maxLength?: number,
  isEmail = false
): Validator<string> => (value, path = []) => {

  if (typeof value !== 'string') {
    return failure(`Expected string, got ${typeof value}`, 'invalid_type', path);
  }

  if (minLength !== undefined && value.length < minLength) {
    return failure(`String too short (min: ${minLength})`, 'too_small', path);
  }

  if (maxLength !== undefined && value.length > maxLength) {
    return failure(`String too long (max: ${maxLength})`, 'too_big', path);
  }

  if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return failure('Invalid email format', 'invalid_email', path);
  }

  return success(value);
};

export const createStringSchema = () => {
  let minLength: number | undefined;
  let maxLength: number | undefined;
  let isEmail = false;

  const schema = {
    min: (n: number) => {
      minLength = n;
      return schema;
    },
    max: (n: number) => {
      maxLength = n;
      return schema;
    },
    email: () => {
      isEmail = true;
      return schema;
    },
    ...createSchema(createStringValidator(minLength, maxLength, isEmail)),
  };

  return schema;
};
