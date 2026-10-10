/**
 * Generates step-by-step execution states for Insertion Sort.
 * @param {number[]} initialArray
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateInsertionSortSteps(initialArray) {
  const arr = [...initialArray];
  const steps = [];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  const sortedIndices = [0];

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [0],
    pointers: { i: 1 },
    counters: { comparisons, swaps, operations: 0 },
    pseudocodeLine: 1,
    description: `Starting Insertion Sort. Initial element at index 0 (${arr[0]}) is trivially sorted.`,
    type: 'init'
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sortedIndices],
      pointers: { i, keyIndex: i, j },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 4,
      description: `Picking key element arr[${i}] = ${key} to insert into the sorted subarray [0..${i - 1}].`,
      type: 'pick-key'
    });

    while (j >= 0) {
      comparisons++;
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sortedIndices],
        pointers: { i, j, keyVal: key },
        counters: { comparisons, swaps, operations: comparisons + swaps },
        pseudocodeLine: 6,
        description: `Comparing key (${key}) with sorted element arr[${j}] (${arr[j]}).`,
        type: 'compare'
      });

      if (arr[j] > key) {
        swaps++;
        arr[j + 1] = arr[j];

        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j + 1],
          sorted: [...sortedIndices],
          pointers: { i, j, shiftedTo: j + 1 },
          counters: { comparisons, swaps, operations: comparisons + swaps },
          pseudocodeLine: 7,
          description: `${arr[j]} > ${key}: Shifted arr[${j}] right to index ${j + 1}.`,
          type: 'shift'
        });
        j--;
      } else {
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [...sortedIndices],
          pointers: { i, j, insertAt: j + 1 },
          counters: { comparisons, swaps, operations: comparisons + swaps },
          pseudocodeLine: 6,
          description: `${arr[j]} <= ${key}: Found correct insertion position at index ${j + 1}.`,
          type: 'found-pos'
        });
        break;
      }
    }

    arr[j + 1] = key;
    sortedIndices.push(i);

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [j + 1],
      sorted: [...sortedIndices],
      pointers: { i, insertedAt: j + 1 },
      counters: { comparisons, swaps, operations: comparisons + swaps },
      pseudocodeLine: 9,
      description: `Inserted key (${key}) into sorted position at index ${j + 1}. Subarray [0..${i}] is sorted.`,
      type: 'insert'
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    pointers: {},
    counters: { comparisons, swaps, operations: comparisons + swaps },
    pseudocodeLine: 10,
    description: `Insertion Sort completed! Total comparisons: ${comparisons}, Total shifts/swaps: ${swaps}.`,
    type: 'complete'
  });

  return steps;
}
