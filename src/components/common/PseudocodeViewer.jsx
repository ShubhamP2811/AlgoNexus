import React from 'react';
import { Terminal } from 'lucide-react';

export function PseudocodeViewer({ pseudocode = [], activeLine = null }) {
  if (!pseudocode || pseudocode.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
          <Terminal className="w-3.5 h-3.5 text-blue-500" />
          <span>Pseudocode Execution</span>
        </div>
        {activeLine && (
          <span className="text-[11px] font-mono font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            Line {activeLine}
          </span>
        )}
      </div>

      <div className="p-3 font-mono text-xs overflow-x-auto divide-y divide-slate-100">
        {pseudocode.map((line, index) => {
          const lineNumber = index + 1;
          const isActive = activeLine === lineNumber;

          return (
            <div
              key={lineNumber}
              className={`flex items-start py-1 px-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-500 pl-1.5'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className={`w-6 shrink-0 select-none text-right pr-3 font-mono text-[11px] ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-300'
              }`}>
                {lineNumber}
              </span>
              <span className="whitespace-pre flex-1">
                {line || ' '}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
