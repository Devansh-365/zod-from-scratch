import { z } from '../src';

// Define a number schema
const ageSchema = z.number().min(18).max(100).int();

// --- SUCCESSFUL VALIDATION ---
try {
  const validAge = 25;
  const parsedAge = ageSchema.parse(validAge);
  console.log(`✅ Validation successful:`, parsedAge);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed for a valid number:`, error.message);
  }
}

// --- FAILED VALIDATION (too small) ---
try {
  const invalidAge = 17;
  console.log(`\nAttempting to parse an invalid age (too small)...`);
  ageSchema.parse(invalidAge);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed as expected:`, error.message);
  }
}

// --- FAILED VALIDATION (not an integer) ---
try {
  const invalidAge = 25.5;
  console.log(`\nAttempting to parse an invalid age (not an integer)...`);
  ageSchema.parse(invalidAge);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed as expected:`, error.message);
  }
}

// --- FAILED VALIDATION (invalid type) ---
try {
  const invalidAge = 'twenty-five'; // Invalid type
  console.log(`\nAttempting to parse an invalid type (string)...`);
  ageSchema.parse(invalidAge);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed as expected:`, error.message);
  }
}
