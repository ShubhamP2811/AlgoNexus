/**
 * Kruskal's Minimum Spanning Tree (MST) step generator with Union-Find visual state.
 * @param {Object} graph - { nodes, edges, directed }
 * @returns {Array<Object>} List of snapshot steps
 */
export function generateKruskalSteps(graph) {
  const steps = [];
  const nodes = graph.nodes;
  const numVertices = nodes.length;

  // Clone and sort edges
  const sortedEdges = [...graph.edges].sort((a, b) => a.weight - b.weight);

  // Union-Find / Disjoint Set
  const parent = {};
  nodes.forEach(n => (parent[n.id] = n.id));

  function find(i) {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  }

  const mstEdges = [];
  let totalCost = 0;

  steps.push({
    activeNode: null,
    activeEdge: null,
    visitedNodes: [],
    mstEdges: [],
    disjointSets: { ...parent },
    totalCost: 0,
    pseudocodeLine: 3,
    description: `Sorted all ${sortedEdges.length} edges by weight. Initialized Disjoint Set Union (each vertex is its own component).`,
    type: 'init'
  });

  for (let idx = 0; idx < sortedEdges.length; idx++) {
    const edge = sortedEdges[idx];
    const { u, v, weight } = edge;

    steps.push({
      activeNode: null,
      activeEdge: edge,
      visitedNodes: Array.from(new Set(mstEdges.flatMap(e => [e.u, e.v]))),
      mstEdges: [...mstEdges],
      disjointSets: { ...parent },
      totalCost,
      pseudocodeLine: 4,
      description: `Examining edge (${u} - ${v}, weight=${weight}). Root(${u}) = ${find(u)}, Root(${v}) = ${find(v)}.`,
      type: 'check-edge'
    });

    const rootU = find(u);
    const rootV = find(v);

    if (rootU !== rootV) {
      union(u, v);
      mstEdges.push(edge);
      totalCost += weight;

      steps.push({
        activeNode: null,
        activeEdge: edge,
        visitedNodes: Array.from(new Set(mstEdges.flatMap(e => [e.u, e.v]))),
        mstEdges: [...mstEdges],
        disjointSets: { ...parent },
        totalCost,
        pseudocodeLine: 6,
        description: `Roots differ (${rootU} ≠ ${rootV}): No cycle created. Merged components and added edge (${u} - ${v}) to MST. Current cost: ${totalCost}.`,
        type: 'accept-edge'
      });

      if (mstEdges.length === numVertices - 1) {
        steps.push({
          activeNode: null,
          activeEdge: null,
          visitedNodes: nodes.map(n => n.id),
          mstEdges: [...mstEdges],
          disjointSets: { ...parent },
          totalCost,
          pseudocodeLine: 7,
          description: `MST already has V - 1 (${numVertices - 1}) edges spanning all vertices! Stopping early.`,
          type: 'early-stop'
        });
        break;
      }
    } else {
      steps.push({
        activeNode: null,
        activeEdge: edge,
        visitedNodes: Array.from(new Set(mstEdges.flatMap(e => [e.u, e.v]))),
        mstEdges: [...mstEdges],
        disjointSets: { ...parent },
        totalCost,
        pseudocodeLine: 4,
        description: `Discarded edge (${u} - ${v}): Vertices ${u} and ${v} already belong to the same component (${rootU}). Adding this edge would create a cycle!`,
        type: 'reject-edge'
      });
    }
  }

  steps.push({
    activeNode: null,
    activeEdge: null,
    visitedNodes: Array.from(new Set(mstEdges.flatMap(e => [e.u, e.v]))),
    mstEdges: [...mstEdges],
    disjointSets: { ...parent },
    totalCost,
    pseudocodeLine: 7,
    description: `Kruskal's MST completed! Total MST cost: ${totalCost} using ${mstEdges.length} edges.`,
    type: 'complete'
  });

  return steps;
}
