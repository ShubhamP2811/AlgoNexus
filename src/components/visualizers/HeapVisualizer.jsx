import React, { useState } from 'react';
import { 
  createDefaultHeap, 
  generateHeapInsertSteps, 
  generateHeapExtractSteps 
} from '../../algorithms/dataStructures/heapOps';
import { ArrowUpCircle, Plus, RefreshCw } from 'lucide-react';

export function HeapVisualizer({
  step = {},
  onTriggerSteps
}) {
  const [isMin, setIsMin] = useState(true);
  const [heap, setHeap] = useState(createDefaultHeap(true));
  const [insertVal, setInsertVal] = useState(8);

  const displayHeap = step.heap !== undefined ? step.heap : heap;
  const comparing = new Set(step.comparing || []);
  const swapping = new Set(step.swapping || []);

  const handleToggleHeapType = () => {
    const nextIsMin = !isMin;
    setIsMin(nextIsMin);
    const newHeap = createDefaultHeap(nextIsMin);
    setHeap(newHeap);
  };

  const handleInsert = (e) => {
    e.preventDefault();
    const { steps, updatedHeap } = generateHeapInsertSteps(displayHeap, insertVal, isMin);
    setHeap(updatedHeap);
    onTriggerSteps(steps);
    setInsertVal(Math.floor(Math.random() * 50) + 1);
  };

  const handleExtract = () => {
    const { steps, updatedHeap } = generateHeapExtractSteps(displayHeap, isMin);
    setHeap(updatedHeap);
    onTriggerSteps(steps);
  };

  // Calculate coordinates for binary tree SVG
  const calculateNodePositions = () => {
    const n = displayHeap.length;
    const positions = [];

    for (let i = 0; i < n; i++) {
      const level = Math.floor(Math.log2(i + 1));
      const levelNodesCount = Math.pow(2, level);
      const indexInLevel = i - (levelNodesCount - 1);
      const xPercent = ((indexInLevel + 0.5) / levelNodesCount) * 100;
      const yPercent = 20 + level * 26;

      const parentIndex = i > 0 ? Math.floor((i - 1) / 2) : null;
      positions.push({
        index: i,
        val: displayHeap[i],
        xPercent,
        yPercent,
        parentIndex
      });
    }

    return positions;
  };

  const treePositions = calculateNodePositions();

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        {/* Toggle Min / Max */}
        <button
          onClick={handleToggleHeapType}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
          <span>Mode: <strong className="text-blue-600 dark:text-blue-400">{isMin ? 'Min-Heap' : 'Max-Heap'}</strong></span>
        </button>

        {/* Insert form */}
        <form onSubmit={handleInsert} className="flex items-center gap-2">
          <input
            type="number"
            value={insertVal}
            onChange={e => setInsertVal(e.target.value)}
            className="w-16 px-2.5 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Insert
          </button>
        </form>

        {/* Extract Root */}
        <button
          onClick={handleExtract}
          disabled={displayHeap.length === 0}
          className="px-3.5 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <ArrowUpCircle className="w-3.5 h-3.5" /> Extract {isMin ? 'Min' : 'Max'} Root
        </button>
      </div>

      {/* Heap Synchronized Representation */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-6 min-h-[380px] sm:min-h-[420px] flex flex-col justify-between space-y-6 shadow-xs relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Top: Binary Tree View (SVG) */}
        <div className="relative w-full h-64 border border-slate-200 dark:border-slate-700/80 rounded-xl bg-slate-50/50 dark:bg-slate-950/50 overflow-hidden flex items-center justify-center relative z-10">
          {treePositions.length === 0 ? (
            <span className="text-slate-400 text-xs">Heap is empty</span>
          ) : (
            <svg className="w-full h-full">
              {/* Parent-to-child edges */}
              {treePositions.map(node => {
                if (node.parentIndex === null) return null;
                const parent = treePositions[node.parentIndex];
                if (!parent) return null;

                return (
                  <line
                    key={`edge-${node.index}`}
                    x1={`${parent.xPercent}%`}
                    y1={`${parent.yPercent}%`}
                    x2={`${node.xPercent}%`}
                    y2={`${node.yPercent}%`}
                    stroke="#cbd5e1"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                );
              })}

              {/* Tree Nodes */}
              {treePositions.map(node => {
                const isComp = comparing.has(node.index);
                const isSwap = swapping.has(node.index);

                let fill = '#ffffff';
                let stroke = '#3b82f6';
                let textColor = '#1e293b';

                if (isSwap) {
                  fill = '#ffe4e6';
                  stroke = '#f43f5e';
                  textColor = '#9f1239';
                } else if (isComp) {
                  fill = '#fef3c7';
                  stroke = '#f59e0b';
                  textColor = '#92400e';
                } else if (node.index === 0) {
                  fill = '#dbeafe';
                  stroke = '#2563eb';
                  textColor = '#1e40af';
                }

                return (
                  <g key={`node-${node.index}`} transform={`translate(0, 0)`}>
                    <circle
                      cx={`${node.xPercent}%`}
                      cy={`${node.yPercent}%`}
                      r="18"
                      fill={fill}
                      stroke={stroke}
                      strokeWidth="2.5"
                      className="transition-all duration-200 filter drop-shadow-xs"
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
          )}
        </div>

        {/* Bottom: Underlying Flat Array Representation */}
        <div className="relative z-10 space-y-2">
          <div className="text-[11px] sm:text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="truncate">Underlying Array Mapping (i: left=2i+1, right=2i+2, parent=⌊(i-1)/2⌋)</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1">
            {displayHeap.map((val, idx) => {
              const isComp = comparing.has(idx);
              const isSwap = swapping.has(idx);

              let cellClass = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-xs';
              if (isSwap) {
                cellClass = 'bg-rose-500 border-rose-600 text-white shadow-md';
              } else if (isComp) {
                cellClass = 'bg-amber-400 border-amber-500 text-amber-950 font-bold';
              } else if (idx === 0) {
                cellClass = 'bg-blue-600 border-blue-500 text-white font-bold shadow-xs';
              }

              return (
                <div key={idx} className="flex flex-col items-center shrink-0">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center font-mono text-xs sm:text-sm font-bold transition-all ${cellClass}`}>
                    {val}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">
                    [{idx}]
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
