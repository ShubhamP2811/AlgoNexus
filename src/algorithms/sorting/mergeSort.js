/**
 * Generates step-by-step execution states for Merge Sort.
 * @param {number[]} initialArray
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateMergeSortSteps(initialArray) {
  const arr = [...initialArray];
  const steps = [];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    pointers: { left: 0, right: n - 1 },
    counters: { comparisons, swaps, operations: 0 },
    pseudocodeLine: 1,
    description: `Starting Merge Sort on array of ${n} elements.`,
    type: 'init'
  });

  function merge(low, mid, high) {
    const leftPart = arr.slice(low, mid + 1);
    const rightPart = arr.slice(mid + 1, high + 1);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      pointers: { low, mid, high },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 8,
      description: `Merging subarrays: Left [${low}..${mid}] and Right [${mid + 1}..${high}].`,
      type: 'merge-start'
    });

    let i = 0, j = 0, k = low;

    while (i < leftPart.length && j < rightPart.length) {
      comparisons++;

      steps.push({
        array: [...arr],
        comparing: [low + i, mid + 1 + j],
        swapping: [],
        sorted: [],
        pointers: { k, 'left[i]': low + i, 'right[j]': mid + 1 + j },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 10,
        description: `Comparing left element (${leftPart[i]}) with right element (${rightPart[j]}).`,
        type: 'compare'
      });

      if (leftPart[i] <= rightPart[j]) {
        arr[k] = leftPart[i];
        swaps++;
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [k],
          sorted: [],
          pointers: { k },
          counters: { comparisons, swaps, operations: comparisons + swaps },
          pseudocodeLine: 10,
          description: `Copied ${leftPart[i]} from left subarray to position ${k}.`,
          type: 'overwrite'
        });
        i++;
      } else {
        arr[k] = rightPart[j];
        swaps++;
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [k],
          sorted: [],
          pointers: { k },
          counters: { comparisons, swaps, operations: comparisons + swaps },
          pseudocodeLine: 10,
          description: `Copied ${rightPart[j]} from right subarray to position ${k}.`,
          type: 'overwrite'
        });
        j++;
      }
      k++;
    }

    while (i < leftPart.length) {
      arr[k] = leftPart[i];
      swaps++;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [],
        pointers: { k },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 10,
        description: `Flushed remaining left element (${leftPart[i]}) to position ${k}.`,
        type: 'overwrite'
      });
      i++;
      k++;
    }

    while (j < rightPart.length) {
      arr[k] = rightPart[j];
      swaps++;
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [k],
        sorted: [],
        pointers: { k },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 10,
        description: `Flushed remaining right element (${rightPart[j]}) to position ${k}.`,
        type: 'overwrite'
      });
      j++;
      k++;
    }

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: high - low + 1 }, (_, idx) => low + idx),
      pointers: { low, high },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 6,
      description: `Subarray [${low}..${high}] successfully merged in sorted order.`,
      type: 'sub-merge-complete'
    });
  }

  function mergeSortHelper(low, high) {
    if (low >= high) return;
    const mid = Math.floor((low + high) / 2);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      pointers: { low, mid, high },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 3,
      description: `Dividing range [${low}..${high}] at midpoint index ${mid}.`,
      type: 'divide'
    });

    mergeSortHelper(low, mid);
    mergeSortHelper(mid + 1, high);
    merge(low, mid, high);
  }

  mergeSortHelper(0, n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    counters: { comparisons, swaps, operations: comparisons + swaps },
    pseudocodeLine: 1,
    description: `Merge Sort complete! Total comparisons: ${comparisons}, Total write operations: ${swaps}.`,
    type: 'complete'
  });

  return steps;
}
