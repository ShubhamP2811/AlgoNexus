/**
 * Depth-First Search (DFS) step generator.
 * @param {Object} graph - { nodes, edges, directed }
 * @param {string} startNodeId
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateDFSSteps(graph, startNodeId) {
  const steps = [];
  const start = startNodeId || graph.nodes[0]?.id;
  if (!start) return steps;

  // Build adjacency list
  const adj = {};
  graph.nodes.forEach(n => (adj[n.id] = []));
  graph.edges.forEach(e => {
    adj[e.u]?.push({ to: e.v, weight: e.weight });
    if (!graph.directed) {
      adj[e.v]?.push({ to: e.u, weight: e.weight });
    }
  });

  const visited = new Set();
  const traversalOrder = [];
  const treeEdges = [];
  const callStack = [];

  steps.push({
    activeNode: start,
    activeEdge: null,
    visitedNodes: [],
    treeEdges: [],
    stack: [start],
    traversalOrder: [],
    pseudocodeLine: 1,
    description: `Initiating DFS starting from root vertex ${start}.`,
    type: 'init'
  });

  function dfsHelper(node, parent = null) {
    visited.add(node);
    traversalOrder.push(node);
    callStack.push(node);

    if (parent) {
      treeEdges.push({ u: parent, v: node });
    }

    steps.push({
      activeNode: node,
      activeEdge: parent ? { u: parent, v: node } : null,
      visitedNodes: Array.from(visited),
      treeEdges: [...treeEdges],
      stack: [...callStack],
      traversalOrder: [...traversalOrder],
      pseudocodeLine: 2,
      description: `Visited vertex ${node}. Pushed onto recursive call stack.`,
      type: 'visit-node'
    });

    const neighbors = adj[node] || [];
    for (const edge of neighbors) {
      const neighbor = edge.to;

      steps.push({
        activeNode: node,
        activeEdge: { u: node, v: neighbor },
        visitedNodes: Array.from(visited),
        treeEdges: [...treeEdges],
        stack: [...callStack],
        traversalOrder: [...traversalOrder],
        pseudocodeLine: 3,
        description: `Inspecting outgoing branch from ${node} to ${neighbor}.`,
        type: 'check-edge'
      });

      if (!visited.has(neighbor)) {
        dfsHelper(neighbor, node);

        // After returning from recursive call
        steps.push({
          activeNode: node,
          activeEdge: null,
          visitedNodes: Array.from(visited),
          treeEdges: [...treeEdges],
          stack: [...callStack],
          traversalOrder: [...traversalOrder],
          pseudocodeLine: 4,
          description: `Backtracked from vertex ${neighbor} back to vertex ${node}.`,
          type: 'backtrack'
        });
      } else {
        steps.push({
          activeNode: node,
          activeEdge: { u: node, v: neighbor },
          visitedNodes: Array.from(visited),
          treeEdges: [...treeEdges],
          stack: [...callStack],
          traversalOrder: [...traversalOrder],
          pseudocodeLine: 3,
          description: `Vertex ${neighbor} already visited. Skipping to next neighbor.`,
          type: 'skip-visited'
        });
      }
    }

    callStack.pop();
  }

  dfsHelper(start);

  steps.push({
    activeNode: null,
    activeEdge: null,
    visitedNodes: Array.from(visited),
    treeEdges: [...treeEdges],
    stack: [],
    traversalOrder: [...traversalOrder],
    pseudocodeLine: 5,
    description: `DFS traversal complete! Visited order: [${traversalOrder.join(' -> ')}]. Total nodes reached: ${visited.size}.`,
    type: 'complete'
  });

  return steps;
}
