/**
 * Generates step-by-step execution states for Selection Sort.
 * @param {number[]} initialArray
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateSelectionSortSteps(initialArray) {
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
    pointers: { i: 0 },
    counters: { comparisons, swaps, operations: 0 },
    pseudocodeLine: 1,
    description: `Starting Selection Sort on array of ${n} elements.`,
    type: 'init'
  });

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      pointers: { i, minIndex },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 4,
      description: `Starting pass ${i + 1}. Assuming minimum element is at index ${i} (${arr[i]}).`,
      type: 'set-min'
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;

      steps.push({
        array: [...arr],
        comparing: [j, minIndex],
        swapping: [],
        sorted: [...sortedIndices],
        pointers: { i, j, minIndex },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 6,
        description: `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIndex}] (${arr[minIndex]}).`,
        type: 'compare'
      });

      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [...sortedIndices],
          pointers: { i, j, minIndex },
          counters: { comparisons, swaps, operations: comparisons + swaps },
          pseudocodeLine: 7,
          description: `Found smaller element! New minimum is now arr[${minIndex}] (${arr[minIndex]}).`,
          type: 'new-min'
        });
      }
    }

    if (minIndex !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIndex],
        sorted: [...sortedIndices],
        pointers: { i, minIndex },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 9,
        description: `Swapped minimum element arr[${minIndex}] (${arr[i]}) into position arr[${i}].`,
        type: 'swap'
      });
    }

    sortedIndices.push(i);
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      pointers: { i },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 3,
      description: `Element at index ${i} (${arr[i]}) is now sorted.`,
      type: 'element-sorted'
    });
  }

  sortedIndices.push(n - 1);
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    counters: { comparisons, swaps, operations: comparisons + swaps },
    pseudocodeLine: 10,
    description: `Selection Sort finished successfully! Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
    type: 'complete'
  });

  return steps;
}
