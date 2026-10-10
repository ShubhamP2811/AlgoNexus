/**
 * Hash Table Operations with Hash Function breakdown and Separate Chaining collision handling.
 */

export const HASH_TABLE_SIZE = 7;

export function computeHash(key, size = HASH_TABLE_SIZE) {
  let rawHash = 0;
  const charDetails = [];

  for (let i = 0; i < key.length; i++) {
    const code = key.charCodeAt(i);
    rawHash = (rawHash * 31 + code) & 0x7fffffff;
    charDetails.push({ char: key[i], code });
  }

  const index = rawHash % size;
  return { rawHash, index, charDetails };
}

export function createDefaultHashTable() {
  const table = Array.from({ length: HASH_TABLE_SIZE }, () => []);
  // Prepopulate with a few elements
  const presets = [
    { key: 'apple', value: 120 },
    { key: 'banana', value: 80 },
    { key: 'grape', value: 250 }
  ];

  presets.forEach(item => {
    const { index } = computeHash(item.key);
    table[index].push(item);
  });

  return table;
}

export function generateHashTablePutSteps(currentTable, key, value) {
  const steps = [];
  const table = currentTable.map(bucket => [...bucket.map(item => ({ ...item }))]);
  const cleanKey = String(key).trim();
  const cleanVal = String(value).trim();

  if (!cleanKey) {
    steps.push({
      table,
      activeBucket: -1,
      hashInfo: null,
      description: 'Key cannot be empty.',
      type: 'error'
    });
    return { steps, updatedTable: table };
  }

  const hashInfo = computeHash(cleanKey);

  steps.push({
    table: currentTable,
    activeBucket: -1,
    hashInfo,
    description: `Computing hash for key "${cleanKey}": hash("${cleanKey}") = ${hashInfo.rawHash}. Slot index = ${hashInfo.rawHash} % ${HASH_TABLE_SIZE} = ${hashInfo.index}.`,
    type: 'hash-calc'
  });

  steps.push({
    table: currentTable,
    activeBucket: hashInfo.index,
    hashInfo,
    description: `Inspecting bucket [${hashInfo.index}]. Current bucket size: ${table[hashInfo.index].length}.`,
    type: 'inspect-bucket'
  });

  const bucket = table[hashInfo.index];
  const existingIdx = bucket.findIndex(item => item.key === cleanKey);

  if (existingIdx !== -1) {
    bucket[existingIdx].value = cleanVal;
    steps.push({
      table,
      activeBucket: hashInfo.index,
      hashInfo,
      description: `Key "${cleanKey}" already exists in bucket [${hashInfo.index}]. Updated value to "${cleanVal}".`,
      type: 'update'
    });
  } else {
    bucket.push({ key: cleanKey, value: cleanVal });
    steps.push({
      table,
      activeBucket: hashInfo.index,
      hashInfo,
      description: `Appended { "${cleanKey}": "${cleanVal}" } to bucket [${hashInfo.index}] chain. Collision handled via Separate Chaining.`,
      type: 'insert'
    });
  }

  return { steps, updatedTable: table };
}

export function generateHashTableGetSteps(currentTable, key) {
  const steps = [];
  const cleanKey = String(key).trim();
  const hashInfo = computeHash(cleanKey);

  steps.push({
    table: currentTable,
    activeBucket: -1,
    hashInfo,
    description: `Searching for key "${cleanKey}". Hashing: ${cleanKey} maps to bucket index ${hashInfo.index}.`,
    type: 'hash-calc'
  });

  steps.push({
    table: currentTable,
    activeBucket: hashInfo.index,
    hashInfo,
    description: `Accessing bucket [${hashInfo.index}] in O(1) time. Searching chain for key "${cleanKey}".`,
    type: 'inspect-bucket'
  });

  const bucket = currentTable[hashInfo.index] || [];
  const found = bucket.find(item => item.key === cleanKey);

  if (found) {
    steps.push({
      table: currentTable,
      activeBucket: hashInfo.index,
      hashInfo,
      foundItem: found,
      description: `Match found! Key "${cleanKey}" has value "${found.value}" in bucket [${hashInfo.index}].`,
      type: 'found'
    });
  } else {
    steps.push({
      table: currentTable,
      activeBucket: hashInfo.index,
      hashInfo,
      foundItem: null,
      description: `Key "${cleanKey}" does not exist in bucket [${hashInfo.index}] (Search miss).`,
      type: 'not-found'
    });
  }

  return steps;
}

export function generateHashTableDeleteSteps(currentTable, key) {
  const steps = [];
  const table = currentTable.map(bucket => [...bucket.map(item => ({ ...item }))]);
  const cleanKey = String(key).trim();
  const hashInfo = computeHash(cleanKey);

  steps.push({
    table: currentTable,
    activeBucket: hashInfo.index,
    hashInfo,
    description: `Deleting key "${cleanKey}". Computed bucket index = ${hashInfo.index}.`,
    type: 'hash-calc'
  });

  const bucket = table[hashInfo.index];
  const idx = bucket.findIndex(item => item.key === cleanKey);

  if (idx !== -1) {
    const removed = bucket.splice(idx, 1)[0];
    steps.push({
      table,
      activeBucket: hashInfo.index,
      hashInfo,
      description: `Successfully deleted { "${removed.key}": "${removed.value}" } from bucket [${hashInfo.index}].`,
      type: 'complete'
    });
  } else {
    steps.push({
      table,
      activeBucket: hashInfo.index,
      hashInfo,
      description: `Key "${cleanKey}" not found in bucket [${hashInfo.index}]. Nothing to delete.`,
      type: 'not-found'
    });
  }

  return { steps, updatedTable: table };
}
