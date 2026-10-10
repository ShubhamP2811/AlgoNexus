/**
 * Generates step-by-step execution states for Bubble Sort.
 * @param {number[]} initialArray
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateBubbleSortSteps(initialArray) {
  const arr = [...initialArray];
  const steps = [];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = [];

  // Step 0: Initial state
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pointers: { i: 0, j: 0 },
    counters: { comparisons, swaps, operations: 0 },
    pseudocodeLine: 1,
    description: `Starting Bubble Sort on array of ${n} elements.`,
    type: 'init'
  });

  let swapped;
  for (let i = 0; i < n; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      
      // Step: Comparing adjacent elements
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sortedIndices],
        pointers: { i, j, 'j+1': j + 1 },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 6,
        description: `Comparing elements arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`,
        type: 'compare'
      });

      if (arr[j] > arr[j + 1]) {
        swaps++;
        // Swap elements
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;

        // Step: Swapping elements
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sortedIndices],
          pointers: { i, j, 'j+1': j + 1 },
          counters: { comparisons, swaps, operations: comparisons + swaps },
          pseudocodeLine: 7,
          description: `arr[${j}] > arr[${j + 1}], swapped ${arr[j + 1]} and ${arr[j]}.`,
          type: 'swap'
        });
      }
    }

    // Mark the element at n - i - 1 as sorted
    sortedIndices.unshift(n - i - 1);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      pointers: { i },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 5,
      description: `Pass ${i + 1} complete. Element ${arr[n - i - 1]} at index ${n - i - 1} is now in its sorted position.`,
      type: 'pass-complete'
    });

    if (!swapped) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, idx) => idx),
        pointers: {},
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 9,
        description: 'No swaps occurred in this pass. The array is already completely sorted (Early Exit).',
        type: 'early-exit'
      });
      break;
    }
  }

  // Final complete step
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    counters: { comparisons, swaps, operations: comparisons + swaps },
    pseudocodeLine: 10,
    description: `Bubble Sort finished successfully! Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
    type: 'complete'
  });

  return steps;
}
