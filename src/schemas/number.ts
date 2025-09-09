import { success, failure, type Validator, type Schema, createSchema } from '../core';

export const createNumberValidator = (
  minLength?: number,
  maxLength?: number,
  isInteger = false
): Validator<number> => (value, path = []) => {

  if (typeof value !== 'number') {
    return failure(`Expected number, got ${typeof value}`, 'invalid_type', path);
  }

  if (isInteger && !Number.isInteger(value)) {
    return failure('Expected integer, got decimal', 'invalid_type', path);
  }

  if (minLength !== undefined && value < minLength) {
    return failure(`Number too small (min: ${minLength})`, 'too_small', path);
  }

  if (maxLength !== undefined && value > maxLength) {
    return failure(`Number too large (max: ${maxLength})`, 'too_big', path);
  }

  return success(value);
};

export const createNumberSchema = () => {
  let minLength: number | undefined;
  let maxLength: number | undefined;
  let isInt = false;

  const schema = {
    min: (n: number) => {
      minLength = n;
      return schema;
    },
    max: (n: number) => {
      maxLength = n;
      return schema;
    },
    int: () => {
      isInt = true;
      return schema;
    },
    ...createSchema(createNumberValidator(minLength, maxLength, isInt)),
  };

  return schema;
};
