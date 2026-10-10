import React, { useState } from 'react';
import { GRAPH_PRESETS } from '../../data/graphPresets';
import { Play } from 'lucide-react';

export function GraphVisualizer({
  algorithmId = 'bfs',
  step = {},
  onSelectGraph,
  onStartAlgorithm
}) {
  const [selectedPresetKey, setSelectedPresetKey] = useState(
    algorithmId === 'bellman-ford'
      ? 'bellmanFordPreset'
      : algorithmId === 'floyd-warshall'
      ? 'floydWarshallPreset'
      : 'default'
  );

  const currentGraph = GRAPH_PRESETS[selectedPresetKey] || GRAPH_PRESETS.default;
  const [startNode, setStartNode] = useState(currentGraph.nodes[0]?.id || 'A');

  const activeNode = step.activeNode;
  const activeEdge = step.activeEdge;
  const visitedNodes = new Set(step.visitedNodes || []);
  const treeEdges = step.treeEdges || [];
  const mstEdges = step.mstEdges || [];
  const distances = step.distances || {};
  const disjointSets = step.disjointSets || {};
  const matrix = step.matrix || null;
  const nodeIds = step.nodeIds || currentGraph.nodes.map(n => n.id);

  // Dynamic bounding box calculation for perfect responsive centering & scaling
  const nodeXCoords = currentGraph.nodes.map(n => n.x);
  const nodeYCoords = currentGraph.nodes.map(n => n.y);
  const minX = Math.min(...nodeXCoords) - 55;
  const maxX = Math.max(...nodeXCoords) + 55;
  const minY = Math.min(...nodeYCoords) - 45;
  const maxY = Math.max(...nodeYCoords) + 45;
  const vbWidth = Math.max(maxX - minX, 220);
  const vbHeight = Math.max(maxY - minY, 160);

  const handlePresetChange = (presetKey) => {
    setSelectedPresetKey(presetKey);
    const newGraph = GRAPH_PRESETS[presetKey];
    setStartNode(newGraph.nodes[0]?.id || '');
    if (onSelectGraph) onSelectGraph(newGraph, newGraph.nodes[0]?.id);
  };

  const handleStart = () => {
    if (onStartAlgorithm) {
      onStartAlgorithm(currentGraph, startNode);
    }
  };

  // Helper to test if an edge is part of tree/MST
  const isHighlightedEdge = (u, v) => {
    const inTree = treeEdges.some(
      e => (e.u === u && e.v === v) || (!currentGraph.directed && e.u === v && e.v === u)
    );
    const inMst = mstEdges.some(
      e => (e.u === u && e.v === v) || (!currentGraph.directed && e.u === v && e.v === u)
    );
    return inTree || inMst;
  };

  const isActiveEdge = (u, v) => {
    if (!activeEdge) return false;
    return (
      (activeEdge.u === u && activeEdge.v === v) ||
      (!currentGraph.directed && activeEdge.u === v && activeEdge.v === u)
    );
  };

  return (
    <div className="space-y-4">
      {/* Graph Config Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Presets dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Preset:</span>
          <select
            value={selectedPresetKey}
            onChange={e => handlePresetChange(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-2xs"
          >
            <option value="default">Standard Weighted (6 Nodes)</option>
            <option value="bellmanFordPreset">Directed Negative Edge (5 Nodes)</option>
            <option value="simpleTree">Tree Graph (7 Nodes)</option>
            <option value="floydWarshallPreset">All-Pairs Digraph (4 Nodes)</option>
          </select>
        </div>

        {/* Start Vertex Selector (for BFS, DFS, Dijkstra, Bellman-Ford, Prim) */}
        {algorithmId !== 'floyd-warshall' && algorithmId !== 'kruskal' && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Start Node:</span>
            <select
              value={startNode}
              onChange={e => {
                setStartNode(e.target.value);
                if (onSelectGraph) onSelectGraph(currentGraph, e.target.value);
              }}
              className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono transition-all cursor-pointer shadow-2xs"
            >
              {currentGraph.nodes.map(n => (
                <option key={n.id} value={n.id}>
                  Node {n.id}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={handleStart}
          className="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all active:scale-95 flex items-center gap-1.5 shadow-sm shadow-blue-500/20"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Run on Graph</span>
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-3 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 relative overflow-hidden">
        {/* Background Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

        {/* SVG Graph Network */}
        <div className="relative w-full h-[280px] sm:h-[380px] rounded-xl border border-slate-200/80 bg-slate-50/50 overflow-hidden shadow-inner">
          <svg
            className="w-full h-full"
            viewBox={`${minX} ${minY} ${vbWidth} ${vbHeight}`}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="22"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
              </marker>
              <marker
                id="arrowhead-active"
                markerWidth="8"
                markerHeight="6"
                refX="22"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
              </marker>
              <marker
                id="arrowhead-highlight"
                markerWidth="8"
                markerHeight="6"
                refX="22"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
              </marker>
            </defs>

            {/* Edges */}
            {currentGraph.edges.map((e, idx) => {
              const uNode = currentGraph.nodes.find(n => n.id === e.u);
              const vNode = currentGraph.nodes.find(n => n.id === e.v);
              if (!uNode || !vNode) return null;

              const isHighlighted = isHighlightedEdge(e.u, e.v);
              const isActive = isActiveEdge(e.u, e.v);

              let stroke = '#94a3b8';
              let strokeWidth = 2.5;
              let marker = currentGraph.directed ? 'url(#arrowhead)' : undefined;

              if (isActive) {
                stroke = '#f59e0b';
                strokeWidth = 4;
                marker = currentGraph.directed ? 'url(#arrowhead-active)' : undefined;
              } else if (isHighlighted) {
                stroke = '#10b981';
                strokeWidth = 4;
                marker = currentGraph.directed ? 'url(#arrowhead-highlight)' : undefined;
              }

              const midX = (uNode.x + vNode.x) / 2;
              const midY = (uNode.y + vNode.y) / 2;

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={uNode.x}
                    y1={uNode.y}
                    x2={vNode.x}
                    y2={vNode.y}
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    markerEnd={marker}
                    className="transition-all duration-300"
                  />
                  {/* Weight label pill */}
                  {e.weight !== undefined && (
                    <g transform={`translate(${midX}, ${midY})`}>
                      <rect
                        x="-14"
                        y="-10"
                        width="28"
                        height="20"
                        rx="6"
                        fill="#ffffff"
                        stroke={stroke}
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#334155"
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {e.weight}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Vertices / Nodes */}
            {currentGraph.nodes.map(node => {
              const isActive = activeNode === node.id;
              const isVisited = visitedNodes.has(node.id);

              let fill = '#ffffff';
              let stroke = '#3b82f6';
              let textColor = '#1e293b';

              if (isActive) {
                fill = '#f59e0b';
                stroke = '#d97706';
                textColor = '#ffffff';
              } else if (isVisited) {
                fill = '#10b981';
                stroke = '#059669';
                textColor = '#ffffff';
              }

              const distVal = distances[node.id];

              return (
                <g key={node.id} className="transition-all duration-300">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="22"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="3.5"
                    className="transition-all duration-300 cursor-pointer shadow-sm"
                  />
                  <text
                    x={node.x}
                    y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={textColor}
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight="800"
                  >
                    {node.label || node.id}
                  </text>

                  {/* Distance badge above vertex if available */}
                  {distVal !== undefined && (
                    <g transform={`translate(${node.x}, ${node.y - 32})`}>
                      <rect
                        x="-20"
                        y="-10"
                        width="40"
                        height="20"
                        rx="6"
                        fill="#eff6ff"
                        stroke="#3b82f6"
                        strokeWidth="1.5"
                      />
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill="#1d4ed8"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {distVal === Infinity ? '∞' : distVal}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Dynamic Context Panels: Disjoint Sets for Kruskal */}
        {algorithmId === 'kruskal' && Object.keys(disjointSets).length > 0 && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Disjoint Set Union (Union-Find) Roots
            </span>
            <div className="flex flex-wrap gap-2">
              {Object.entries(disjointSets).map(([vert, parent]) => (
                <div key={vert} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-mono text-xs shadow-2xs">
                  <span className="text-slate-700 font-bold">{vert}</span> → <span className="text-emerald-600 font-bold">{parent}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Floyd-Warshall All-Pairs Distance Matrix Table */}
        {matrix && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 overflow-x-auto">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600">
              <span>All-Pairs Shortest Path Matrix D[i][j]</span>
              {step.k && <span className="text-blue-600 font-mono">via intermediate k = {step.k}</span>}
            </div>
            <table className="w-full text-center font-mono text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-slate-400 border border-slate-200 bg-slate-100 font-bold">i \ j</th>
                  {nodeIds.map(id => (
                    <th key={id} className="p-2 text-slate-700 font-bold border border-slate-200 bg-slate-100">
                      {id}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {nodeIds.map(i => (
                  <tr key={i}>
                    <td className="p-2 text-slate-700 font-bold border border-slate-200 bg-slate-100">
                      {i}
                    </td>
                    {nodeIds.map(j => {
                      const val = matrix[i]?.[j];
                      const isCell = step.i === i && step.j === j;

                      return (
                        <td
                          key={j}
                          className={`p-2 border border-slate-200 transition-colors ${
                            isCell
                              ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold'
                              : 'bg-white text-slate-700'
                          }`}
                        >
                          {val === Infinity ? '∞' : val}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}
