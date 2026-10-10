import React, { useState } from 'react';
import { 
  createDefaultDoublyLinkedList, 
  generateDLLInsertHeadSteps, 
  generateDLLInsertTailSteps, 
  generateDLLDeleteValueSteps, 
  generateDLLTraverseBackwardSteps 
} from '../../algorithms/dataStructures/doublyLinkedListOps';
import { ArrowLeftRight, Plus, Trash2, RotateCcw } from 'lucide-react';

export function DoublyLinkedListVisualizer({
  step = {},
  onTriggerSteps
}) {
  const [list, setList] = useState(createDefaultDoublyLinkedList());
  const [inputValue, setInputValue] = useState(55);
  const [deleteValue, setDeleteValue] = useState(42);

  const displayNodes = step.nodes !== undefined ? step.nodes : list;
  const activeNodeId = step.activeNodeId;

  const handleInsertHead = () => {
    const { steps, updatedList } = generateDLLInsertHeadSteps(displayNodes, inputValue);
    setList(updatedList);
    onTriggerSteps(steps);
    setInputValue(Math.floor(Math.random() * 90) + 10);
  };

  const handleInsertTail = () => {
    const { steps, updatedList } = generateDLLInsertTailSteps(displayNodes, inputValue);
    setList(updatedList);
    onTriggerSteps(steps);
    setInputValue(Math.floor(Math.random() * 90) + 10);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const { steps, updatedList } = generateDLLDeleteValueSteps(displayNodes, deleteValue);
    setList(updatedList);
    onTriggerSteps(steps);
  };

  const handleBackwardTraverse = () => {
    const steps = generateDLLTraverseBackwardSteps(displayNodes);
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
          onClick={handleBackwardTraverse}
          className="px-3.5 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Traverse Backwards<span className="hidden sm:inline"> (via prev)</span>
        </button>
      </div>

      {/* Doubly Linked List Canvas */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-6 min-h-[320px] sm:min-h-[340px] flex items-center justify-start overflow-x-auto relative shadow-xs">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="flex items-center gap-2 min-w-max px-4 relative z-10">
          
          {/* NULL pointer left */}
          <div className="flex flex-col items-center -mt-2">
            <div className="h-5 mb-1" />
            <div className="px-2.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-[11px] font-bold">
              NULL
            </div>
            <div className="h-4 mt-1.5" />
          </div>

          <div className="flex items-center text-slate-400 -mt-2">
            <ArrowLeftRight className="w-4 h-4" />
          </div>

          {displayNodes.map((node, idx) => {
            const isHead = idx === 0;
            const isTail = idx === displayNodes.length - 1;
            const isActive = activeNodeId === node.id;

            return (
              <React.Fragment key={node.id}>
                <div className="flex flex-col items-center">
                  <div className="h-5 mb-1 font-mono text-[10px] font-bold">
                    {isHead && <span className="text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 px-1.5 py-0.5 rounded">HEAD</span>}
                    {isTail && <span className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800 px-1.5 py-0.5 rounded ml-1">TAIL</span>}
                  </div>

                  {/* 3-cell Doubly Node: [prev | data | next] */}
                  <div
                    className={`flex rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      isActive
                        ? 'border-amber-500 shadow-md scale-105'
                        : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs'
                    }`}
                  >
                    <div className={`px-2.5 py-2.5 border-r text-[10px] ${isActive ? 'bg-amber-300 border-amber-400 text-amber-900 font-bold' : 'bg-slate-100 dark:bg-slate-700/60 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                      prev
                    </div>
                    <div className={`px-4 py-2.5 font-mono font-bold text-sm ${isActive ? 'bg-amber-400 text-amber-950' : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100'}`}>
                      {node.val}
                    </div>
                    <div className={`px-2.5 py-2.5 border-l text-[10px] ${isActive ? 'bg-amber-300 border-amber-400 text-amber-900 font-bold' : 'bg-slate-100 dark:bg-slate-700/60 border-slate-200 dark:border-slate-700 text-slate-500'}`}>
                      next
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 mt-1.5">
                    Node {idx}
                  </span>
                </div>

                {/* Bidirectional Arrow */}
                <div className="flex items-center text-blue-500 dark:text-blue-400 -mt-2">
                  <ArrowLeftRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </React.Fragment>
            );
          })}

          {/* NULL pointer right */}
          <div className="flex flex-col items-center -mt-2">
            <div className="h-5 mb-1" />
            <div className="px-2.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-[11px] font-bold">
              NULL
            </div>
            <div className="h-4 mt-1.5" />
          </div>

        </div>
      </div>
    </div>
  );
}
