import { z } from '../src';

// Define a string schema
const nameSchema = z.string();

// --- SUCCESSFUL VALIDATION ---
try {
  const validName = 'Cline';
  const parsedName = nameSchema.parse(validName);
  console.log(`✅ Validation successful:`, parsedName);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed for a valid string:`, error.message);
  }
}

// --- FAILED VALIDATION ---
try {
  const invalidName = 12345; // Invalid type
  console.log(`\nAttempting to parse an invalid type (number)...`);
  nameSchema.parse(invalidName);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed as expected:`, error.message);
  }
}
