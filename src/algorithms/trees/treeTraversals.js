/**
 * Standard Binary Tree representation and traversal step generators.
 */

export class TreeNode {
  constructor(val, id = null, left = null, right = null) {
    this.val = val;
    this.id = id || `node-${val}-${Math.random().toString(36).substring(2, 6)}`;
    this.left = left;
    this.right = right;
  }
}

/**
 * Creates a default balanced binary tree for traversal visualizations.
 * Tree structure:
 *        40
 *       /  \
 *     20    60
 *    /  \   / \
 *   10  30 50  70
 */
export function getDefaultTree() {
  const n10 = new TreeNode(10, '10');
  const n30 = new TreeNode(30, '30');
  const n50 = new TreeNode(50, '50');
  const n70 = new TreeNode(70, '70');
  const n20 = new TreeNode(20, '20', n10, n30);
  const n60 = new TreeNode(60, '60', n50, n70);
  const root = new TreeNode(40, '40', n20, n60);
  return root;
}

/**
 * Serializes tree for SVG layout calculations: returns nodes with depth, index, parent info.
 */
export function flattenTreeForRender(root) {
  if (!root) return [];
  const nodes = [];

  function traverse(node, depth = 0, xPercent = 50, spread = 25, parentId = null) {
    if (!node) return;
    nodes.push({
      id: node.id,
      val: node.val,
      depth,
      xPercent,
      yPercent: 18 + depth * 22,
      parentId
    });

    if (node.left) {
      traverse(node.left, depth + 1, xPercent - spread, spread / 2, node.id);
    }
    if (node.right) {
      traverse(node.right, depth + 1, xPercent + spread, spread / 2, node.id);
    }
  }

  traverse(root);
  return nodes;
}

/**
 * Inorder Traversal (Left - Root - Right)
 */
export function generateInorderSteps(root = getDefaultTree()) {
  const steps = [];
  const visited = [];
  const callStack = [];

  steps.push({
    activeNodeId: null,
    visitedNodeIds: [],
    traversalOrder: [],
    callStack: [],
    pseudocodeLine: 1,
    description: 'Starting Inorder Traversal (Left -> Root -> Right).',
    type: 'init'
  });

  function inorder(node) {
    if (!node) return;

    callStack.push(node.val);
    steps.push({
      activeNodeId: node.id,
      visitedNodeIds: [...visited],
      traversalOrder: [...visited.map(id => id)],
      callStack: [...callStack],
      pseudocodeLine: 3,
      description: `Exploring node ${node.val}. Recursively descending to left subtree.`,
      type: 'traverse-left'
    });

    if (node.left) inorder(node.left);

    // Visit current
    visited.push(node.id);
    steps.push({
      activeNodeId: node.id,
      visitedNodeIds: [...visited],
      traversalOrder: [...visited],
      callStack: [...callStack],
      pseudocodeLine: 4,
      description: `Visited root node ${node.val}. Appending to result array.`,
      type: 'visit-node'
    });

    if (node.right) {
      steps.push({
        activeNodeId: node.id,
        visitedNodeIds: [...visited],
        traversalOrder: [...visited],
        callStack: [...callStack],
        pseudocodeLine: 5,
        description: `Now descending to right subtree of node ${node.val}.`,
        type: 'traverse-right'
      });
      inorder(node.right);
    }

    callStack.pop();
  }

  inorder(root);

  steps.push({
    activeNodeId: null,
    visitedNodeIds: [...visited],
    traversalOrder: [...visited],
    callStack: [],
    pseudocodeLine: 6,
    description: `Inorder traversal complete! Visited nodes in sorted sequence: [${visited.join(', ')}].`,
    type: 'complete'
  });

  return steps;
}

/**
 * Preorder Traversal (Root - Left - Right)
 */
export function generatePreorderSteps(root = getDefaultTree()) {
  const steps = [];
  const visited = [];
  const callStack = [];

  steps.push({
    activeNodeId: null,
    visitedNodeIds: [],
    traversalOrder: [],
    callStack: [],
    pseudocodeLine: 1,
    description: 'Starting Preorder Traversal (Root -> Left -> Right).',
    type: 'init'
  });

  function preorder(node) {
    if (!node) return;

    callStack.push(node.val);
    visited.push(node.id);

    steps.push({
      activeNodeId: node.id,
      visitedNodeIds: [...visited],
      traversalOrder: [...visited],
      callStack: [...callStack],
      pseudocodeLine: 3,
      description: `Visited root node ${node.val} first before exploring children.`,
      type: 'visit-node'
    });

    if (node.left) {
      steps.push({
        activeNodeId: node.id,
        visitedNodeIds: [...visited],
        traversalOrder: [...visited],
        callStack: [...callStack],
        pseudocodeLine: 4,
        description: `Traversing left child of node ${node.val}.`,
        type: 'traverse-left'
      });
      preorder(node.left);
    }

    if (node.right) {
      steps.push({
        activeNodeId: node.id,
        visitedNodeIds: [...visited],
        traversalOrder: [...visited],
        callStack: [...callStack],
        pseudocodeLine: 5,
        description: `Traversing right child of node ${node.val}.`,
        type: 'traverse-right'
      });
      preorder(node.right);
    }

    callStack.pop();
  }

  preorder(root);

  steps.push({
    activeNodeId: null,
    visitedNodeIds: [...visited],
    traversalOrder: [...visited],
    callStack: [],
    pseudocodeLine: 6,
    description: `Preorder traversal complete! Order: [${visited.join(', ')}].`,
    type: 'complete'
  });

  return steps;
}

/**
 * Postorder Traversal (Left - Right - Root)
 */
export function generatePostorderSteps(root = getDefaultTree()) {
  const steps = [];
  const visited = [];
  const callStack = [];

  steps.push({
    activeNodeId: null,
    visitedNodeIds: [],
    traversalOrder: [],
    callStack: [],
    pseudocodeLine: 1,
    description: 'Starting Postorder Traversal (Left -> Right -> Root).',
    type: 'init'
  });

  function postorder(node) {
    if (!node) return;

    callStack.push(node.val);

    if (node.left) {
      steps.push({
        activeNodeId: node.id,
        visitedNodeIds: [...visited],
        traversalOrder: [...visited],
        callStack: [...callStack],
        pseudocodeLine: 3,
        description: `Traversing left subtree of node ${node.val}.`,
        type: 'traverse-left'
      });
      postorder(node.left);
    }

    if (node.right) {
      steps.push({
        activeNodeId: node.id,
        visitedNodeIds: [...visited],
        traversalOrder: [...visited],
        callStack: [...callStack],
        pseudocodeLine: 4,
        description: `Traversing right subtree of node ${node.val}.`,
        type: 'traverse-right'
      });
      postorder(node.right);
    }

    visited.push(node.id);
    steps.push({
      activeNodeId: node.id,
      visitedNodeIds: [...visited],
      traversalOrder: [...visited],
      callStack: [...callStack],
      pseudocodeLine: 5,
      description: `Both subtrees processed. Now visiting node ${node.val}.`,
      type: 'visit-node'
    });

    callStack.pop();
  }

  postorder(root);

  steps.push({
    activeNodeId: null,
    visitedNodeIds: [...visited],
    traversalOrder: [...visited],
    callStack: [],
    pseudocodeLine: 6,
    description: `Postorder traversal complete! Order: [${visited.join(', ')}].`,
    type: 'complete'
  });

  return steps;
}

/**
 * Level Order (BFS) Traversal
 */
export function generateLevelOrderSteps(root = getDefaultTree()) {
  const steps = [];
  if (!root) return steps;

  const queue = [root];
  const visited = [];

  steps.push({
    activeNodeId: root.id,
    visitedNodeIds: [],
    traversalOrder: [],
    queue: [root.val],
    pseudocodeLine: 2,
    description: `Enqueued root node ${root.val} to queue.`,
    type: 'init'
  });

  while (queue.length > 0) {
    const curr = queue.shift();
    visited.push(curr.id);

    steps.push({
      activeNodeId: curr.id,
      visitedNodeIds: [...visited],
      traversalOrder: [...visited],
      queue: queue.map(n => n.val),
      pseudocodeLine: 4,
      description: `Dequeued and visited node ${curr.val}.`,
      type: 'visit-node'
    });

    if (curr.left) {
      queue.push(curr.left);
      steps.push({
        activeNodeId: curr.left.id,
        visitedNodeIds: [...visited],
        traversalOrder: [...visited],
        queue: queue.map(n => n.val),
        pseudocodeLine: 6,
        description: `Enqueued left child ${curr.left.val} of node ${curr.val}.`,
        type: 'enqueue'
      });
    }

    if (curr.right) {
      queue.push(curr.right);
      steps.push({
        activeNodeId: curr.right.id,
        visitedNodeIds: [...visited],
        traversalOrder: [...visited],
        queue: queue.map(n => n.val),
        pseudocodeLine: 7,
        description: `Enqueued right child ${curr.right.val} of node ${curr.val}.`,
        type: 'enqueue'
      });
    }
  }

  steps.push({
    activeNodeId: null,
    visitedNodeIds: [...visited],
    traversalOrder: [...visited],
    queue: [],
    pseudocodeLine: 8,
    description: `Level order traversal complete! Order: [${visited.join(', ')}].`,
    type: 'complete'
  });

  return steps;
}
