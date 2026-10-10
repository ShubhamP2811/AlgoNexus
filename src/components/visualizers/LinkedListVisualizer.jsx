import React, { useState } from 'react';
import { 
  createDefaultLinkedList, 
  generateLLInsertHeadSteps, 
  generateLLInsertTailSteps, 
  generateLLDeleteValueSteps, 
  generateLLTraverseSteps 
} from '../../algorithms/dataStructures/linkedListOps';
import { ArrowRight, Plus, Trash2, Eye } from 'lucide-react';

export function LinkedListVisualizer({
  step = {},
  onTriggerSteps
}) {
  const [list, setList] = useState(createDefaultLinkedList());
  const [inputValue, setInputValue] = useState(55);
  const [deleteValue, setDeleteValue] = useState(37);

  const displayNodes = step.nodes !== undefined ? step.nodes : list;
  const activeNodeId = step.activeNodeId;

  const handleInsertHead = () => {
    const { steps, updatedList } = generateLLInsertHeadSteps(displayNodes, inputValue);
    setList(updatedList);
    onTriggerSteps(steps);
    setInputValue(Math.floor(Math.random() * 90) + 10);
  };

  const handleInsertTail = () => {
    const { steps, updatedList } = generateLLInsertTailSteps(displayNodes, inputValue);
    setList(updatedList);
    onTriggerSteps(steps);
    setInputValue(Math.floor(Math.random() * 90) + 10);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { steps, updatedList } = generateLLDeleteValueSteps(displayNodes, deleteValue);
    setList(updatedList);
    onTriggerSteps(steps);
  };

  const handleTraverse = () => {
    const steps = generateLLTraverseSteps(displayNodes);
    onTriggerSteps(steps);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="w-16 px-2.5 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <button
            onClick={handleInsertHead}
            className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Head
          </button>
          <button
            onClick={handleInsertTail}
            className="px-3 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" /> Tail
          </button>
        </div>

        <form onSubmit={handleDelete} className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Val"
            value={deleteValue}
            onChange={e => setDeleteValue(e.target.value)}
            className="w-16 px-2.5 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-colors flex items-center gap-1 shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" /> Delete Val
          </button>
        </form>

        <button
          onClick={handleTraverse}
          className="px-3.5 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Eye className="w-3.5 h-3.5" /> Traverse
        </button>
      </div>

      {/* Linked List Canvas */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-6 min-h-[320px] sm:min-h-[340px] flex items-center justify-start overflow-x-auto relative shadow-xs">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="flex items-center gap-3 min-w-max px-4 relative z-10">
          
          {displayNodes.length === 0 ? (
            <div className="text-slate-400 text-sm font-medium py-12">
              List is empty. Click "Head" or "Tail" to add elements.
            </div>
          ) : (
            displayNodes.map((node, idx) => {
              const isHead = idx === 0;
              const isTail = idx === displayNodes.length - 1;
              const isActive = activeNodeId === node.id;

              return (
                <React.Fragment key={node.id}>
                  {/* Node representation */}
                  <div className="flex flex-col items-center">
                    {/* Head / Tail tags */}
                    <div className="h-5 mb-1 font-mono text-[10px] font-bold">
                      {isHead && <span className="text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 px-1.5 py-0.5 rounded">HEAD</span>}
                      {isTail && <span className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 px-1.5 py-0.5 rounded ml-1">TAIL</span>}
                    </div>

                    <div
                      className={`flex rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                        isActive
                          ? 'border-amber-500 shadow-md scale-105'
                          : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs'
                      }`}
                    >
                      {/* Data cell */}
                      <div className={`px-4 py-3 font-mono font-bold text-sm ${isActive ? 'bg-amber-400 text-amber-950' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100'}`}>
                        {node.val}
                      </div>
                      {/* Next pointer bullet cell */}
                      <div className={`px-3 py-3 border-l flex items-center justify-center text-xs ${isActive ? 'bg-amber-300 border-amber-400 text-amber-900 font-bold' : 'bg-slate-100 dark:bg-slate-700/60 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                        •
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 mt-1.5">
                      Node {idx}
                    </span>
                  </div>

                  {/* Arrow to next node */}
                  <div className="flex items-center text-blue-500 dark:text-blue-400 -mt-2">
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </React.Fragment>
              );
            })
          )}

          {/* Terminal NULL */}
          {displayNodes.length > 0 && (
            <div className="flex flex-col items-center -mt-2">
              <div className="h-5 mb-1" />
              <div className="px-3 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-xs font-bold">
                NULL
              </div>
              <div className="h-4 mt-1.5" />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
