/**
 * Binary Heap Operations (Supports Min-Heap and Max-Heap).
 */

export function createDefaultHeap(isMin = true) {
  // Balanced default min-heap or max-heap
  return isMin ? [5, 10, 15, 20, 25, 30] : [90, 70, 80, 40, 50, 60];
}

export function generateHeapInsertSteps(currentHeap, value, isMin = true) {
  const steps = [];
  const heap = [...currentHeap];
  const val = parseInt(value, 10);

  if (isNaN(val)) return { steps, updatedHeap: heap };

  steps.push({
    heap: [...heap],
    comparing: [],
    swapping: [],
    description: `Inserting value ${val} into ${isMin ? 'Min-Heap' : 'Max-Heap'}.`,
    type: 'init'
  });

  heap.push(val);
  let idx = heap.length - 1;

  steps.push({
    heap: [...heap],
    comparing: [idx],
    swapping: [],
    description: `Appended ${val} to end of array at index ${idx}. Now bubbling up to restore heap invariant.`,
    type: 'append'
  });

  while (idx > 0) {
    const parentIdx = Math.floor((idx - 1) / 2);

    steps.push({
      heap: [...heap],
      comparing: [idx, parentIdx],
      swapping: [],
      description: `Comparing child at [${idx}] (${heap[idx]}) with parent at [${parentIdx}] (${heap[parentIdx]}).`,
      type: 'compare'
    });

    const shouldSwap = isMin ? heap[idx] < heap[parentIdx] : heap[idx] > heap[parentIdx];

    if (shouldSwap) {
      const temp = heap[idx];
      heap[idx] = heap[parentIdx];
      heap[parentIdx] = temp;

      steps.push({
        heap: [...heap],
        comparing: [],
        swapping: [idx, parentIdx],
        description: `Heap condition violated: Swapped child (${temp}) with parent (${heap[idx]}).`,
        type: 'swap'
      });

      idx = parentIdx;
    } else {
      steps.push({
        heap: [...heap],
        comparing: [],
        swapping: [],
        description: `Heap property satisfied! Element ${heap[idx]} in valid position.`,
        type: 'settled'
      });
      break;
    }
  }

  return { steps, updatedHeap: heap };
}

export function generateHeapExtractSteps(currentHeap, isMin = true) {
  const steps = [];
  const heap = [...currentHeap];

  if (heap.length === 0) {
    steps.push({
      heap: [],
      comparing: [],
      swapping: [],
      description: 'Heap is empty. Nothing to extract.',
      type: 'error'
    });
    return { steps, updatedHeap: [] };
  }

  const rootVal = heap[0];

  steps.push({
    heap: [...heap],
    comparing: [0],
    swapping: [],
    description: `Extracting root ${isMin ? 'minimum' : 'maximum'} element: ${rootVal}.`,
    type: 'init'
  });

  if (heap.length === 1) {
    heap.pop();
    steps.push({
      heap: [],
      comparing: [],
      swapping: [],
      description: `Extracted last element. Heap is now empty.`,
      type: 'complete'
    });
    return { steps, updatedHeap: [] };
  }

  const lastVal = heap.pop();
  heap[0] = lastVal;

  steps.push({
    heap: [...heap],
    comparing: [0],
    swapping: [0],
    description: `Moved last element (${lastVal}) to root index 0. Now bubbling down (heapify).`,
    type: 'replace-root'
  });

  let idx = 0;
  const n = heap.length;

  while (idx < n) {
    let target = idx;
    const left = 2 * idx + 1;
    const right = 2 * idx + 2;

    if (left < n) {
      const leftBetter = isMin ? heap[left] < heap[target] : heap[left] > heap[target];
      if (leftBetter) target = left;
    }

    if (right < n) {
      const rightBetter = isMin ? heap[right] < heap[target] : heap[right] > heap[target];
      if (rightBetter) target = right;
    }

    if (target !== idx) {
      steps.push({
        heap: [...heap],
        comparing: [idx, target],
        swapping: [],
        description: `Comparing parent [${idx}] (${heap[idx]}) with ${isMin ? 'smaller' : 'larger'} child [${target}] (${heap[target]}).`,
        type: 'compare'
      });

      const temp = heap[idx];
      heap[idx] = heap[target];
      heap[target] = temp;

      steps.push({
        heap: [...heap],
        comparing: [],
        swapping: [idx, target],
        description: `Swapped parent [${idx}] with child [${target}].`,
        type: 'swap'
      });

      idx = target;
    } else {
      steps.push({
        heap: [...heap],
        comparing: [],
        swapping: [],
        description: `Bubble down finished. Heap invariant restored across all nodes.`,
        type: 'complete'
      });
      break;
    }
  }

  return { steps, updatedHeap: heap };
}
