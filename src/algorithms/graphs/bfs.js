/**
 * Breadth-First Search (BFS) step generator.
 * @param {Object} graph - { nodes, edges, directed }
 * @param {string} startNodeId
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateBFSSteps(graph, startNodeId) {
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
  const queue = [start];
  const traversalOrder = [];
  const treeEdges = [];

  visited.add(start);

  steps.push({
    activeNode: start,
    activeEdge: null,
    visitedNodes: [start],
    treeEdges: [],
    queue: [...queue],
    traversalOrder: [],
    pseudocodeLine: 3,
    description: `Starting BFS at vertex ${start}. Marked ${start} as visited and enqueued.`,
    type: 'init'
  });

  while (queue.length > 0) {
    const current = queue.shift();
    traversalOrder.push(current);

    steps.push({
      activeNode: current,
      activeEdge: null,
      visitedNodes: Array.from(visited),
      treeEdges: [...treeEdges],
      queue: [...queue],
      traversalOrder: [...traversalOrder],
      pseudocodeLine: 5,
      description: `Dequeued vertex ${current} from queue. Visiting its neighbors.`,
      type: 'visit-node'
    });

    const neighbors = adj[current] || [];
    for (const edge of neighbors) {
      const neighbor = edge.to;

      steps.push({
        activeNode: current,
        activeEdge: { u: current, v: neighbor },
        visitedNodes: Array.from(visited),
        treeEdges: [...treeEdges],
        queue: [...queue],
        traversalOrder: [...traversalOrder],
        pseudocodeLine: 6,
        description: `Inspecting edge (${current} -> ${neighbor}).`,
        type: 'check-edge'
      });

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        treeEdges.push({ u: current, v: neighbor });

        steps.push({
          activeNode: neighbor,
          activeEdge: { u: current, v: neighbor },
          visitedNodes: Array.from(visited),
          treeEdges: [...treeEdges],
          queue: [...queue],
          traversalOrder: [...traversalOrder],
          pseudocodeLine: 7,
          description: `Vertex ${neighbor} has not been visited yet! Added to visited set and enqueued.`,
          type: 'enqueue'
        });
      } else {
        steps.push({
          activeNode: current,
          activeEdge: { u: current, v: neighbor },
          visitedNodes: Array.from(visited),
          treeEdges: [...treeEdges],
          queue: [...queue],
          traversalOrder: [...traversalOrder],
          pseudocodeLine: 6,
          description: `Vertex ${neighbor} is already visited. Skipping edge.`,
          type: 'skip-visited'
        });
      }
    }
  }

  steps.push({
    activeNode: null,
    activeEdge: null,
    visitedNodes: Array.from(visited),
    treeEdges: [...treeEdges],
    queue: [],
    traversalOrder: [...traversalOrder],
    pseudocodeLine: 10,
    description: `BFS traversal finished! Visited order: [${traversalOrder.join(' -> ')}]. Total nodes reached: ${visited.size}.`,
    type: 'complete'
  });

  return steps;
}
