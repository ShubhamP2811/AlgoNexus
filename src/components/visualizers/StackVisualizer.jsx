import React, { useState } from 'react';
import { 
  generateStackPushSteps, 
  generateStackPopSteps, 
  generateStackPeekSteps 
} from '../../algorithms/dataStructures/stackOps';
import { ArrowDown, ArrowUp, Eye, Plus, Minus } from 'lucide-react';

export function StackVisualizer({
  initialStack = [15, 30, 45, 60],
  step = {},
  onTriggerSteps
}) {
  const [currentStack, setCurrentStack] = useState(initialStack);
  const [pushValue, setPushValue] = useState(75);

  const displayStack = step.stack !== undefined ? step.stack : currentStack;
  const topIndex = displayStack.length - 1;
  const activeAction = step.activeAction;

  const handlePush = (e) => {
    e.preventDefault();
    const { steps, updatedStack } = generateStackPushSteps(displayStack, pushValue);
    setCurrentStack(updatedStack);
    onTriggerSteps(steps);
    setPushValue(Math.floor(Math.random() * 90) + 10);
  };

  const handlePop = () => {
    const { steps, updatedStack } = generateStackPopSteps(displayStack);
    setCurrentStack(updatedStack);
    onTriggerSteps(steps);
  };

  const handlePeek = () => {
    const steps = generateStackPeekSteps(displayStack);
    onTriggerSteps(steps);
  };

  return (
    <div className="space-y-4">
      {/* Stack Operations Controls */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <form onSubmit={handlePush} className="flex items-center gap-2">
          <input
            type="number"
            value={pushValue}
            onChange={e => setPushValue(e.target.value)}
            className="w-16 sm:w-20 px-2.5 sm:px-3 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <ArrowDown className="w-3.5 h-3.5" /> Push
          </button>
        </form>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePop}
            disabled={displayStack.length === 0}
            className="px-3.5 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <ArrowUp className="w-3.5 h-3.5" /> Pop
          </button>

          <button
            onClick={handlePeek}
            disabled={displayStack.length === 0}
            className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-500" /> Peek Top
          </button>
        </div>
      </div>

      {/* Stack Visual Beaker */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-6 min-h-[360px] sm:min-h-[380px] flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="w-64 max-w-full flex flex-col items-center relative z-10">
          
          {/* Top of stack entry pointer */}
          <div className="h-8 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold mb-2">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span>PUSH / POP (LIFO Top)</span>
          </div>

          {/* Stack Container Glass Tube */}
          <div className="w-full border-x-4 border-b-4 border-slate-300 dark:border-slate-700 rounded-b-2xl p-2.5 flex flex-col-reverse gap-2 min-h-[260px] bg-slate-50/80 dark:bg-slate-800/30 backdrop-blur-xs justify-start shadow-inner">
            {displayStack.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-slate-400 font-medium py-16">
                Stack is currently empty
              </div>
            ) : (
              displayStack.map((val, idx) => {
                const isTop = idx === topIndex;
                let bgStyle = 'bg-blue-600 border-blue-500 text-white shadow-xs';

                if (isTop) {
                  if (activeAction === 'peek') {
                    bgStyle = 'bg-amber-400 border-amber-500 text-amber-950 shadow-md font-extrabold';
                  } else if (activeAction === 'pop-start') {
                    bgStyle = 'bg-rose-500 border-rose-600 text-white shadow-md animate-pulse';
                  } else {
                    bgStyle = 'bg-indigo-600 border-indigo-500 text-white shadow-md';
                  }
                }

                return (
                  <div
                    key={idx}
                    className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between font-mono text-sm transition-all duration-200 ${bgStyle}`}
                  >
                    <span className="font-bold">{val}</span>
                    <span className="text-[10px] opacity-80">
                      {isTop ? 'TOP [idx ' + idx + ']' : `[${idx}]`}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div className="text-[11px] font-mono text-slate-500 mt-3">
            Base of Stack (Index 0)
          </div>
        </div>
      </div>
    </div>
  );
}
