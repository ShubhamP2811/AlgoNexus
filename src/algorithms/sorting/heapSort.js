/**
 * Generates step-by-step execution states for Heap Sort.
 * @param {number[]} initialArray
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateHeapSortSteps(initialArray) {
  const arr = [...initialArray];
  const steps = [];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = [];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pointers: {},
    counters: { comparisons, swaps, operations: 0 },
    pseudocodeLine: 1,
    description: `Starting Heap Sort on array of ${n} elements.`,
    type: 'init'
  });

  function heapify(size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparing: [left, largest],
        swapping: [],
        sorted: [...sortedIndices],
        pointers: { root: i, left, right: right < size ? right : null },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 10,
        description: `Comparing left child arr[${left}] (${arr[left]}) with root arr[${largest}] (${arr[largest]}).`,
        type: 'compare'
      });

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparing: [right, largest],
        swapping: [],
        sorted: [...sortedIndices],
        pointers: { root: i, left, right },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 11,
        description: `Comparing right child arr[${right}] (${arr[right]}) with current maximum arr[${largest}] (${arr[largest]}).`,
        type: 'compare'
      });

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      swaps++;
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, largest],
        sorted: [...sortedIndices],
        pointers: { parent: i, child: largest },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 12,
        description: `Heap property violated: swapped arr[${i}] and arr[${largest}].`,
        type: 'swap'
      });

      heapify(size, largest);
    }
  }

  // Phase 1: Build max heap
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pointers: {},
    counters: { comparisons, swaps, operations: comparisons + swaps },
    pseudocodeLine: 3,
    description: 'Phase 1: Building initial Max-Heap from the input array.',
    type: 'phase'
  });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pointers: { root: 0 },
    counters: { comparisons, swaps, operations: comparisons + swaps },
    pseudocodeLine: 3,
    description: 'Max-Heap constructed successfully. Root element arr[0] is now the global maximum.',
    type: 'heap-built'
  });

  // Phase 2: Extract elements from heap
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pointers: {},
    counters: { comparisons, swaps, operations: comparisons + swaps },
    pseudocodeLine: 5,
    description: 'Phase 2: Extracting maximum root to the end of the array one-by-one.',
    type: 'phase'
  });

  for (let i = n - 1; i > 0; i--) {
    swaps++;
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    sortedIndices.unshift(i);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [0, i],
      sorted: [...sortedIndices],
      pointers: { extracted: i, newRoot: 0 },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 6,
      description: `Moved maximum element ${temp} to sorted position at index ${i}.`,
      type: 'extract'
    });

    heapify(i, 0);
  }

  sortedIndices.unshift(0);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    counters: { comparisons, swaps, operations: comparisons + swaps },
    pseudocodeLine: 1,
    description: `Heap Sort completed! Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
    type: 'complete'
  });

  return steps;
}
