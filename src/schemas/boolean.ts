import { success, failure, type Validator, type Schema, createSchema } from '../core';

export const createBooleanValidator = (
): Validator<boolean> => (value, path = []) => {

  if (typeof value !== 'boolean') {
    return failure(`Expected boolean, got ${typeof value}`, 'invalid_type', path);
  }

  return success(value);
};

export const createBooleanSchema = (): Schema<boolean> & {
} => {
  const baseSchema = createSchema(createBooleanValidator());

  return {
    ...baseSchema,
  };
};
