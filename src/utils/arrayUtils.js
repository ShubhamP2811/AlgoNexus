/**
 * Utility functions for generating and parsing input arrays.
 */

export function generateRandomArray(size = 12, min = 10, max = 100) {
  const result = [];
  for (let i = 0; i < size; i++) {
    result.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return result;
}

export function generateReversedArray(size = 12) {
  const arr = generateRandomArray(size).sort((a, b) => b - a);
  return arr;
}

export function generateNearlySortedArray(size = 12) {
  const arr = generateRandomArray(size).sort((a, b) => a - b);
  // Swap 2-3 pairs
  for (let i = 0; i < Math.max(1, Math.floor(size / 4)); i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    const temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
  }
  return arr;
}

/**
 * Validates and parses user text input (e.g. "45, 12, 88, 3, 9" or "45 12 88 3 9")
 * @param {string} inputStr
 * @param {number} minCount
 * @param {number} maxCount
 * @returns {{ valid: boolean, data?: number[], error?: string }}
 */
export function parseCustomArrayInput(inputStr, minCount = 2, maxCount = 30) {
  if (!inputStr || !inputStr.trim()) {
    return { valid: false, error: 'Please enter at least 2 numbers.' };
  }

  // Split by commas or whitespace
  const rawParts = inputStr.trim().split(/[\s,]+/);
  const parsed = [];

  for (const part of rawParts) {
    if (part === '') continue;
    const num = Number(part);
    if (isNaN(num)) {
      return { valid: false, error: `Invalid number: "${part}". Please enter only numbers.` };
    }
    if (num < 1 || num > 999) {
      return { valid: false, error: `Number ${num} is out of bounds (1 - 999).` };
    }
    parsed.push(num);
  }

  if (parsed.length < minCount) {
    return { valid: false, error: `Please provide at least ${minCount} numbers (got ${parsed.length}).` };
  }

  if (parsed.length > maxCount) {
    return { valid: false, error: `Too many numbers. Maximum allowed is ${maxCount} (got ${parsed.length}).` };
  }

  return { valid: true, data: parsed };
}
