import { z } from '../src';

// Define an array schema of strings
const namesSchema = z.array(z.string()).min(2).max(5);

// --- SUCCESSFUL VALIDATION ---
try {
  const validNames = ['Cline', 'Zod'];
  const parsedNames = namesSchema.parse(validNames);
  console.log(`✅ Validation successful:`, parsedNames);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed for a valid array:`, error.message);
  }
}

// --- FAILED VALIDATION (too short) ---
try {
  const invalidNames = ['Cline'];
  console.log(`\nAttempting to parse an invalid array (too short)...`);
  namesSchema.parse(invalidNames);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed as expected:`, error.message);
  }
}

// --- FAILED VALIDATION (invalid element type) ---
try {
  const invalidNames = ['Cline', 123]; // Invalid element type
  console.log(`\nAttempting to parse an invalid array (invalid element type)...`);
  namesSchema.parse(invalidNames);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed as expected:`, error.message);
  }
}

// --- FAILED VALIDATION (invalid type) ---
try {
  const invalidNames = 'Cline, Zod'; // Invalid type
  console.log(`\nAttempting to parse an invalid type (string)...`);
  namesSchema.parse(invalidNames);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Validation failed as expected:`, error.message);
  }
}
