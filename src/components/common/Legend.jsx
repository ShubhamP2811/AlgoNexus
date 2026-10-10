import React from 'react';

export function Legend({ items = [] }) {
  const defaultItems = [
    { label: 'Comparing / Inspecting', color: 'bg-amber-400 dark:bg-amber-500' },
    { label: 'Swapping / Modifying', color: 'bg-rose-500 dark:bg-rose-500' },
    { label: 'Sorted / Settled / In MST', color: 'bg-emerald-500 dark:bg-emerald-500' },
    { label: 'Pivot / Key / Target', color: 'bg-purple-500 dark:bg-purple-500' },
    { label: 'Active Pointer', color: 'bg-blue-500 dark:bg-blue-500' }
  ];

  const list = items.length > 0 ? items : defaultItems;

  return (
    <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs">
      <span className="font-semibold text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">
        Legend:
      </span>
      {list.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <span className={`w-3 h-3 rounded-md shrink-0 shadow-2xs ${item.color}`} />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
