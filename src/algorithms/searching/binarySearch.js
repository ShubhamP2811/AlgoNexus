/**
 * Generates step-by-step execution states for Binary Search.
 * @param {number[]} initialArray
 * @param {number} target
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateBinarySearchSteps(initialArray, target) {
  // Ensure array is sorted for binary search
  const arr = [...initialArray].sort((a, b) => a - b);
  const steps = [];
  const n = arr.length;
  let comparisons = 0;
  const eliminated = [];

  steps.push({
    array: [...arr],
    comparing: [],
    found: null,
    eliminated: [],
    pointers: { low: 0, high: n - 1, target },
    counters: { comparisons, operations: 0 },
    pseudocodeLine: 1,
    description: `Array sorted for Binary Search. Searching for target value: ${target}.`,
    type: 'init'
  });

  let low = 0;
  let high = n - 1;
  let foundIndex = -1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;

    steps.push({
      array: [...arr],
      comparing: [mid],
      found: null,
      eliminated: [...eliminated],
      pointers: { low, mid, high, target },
      counters: { comparisons, operations: comparisons },
      pseudocodeLine: 4,
      description: `Search window is [${low}..${high}]. Midpoint is index ${mid} (value: ${arr[mid]}). Comparing with ${target}.`,
      type: 'calculate-mid'
    });

    if (arr[mid] === target) {
      foundIndex = mid;
      steps.push({
        array: [...arr],
        comparing: [],
        found: mid,
        eliminated: [...eliminated],
        pointers: { foundIndex: mid, target },
        counters: { comparisons, operations: comparisons },
        pseudocodeLine: 6,
        description: `Target ${target} found at index ${mid}!`,
        type: 'found'
      });
      break;
    } else if (arr[mid] < target) {
      // Eliminate left half
      for (let k = low; k <= mid; k++) eliminated.push(k);
      steps.push({
        array: [...arr],
        comparing: [],
        found: null,
        eliminated: [...eliminated],
        pointers: { low: mid + 1, high, target },
        counters: { comparisons, operations: comparisons },
        pseudocodeLine: 8,
        description: `arr[${mid}] (${arr[mid]}) < ${target}: Target must be in right half. Setting low = ${mid + 1}.`,
        type: 'narrow-right'
      });
      low = mid + 1;
    } else {
      // Eliminate right half
      for (let k = mid; k <= high; k++) eliminated.push(k);
      steps.push({
        array: [...arr],
        comparing: [],
        found: null,
        eliminated: [...eliminated],
        pointers: { low, high: mid - 1, target },
        counters: { comparisons, operations: comparisons },
        pseudocodeLine: 10,
        description: `arr[${mid}] (${arr[mid]}) > ${target}: Target must be in left half. Setting high = ${mid - 1}.`,
        type: 'narrow-left'
      });
      high = mid - 1;
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      comparing: [],
      found: -1,
      eliminated: Array.from({ length: n }, (_, idx) => idx),
      pointers: { target },
      counters: { comparisons, operations: comparisons },
      pseudocodeLine: 11,
      description: `Target ${target} does not exist in the array (low > high search space exhausted).`,
      type: 'not-found'
    });
  }

  return steps;
}
