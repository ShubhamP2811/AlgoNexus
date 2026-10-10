/**
 * Array Operations: Access, Insert, Delete, Update, Traverse step generators.
 * Conforms to contiguous array memory concepts and updates pseudocode lines.
 */

export function generateArrayAccessSteps(currentArr, index) {
  const steps = [];
  const arr = [...currentArr];
  const idx = parseInt(index, 10);

  if (idx < 0 || idx >= arr.length) {
    steps.push({
      array: [...arr],
      highlightIndices: [],
      pointers: {},
      counters: { operations: 0 },
      pseudocodeLine: 1,
      description: `⚠️ Index ${idx} is out of bounds for array of length ${arr.length}.`,
      type: 'error'
    });
    return { steps, updatedArray: arr };
  }

  steps.push({
    array: [...arr],
    highlightIndices: [idx],
    pointers: { target: idx },
    counters: { operations: 1 },
    pseudocodeLine: 1,
    description: `Accessing index ${idx} via direct memory formula: Address = Base + (${idx} × 4 bytes). Value is ${arr[idx]} in O(1) time.`,
    type: 'access'
  });

  return { steps, updatedArray: arr };
}

export function generateArrayInsertSteps(currentArr, index, value) {
  const steps = [];
  const arr = [...currentArr];
  const idx = Math.max(0, Math.min(arr.length, parseInt(index, 10)));
  const val = parseInt(value, 10);

  steps.push({
    array: [...arr],
    highlightIndices: [],
    pointers: { target: idx },
    counters: { operations: 0 },
    pseudocodeLine: 2,
    description: `Preparing to insert value ${val} at index ${idx}. Must shift elements to the right to create an empty slot.`,
    type: 'init'
  });

  // Shift elements right starting from end down to idx
  let shiftCount = 0;
  for (let i = arr.length; i > idx; i--) {
    shiftCount++;
    arr[i] = arr[i - 1];
    steps.push({
      array: [...arr],
      highlightIndices: [i, i - 1],
      pointers: { shifting: i, from: i - 1 },
      counters: { operations: shiftCount },
      pseudocodeLine: 2,
      description: `Shift #${shiftCount}: Moved element ${arr[i]} from index ${i - 1} right to index ${i}.`,
      type: 'shift'
    });
  }

  arr[idx] = val;
  shiftCount++;
  steps.push({
    array: [...arr],
    highlightIndices: [idx],
    pointers: { inserted: idx },
    counters: { operations: shiftCount },
    pseudocodeLine: 2,
    description: `Inserted value ${val} into vacated slot at index ${idx}. Total shifts/operations: ${shiftCount} (O(n) time).`,
    type: 'insert'
  });

  return { steps, updatedArray: arr };
}

export function generateArrayDeleteSteps(currentArr, index) {
  const steps = [];
  const arr = [...currentArr];
  const idx = parseInt(index, 10);

  if (idx < 0 || idx >= arr.length) {
    steps.push({
      array: [...arr],
      highlightIndices: [],
      pointers: {},
      counters: { operations: 0 },
      pseudocodeLine: 3,
      description: `⚠️ Index ${idx} is out of bounds for array of length ${arr.length}.`,
      type: 'error'
    });
    return { steps, updatedArray: arr };
  }

  const removedVal = arr[idx];
  steps.push({
    array: [...arr],
    highlightIndices: [idx],
    pointers: { deleting: idx },
    counters: { operations: 1 },
    pseudocodeLine: 3,
    description: `Deleting element ${removedVal} at index ${idx}. Must shift subsequent elements left to close the gap.`,
    type: 'init'
  });

  // Shift elements left
  let shiftCount = 0;
  for (let i = idx; i < arr.length - 1; i++) {
    shiftCount++;
    arr[i] = arr[i + 1];
    steps.push({
      array: [...arr],
      highlightIndices: [i, i + 1],
      pointers: { shifting: i, from: i + 1 },
      counters: { operations: shiftCount + 1 },
      pseudocodeLine: 3,
      description: `Shift #${shiftCount}: Shifted element ${arr[i]} from index ${i + 1} left to index ${i}.`,
      type: 'shift'
    });
  }

  arr.pop();
  steps.push({
    array: [...arr],
    highlightIndices: [],
    pointers: {},
    counters: { operations: shiftCount + 1 },
    pseudocodeLine: 3,
    description: `Deletion complete! Removed ${removedVal}. Array length is now ${arr.length}. Total operations: ${shiftCount + 1} (O(n) time).`,
    type: 'complete'
  });

  return { steps, updatedArray: arr };
}

export function generateArrayUpdateSteps(currentArr, index, value) {
  const steps = [];
  const arr = [...currentArr];
  const idx = parseInt(index, 10);
  const val = parseInt(value, 10);

  if (idx < 0 || idx >= arr.length) {
    steps.push({
      array: [...arr],
      highlightIndices: [],
      pointers: {},
      counters: { operations: 0 },
      pseudocodeLine: 4,
      description: `⚠️ Index ${idx} is out of bounds for array of length ${arr.length}.`,
      type: 'error'
    });
    return { steps, updatedArray: arr };
  }

  const oldVal = arr[idx];
  steps.push({
    array: [...arr],
    highlightIndices: [idx],
    pointers: { target: idx },
    counters: { operations: 0 },
    pseudocodeLine: 4,
    description: `Locating index ${idx} to update value from ${oldVal} to ${val}.`,
    type: 'init'
  });

  arr[idx] = val;

  steps.push({
    array: [...arr],
    highlightIndices: [idx],
    pointers: { updated: idx },
    counters: { operations: 1 },
    pseudocodeLine: 4,
    description: `Updated arr[${idx}] = ${val} in direct O(1) constant time.`,
    type: 'complete'
  });

  return { steps, updatedArray: arr };
}

export function generateArrayTraverseSteps(currentArr) {
  const steps = [];
  const arr = [...currentArr];

  steps.push({
    array: [...arr],
    highlightIndices: [],
    pointers: {},
    counters: { operations: 0 },
    pseudocodeLine: 1,
    description: `Starting sequential linear traversal of array (${arr.length} elements).`,
    type: 'init'
  });

  const visited = [];
  for (let i = 0; i < arr.length; i++) {
    visited.push(i);
    steps.push({
      array: [...arr],
      highlightIndices: [...visited],
      pointers: { current: i },
      counters: { operations: i + 1 },
      pseudocodeLine: 1,
      description: `Visiting index ${i}: Value = ${arr[i]}.`,
      type: 'visit'
    });
  }

  steps.push({
    array: [...arr],
    highlightIndices: [...visited],
    pointers: {},
    counters: { operations: arr.length },
    pseudocodeLine: 1,
    description: `Traversal complete! Visited all ${arr.length} elements sequentially in O(n) time.`,
    type: 'complete'
  });

  return steps;
}
