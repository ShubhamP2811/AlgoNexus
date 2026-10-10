/**
 * Singly Linked List Operations: Insert, Delete, Search, Traverse step generators.
 */

export function createDefaultLinkedList() {
  return [
    { id: 'n-1', val: 12 },
    { id: 'n-2', val: 99 },
    { id: 'n-3', val: 37 },
    { id: 'n-4', val: 84 }
  ];
}

export function generateLLInsertHeadSteps(currentList, value) {
  const steps = [];
  const list = [...currentList];
  const val = parseInt(value, 10);
  const newNode = { id: `n-${Date.now()}`, val };

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    newNode,
    action: 'alloc',
    description: `Allocated new node with value ${val}. Preparing to point its next pointer to head.`,
    type: 'init'
  });

  const updated = [newNode, ...list];

  steps.push({
    nodes: [...updated],
    activeNodeId: newNode.id,
    newNode: null,
    action: 'insert-head',
    description: `Pointed new node to old head. New node (${val}) is now the new HEAD of the linked list (O(1) time).`,
    type: 'complete'
  });

  return { steps, updatedList: updated };
}

export function generateLLInsertTailSteps(currentList, value) {
  const steps = [];
  const list = [...currentList];
  const val = parseInt(value, 10);
  const newNode = { id: `n-${Date.now()}`, val };

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    newNode,
    action: 'alloc',
    description: `Allocated new node with value ${val}. Starting traversal from head to find current tail.`,
    type: 'init'
  });

  // Traverse to tail
  for (let i = 0; i < list.length; i++) {
    steps.push({
      nodes: [...list],
      activeNodeId: list[i].id,
      newNode,
      action: 'traverse',
      description: `Traversing node ${list[i].val} at index ${i}...`,
      type: 'step'
    });
  }

  const updated = [...list, newNode];

  steps.push({
    nodes: [...updated],
    activeNodeId: newNode.id,
    newNode: null,
    action: 'insert-tail',
    description: `Attached new node (${val}) to previous tail. Node ${val} is now the new TAIL.`,
    type: 'complete'
  });

  return { steps, updatedList: updated };
}

export function generateLLDeleteValueSteps(currentList, value) {
  const steps = [];
  const list = [...currentList];
  const val = parseInt(value, 10);

  if (list.length === 0) {
    steps.push({
      nodes: [],
      activeNodeId: null,
      action: 'empty',
      description: 'Linked list is empty. Nothing to delete.',
      type: 'error'
    });
    return { steps, updatedList: [] };
  }

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    action: 'search',
    description: `Searching for node with value ${val} to delete.`,
    type: 'init'
  });

  let targetIndex = -1;
  for (let i = 0; i < list.length; i++) {
    steps.push({
      nodes: [...list],
      activeNodeId: list[i].id,
      action: 'compare',
      description: `Examining node at index ${i} (value: ${list[i].val}) vs target ${val}.`,
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
      description: `Value ${val} not found in the linked list. No node deleted.`,
      type: 'error'
    });
    return { steps, updatedList: list };
  }

  const deletedNode = list[targetIndex];
  steps.push({
    nodes: [...list],
    activeNodeId: deletedNode.id,
    action: 'delete-target',
    description: `Found target node ${val} at index ${targetIndex}. Bypassing pointers around it.`,
    type: 'step'
  });

  const updated = list.filter((_, idx) => idx !== targetIndex);

  steps.push({
    nodes: [...updated],
    activeNodeId: null,
    action: 'deleted',
    description: `Deleted node ${val} successfully. Adjacent nodes re-linked. New size: ${updated.length}.`,
    type: 'complete'
  });

  return { steps, updatedList: updated };
}

export function generateLLTraverseSteps(currentList) {
  const steps = [];
  const list = [...currentList];

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    action: 'init',
    description: `Beginning traversal from HEAD node.`,
    type: 'init'
  });

  for (let i = 0; i < list.length; i++) {
    steps.push({
      nodes: [...list],
      activeNodeId: list[i].id,
      action: 'visit',
      description: `Visiting node ${i + 1}/${list.length}: value = ${list[i].val}${i === 0 ? ' [HEAD]' : ''}${i === list.length - 1 ? ' [TAIL]' : ''}.`,
      type: 'step'
    });
  }

  steps.push({
    nodes: [...list],
    activeNodeId: null,
    action: 'complete',
    description: `Reached end of list (next pointer is null). Traversal complete.`,
    type: 'complete'
  });

  return steps;
}
