import React from 'react';

export function SortingVisualizer({ step = {}, array = [] }) {
  const currentArray = step.array || array || [];
  const comparing = new Set(step.comparing || []);
  const swapping = new Set(step.swapping || []);
  const sorted = new Set(step.sorted || []);
  const pointers = step.pointers || {};

  const maxValue = Math.max(...currentArray, 100);

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-3 sm:p-6 flex flex-col justify-end min-h-[340px] sm:min-h-[360px] shadow-xs relative overflow-hidden">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

      {/* Bars Container */}
      <div className="relative z-10 flex items-end justify-center gap-0.5 sm:gap-2 h-64 sm:h-72 w-full px-1 sm:px-4">
        {currentArray.map((value, index) => {
          const isComparing = comparing.has(index);
          const isSwapping = swapping.has(index);
          const isSorted = sorted.has(index);
          const isPivot = pointers.pivot === index || pointers.pivotIndex === index;

          // Determine bar colors
          let barBg = 'bg-blue-500 hover:bg-blue-600';
          let borderStyle = 'border-blue-400/60';

          if (isSorted) {
            barBg = 'bg-emerald-500 shadow-md shadow-emerald-500/20';
            borderStyle = 'border-emerald-400';
          } else if (isSwapping) {
            barBg = 'bg-rose-500 animate-pulse-fast shadow-lg shadow-rose-500/30';
            borderStyle = 'border-rose-400';
          } else if (isComparing) {
            barBg = 'bg-amber-400 shadow-lg shadow-amber-400/30';
            borderStyle = 'border-amber-300';
          } else if (isPivot) {
            barBg = 'bg-purple-500 shadow-lg shadow-purple-500/30';
            borderStyle = 'border-purple-400';
          }

          // Scaled to leave 35% headroom so tiered pointer badges never clip at container top
          const heightPercent = Math.max(12, Math.round((value / maxValue) * 65));

          // Collect all pointers active on this specific bar and format cleanly
          let matchingPointers = Object.entries(pointers)
            .filter(([pName, pIdx]) => pName !== 'pivotValue' && pIdx === index)
            .map(([pName]) => (pName === 'pivotIndex' ? 'pivot' : pName === 'minIndex' ? 'min' : pName));

          // If both pivot and high point to this bar, prioritize 'pivot' so they don't crowd or misalign
          if (matchingPointers.includes('pivot') && matchingPointers.includes('high')) {
            matchingPointers = matchingPointers.filter(p => p !== 'high');
          }

          // Merge multiple pointers (e.g. ['i', 'j'] -> 'i, j') into a single neat badge
          const badgeText = matchingPointers.join(', ');

          // Determine primary badge styling and downward caret color
          const isPivotBadge = matchingPointers.some(p => p.toLowerCase().includes('pivot'));
          const isPrimaryLow = matchingPointers.some(p => p === 'low' || p === 'left' || p === 'i');
          const isPrimaryHigh = matchingPointers.some(p => p === 'high' || p === 'right' || p === 'j' || p === 'j+1');

          let badgeBg = 'bg-slate-900 text-white border-slate-700 shadow-slate-900/20';
          let caretBorder = 'border-t-slate-900';

          if (isPivotBadge) {
            badgeBg = 'bg-purple-600 text-white border-purple-400 shadow-purple-500/25';
            caretBorder = 'border-t-purple-600';
          } else if (isPrimaryLow) {
            badgeBg = 'bg-blue-600 text-white border-blue-400 shadow-blue-500/25';
            caretBorder = 'border-t-blue-600';
          } else if (isPrimaryHigh) {
            badgeBg = 'bg-amber-500 text-slate-950 border-amber-300 shadow-amber-500/25 font-black';
            caretBorder = 'border-t-amber-500';
          }

          // Prevent horizontal collision of adjacent pointer badges by assigning distinct vertical tiers:
          // Tier 3: Pivot (-top-14 sm:-top-16)
          // Tier 2: Odd Index (-top-10 sm:-top-11)
          // Tier 1: Even Index (-top-6 sm:-top-7)
          let badgeOffset = '-top-6 sm:-top-7';
          let stemHeightClass = 'h-0';
          let stemBg = '';

          if (isPivotBadge) {
            badgeOffset = '-top-14 sm:-top-16';
            stemHeightClass = 'h-5 sm:h-6';
            stemBg = 'bg-purple-500';
          } else if (index % 2 === 1) {
            badgeOffset = '-top-10 sm:-top-11';
            stemHeightClass = 'h-2.5 sm:h-3';
            stemBg = isPrimaryHigh ? 'bg-amber-500' : 'bg-blue-500';
          }

          return (
            <div
              key={index}
              className="flex-1 min-w-[12px] sm:min-w-[22px] max-w-[48px] flex flex-col items-center justify-end h-full group relative"
            >
              {/* Bar element with number rendered INSIDE the bar */}
              <div
                style={{ height: `${heightPercent}%` }}
                className={`w-full rounded-t-xl border-t border-x ${barBg} ${borderStyle} transition-all duration-150 ease-out flex flex-col items-center justify-start pt-1.5 sm:pt-2 relative shadow-2xs`}
              >
                {/* Pointer indicator pin / badge with anti-collision vertical tier stem */}
                {matchingPointers.length > 0 && (
                  <div className={`absolute ${badgeOffset} left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none`}>
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-black font-mono shadow-md border whitespace-nowrap ${badgeBg}`}
                    >
                      {badgeText}
                    </span>
                    {stemHeightClass !== 'h-0' && (
                      <div className={`w-[1.5px] ${stemHeightClass} ${stemBg} -mb-px`} />
                    )}
                    <div className={`w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-t-[4px] -mt-px ${caretBorder}`} />
                  </div>
                )}

                {/* Number shown cleanly INSIDE the bar with anti-overflow truncation */}
                <span
                  className={`font-mono font-black text-[9px] sm:text-xs select-none z-10 transition-colors w-full text-center truncate px-0.5 ${
                    isComparing ? 'text-slate-950 font-black' : 'text-white drop-shadow-xs'
                  }`}
                >
                  {value}
                </span>
              </div>

              {/* Index label below bar */}
              <div className="text-[9px] sm:text-[10px] font-mono text-slate-400 font-semibold mt-1 select-none">
                {index}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
