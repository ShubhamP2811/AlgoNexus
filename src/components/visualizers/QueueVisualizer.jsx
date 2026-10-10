import React, { useState } from 'react';
import { 
  generateQueueEnqueueSteps, 
  generateQueueDequeueSteps, 
  generateQueuePeekSteps 
} from '../../algorithms/dataStructures/queueOps';
import { ArrowRight, LogIn, LogOut, Eye } from 'lucide-react';

export function QueueVisualizer({
  initialQueue = [10, 20, 30, 40],
  step = {},
  onTriggerSteps
}) {
  const [currentQueue, setCurrentQueue] = useState(initialQueue);
  const [enqueueValue, setEnqueueValue] = useState(50);

  const displayQueue = step.queue !== undefined ? step.queue : currentQueue;
  const activeAction = step.activeAction;

  const handleEnqueue = (e) => {
    e.preventDefault();
    const { steps, updatedQueue } = generateQueueEnqueueSteps(displayQueue, enqueueValue);
    setCurrentQueue(updatedQueue);
    onTriggerSteps(steps);
    setEnqueueValue(Math.floor(Math.random() * 90) + 10);
  };

  const handleDequeue = () => {
    const { steps, updatedQueue } = generateQueueDequeueSteps(displayQueue);
    setCurrentQueue(updatedQueue);
    onTriggerSteps(steps);
  };

  const handlePeek = () => {
    const steps = generateQueuePeekSteps(displayQueue);
    onTriggerSteps(steps);
  };

  return (
    <div className="space-y-4">
      {/* Queue Operations Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <form onSubmit={handleEnqueue} className="flex items-center gap-2">
          <input
            type="number"
            value={enqueueValue}
            onChange={e => setEnqueueValue(e.target.value)}
            className="w-16 sm:w-20 px-2.5 sm:px-3 py-1.5 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 dark:border-slate-700"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <LogIn className="w-3.5 h-3.5" /> Enqueue (Rear)
          </button>
        </form>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDequeue}
            disabled={displayQueue.length === 0}
            className="px-3.5 py-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" /> Dequeue (Front)
          </button>

          <button
            onClick={handlePeek}
            disabled={displayQueue.length === 0}
            className="px-3.5 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-500" /> Peek Front
          </button>
        </div>
      </div>

      {/* Queue Pipeline Visual */}
      <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-6 min-h-[320px] sm:min-h-[340px] flex flex-col items-center justify-center relative overflow-hidden shadow-xs">
        {/* Background Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Direction indicators */}
        <div className="w-full max-w-2xl flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-500 font-mono mb-4 px-2 relative z-10">
          <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
            <LogOut className="w-3.5 h-3.5" /> FRONT (Out / Dequeue)
          </span>
          <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-semibold">
            FIFO Flow <ArrowRight className="w-3.5 h-3.5" />
          </span>
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold">
            <LogIn className="w-3.5 h-3.5" /> REAR (In / Enqueue)
          </span>
        </div>

        {/* Pipeline container */}
        <div className="w-full max-w-2xl min-h-[96px] border-y-2 border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl p-3 flex items-center gap-3 overflow-x-auto relative z-10 shadow-inner">
          {displayQueue.length === 0 ? (
            <div className="w-full text-center text-xs text-slate-400 font-medium py-6">
              Queue is empty
            </div>
          ) : (
            displayQueue.map((val, idx) => {
              const isFront = idx === 0;
              const isRear = idx === displayQueue.length - 1;

              let bgStyle = 'bg-blue-600 border-blue-500 text-white shadow-xs';

              if (isFront && activeAction === 'peek') {
                bgStyle = 'bg-amber-400 border-amber-500 text-amber-950 shadow-md font-bold';
              } else if (isFront && activeAction === 'dequeue-start') {
                bgStyle = 'bg-rose-500 border-rose-600 text-white shadow-md animate-pulse';
              } else if (isRear && activeAction === 'enqueue-complete') {
                bgStyle = 'bg-emerald-600 border-emerald-500 text-white shadow-md';
              }

              return (
                <div key={idx} className="flex flex-col items-center shrink-0">
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1 font-semibold">
                    {isFront && <span className="text-rose-600 dark:text-rose-400">FRONT </span>}
                    {isRear && <span className="text-blue-600 dark:text-blue-400">REAR </span>}
                  </div>
                  <div className={`w-14 h-14 rounded-xl border flex items-center justify-center font-mono text-base font-bold transition-all duration-200 ${bgStyle}`}>
                    {val}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 mt-1">
                    [{idx}]
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
