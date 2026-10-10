/**
 * Generates step-by-step execution states for Quick Sort (Lomuto Partition scheme).
 * @param {number[]} initialArray
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateQuickSortSteps(initialArray) {
  const arr = [...initialArray];
  const steps = [];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = new Set();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pointers: { low: 0, high: n - 1 },
    counters: { comparisons, swaps, operations: 0 },
    pseudocodeLine: 1,
    description: `Starting Quick Sort on array of ${n} elements.`,
    type: 'init'
  });

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from(sortedIndices),
      pointers: { low, high, pivotIndex: high, pivotValue: pivot, i },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 8,
      description: `Chosen pivot arr[${high}] = ${pivot}. Partitioning range [${low}..${high}].`,
      type: 'set-pivot'
    });

    for (let j = low; j < high; j++) {
      comparisons++;

      steps.push({
        array: [...arr],
        comparing: [j, high],
        swapping: [],
        sorted: Array.from(sortedIndices),
        pointers: { low, high, pivotIndex: high, i, j },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 11,
        description: `Comparing element arr[${j}] (${arr[j]}) with pivot (${pivot}).`,
        type: 'compare'
      });

      if (arr[j] <= pivot) {
        i++;
        if (i !== j) {
          swaps++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;

          steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i, j],
            sorted: Array.from(sortedIndices),
            pointers: { low, high, pivotIndex: high, i, j },
            counters: { comparisons, swaps, operations: comparisons + swaps },
            pseudocodeLine: 12,
            description: `arr[${j}] <= pivot: Swapped arr[${i}] and arr[${j}] to place smaller element on left.`,
            type: 'swap'
          });
        }
      }
    }

    const pivotFinalIndex = i + 1;
    if (pivotFinalIndex !== high) {
      swaps++;
      const temp = arr[pivotFinalIndex];
      arr[pivotFinalIndex] = arr[high];
      arr[high] = temp;
    }

    sortedIndices.add(pivotFinalIndex);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: pivotFinalIndex !== high ? [pivotFinalIndex, high] : [],
      sorted: Array.from(sortedIndices),
      pointers: { pivot: pivotFinalIndex },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 13,
      description: pivotFinalIndex !== high 
        ? `Swapped pivot ${pivot} with arr[${pivotFinalIndex}] to place pivot into sorted position.`
        : `Pivot ${pivot} is already at its correct sorted partition position at index ${pivotFinalIndex}.`,
      type: 'place-pivot'
    });

    return pivotFinalIndex;
  }

  function quickSortHelper(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sortedIndices.add(low);
    }
  }

  quickSortHelper(0, n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    counters: { comparisons, swaps, operations: comparisons + swaps },
    pseudocodeLine: 1,
    description: `Quick Sort completed! Total comparisons: ${comparisons}, Total swaps: ${swaps}.`,
    type: 'complete'
  });

  return steps;
}
