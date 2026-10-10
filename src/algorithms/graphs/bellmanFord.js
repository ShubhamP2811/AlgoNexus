/**
 * Bellman-Ford Algorithm step generator.
 * @param {Object} graph - { nodes, edges, directed }
 * @param {string} startNodeId
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateBellmanFordSteps(graph, startNodeId) {
  const steps = [];
  const start = startNodeId || graph.nodes[0]?.id;
  if (!start) return steps;

  const V = graph.nodes.length;
  // Format edge list
  const edgeList = [];
  graph.edges.forEach(e => {
    edgeList.push({ u: e.u, v: e.v, weight: e.weight });
    if (!graph.directed) {
      edgeList.push({ u: e.v, v: e.u, weight: e.weight });
    }
  });

  const dist = {};
  const prev = {};
  graph.nodes.forEach(n => {
    dist[n.id] = Infinity;
    prev[n.id] = null;
  });
  dist[start] = 0;

  steps.push({
    activeNode: start,
    activeEdge: null,
    visitedNodes: [start],
    distances: { ...dist },
    previous: { ...prev },
    iteration: 0,
    pseudocodeLine: 2,
    description: `Bellman-Ford initialized: dist[${start}] = 0, all other vertices = ∞. Total iterations needed: ${V - 1}.`,
    type: 'init'
  });

  let hasNegativeCycle = false;

  // Run V - 1 passes
  for (let iter = 1; iter <= V - 1; iter++) {
    let anyUpdate = false;

    steps.push({
      activeNode: null,
      activeEdge: null,
      visitedNodes: Object.keys(dist).filter(k => dist[k] !== Infinity),
      distances: { ...dist },
      previous: { ...prev },
      iteration: iter,
      pseudocodeLine: 4,
      description: `Iteration ${iter} of ${V - 1}: Scanning all ${edgeList.length} edges for relaxation.`,
      type: 'iteration-start'
    });

    for (const edge of edgeList) {
      const { u, v, weight } = edge;

      if (dist[u] === Infinity) continue;

      steps.push({
        activeNode: u,
        activeEdge: { u, v, weight },
        visitedNodes: Object.keys(dist).filter(k => dist[k] !== Infinity),
        distances: { ...dist },
        previous: { ...prev },
        iteration: iter,
        pseudocodeLine: 5,
        description: `Checking edge (${u} -> ${v}, w=${weight}). dist[${u}] (${dist[u]}) + ${weight} vs dist[${v}] (${dist[v] === Infinity ? '∞' : dist[v]}).`,
        type: 'check-edge'
      });

      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        prev[v] = u;
        anyUpdate = true;

        steps.push({
          activeNode: v,
          activeEdge: { u, v, weight },
          visitedNodes: Object.keys(dist).filter(k => dist[k] !== Infinity),
          distances: { ...dist },
          previous: { ...prev },
          iteration: iter,
          pseudocodeLine: 6,
          description: `Relaxed edge (${u} -> ${v})! New shortest distance to ${v} is ${dist[v]}.`,
          type: 'relaxed'
        });
      }
    }

    if (!anyUpdate) {
      steps.push({
        activeNode: null,
        activeEdge: null,
        visitedNodes: Object.keys(dist).filter(k => dist[k] !== Infinity),
        distances: { ...dist },
        previous: { ...prev },
        iteration: iter,
        pseudocodeLine: 4,
        description: `No distances updated during iteration ${iter}. Algorithm converged early!`,
        type: 'converged'
      });
      break;
    }
  }

  // 1 extra pass to detect negative-weight cycle
  for (const edge of edgeList) {
    const { u, v, weight } = edge;
    if (dist[u] !== Infinity && dist[u] + weight < dist[v]) {
      hasNegativeCycle = true;
      steps.push({
        activeNode: v,
        activeEdge: { u, v, weight },
        visitedNodes: Object.keys(dist).filter(k => dist[k] !== Infinity),
        distances: { ...dist },
        previous: { ...prev },
        hasNegativeCycle: true,
        pseudocodeLine: 9,
        description: `⚠️ Negative weight cycle detected involving edge (${u} -> ${v})! Shortest paths are undefined.`,
        type: 'negative-cycle'
      });
      break;
    }
  }

  if (!hasNegativeCycle) {
    steps.push({
      activeNode: null,
      activeEdge: null,
      visitedNodes: Object.keys(dist).filter(k => dist[k] !== Infinity),
      distances: { ...dist },
      previous: { ...prev },
      hasNegativeCycle: false,
      pseudocodeLine: 10,
      description: `Bellman-Ford finished successfully! No negative cycles detected. All shortest distances computed.`,
      type: 'complete'
    });
  }

  return steps;
}
