/**
 * Doubly Linked List Operations: Insert, Delete, Traverse Forward & Backward.
 */

export function createDefaultDoublyLinkedList() {
  return [
    { id: 'dll-1', val: 15 },
    { id: 'dll-2', val: 42 },
    { id: 'dll-3', val: 78 },
    { id: 'dll-4', val: 91 }
  ];
}

export function generateDLLInsertHeadSteps(currentList, value) {
  const steps = [];
  const list = [...currentList];
  const val = parseInt(value, 10);
  const newNode = { id: `dll-${Date.now()}`, val };

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    newNode,
    action: 'alloc',
    description: `Allocated new doubly node with value ${val} (prev = null, next = null).`,
    type: 'init'
  });

  const updated = [newNode, ...list];

  steps.push({
    nodes: [...updated],
    activeNodeId: newNode.id,
    newNode: null,
    action: 'insert-head',
    description: `Set newNode.next = oldHead, oldHead.prev = newNode. Node ${val} is now the new HEAD.`,
    type: 'complete'
  });

  return { steps, updatedList: updated };
}

export function generateDLLInsertTailSteps(currentList, value) {
  const steps = [];
  const list = [...currentList];
  const val = parseInt(value, 10);
  const newNode = { id: `dll-${Date.now()}`, val };

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    newNode,
    action: 'alloc',
    description: `Allocated new doubly node with value ${val}. Traversing toward TAIL.`,
    type: 'init'
  });

  for (let i = 0; i < list.length; i++) {
    steps.push({
      nodes: [...list],
      activeNodeId: list[i].id,
      newNode,
      action: 'traverse',
      description: `Traversing forward: node ${list[i].val}...`,
      type: 'step'
    });
  }

  const updated = [...list, newNode];

  steps.push({
    nodes: [...updated],
    activeNodeId: newNode.id,
    newNode: null,
    action: 'insert-tail',
    description: `Linked oldTail.next = newNode, newNode.prev = oldTail. Node ${val} is now the new TAIL.`,
    type: 'complete'
  });

  return { steps, updatedList: updated };
}

export function generateDLLDeleteValueSteps(currentList, value) {
  const steps = [];
  const list = [...currentList];
  const val = parseInt(value, 10);

  if (list.length === 0) {
    steps.push({
      nodes: [],
      activeNodeId: null,
      action: 'empty',
      description: 'Doubly linked list is empty.',
      type: 'error'
    });
    return { steps, updatedList: [] };
  }

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    action: 'search',
    description: `Searching for node with value ${val} to remove.`,
    type: 'init'
  });

  let targetIndex = -1;
  for (let i = 0; i < list.length; i++) {
    steps.push({
      nodes: [...list],
      activeNodeId: list[i].id,
      action: 'compare',
      description: `Examining node at index ${i} (${list[i].val}) vs ${val}.`,
      type: 'step'
    });

    if (list[i].val === val) {
      targetIndex = i;
      break;
    }
  }

  if (targetIndex === -1) {
    steps.push({
      nodes: [...list],
      activeNodeId: null,
      action: 'not-found',
      description: `Value ${val} not found in the doubly linked list.`,
      type: 'error'
    });
    return { steps, updatedList: list };
  }

  const deletedNode = list[targetIndex];
  steps.push({
    nodes: [...list],
    activeNodeId: deletedNode.id,
    action: 'delete-target',
    description: `Found node ${val}. Adjusting prev.next and next.prev pointers to bypass node in O(1) time.`,
    type: 'step'
  });

  const updated = list.filter((_, idx) => idx !== targetIndex);

  steps.push({
    nodes: [...updated],
    activeNodeId: null,
    action: 'deleted',
    description: `Deleted node ${val}. Doubly linked list integrity preserved.`,
    type: 'complete'
  });

  return { steps, updatedList: updated };
}

export function generateDLLTraverseBackwardSteps(currentList) {
  const steps = [];
  const list = [...currentList];

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    action: 'init',
    description: `Starting backward traversal using PREV pointers, beginning from TAIL.`,
    type: 'init'
  });

  for (let i = list.length - 1; i >= 0; i--) {
    steps.push({
      nodes: [...list],
      activeNodeId: list[i].id,
      action: 'visit-backward',
      description: `Visiting backwards: node ${list[i].val} (index ${i})${i === list.length - 1 ? ' [TAIL]' : ''}${i === 0 ? ' [HEAD]' : ''}. Following prev pointer.`,
      type: 'step'
    });
  }

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    action: 'complete',
    description: `Reached HEAD (prev pointer is null). Backward traversal finished.`,
    type: 'complete'
  });

  return steps;
}
