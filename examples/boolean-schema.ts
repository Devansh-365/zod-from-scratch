import { z } from '../src';

// Define a boolean schema
const isActiveSchema = z.boolean();

// --- SUCCESSFUL VALIDATION ---
try {
  const isValid = true;
  const parsedValue = isActiveSchema.parse(isValid);
  console.log(`✅ Validation successful:`, parsedValue);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed for a valid boolean:`, error.message);
  }
}

// --- FAILED VALIDATION ---
try {
  const invalidValue = 'true'; // Invalid type
  console.log(`\nAttempting to parse an invalid type (string)...`);
  isActiveSchema.parse(invalidValue);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed as expected:`, error.message);
  }
}
