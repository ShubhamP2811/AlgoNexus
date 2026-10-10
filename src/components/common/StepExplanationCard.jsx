import React from 'react';
import { Info } from 'lucide-react';

export function StepExplanationCard({ step = {} }) {
  const counters = step.counters || {};
  const pointers = step.pointers || {};
  const hasCounters = Object.keys(counters).length > 0;
  const hasPointers = Object.keys(pointers).length > 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
          <Info className="w-4 h-4 text-indigo-500" />
          <span>Current Step Explanation</span>
        </div>
        {step.type && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {step.type}
          </span>
        )}
      </div>

      {/* Description text */}
      <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-sm text-slate-800 dark:text-blue-100 leading-relaxed font-medium">
        {step.description || 'Initialize or start the algorithm to begin step execution.'}
      </div>

      {/* Pointers & Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Active Pointers */}
        {hasPointers && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Active Pointers
            </span>
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {Object.entries(pointers).map(([key, val]) => (
                <span
                  key={key}
                  className="font-mono text-xs px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 shadow-2xs"
                >
                  <strong className="text-blue-600 dark:text-blue-400">{key}</strong>: {val !== null ? String(val) : 'null'}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Operation Counters */}
        {hasCounters && (
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Operations Counter
            </span>
            <div className="grid grid-cols-3 gap-2 pt-0.5 text-center">
              {counters.comparisons !== undefined && (
                <div className="bg-white dark:bg-slate-700 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600">
                  <div className="text-[10px] text-slate-400">Comparisons</div>
                  <div className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">
                    {counters.comparisons}
                  </div>
                </div>
              )}
              {counters.swaps !== undefined && (
                <div className="bg-white dark:bg-slate-700 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600">
                  <div className="text-[10px] text-slate-400">Swaps/Writes</div>
                  <div className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                    {counters.swaps}
                  </div>
                </div>
              )}
              {counters.operations !== undefined && (
                <div className="bg-white dark:bg-slate-700 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600">
                  <div className="text-[10px] text-slate-400">Total Ops</div>
                  <div className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400">
                    {counters.operations}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
