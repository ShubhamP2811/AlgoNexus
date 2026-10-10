import { generateBFSSteps } from './bfs';
import { generateDFSSteps } from './dfs';
import { generateDijkstraSteps } from './dijkstra';
import { generateBellmanFordSteps } from './bellmanFord';
import { generateFloydWarshallSteps } from './floydWarshall';
import { generatePrimSteps } from './prim';
import { generateKruskalSteps } from './kruskal';

export const GRAPH_ALGORITHMS = {
  'bfs': generateBFSSteps,
  'dfs': generateDFSSteps,
  'dijkstra': generateDijkstraSteps,
  'bellman-ford': generateBellmanFordSteps,
  'floyd-warshall': generateFloydWarshallSteps,
  'prim': generatePrimSteps,
  'kruskal': generateKruskalSteps
};

export {
  generateBFSSteps,
  generateDFSSteps,
  generateDijkstraSteps,
  generateBellmanFordSteps,
  generateFloydWarshallSteps,
  generatePrimSteps,
  generateKruskalSteps
};
