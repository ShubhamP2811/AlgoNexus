/**
 * Generates step-by-step execution states for Linear Search.
 * @param {number[]} initialArray
 * @param {number} target
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateLinearSearchSteps(initialArray, target) {
  const arr = [...initialArray];
  const steps = [];
  const n = arr.length;
  let comparisons = 0;
  const visited = [];

  steps.push({
    array: [...arr],
    comparing: [],
    found: null,
    visited: [],
    pointers: { target },
    counters: { comparisons, operations: 0 },
    pseudocodeLine: 1,
    description: `Starting Linear Search for target value: ${target}.`,
    type: 'init'
  });

  let foundIndex = -1;

  for (let i = 0; i < n; i++) {
    comparisons++;
    visited.push(i);

    steps.push({
      array: [...arr],
      comparing: [i],
      found: null,
      visited: [...visited],
      pointers: { i, target },
      counters: { comparisons, operations: comparisons },
      pseudocodeLine: 3,
      description: `Checking index ${i}: Is arr[${i}] (${arr[i]}) equal to target (${target})?`,
      type: 'compare'
    });

    if (arr[i] === target) {
      foundIndex = i;
      steps.push({
        array: [...arr],
        comparing: [],
        found: i,
        visited: [...visited],
        pointers: { foundIndex: i, target },
        counters: { comparisons, operations: comparisons },
        pseudocodeLine: 4,
        description: `Target ${target} found at index ${i}!`,
        type: 'found'
      });
      break;
    }
  }

  if (foundIndex === -1) {
    steps.push({
      array: [...arr],
      comparing: [],
      found: -1,
      visited: [...visited],
      pointers: { target },
      counters: { comparisons, operations: comparisons },
      pseudocodeLine: 5,
      description: `Target ${target} not found in the array after checking all ${n} elements.`,
      type: 'not-found'
    });
  }

  return steps;
}
