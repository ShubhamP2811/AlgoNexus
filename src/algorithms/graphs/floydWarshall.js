/**
 * Floyd-Warshall All-Pairs Shortest Path step generator.
 * @param {Object} graph - { nodes, edges, directed }
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateFloydWarshallSteps(graph) {
  const steps = [];
  const nodes = graph.nodes;
  const n = nodes.length;
  const nodeIds = nodes.map(node => node.id);

  // Initialize n x n matrix with Infinity, 0 on diagonals
  const dist = {};
  nodeIds.forEach(u => {
    dist[u] = {};
    nodeIds.forEach(v => {
      dist[u][v] = u === v ? 0 : Infinity;
    });
  });

  // Populate direct edge weights
  graph.edges.forEach(e => {
    dist[e.u][e.v] = e.weight;
    if (!graph.directed) {
      dist[e.v][e.u] = e.weight;
    }
  });

  const deepCopyMatrix = (m) => {
    const copy = {};
    nodeIds.forEach(u => {
      copy[u] = { ...m[u] };
    });
    return copy;
  };

  steps.push({
    matrix: deepCopyMatrix(dist),
    nodeIds,
    k: null,
    i: null,
    j: null,
    pseudocodeLine: 2,
    description: `Initialized all-pairs distance matrix with direct edge costs (0 on diagonal, ∞ for non-adjacent pairs).`,
    type: 'init'
  });

  for (let kIdx = 0; kIdx < n; kIdx++) {
    const k = nodeIds[kIdx];

    steps.push({
      matrix: deepCopyMatrix(dist),
      nodeIds,
      k,
      i: null,
      j: null,
      pseudocodeLine: 3,
      description: `Considering intermediate vertex k = ${k}. Checking if paths routed through ${k} are shorter.`,
      type: 'intermediate-node'
    });

    for (let iIdx = 0; iIdx < n; iIdx++) {
      const i = nodeIds[iIdx];

      for (let jIdx = 0; jIdx < n; jIdx++) {
        const j = nodeIds[jIdx];

        if (i === j) continue;

        const directDist = dist[i][j];
        const throughK = dist[i][k] !== Infinity && dist[k][j] !== Infinity ? dist[i][k] + dist[k][j] : Infinity;

        steps.push({
          matrix: deepCopyMatrix(dist),
          nodeIds,
          k,
          i,
          j,
          pseudocodeLine: 6,
          description: `Testing path (${i} -> ${j}): dist[${i}][${j}] = ${directDist === Infinity ? '∞' : directDist} vs dist[${i}][${k}] + dist[${k}][${j}] = ${throughK === Infinity ? '∞' : throughK}.`,
          type: 'compare-cells'
        });

        if (throughK < directDist) {
          dist[i][j] = throughK;

          steps.push({
            matrix: deepCopyMatrix(dist),
            nodeIds,
            k,
            i,
            j,
            pseudocodeLine: 7,
            description: `Updated shorter path! dist[${i}][${j}] improved from ${directDist === Infinity ? '∞' : directDist} to ${throughK} via ${k}.`,
            type: 'updated-cell'
          });
        }
      }
    }
  }

  steps.push({
    matrix: deepCopyMatrix(dist),
    nodeIds,
    k: null,
    i: null,
    j: null,
    pseudocodeLine: 8,
    description: `Floyd-Warshall complete! Matrix contains optimal shortest path distances between all vertex pairs.`,
    type: 'complete'
  });

  return steps;
}
