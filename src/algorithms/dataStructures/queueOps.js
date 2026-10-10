/**
 * Queue (FIFO) Operations: Enqueue, Dequeue, Peek step generators.
 */

export function generateQueueEnqueueSteps(currentQueue, value, maxSize = 8) {
  const steps = [];
  const queue = [...currentQueue];
  const val = parseInt(value, 10);

  if (queue.length >= maxSize) {
    steps.push({
      queue: [...queue],
      activeAction: 'overflow',
      frontIndex: 0,
      rearIndex: queue.length - 1,
      description: `⚠️ Queue Overflow! Cannot enqueue ${val} because maximum capacity (${maxSize}) is reached.`,
      type: 'error'
    });
    return { steps, updatedQueue: queue };
  }

  steps.push({
    queue: [...queue],
    activeAction: 'enqueue-start',
    frontIndex: 0,
    rearIndex: queue.length - 1,
    incomingValue: val,
    description: `Enqueuing value ${val} at the REAR of the queue.`,
    type: 'init'
  });

  queue.push(val);

  steps.push({
    queue: [...queue],
    activeAction: 'enqueue-complete',
    frontIndex: 0,
    rearIndex: queue.length - 1,
    description: `Successfully enqueued ${val}! Front element: ${queue[0]}, Rear element: ${val}. Queue size: ${queue.length}.`,
    type: 'complete'
  });

  return { steps, updatedQueue: queue };
}

export function generateQueueDequeueSteps(currentQueue) {
  const steps = [];
  const queue = [...currentQueue];

  if (queue.length === 0) {
    steps.push({
      queue: [],
      activeAction: 'underflow',
      frontIndex: -1,
      rearIndex: -1,
      description: `⚠️ Queue Underflow! Cannot dequeue from an empty queue.`,
      type: 'error'
    });
    return { steps, updatedQueue: [] };
  }

  const dequeuedVal = queue[0];

  steps.push({
    queue: [...queue],
    activeAction: 'dequeue-start',
    frontIndex: 0,
    rearIndex: queue.length - 1,
    dequeuingValue: dequeuedVal,
    description: `Dequeuing front element ${dequeuedVal} from the FRONT of the queue.`,
    type: 'init'
  });

  queue.shift();

  steps.push({
    queue: [...queue],
    activeAction: 'dequeue-complete',
    frontIndex: queue.length > 0 ? 0 : -1,
    rearIndex: queue.length > 0 ? queue.length - 1 : -1,
    description: `Dequeued ${dequeuedVal} successfully (FIFO principle). New front is ${queue.length > 0 ? queue[0] : 'None (Empty)'}.`,
    type: 'complete'
  });

  return { steps, updatedQueue: queue };
}

export function generateQueuePeekSteps(currentQueue) {
  const steps = [];
  const queue = [...currentQueue];

  if (queue.length === 0) {
    steps.push({
      queue: [],
      activeAction: 'peek-empty',
      frontIndex: -1,
      rearIndex: -1,
      description: `Queue is empty. Peek returns null/undefined.`,
      type: 'info'
    });
    return steps;
  }

  const frontVal = queue[0];

  steps.push({
    queue: [...queue],
    activeAction: 'peek',
    frontIndex: 0,
    rearIndex: queue.length - 1,
    description: `Peek inspected FRONT element: ${frontVal} without removing it.`,
    type: 'complete'
  });

  return steps;
}
