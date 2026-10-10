import React from 'react';
import { Target, CheckCircle2, XCircle } from 'lucide-react';

export function SearchingVisualizer({ step = {}, target = 42 }) {
  const currentArray = step.array || [];
  const comparing = new Set(step.comparing || []);
  const eliminated = new Set(step.eliminated || []);
  const foundIndex = step.found;
  const pointers = step.pointers || {};
  const currentTarget = pointers.target !== undefined ? pointers.target : target;

  return (
    <div className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-6 flex flex-col items-center justify-center min-h-[340px] shadow-xs relative overflow-hidden space-y-5">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
      
      {/* Target indicator banner */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm">
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span className="text-slate-700 dark:text-slate-300 font-medium">Target:</span>
          <span className="font-mono font-bold text-purple-600 dark:text-purple-400 text-sm sm:text-base">{currentTarget}</span>
        </div>
        {foundIndex !== null && foundIndex !== undefined && foundIndex !== -1 && (
          <span className="flex items-center gap-1 text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-700 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5" /> Found at Index {foundIndex}!
          </span>
        )}
        {foundIndex === -1 && (
          <span className="flex items-center gap-1 text-[11px] sm:text-xs text-rose-600 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-700 px-2 py-0.5 rounded-full">
            <XCircle className="w-3.5 h-3.5" /> Not Found
          </span>
        )}
      </div>

      {/* Cells row */}
      <div className="relative z-10 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-full px-1 sm:px-2 py-2">
        {currentArray.map((value, index) => {
          const isComparing = comparing.has(index);
          const isFound = foundIndex === index;
          const isEliminated = eliminated.has(index);

          let cellStyle = 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 shadow-2xs';

          if (isFound) {
            cellStyle = 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-500/40 scale-110';
          } else if (isComparing) {
            cellStyle = 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/40 scale-105 font-bold';
          } else if (isEliminated) {
            cellStyle = 'bg-slate-100 dark:bg-slate-900/60 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800 opacity-60 line-through';
          }

          return (
            <div key={index} className="flex flex-col items-center">
              
              {/* Pointer indicator tags */}
              <div className="h-5 flex items-center justify-center mb-1">
                {pointers.low === index && (
                  <span className="text-[10px] font-bold font-mono bg-blue-600 text-white px-1 rounded mr-0.5">L</span>
                )}
                {pointers.mid === index && (
                  <span className="text-[10px] font-bold font-mono bg-amber-500 text-slate-950 px-1 rounded mr-0.5">M</span>
                )}
                {pointers.high === index && (
                  <span className="text-[10px] font-bold font-mono bg-indigo-600 text-white px-1 rounded mr-0.5">H</span>
                )}
                {pointers.i === index && (
                  <span className="text-[10px] font-bold font-mono bg-blue-500 text-white px-1 rounded">i</span>
                )}
              </div>

              {/* Number box */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center font-mono text-sm sm:text-base font-bold transition-all duration-200 ${cellStyle}`}
              >
                {value}
              </div>

              {/* Index label */}
              <span className="text-[10px] font-mono text-slate-500 mt-1.5">
                [{index}]
              </span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
