import React, { useState } from 'react';
import { 
  generateArrayAccessSteps,
  generateArrayInsertSteps, 
  generateArrayDeleteSteps, 
  generateArrayUpdateSteps, 
  generateArrayTraverseSteps 
} from '../../algorithms/dataStructures/arrayOps';
import { Plus, Trash2, RefreshCw, Eye, Search, Layers } from 'lucide-react';

export function ArrayVisualizer({
  initialArray = [25, 40, 15, 60, 30],
  step = {},
  onTriggerSteps
}) {
  const [array, setArray] = useState(initialArray);
  const [accessIdx, setAccessIdx] = useState(2);
  const [insertIdx, setInsertIdx] = useState(2);
  const [insertVal, setInsertVal] = useState(99);
  const [deleteIdx, setDeleteIdx] = useState(1);
  const [updateIdx, setUpdateIdx] = useState(0);
  const [updateVal, setUpdateVal] = useState(77);

  const displayArray = step.array !== undefined ? step.array : array;
  const highlightIndices = new Set(step.highlightIndices || []);
  const pointers = step.pointers || {};
  const stepType = step.type || '';

  const handleAccess = (e) => {
    e.preventDefault();
    const { steps } = generateArrayAccessSteps(displayArray, accessIdx);
    onTriggerSteps(steps);
  };

  const handleInsert = (e) => {
    e.preventDefault();
    const { steps, updatedArray } = generateArrayInsertSteps(displayArray, insertIdx, insertVal);
    setArray(updatedArray);
    onTriggerSteps(steps);
    setInsertVal(Math.floor(Math.random() * 90) + 10);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { steps, updatedArray } = generateArrayDeleteSteps(displayArray, deleteIdx);
    setArray(updatedArray);
    onTriggerSteps(steps);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { steps, updatedArray } = generateArrayUpdateSteps(displayArray, updateIdx, updateVal);
    setArray(updatedArray);
    onTriggerSteps(steps);
  };

  const handleTraverse = () => {
    const steps = generateArrayTraverseSteps(displayArray);
    onTriggerSteps(steps);
  };

  return (
    <div className="space-y-4">
      {/* Array Action Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Array Operations (Contiguous Memory)</span>
          </div>
          <button
            onClick={handleTraverse}
            className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all shadow-2xs flex items-center gap-1.5 active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Traverse All (O(n))</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Access / Read Form */}
          <form onSubmit={handleAccess} className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-700">Access Index [O(1)]</span>
            <div className="flex gap-1.5">
              <input
                type="number"
                placeholder="Idx"
                value={accessIdx}
                min={0}
                max={Math.max(0, displayArray.length - 1)}
                onChange={e => setAccessIdx(e.target.value)}
                className="w-16 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
              />
              <button
                type="submit"
                className="flex-1 px-2.5 py-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <Search className="w-3 h-3" /> Read
              </button>
            </div>
          </form>

          {/* Insert Form */}
          <form onSubmit={handleInsert} className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-700">Insert [O(n) Shifts]</span>
            <div className="flex gap-1.5">
              <input
                type="number"
                placeholder="Val"
                value={insertVal}
                onChange={e => setInsertVal(e.target.value)}
                className="w-14 px-2 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
              />
              <input
                type="number"
                placeholder="Idx"
                value={insertIdx}
                min={0}
                max={displayArray.length}
                onChange={e => setInsertIdx(e.target.value)}
                className="w-14 px-2 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
              />
              <button
                type="submit"
                className="flex-1 px-2 py-1 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <Plus className="w-3 h-3" /> Add
              </button>
            </div>
          </form>

          {/* Delete Form */}
          <form onSubmit={handleDelete} className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-700">Delete [O(n) Shifts]</span>
            <div className="flex gap-1.5">
              <input
                type="number"
                placeholder="Index"
                value={deleteIdx}
                min={0}
                max={Math.max(0, displayArray.length - 1)}
                onChange={e => setDeleteIdx(e.target.value)}
                className="w-20 px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
              />
              <button
                type="submit"
                disabled={displayArray.length === 0}
                className="flex-1 px-2.5 py-1 text-xs font-bold bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            </div>
          </form>

          {/* Update Form */}
          <form onSubmit={handleUpdate} className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-700">Update Index [O(1)]</span>
            <div className="flex gap-1.5">
              <input
                type="number"
                placeholder="Val"
                value={updateVal}
                onChange={e => setUpdateVal(e.target.value)}
                className="w-14 px-2 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
              />
              <input
                type="number"
                placeholder="Idx"
                value={updateIdx}
                min={0}
                max={Math.max(0, displayArray.length - 1)}
                onChange={e => setUpdateIdx(e.target.value)}
                className="w-14 px-2 py-1 text-xs rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
              />
              <button
                type="submit"
                disabled={displayArray.length === 0}
                className="flex-1 px-2 py-1 text-xs font-bold bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white rounded-lg transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <RefreshCw className="w-3 h-3" /> Set
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Contiguous Array Memory Canvas */}
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-6 shadow-xs flex flex-col items-center justify-center min-h-[320px] sm:min-h-[340px] relative overflow-hidden space-y-5">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

        {/* Array Capacity & Length Info Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-mono">
          <span className="px-2.5 sm:px-3 py-1 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-bold">
            Length N = {displayArray.length}
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-bold">
            Size = 4B
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
            Contiguous Memory
          </span>
        </div>

        {/* Cells Row */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full px-1 sm:px-2 py-2">
          {displayArray.length === 0 ? (
            <div className="text-slate-400 font-medium text-sm py-8">
              Array is currently empty. Use the Insert form above to add elements.
            </div>
          ) : (
            displayArray.map((value, index) => {
              const isHighlighted = highlightIndices.has(index);
              const isTarget = pointers.target === index || pointers.targetIndex === index;
              const isInserted = pointers.inserted === index;
              const isDeleting = pointers.deleting === index;
              const isShifting = pointers.shifting === index;

              let cellStyle = 'bg-white text-slate-800 border-slate-200 shadow-2xs';
              let badgeText = null;

              if (isInserted) {
                cellStyle = 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/30 scale-105';
                badgeText = 'Inserted';
              } else if (isDeleting) {
                cellStyle = 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/30 scale-105 animate-pulse';
                badgeText = 'Delete';
              } else if (isShifting) {
                cellStyle = 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/30 scale-105';
                badgeText = 'Shift →';
              } else if (isTarget) {
                cellStyle = 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/30 scale-105';
                badgeText = 'Target';
              } else if (isHighlighted) {
                cellStyle = 'bg-blue-100 text-blue-900 border-blue-300 font-bold';
              }

              const memOffset = `0x${(100 + index * 4).toString(16).toUpperCase()}`;

              return (
                <div key={index} className="flex flex-col items-center group">
                  {/* Pointer tag above box */}
                  <div className="h-5 flex items-center justify-center mb-1">
                    {badgeText && (
                      <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded-full bg-slate-900 text-white shadow-2xs">
                        {badgeText}
                      </span>
                    )}
                  </div>

                  {/* Array Box */}
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center font-mono text-sm sm:text-lg font-bold transition-all duration-200 cursor-default ${cellStyle}`}
                  >
                    {value}
                  </div>

                  {/* Index Label */}
                  <span className="text-[11px] font-mono font-bold text-slate-500 mt-1.5">
                    [{index}]
                  </span>

                  {/* Memory Address below */}
                  <span className="text-[9px] font-mono text-slate-400 opacity-70 mt-0.5">
                    {memOffset}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
