import React from 'react';
import { getDefaultTree, flattenTreeForRender } from '../../algorithms/trees/treeTraversals';

export function TreeTraversalVisualizer({ step = {} }) {
  const root = getDefaultTree();
  const nodes = flattenTreeForRender(root);

  const activeNodeId = step.activeNodeId;
  const visitedNodeIds = new Set(step.visitedNodeIds || []);
  const traversalOrder = step.traversalOrder || [];
  const queue = step.queue || [];
  const callStack = step.callStack || [];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-6 min-h-[360px] sm:min-h-[420px] flex flex-col justify-between space-y-6 shadow-xs relative overflow-hidden">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

      {/* Top: SVG Tree Canvas */}
      <div className="relative z-10 w-full h-64 border border-slate-200/80 rounded-xl bg-slate-50/50 overflow-hidden flex items-center justify-center shadow-inner">
        <svg className="w-full h-full">
          {/* Tree Edges */}
          {nodes.map(node => {
            if (!node.parentId) return null;
            const parent = nodes.find(n => n.id === node.parentId);
            if (!parent) return null;

            return (
              <line
                key={`edge-${node.id}`}
                x1={`${parent.xPercent}%`}
                y1={`${parent.yPercent}%`}
                x2={`${node.xPercent}%`}
                y2={`${node.yPercent}%`}
                stroke="#94a3b8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}

          {/* Tree Nodes */}
          {nodes.map(node => {
            const isActive = activeNodeId === node.id;
            const isVisited = visitedNodeIds.has(node.id);

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

            return (
              <g key={node.id} className="transition-all duration-200">
                <circle
                  cx={`${node.xPercent}%`}
                  cy={`${node.yPercent}%`}
                  r="20"
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="3"
                  className="transition-all duration-200 shadow-sm"
                />
                <text
                  x={`${node.xPercent}%`}
                  y={`${node.yPercent + 1}%`}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={textColor}
                  fontSize="12"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Bottom Traversal Result and Call Stack / Queue State */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Output list */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Traversal Visited Output
          </div>
          <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center">
            {traversalOrder.length === 0 ? (
              <span className="text-xs text-slate-400 italic">Press Play to begin traversal</span>
            ) : (
              traversalOrder.map((val, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold shadow-2xs"
                >
                  {val}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Call Stack or Queue preview */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            {queue.length > 0 ? 'BFS Queue State' : 'Recursion Call Stack'}
          </div>
          <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center">
            {queue.length > 0 ? (
              queue.map((val, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-2.5 py-1 rounded-lg bg-blue-600 text-white font-semibold shadow-2xs"
                >
                  {val}
                </span>
              ))
            ) : callStack.length > 0 ? (
              callStack.map((val, idx) => (
                <span
                  key={idx}
                  className="font-mono text-xs px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-semibold shadow-2xs"
                >
                  {val}
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-400 italic">Empty stack / queue</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
