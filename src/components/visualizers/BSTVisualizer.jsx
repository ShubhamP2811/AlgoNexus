import React, { useState } from 'react';
import { 
  createDefaultBST, 
  generateBSTInsertSteps, 
  generateBSTSearchSteps, 
  generateBSTDeleteSteps, 
  layoutBST 
} from '../../algorithms/trees/bstVisualizer';
import { Plus, Search, Trash2, RotateCcw } from 'lucide-react';

export function BSTVisualizer({
  step = {},
  onTriggerSteps
}) {
  const [treeRoot, setTreeRoot] = useState(createDefaultBST());
  const [insertVal, setInsertVal] = useState(25);
  const [searchVal, setSearchVal] = useState(60);
  const [deleteVal, setDeleteVal] = useState(30);

  const currentRoot = step.treeRoot !== undefined ? step.treeRoot : treeRoot;
  const activeNodeId = step.activeNodeId;
  const nodes = layoutBST(currentRoot);

  const handleInsert = (e) => {
    e.preventDefault();
    const { steps, updatedRoot } = generateBSTInsertSteps(currentRoot, insertVal);
    setTreeRoot(updatedRoot);
    onTriggerSteps(steps);
    setInsertVal(Math.floor(Math.random() * 90) + 10);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const steps = generateBSTSearchSteps(currentRoot, searchVal);
    onTriggerSteps(steps);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { steps, updatedRoot } = generateBSTDeleteSteps(currentRoot, deleteVal);
    setTreeRoot(updatedRoot);
    onTriggerSteps(steps);
  };

  const handleReset = () => {
    const defaultRoot = createDefaultBST();
    setTreeRoot(defaultRoot);
    onTriggerSteps([]);
  };

  return (
    <div className="space-y-4">
      {/* Operations Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
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

        {/* Search form */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="number"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            className="w-16 px-2.5 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Search className="w-3.5 h-3.5" /> Search
          </button>
        </form>

        {/* Delete form */}
        <form onSubmit={handleDelete} className="flex items-center gap-2">
          <input
            type="number"
            value={deleteVal}
            onChange={e => setDeleteVal(e.target.value)}
            className="w-16 px-2.5 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </form>

        <button
          onClick={handleReset}
          className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
          title="Reset Tree"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* BST SVG Canvas */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-6 min-h-[320px] sm:min-h-[380px] flex items-center justify-center relative overflow-hidden shadow-xs">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        {nodes.length === 0 ? (
          <div className="text-slate-500 text-sm">BST is empty. Use Insert to add nodes.</div>
        ) : (
          <svg className="w-full h-80 relative z-10">
            {/* Edges */}
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
                  stroke="#cbd5e1"
                  strokeWidth="2.5"
                />
              );
            })}

            {/* Tree Nodes */}
            {nodes.map(node => {
              const isActive = activeNodeId === node.id;
              let fill = '#ffffff';
              let stroke = '#3b82f6';
              let textColor = '#1e293b';

              if (isActive) {
                if (step.type === 'found' || step.type === 'inserted') {
                  fill = '#dcfce7';
                  stroke = '#10b981';
                  textColor = '#065f46';
                } else if (step.type?.includes('delete')) {
                  fill = '#ffe4e6';
                  stroke = '#f43f5e';
                  textColor = '#9f1239';
                } else {
                  fill = '#fef3c7';
                  stroke = '#f59e0b';
                  textColor = '#92400e';
                }
              }

              return (
                <g key={node.id} className={isActive ? 'animate-node-active' : ''}>
                  <circle
                    cx={`${node.xPercent}%`}
                    cy={`${node.yPercent}%`}
                    r="20"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="2.5"
                    className="transition-all duration-200 filter drop-shadow-sm"
                  />
                  <text
                    x={`${node.xPercent}%`}
                    y={`${node.yPercent + 1}%`}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={textColor}
                    fontSize="13"
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
    </div>
  );
}
