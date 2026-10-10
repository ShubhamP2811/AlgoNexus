/**
 * Prim's Minimum Spanning Tree (MST) step generator.
 * @param {Object} graph - { nodes, edges, directed }
 * @param {string} startNodeId
 * @returns {Array<Object>} List of snapshot steps
 */
export function generatePrimSteps(graph, startNodeId) {
  const steps = [];
  const start = startNodeId || graph.nodes[0]?.id;
  if (!start) return steps;

  // Build undirected adjacency list
  const adj = {};
  graph.nodes.forEach(n => (adj[n.id] = []));
  graph.edges.forEach(e => {
    adj[e.u]?.push({ to: e.v, weight: e.weight });
    adj[e.v]?.push({ to: e.u, weight: e.weight });
  });

  const visited = new Set([start]);
  const mstEdges = [];
  let totalCost = 0;

  steps.push({
    activeNode: start,
    activeEdge: null,
    visitedNodes: [start],
    mstEdges: [],
    totalCost: 0,
    pseudocodeLine: 2,
    description: `Starting Prim's MST at vertex ${start}. Added ${start} to spanning tree.`,
    type: 'init'
  });

  while (visited.size < graph.nodes.length) {
    let minEdge = null;
    let minWeight = Infinity;

    // Scan all candidate crossing edges
    for (const u of visited) {
      for (const edge of adj[u] || []) {
        const v = edge.to;
        if (!visited.has(v) && edge.weight < minWeight) {
          minWeight = edge.weight;
          minEdge = { u, v, weight: edge.weight };
        }
      }
    }

    if (!minEdge) {
      // Disconnected graph
      break;
    }

    steps.push({
      activeNode: minEdge.u,
      activeEdge: minEdge,
      visitedNodes: Array.from(visited),
      mstEdges: [...mstEdges],
      totalCost,
      pseudocodeLine: 5,
      description: `Cheapest crossing edge connecting tree to an unvisited vertex is (${minEdge.u} - ${minEdge.v}) with weight ${minEdge.weight}.`,
      type: 'candidate-edge'
    });

    visited.add(minEdge.v);
    mstEdges.push(minEdge);
    totalCost += minEdge.weight;

    steps.push({
      activeNode: minEdge.v,
      activeEdge: minEdge,
      visitedNodes: Array.from(visited),
      mstEdges: [...mstEdges],
      totalCost,
      pseudocodeLine: 7,
      description: `Added vertex ${minEdge.v} and edge (${minEdge.u} - ${minEdge.v}) to MST. Current total tree cost: ${totalCost}.`,
      type: 'add-edge'
    });
  }

  steps.push({
    activeNode: null,
    activeEdge: null,
    visitedNodes: Array.from(visited),
    mstEdges: [...mstEdges],
    totalCost,
    pseudocodeLine: 8,
    description: `Prim's MST completed! Total MST cost: ${totalCost}. Spanning tree connects all ${visited.size} vertices using ${mstEdges.length} edges.`,
    type: 'complete'
  });

  return steps;
}
