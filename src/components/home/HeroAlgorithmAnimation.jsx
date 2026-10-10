import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowDownUp, 
  Search, 
  GitBranch, 
  Share2, 
  Layers, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight
} from 'lucide-react';

export function HeroAlgorithmAnimation() {
  const [activeTab, setActiveTab] = useState('sorting'); // 'sorting' | 'searching' | 'trees' | 'graphs' | 'data-structures'
  const [isPlaying, setIsPlaying] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  // Tabs metadata
  const TABS = [
    { id: 'sorting', label: 'Sorting', shortLabel: 'Sort', icon: ArrowDownUp, path: '/sorting/quick-sort', title: 'Quick Sort', complexity: 'O(n log n)' },
    { id: 'searching', label: 'Searching', shortLabel: 'Search', icon: Search, path: '/searching/binary-search', title: 'Binary Search', complexity: 'O(log n)' },
    { id: 'trees', label: 'Trees', shortLabel: 'Trees', icon: GitBranch, path: '/trees/inorder-traversal', title: 'BST Inorder', complexity: 'O(n)' },
    { id: 'graphs', label: 'Graphs', shortLabel: 'Graphs', icon: Share2, path: '/graphs/dijkstra', title: "Dijkstra's Path", complexity: 'O((V+E)log V)' },
    { id: 'data-structures', label: 'Stack / Queue', shortLabel: 'Stack', icon: Layers, path: '/data-structures/stack', title: 'Stack & Queue', complexity: 'O(1) LIFO' },
  ];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setStepIndex(prev => prev + 1);
    }, 1200);

    return () => clearInterval(timer);
  }, [isPlaying, activeTab]);

  // Complete Sorting Animation Frames
  const sortingFrames = [
    { array: [35, 75, 20, 90, 45, 60, 15, 80], comparing: [0, 1], swapping: [], sorted: [], msg: 'Pivot chosen: comparing 35 and 75' },
    { array: [35, 75, 20, 90, 45, 60, 15, 80], comparing: [1, 2], swapping: [1, 2], sorted: [], msg: '75 > 20 → Swapping elements into partition' },
    { array: [35, 20, 75, 90, 45, 60, 15, 80], comparing: [2, 3], swapping: [], sorted: [], msg: 'Comparing 75 and 90 (Already in order)' },
    { array: [35, 20, 75, 90, 45, 60, 15, 80], comparing: [3, 4], swapping: [3, 4], sorted: [], msg: '90 > 45 → Swapping into partition' },
    { array: [35, 20, 75, 45, 90, 60, 15, 80], comparing: [4, 5], swapping: [4, 5], sorted: [], msg: '90 > 60 → Swapping into partition' },
    { array: [35, 20, 75, 45, 60, 90, 15, 80], comparing: [5, 6], swapping: [5, 6], sorted: [], msg: '90 > 15 → Swapping elements' },
    { array: [35, 20, 75, 45, 60, 15, 90, 80], comparing: [6, 7], swapping: [6, 7], sorted: [], msg: '90 > 80 → Swapping with 90' },
    { array: [35, 20, 45, 60, 15, 75, 80, 90], comparing: [], swapping: [], sorted: [7], msg: 'Pivot 90 placed in final sorted position' },
    { array: [20, 35, 45, 15, 60, 75, 80, 90], comparing: [], swapping: [], sorted: [5, 6, 7], msg: 'Right partition sorted and confirmed' },
    { array: [15, 20, 35, 45, 60, 75, 80, 90], comparing: [], swapping: [], sorted: [0, 1, 2, 3, 4, 5, 6, 7], msg: 'Complete array partitioned and sorted!' },
    { array: [15, 20, 35, 45, 60, 75, 80, 90], comparing: [], swapping: [], sorted: [0, 1, 2, 3, 4, 5, 6, 7], msg: 'Verification complete · All elements in order' },
    { array: [35, 75, 20, 90, 45, 60, 15, 80], comparing: [], swapping: [], sorted: [], msg: 'Resetting sample array for new cycle...' },
  ];

  // Searching Animation Frames
  const searchFrames = [
    { L: 0, R: 7, M: 3, target: 59, found: false, msg: 'Search range [0..7], mid index = 3 (val: 48)' },
    { L: 0, R: 7, M: 3, target: 59, found: false, msg: '48 < 59 → Target is greater. Discard left half' },
    { L: 4, R: 7, M: 5, target: 59, found: false, msg: 'New range [4..7], mid index = 5 (val: 73)' },
    { L: 4, R: 7, M: 5, target: 59, found: false, msg: '73 > 59 → Target is smaller. Discard right half' },
    { L: 4, R: 4, M: 4, target: 59, found: true, msg: 'Range [4..4], mid index = 4 (val: 59). TARGET FOUND!' },
    { L: 4, R: 4, M: 4, target: 59, found: true, msg: 'Matched target 59 in only 3 comparisons' },
    { L: 4, R: 4, M: 4, target: 59, found: true, msg: 'O(log n) logarithmic efficiency confirmed' },
    { L: 0, R: 7, M: 3, target: 59, found: false, msg: 'Resetting search range for next cycle...' },
  ];

  // Tree Nodes & Traversal Order
  const treeNodes = [
    { id: '15', val: 15, x: 45, y: 135 },
    { id: '25', val: 25, x: 80, y: 85 },
    { id: '35', val: 35, x: 115, y: 135 },
    { id: '50', val: 50, x: 150, y: 32 },
    { id: '65', val: 65, x: 185, y: 135 },
    { id: '75', val: 75, x: 220, y: 85 },
    { id: '85', val: 85, x: 255, y: 135 },
  ];
  const treeTraversalOrder = ['15', '25', '35', '50', '65', '75', '85'];

  // Graph Nodes & Edges
  const graphNodes = [
    { id: 'A', x: 40, y: 85 },
    { id: 'B', x: 110, y: 40 },
    { id: 'C', x: 110, y: 130 },
    { id: 'D', x: 195, y: 45 },
    { id: 'E', x: 195, y: 125 },
    { id: 'F', x: 265, y: 85 },
  ];
  const graphEdges = [
    { u: 'A', v: 'B' },
    { u: 'A', v: 'C' },
    { u: 'B', v: 'D' },
    { u: 'B', v: 'C' },
    { u: 'C', v: 'E' },
    { u: 'D', v: 'F' },
    { u: 'E', v: 'F' },
  ];

  // Safe calculated sub-states
  const curSort = sortingFrames[stepIndex % sortingFrames.length] || sortingFrames[0];
  const curSearch = searchFrames[stepIndex % searchFrames.length] || searchFrames[0];
  const activeTreeStep = stepIndex % (treeTraversalOrder.length + 3);
  const activeGraphStep = stepIndex % 8;

  // Defensive arrays
  const sortArray = curSort.array || [];
  const sortComparing = curSort.comparing || [];
  const sortSwapping = curSort.swapping || [];
  const sortSorted = curSort.sorted || [];

  const curTabInfo = TABS.find(t => t.id === activeTab) || TABS[0];

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border border-white/90 rounded-2xl shadow-xl shadow-blue-900/5 p-4 sm:p-5 flex flex-col justify-between overflow-hidden relative">
      
      {/* Background Soft Ambient Accent */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header: Interactive Category Selector Tabs */}
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-800 tracking-wide">
            Live Algorithm Simulation
          </span>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80 overflow-x-auto no-scrollbar">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setStepIndex(0);
                }}
                className={`flex-1 shrink-0 sm:shrink min-w-[56px] sm:min-w-[70px] flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-[11px] font-semibold">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Simulation Screen */}
      <div className="relative z-10 my-4 h-52 bg-white/90 border border-blue-100/90 rounded-xl p-3.5 flex flex-col justify-between overflow-hidden shadow-inner">
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#93c5fd_1.2px,transparent_1.2px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

        {/* 1. SORTING ANIMATION (Guaranteed visible bars with exact pixel heights) */}
        {activeTab === 'sorting' && (
          <div className="h-full flex flex-col justify-between relative z-10">
            <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span className="text-slate-800 font-semibold">Quick Sort · Pivot Partitioning</span>
              <span className="text-amber-600 font-bold">Step {(stepIndex % sortingFrames.length) + 1}/12</span>
            </div>

            {/* Bars Area with explicit heights */}
            <div className="flex items-end justify-center gap-2 sm:gap-2.5 h-32 px-1 pb-1">
              {sortArray.map((val, idx) => {
                const isComparing = sortComparing.includes(idx);
                const isSwapping = sortSwapping.includes(idx);
                const isSorted = sortSorted.includes(idx);

                let barColor = 'bg-gradient-to-t from-blue-600 to-sky-400';
                let glow = 'shadow-xs shadow-blue-500/20';

                if (isSorted) {
                  barColor = 'bg-gradient-to-t from-emerald-600 to-teal-400';
                  glow = 'shadow-md shadow-emerald-500/40 ring-1 ring-emerald-500/40';
                } else if (isSwapping) {
                  barColor = 'bg-gradient-to-t from-rose-600 to-rose-400 animate-pulse';
                  glow = 'shadow-md shadow-rose-500/50 ring-1 ring-rose-500/40';
                } else if (isComparing) {
                  barColor = 'bg-gradient-to-t from-amber-500 to-amber-300';
                  glow = 'shadow-md shadow-amber-400/50 ring-1 ring-amber-400/40';
                }

                // Explicit pixel height calculation (ranges between 16px and 88px)
                const barHeightPx = Math.max(16, Math.round((val / 100) * 88));

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <span className="text-[10px] font-mono font-bold text-slate-700 mb-1">{val}</span>
                    <div
                      style={{ height: `${barHeightPx}px` }}
                      className={`w-full rounded-t-md transition-all duration-300 ${barColor} ${glow}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Step Message */}
            <div className="text-[11px] font-medium text-slate-700 truncate bg-white px-3 py-1.5 rounded-lg border border-slate-200/90 shadow-2xs">
              <span className="text-blue-600 font-bold">Action: </span>
              {curSort.msg || ''}
            </div>
          </div>
        )}

        {/* 2. SEARCHING ANIMATION (Binary Search) */}
        {activeTab === 'searching' && (
          <div className="h-full flex flex-col justify-between relative z-10">
            <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span>Target Key: <strong className="text-emerald-600 font-bold">59</strong></span>
              <span className="text-blue-600 font-bold">Mid Index: {curSearch.M}</span>
            </div>

            {/* Array Cells */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-auto px-1">
              {[12, 24, 35, 48, 59, 73, 86, 95].map((val, idx) => {
                const isMid = idx === curSearch.M;
                const inRange = idx >= curSearch.L && idx <= curSearch.R;
                const isTarget = isMid && curSearch.found;

                let cellClass = 'bg-white text-slate-700 border-slate-200 shadow-2xs';

                if (isTarget) {
                  cellClass = 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-bold border-emerald-500 shadow-md scale-105';
                } else if (isMid) {
                  cellClass = 'bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 font-bold border-amber-400 shadow-xs';
                } else if (inRange) {
                  cellClass = 'bg-blue-100 text-blue-800 border-blue-300 font-semibold';
                }

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] font-mono text-slate-400">[{idx}]</span>
                    <div className={`w-full aspect-square max-w-[38px] rounded-lg border flex items-center justify-center text-xs font-semibold transition-all ${cellClass}`}>
                      {val}
                    </div>
                    <span className="text-[10px] font-mono font-bold h-3 text-blue-600">
                      {isMid ? 'M' : idx === curSearch.L ? 'L' : idx === curSearch.R ? 'R' : ''}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="text-[11px] font-medium text-slate-700 truncate bg-white px-3 py-1.5 rounded-lg border border-slate-200/90 shadow-2xs">
              <span className="text-emerald-600 font-bold">State: </span>
              {curSearch.msg || ''}
            </div>
          </div>
        )}

        {/* 3. TREES ANIMATION (Inorder Traversal) */}
        {activeTab === 'trees' && (
          <div className="h-full flex flex-col justify-between relative z-10">
            <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span className="text-slate-800 font-semibold">BST Inorder Traversal</span>
              <span className="text-indigo-600 font-bold">Left → Root → Right</span>
            </div>

            {/* Tree SVG */}
            <div className="relative h-28 w-full flex items-center justify-center">
              <svg viewBox="0 0 300 160" className="w-full h-full max-h-28">
                {/* Branches */}
                <line x1="150" y1="32" x2="80" y2="85" stroke="#94a3b8" strokeWidth="2" />
                <line x1="150" y1="32" x2="220" y2="85" stroke="#94a3b8" strokeWidth="2" />
                <line x1="80" y1="85" x2="45" y2="135" stroke="#94a3b8" strokeWidth="2" />
                <line x1="80" y1="85" x2="115" y2="135" stroke="#94a3b8" strokeWidth="2" />
                <line x1="220" y1="85" x2="185" y2="135" stroke="#94a3b8" strokeWidth="2" />
                <line x1="220" y1="85" x2="255" y2="135" stroke="#94a3b8" strokeWidth="2" />

                {/* Nodes */}
                {treeNodes.map(node => {
                  const nodeOrderIndex = treeTraversalOrder.indexOf(node.id);
                  const isCurrent = nodeOrderIndex === activeTreeStep;
                  const isVisited = nodeOrderIndex < activeTreeStep;

                  let fill = '#ffffff';
                  let stroke = '#94a3b8';
                  let textColor = '#334155';

                  if (isCurrent) {
                    fill = '#f59e0b';
                    stroke = '#d97706';
                    textColor = '#ffffff';
                  } else if (isVisited) {
                    fill = '#2563eb';
                    stroke = '#1d4ed8';
                    textColor = '#ffffff';
                  }

                  return (
                    <g key={node.id} className="transition-all duration-300">
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="14"
                        fill={fill}
                        stroke={stroke}
                        strokeWidth="2"
                        className={isCurrent ? 'filter drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]' : ''}
                      />
                      <text
                        x={node.x}
                        y={node.y + 4}
                        textAnchor="middle"
                        fill={textColor}
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        {node.val}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="text-[11px] font-medium text-slate-700 truncate bg-white px-3 py-1.5 rounded-lg border border-slate-200/90 shadow-2xs">
              <span className="text-blue-600 font-bold">Visited List: </span>
              [{treeTraversalOrder.slice(0, Math.min(activeTreeStep + 1, treeTraversalOrder.length)).join(', ')}]
            </div>
          </div>
        )}

        {/* 4. GRAPHS ANIMATION (Dijkstra Shortest Path) */}
        {activeTab === 'graphs' && (
          <div className="h-full flex flex-col justify-between relative z-10">
            <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span className="text-slate-800 font-semibold">Dijkstra Shortest Path</span>
              <span className="text-amber-600 font-bold">Path: A → B → D → F</span>
            </div>

            {/* Graph SVG */}
            <div className="relative h-28 w-full flex items-center justify-center">
              <svg viewBox="0 0 300 160" className="w-full h-full max-h-28">
                {/* Edges */}
                {graphEdges.map((edge, i) => {
                  const uNode = graphNodes.find(n => n.id === edge.u) || { x: 0, y: 0 };
                  const vNode = graphNodes.find(n => n.id === edge.v) || { x: 0, y: 0 };
                  const isOptimal = (edge.u === 'A' && edge.v === 'B') ||
                                    (edge.u === 'B' && edge.v === 'D') ||
                                    (edge.u === 'D' && edge.v === 'F');

                  const stroke = isOptimal && activeGraphStep >= 3 ? '#eab308' : '#cbd5e1';
                  const strokeWidth = isOptimal && activeGraphStep >= 3 ? 3 : 1.5;

                  return (
                    <g key={i}>
                      <line
                        x1={uNode.x}
                        y1={uNode.y}
                        x2={vNode.x}
                        y2={vNode.y}
                        stroke={stroke}
                        strokeWidth={strokeWidth}
                        strokeDasharray={isOptimal && activeGraphStep >= 3 ? 'none' : '3,3'}
                      />
                    </g>
                  );
                })}

                {/* Nodes */}
                {graphNodes.map(node => {
                  const isSource = node.id === 'A';
                  const isTarget = node.id === 'F';
                  const onPath = ['A', 'B', 'D', 'F'].includes(node.id);

                  let fill = '#ffffff';
                  let stroke = '#94a3b8';
                  let textColor = '#334155';

                  if (isSource) {
                    fill = '#2563eb';
                    stroke = '#1d4ed8';
                    textColor = '#ffffff';
                  } else if (isTarget && activeGraphStep >= 4) {
                    fill = '#10b981';
                    stroke = '#059669';
                    textColor = '#ffffff';
                  } else if (onPath && activeGraphStep >= 2) {
                    fill = '#eab308';
                    stroke = '#d97706';
                    textColor = '#ffffff';
                  }

                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="12"
                        fill={fill}
                        stroke={stroke}
                        strokeWidth="2"
                      />
                      <text
                        x={node.x}
                        y={node.y + 4}
                        textAnchor="middle"
                        fill={textColor}
                        fontSize="9"
                        fontWeight="bold"
                      >
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="text-[11px] font-medium text-slate-700 truncate bg-white px-3 py-1.5 rounded-lg border border-slate-200/90 shadow-2xs">
              <span className="text-amber-600 font-bold">Shortest Path: </span>
              A (0) → B (2) → D (5) → F (Total Distance: 7)
            </div>
          </div>
        )}

        {/* 5. DATA STRUCTURES ANIMATION (Stack LIFO) */}
        {activeTab === 'data-structures' && (
          <div className="h-full flex flex-col justify-between relative z-10">
            <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
              <span className="text-slate-800 font-semibold">Stack Operations (LIFO)</span>
              <span className="text-indigo-600 font-bold">Push / Pop</span>
            </div>

            {/* Stack Visualizer Bars */}
            <div className="flex items-center justify-center gap-6 my-auto px-4">
              <div className="w-40 border-b-2 border-l-2 border-r-2 border-indigo-400 rounded-b-xl p-1.5 flex flex-col-reverse gap-1 min-h-[90px] bg-slate-100">
                {[
                  { val: '10', color: 'bg-indigo-500' },
                  { val: '25', color: 'bg-indigo-600' },
                  { val: '42', color: 'bg-blue-600' },
                  { val: '99 (TOP)', color: 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-sm' },
                ].slice(0, Math.max(1, (stepIndex % 4) + 1)).map((item, idx) => (
                  <div
                    key={idx}
                    className={`w-full py-1 text-center rounded-lg text-xs font-mono font-bold text-white transition-all duration-300 ${item.color}`}
                  >
                    {item.val}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5 text-xs font-mono">
                <span className="text-slate-600">Mode: <strong className="text-indigo-600 font-bold">LIFO</strong></span>
                <span className="text-slate-600">Peek: <strong className="text-slate-900 font-bold">99</strong></span>
                <span className="text-slate-600">Size: <strong className="text-emerald-600 font-bold">{(stepIndex % 4) + 1}</strong></span>
              </div>
            </div>

            <div className="text-[11px] font-medium text-slate-700 truncate bg-white px-3 py-1.5 rounded-lg border border-slate-200/90 shadow-2xs">
              <span className="text-indigo-600 font-bold">Operation: </span>
              Element pushed onto the top of the stack · O(1)
            </div>
          </div>
        )}

      </div>

      {/* Footer Controls & Direct Link */}
      <div className="relative z-10 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            title={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>
          
          <button
            onClick={() => setStepIndex(prev => prev + 1)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            title="Next Step"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          
          <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
            {curTabInfo.title}
          </span>
        </div>

        <Link
          to={curTabInfo.path}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group"
        >
          <span>Open Visualizer</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
