/**
 * Stack (LIFO) Operations: Push, Pop, Peek, Clear step generators.
 */

export function generateStackPushSteps(currentStack, value, maxSize = 8) {
  const steps = [];
  const stack = [...currentStack];
  const val = parseInt(value, 10);

  if (stack.length >= maxSize) {
    steps.push({
      stack: [...stack],
      activeAction: 'overflow',
      topIndex: stack.length - 1,
      description: `⚠️ Stack Overflow! Cannot push ${val} because maximum capacity (${maxSize}) is reached.`,
      type: 'error'
    });
    return { steps, updatedStack: stack };
  }

  steps.push({
    stack: [...stack],
    activeAction: 'push-start',
    topIndex: stack.length - 1,
    incomingValue: val,
    description: `Pushing value ${val} onto top of the stack.`,
    type: 'init'
  });

  stack.push(val);

  steps.push({
    stack: [...stack],
    activeAction: 'push-complete',
    topIndex: stack.length - 1,
    description: `Successfully pushed ${val}! New stack size: ${stack.length}, Top index: ${stack.length - 1}.`,
    type: 'complete'
  });

  return { steps, updatedStack: stack };
}

export function generateStackPopSteps(currentStack) {
  const steps = [];
  const stack = [...currentStack];

  if (stack.length === 0) {
    steps.push({
      stack: [],
      activeAction: 'underflow',
      topIndex: -1,
      description: `⚠️ Stack Underflow! Cannot pop from an empty stack.`,
      type: 'error'
    });
    return { steps, updatedStack: [] };
  }

  const poppedVal = stack[stack.length - 1];

  steps.push({
    stack: [...stack],
    activeAction: 'pop-start',
    topIndex: stack.length - 1,
    poppingValue: poppedVal,
    description: `Popping top element ${poppedVal} from the stack.`,
    type: 'init'
  });

  stack.pop();

  steps.push({
    stack: [...stack],
    activeAction: 'pop-complete',
    topIndex: stack.length - 1,
    description: `Popped ${poppedVal} successfully (LIFO principle). New top is ${stack.length > 0 ? stack[stack.length - 1] : 'None (Empty)'}.`,
    type: 'complete'
  });

  return { steps, updatedStack: stack };
}

export function generateStackPeekSteps(currentStack) {
  const steps = [];
  const stack = [...currentStack];

  if (stack.length === 0) {
    steps.push({
      stack: [],
      activeAction: 'peek-empty',
      topIndex: -1,
      description: `Stack is empty. Peek returns null/undefined.`,
      type: 'info'
    });
    return steps;
  }

  const topVal = stack[stack.length - 1];

  steps.push({
    stack: [...stack],
    activeAction: 'peek',
    topIndex: stack.length - 1,
    description: `Peek inspected top element: ${topVal} at index ${stack.length - 1} without removing it.`,
    type: 'complete'
  });

  return steps;
}
