// Graph presets with 2D coordinates for canvas/SVG layout and edge weights

export const GRAPH_PRESETS = {
  default: {
    name: 'Standard Weighted Network (6 Vertices)',
    directed: false,
    nodes: [
      { id: 'A', x: 100, y: 150, label: 'A' },
      { id: 'B', x: 260, y: 70, label: 'B' },
      { id: 'C', x: 260, y: 230, label: 'C' },
      { id: 'D', x: 440, y: 70, label: 'D' },
      { id: 'E', x: 440, y: 230, label: 'E' },
      { id: 'F', x: 580, y: 150, label: 'F' }
    ],
    edges: [
      { u: 'A', v: 'B', weight: 4 },
      { u: 'A', v: 'C', weight: 2 },
      { u: 'B', v: 'C', weight: 1 },
      { u: 'B', v: 'D', weight: 5 },
      { u: 'C', v: 'E', weight: 8 },
      { u: 'C', v: 'D', weight: 10 },
      { u: 'D', v: 'E', weight: 2 },
      { u: 'D', v: 'F', weight: 6 },
      { u: 'E', v: 'F', weight: 3 }
    ]
  },
  bellmanFordPreset: {
    name: 'Directed Graph with Negative Edge (5 Vertices)',
    directed: true,
    nodes: [
      { id: 'A', x: 100, y: 160, label: 'A' },
      { id: 'B', x: 250, y: 80, label: 'B' },
      { id: 'C', x: 250, y: 240, label: 'C' },
      { id: 'D', x: 420, y: 80, label: 'D' },
      { id: 'E', x: 420, y: 240, label: 'E' }
    ],
    edges: [
      { u: 'A', v: 'B', weight: 4 },
      { u: 'A', v: 'C', weight: 5 },
      { u: 'B', v: 'C', weight: -2 },
      { u: 'B', v: 'D', weight: 3 },
      { u: 'C', v: 'E', weight: 6 },
      { u: 'D', v: 'E', weight: -1 },
      { u: 'E', v: 'B', weight: 1 }
    ]
  },
  simpleTree: {
    name: 'Tree-Like Graph (7 Vertices)',
    directed: false,
    nodes: [
      { id: '0', x: 300, y: 50, label: '0' },
      { id: '1', x: 180, y: 140, label: '1' },
      { id: '2', x: 420, y: 140, label: '2' },
      { id: '3', x: 110, y: 240, label: '3' },
      { id: '4', x: 230, y: 240, label: '4' },
      { id: '5', x: 370, y: 240, label: '5' },
      { id: '6', x: 490, y: 240, label: '6' }
    ],
    edges: [
      { u: '0', v: '1', weight: 3 },
      { u: '0', v: '2', weight: 5 },
      { u: '1', v: '3', weight: 2 },
      { u: '1', v: '4', weight: 4 },
      { u: '2', v: '5', weight: 1 },
      { u: '2', v: '6', weight: 6 }
    ]
  },
  floydWarshallPreset: {
    name: 'All-Pairs 4-Vertex Digraph',
    directed: true,
    nodes: [
      { id: '0', x: 160, y: 80, label: '0' },
      { id: '1', x: 440, y: 80, label: '1' },
      { id: '2', x: 440, y: 240, label: '2' },
      { id: '3', x: 160, y: 240, label: '3' }
    ],
    edges: [
      { u: '0', v: '1', weight: 5 },
      { u: '0', v: '3', weight: 10 },
      { u: '1', v: '2', weight: 3 },
      { u: '2', v: '3', weight: 1 },
      { u: '3', v: '0', weight: 2 }
    ]
  }
};
