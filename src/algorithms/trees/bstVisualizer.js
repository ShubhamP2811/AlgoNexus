/**
 * Interactive Binary Search Tree (BST) operations: Insert, Search, and Delete.
 */

export class BSTNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.id = `bst-${val}`;
    this.left = left;
    this.right = right;
  }
}

/**
 * Deep clone a BST
 */
export function cloneBST(root) {
  if (!root) return null;
  const copy = new BSTNode(root.val);
  copy.id = root.id;
  copy.left = cloneBST(root.left);
  copy.right = cloneBST(root.right);
  return copy;
}

/**
 * Creates a default BST for visual exploration.
 * Values: 50, 30, 70, 20, 40, 60, 80
 */
export function createDefaultBST() {
  const root = new BSTNode(50);
  root.left = new BSTNode(30, new BSTNode(20), new BSTNode(40));
  root.right = new BSTNode(70, new BSTNode(60), new BSTNode(80));
  return root;
}

/**
 * Serializes BST into nodes array with coordinates for SVG rendering.
 */
export function layoutBST(root) {
  if (!root) return [];
  const nodes = [];

  function traverse(node, depth = 0, x = 50, spread = 25, parentId = null) {
    if (!node) return;
    nodes.push({
      id: node.id,
      val: node.val,
      depth,
      xPercent: x,
      yPercent: 15 + depth * 22,
      parentId
    });

    if (node.left) {
      traverse(node.left, depth + 1, x - spread, spread / 2, node.id);
    }
    if (node.right) {
      traverse(node.right, depth + 1, x + spread, spread / 2, node.id);
    }
  }

  traverse(root);
  return nodes;
}

/**
 * Step generator for BST Insert operation.
 */
export function generateBSTInsertSteps(currentRoot, valueToInsert) {
  const steps = [];
  const val = parseInt(valueToInsert, 10);
  if (isNaN(val)) return steps;

  const rootClone = cloneBST(currentRoot);

  steps.push({
    treeRoot: cloneBST(rootClone),
    activeNodeId: null,
    targetVal: val,
    pseudocodeLine: 1,
    description: `Initiating BST Insert for value ${val}.`,
    type: 'init'
  });

  if (!rootClone) {
    const newRoot = new BSTNode(val);
    steps.push({
      treeRoot: newRoot,
      activeNodeId: newRoot.id,
      targetVal: val,
      pseudocodeLine: 2,
      description: `Tree was empty. Created new root node with value ${val}.`,
      type: 'inserted'
    });
    return { steps, updatedRoot: newRoot };
  }

  let curr = rootClone;
  let insertedNode = null;

  while (curr) {
    steps.push({
      treeRoot: cloneBST(rootClone),
      activeNodeId: curr.id,
      targetVal: val,
      pseudocodeLine: 3,
      description: `Comparing insert value ${val} with current node ${curr.val}.`,
      type: 'compare'
    });

    if (val === curr.val) {
      steps.push({
        treeRoot: cloneBST(rootClone),
        activeNodeId: curr.id,
        targetVal: val,
        pseudocodeLine: 3,
        description: `Value ${val} already exists in BST! Duplicate keys ignored.`,
        type: 'duplicate'
      });
      return { steps, updatedRoot: rootClone };
    } else if (val < curr.val) {
      if (!curr.left) {
        curr.left = new BSTNode(val);
        insertedNode = curr.left;
        steps.push({
          treeRoot: cloneBST(rootClone),
          activeNodeId: insertedNode.id,
          targetVal: val,
          pseudocodeLine: 4,
          description: `${val} < ${curr.val} and left child is empty: Inserted new node ${val} as left child of ${curr.val}.`,
          type: 'inserted'
        });
        break;
      } else {
        steps.push({
          treeRoot: cloneBST(rootClone),
          activeNodeId: curr.left.id,
          targetVal: val,
          pseudocodeLine: 4,
          description: `${val} < ${curr.val}: Moving left to child node ${curr.left.val}.`,
          type: 'move-left'
        });
        curr = curr.left;
      }
    } else {
      if (!curr.right) {
        curr.right = new BSTNode(val);
        insertedNode = curr.right;
        steps.push({
          treeRoot: cloneBST(rootClone),
          activeNodeId: insertedNode.id,
          targetVal: val,
          pseudocodeLine: 5,
          description: `${val} > ${curr.val} and right child is empty: Inserted new node ${val} as right child of ${curr.val}.`,
          type: 'inserted'
        });
        break;
      } else {
        steps.push({
          treeRoot: cloneBST(rootClone),
          activeNodeId: curr.right.id,
          targetVal: val,
          pseudocodeLine: 5,
          description: `${val} > ${curr.val}: Moving right to child node ${curr.right.val}.`,
          type: 'move-right'
        });
        curr = curr.right;
      }
    }
  }

  return { steps, updatedRoot: rootClone };
}

/**
 * Step generator for BST Search operation.
 */
export function generateBSTSearchSteps(currentRoot, valueToSearch) {
  const steps = [];
  const val = parseInt(valueToSearch, 10);
  if (isNaN(val)) return steps;

  steps.push({
    treeRoot: cloneBST(currentRoot),
    activeNodeId: null,
    targetVal: val,
    found: null,
    pseudocodeLine: 1,
    description: `Searching BST for value ${val}.`,
    type: 'init'
  });

  let curr = currentRoot;
  let found = false;

  while (curr) {
    steps.push({
      treeRoot: cloneBST(currentRoot),
      activeNodeId: curr.id,
      targetVal: val,
      found: null,
      pseudocodeLine: 2,
      description: `Comparing target ${val} with current node ${curr.val}.`,
      type: 'compare'
    });

    if (curr.val === val) {
      found = true;
      steps.push({
        treeRoot: cloneBST(currentRoot),
        activeNodeId: curr.id,
        targetVal: val,
        found: true,
        pseudocodeLine: 2,
        description: `Found target node ${val} in the BST!`,
        type: 'found'
      });
      break;
    } else if (val < curr.val) {
      steps.push({
        treeRoot: cloneBST(currentRoot),
        activeNodeId: curr.id,
        targetVal: val,
        found: null,
        pseudocodeLine: 3,
        description: `${val} < ${curr.val}: Navigating left.`,
        type: 'move-left'
      });
      curr = curr.left;
    } else {
      steps.push({
        treeRoot: cloneBST(currentRoot),
        activeNodeId: curr.id,
        targetVal: val,
        found: null,
        pseudocodeLine: 3,
        description: `${val} > ${curr.val}: Navigating right.`,
        type: 'move-right'
      });
      curr = curr.right;
    }
  }

  if (!found) {
    steps.push({
      treeRoot: cloneBST(currentRoot),
      activeNodeId: null,
      targetVal: val,
      found: false,
      pseudocodeLine: 2,
      description: `Target value ${val} does not exist in the BST (reached null pointer).`,
      type: 'not-found'
    });
  }

  return steps;
}

/**
 * Step generator for BST Delete operation.
 */
export function generateBSTDeleteSteps(currentRoot, valueToDelete) {
  const steps = [];
  const val = parseInt(valueToDelete, 10);
  if (isNaN(val)) return steps;

  const rootClone = cloneBST(currentRoot);

  steps.push({
    treeRoot: cloneBST(rootClone),
    activeNodeId: null,
    targetVal: val,
    pseudocodeLine: 1,
    description: `Deleting value ${val} from BST.`,
    type: 'init'
  });

  function deleteNodeHelper(node, key) {
    if (!node) {
      steps.push({
        treeRoot: cloneBST(rootClone),
        activeNodeId: null,
        targetVal: key,
        pseudocodeLine: 1,
        description: `Node with value ${key} not found in the BST.`,
        type: 'not-found'
      });
      return null;
    }

    steps.push({
      treeRoot: cloneBST(rootClone),
      activeNodeId: node.id,
      targetVal: key,
      pseudocodeLine: 2,
      description: `Comparing key ${key} with node ${node.val}.`,
      type: 'compare'
    });

    if (key < node.val) {
      node.left = deleteNodeHelper(node.left, key);
      return node;
    } else if (key > node.val) {
      node.right = deleteNodeHelper(node.right, key);
      return node;
    } else {
      // Node found to delete
      // Case 1: Leaf node
      if (!node.left && !node.right) {
        steps.push({
          treeRoot: cloneBST(rootClone),
          activeNodeId: node.id,
          targetVal: key,
          pseudocodeLine: 4,
          description: `Node ${node.val} is a leaf node (0 children). Directly removing node.`,
          type: 'delete-leaf'
        });
        return null;
      }

      // Case 2: One child
      if (!node.left) {
        steps.push({
          treeRoot: cloneBST(rootClone),
          activeNodeId: node.id,
          targetVal: key,
          pseudocodeLine: 4,
          description: `Node ${node.val} has only right child (${node.right.val}). Replacing node with its right child.`,
          type: 'delete-one-child'
        });
        return node.right;
      }
      if (!node.right) {
        steps.push({
          treeRoot: cloneBST(rootClone),
          activeNodeId: node.id,
          targetVal: key,
          pseudocodeLine: 5,
          description: `Node ${node.val} has only left child (${node.left.val}). Replacing node with its left child.`,
          type: 'delete-one-child'
        });
        return node.left;
      }

      // Case 3: Two children
      // Find inorder successor (smallest in right subtree)
      let succ = node.right;
      while (succ.left) succ = succ.left;

      steps.push({
        treeRoot: cloneBST(rootClone),
        activeNodeId: succ.id,
        targetVal: key,
        pseudocodeLine: 6,
        description: `Node ${node.val} has 2 children. Found inorder successor ${succ.val}. Replacing ${node.val} with ${succ.val}.`,
        type: 'find-successor'
      });

      node.val = succ.val;
      node.id = `bst-${succ.val}`;
      node.right = deleteNodeHelper(node.right, succ.val);
      return node;
    }
  }

  const finalRoot = deleteNodeHelper(rootClone, val);

  steps.push({
    treeRoot: cloneBST(finalRoot),
    activeNodeId: null,
    targetVal: val,
    pseudocodeLine: 7,
    description: `Deletion complete. BST structural properties preserved.`,
    type: 'complete'
  });

  return { steps, updatedRoot: finalRoot };
}
