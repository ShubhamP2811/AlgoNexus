/**
 * Dijkstra's Shortest Path Algorithm step generator.
 * @param {Object} graph - { nodes, edges, directed }
 * @param {string} startNodeId
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateDijkstraSteps(graph, startNodeId) {
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

  const dist = {};
  const prev = {};
  const settled = new Set();
  const treeEdges = [];

  graph.nodes.forEach(n => {
    dist[n.id] = Infinity;
    prev[n.id] = null;
  });
  dist[start] = 0;

  steps.push({
    activeNode: start,
    activeEdge: null,
    visitedNodes: [],
    treeEdges: [],
    distances: { ...dist },
    previous: { ...prev },
    pseudocodeLine: 2,
    description: `Initialized distances: dist[${start}] = 0, all other vertices = ∞.`,
    type: 'init'
  });

  while (settled.size < graph.nodes.length) {
    // Find unvisited node with minimum distance
    let u = null;
    let minD = Infinity;

    for (const node of graph.nodes) {
      if (!settled.has(node.id) && dist[node.id] < minD) {
        minD = dist[node.id];
        u = node.id;
      }
    }

    if (u === null || dist[u] === Infinity) {
      // Remaining nodes are unreachable
      break;
    }

    settled.add(u);
    if (prev[u]) {
      treeEdges.push({ u: prev[u], v: u });
    }

    steps.push({
      activeNode: u,
      activeEdge: null,
      visitedNodes: Array.from(settled),
      treeEdges: [...treeEdges],
      distances: { ...dist },
      previous: { ...prev },
      pseudocodeLine: 6,
      description: `Settled vertex ${u} with minimum distance ${dist[u]}. Its shortest path is finalized.`,
      type: 'settle-node'
    });

    const neighbors = adj[u] || [];
    for (const edge of neighbors) {
      const v = edge.to;
      const weight = edge.weight;

      if (settled.has(v)) continue;

      const alt = dist[u] + weight;

      steps.push({
        activeNode: u,
        activeEdge: { u, v, weight },
        visitedNodes: Array.from(settled),
        treeEdges: [...treeEdges],
        distances: { ...dist },
        previous: { ...prev },
        pseudocodeLine: 8,
        description: `Inspecting edge (${u} -> ${v}, w=${weight}). Alt distance: ${dist[u]} + ${weight} = ${alt}. Current dist[${v}] = ${dist[v] === Infinity ? '∞' : dist[v]}.`,
        type: 'check-relaxation'
      });

      if (alt < dist[v]) {
        dist[v] = alt;
        prev[v] = u;

        steps.push({
          activeNode: v,
          activeEdge: { u, v, weight },
          visitedNodes: Array.from(settled),
          treeEdges: [...treeEdges],
          distances: { ...dist },
          previous: { ...prev },
          pseudocodeLine: 10,
          description: `Relaxed edge! Shorter path found to vertex ${v}: updated dist[${v}] = ${alt}, prev[${v}] = ${u}.`,
          type: 'relaxed'
        });
      }
    }
  }

  steps.push({
    activeNode: null,
    activeEdge: null,
    visitedNodes: Array.from(settled),
    treeEdges: [...treeEdges],
    distances: { ...dist },
    previous: { ...prev },
    pseudocodeLine: 12,
    description: `Dijkstra algorithm finished! Shortest paths computed from vertex ${start} to all reachable vertices.`,
    type: 'complete'
  });

  return steps;
}
