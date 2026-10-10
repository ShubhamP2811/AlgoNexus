import React, { useState, useEffect, useMemo } from 'react';
import { SORTING_ALGORITHMS } from '../algorithms/sorting';
import { 
  generateRandomArray, 
  generateReversedArray, 
  generateNearlySortedArray, 
  parseCustomArrayInput 
} from '../utils/arrayUtils';
import { SortingVisualizer } from '../components/visualizers/SortingVisualizer';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Shuffle, 
  Trophy, 
  GitCompare, 
  Edit3, 
  Check, 
  X, 
  Gauge
} from 'lucide-react';

const AVAILABLE_SORTING = [
  { id: 'bubble-sort', name: 'Bubble Sort' },
  { id: 'selection-sort', name: 'Selection Sort' },
  { id: 'insertion-sort', name: 'Insertion Sort' },
  { id: 'merge-sort', name: 'Merge Sort' },
  { id: 'quick-sort', name: 'Quick Sort' },
  { id: 'heap-sort', name: 'Heap Sort' }
];

export function ComparePage() {
  const [algo1Id, setAlgo1Id] = useState('quick-sort');
  const [algo2Id, setAlgo2Id] = useState('bubble-sort');
  
  // Array state for both arenas
  const [array1, setArray1] = useState(() => generateRandomArray(14, 15, 95));
  const [array2, setArray2] = useState(() => [...generateRandomArray(14, 15, 95)]);

  // Custom Array Modal state
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('');
  const [targetArena, setTargetArena] = useState('both'); // 'both' | '1' | '2'
  const [inputError, setInputError] = useState('');

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(300); // ms
  const [stepIndex1, setStepIndex1] = useState(0);
  const [stepIndex2, setStepIndex2] = useState(0);

  // Initialize both arenas with identical array on mount
  useEffect(() => {
    const initialArr = generateRandomArray(14, 15, 95);
    setArray1([...initialArr]);
    setArray2([...initialArr]);
  }, []);

  // Generate steps for both algorithms using their respective arrays
  const steps1 = useMemo(() => {
    const generator = SORTING_ALGORITHMS[algo1Id];
    return generator ? generator(array1) : [];
  }, [algo1Id, array1]);

  const steps2 = useMemo(() => {
    const generator = SORTING_ALGORITHMS[algo2Id];
    return generator ? generator(array2) : [];
  }, [algo2Id, array2]);

  // Reset steps when input or algorithms change
  useEffect(() => {
    setStepIndex1(0);
    setStepIndex2(0);
    setIsPlaying(false);
  }, [steps1, steps2]);

  // Interval loop for racing
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setStepIndex1(prev1 => {
          const next1 = prev1 < steps1.length - 1 ? prev1 + 1 : prev1;
          return next1;
        });

        setStepIndex2(prev2 => {
          const next2 = prev2 < steps2.length - 1 ? prev2 + 1 : prev2;
          return next2;
        });
      }, speed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, speed, steps1.length, steps2.length]);

  const isDone1 = steps1.length > 0 && stepIndex1 === steps1.length - 1;
  const isDone2 = steps2.length > 0 && stepIndex2 === steps2.length - 1;

  // Auto stop when both finish
  useEffect(() => {
    if (isDone1 && isDone2 && isPlaying) {
      setIsPlaying(false);
    }
  }, [isDone1, isDone2, isPlaying]);

  // Enforce distinct algorithms at all times
  useEffect(() => {
    if (algo1Id === algo2Id) {
      const alternate = AVAILABLE_SORTING.find(a => a.id !== algo1Id)?.id || 'bubble-sort';
      setAlgo2Id(alternate);
    }
  }, [algo1Id, algo2Id]);

  const handleAlgo1Change = (newId) => {
    if (newId === algo2Id) {
      setAlgo2Id(algo1Id);
    }
    setAlgo1Id(newId);
  };

  const handleAlgo2Change = (newId) => {
    if (newId === algo1Id) {
      setAlgo1Id(algo2Id);
    }
    setAlgo2Id(newId);
  };

  const handleSwapAlgorithms = () => {
    const temp = algo1Id;
    setAlgo1Id(algo2Id);
    setAlgo2Id(temp);
  };

  const handleTogglePlay = () => {
    if (algo1Id === algo2Id) {
      return;
    }
    setIsPlaying(prev => !prev);
  };

  const handleRandomize = () => {
    setIsPlaying(false);
    const newArr = generateRandomArray(14, 15, 95);
    setArray1([...newArr]);
    setArray2([...newArr]);
    setStepIndex1(0);
    setStepIndex2(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setStepIndex1(0);
    setStepIndex2(0);
  };

  // Open custom modal with target pre-selection
  const handleOpenCustomModal = (target = 'both') => {
    setIsPlaying(false);
    setTargetArena(target);
    if (target === '2') {
      setCustomInputValue(array2.join(', '));
    } else {
      setCustomInputValue(array1.join(', '));
    }
    setInputError('');
    setShowCustomModal(true);
  };

  // Apply custom array
  const handleApplyCustom = (e) => {
    if (e) e.preventDefault();
    const result = parseCustomArrayInput(customInputValue, 2, 30);
    if (!result.valid) {
      setInputError(result.error);
      return;
    }

    const newArr = result.data;
    setIsPlaying(false);

    if (targetArena === 'both') {
      setArray1([...newArr]);
      setArray2([...newArr]);
      setStepIndex1(0);
      setStepIndex2(0);
    } else if (targetArena === '1') {
      setArray1([...newArr]);
      setStepIndex1(0);
    } else if (targetArena === '2') {
      setArray2([...newArr]);
      setStepIndex2(0);
    }

    setShowCustomModal(false);
  };

  // Preset generator inside modal
  const handlePresetSelect = (presetKey) => {
    let arr = [];
    const size = 14;
    switch (presetKey) {
      case 'reversed':
        arr = generateReversedArray(size);
        break;
      case 'nearly-sorted':
        arr = generateNearlySortedArray(size);
        break;
      case 'few-unique': {
        const pool = [20, 45, 75, 90];
        arr = Array.from({ length: size }, () => pool[Math.floor(Math.random() * pool.length)]);
        break;
      }
      case 'sorted':
        arr = generateRandomArray(size, 15, 95).sort((a, b) => a - b);
        break;
      case 'random':
      default:
        arr = generateRandomArray(size, 15, 95);
        break;
    }
    setCustomInputValue(arr.join(', '));
    setInputError('');
  };

  const currentStep1 = steps1[stepIndex1] || {};
  const currentStep2 = steps2[stepIndex2] || {};

  const counters1 = currentStep1.counters || { comparisons: 0, swaps: 0 };
  const counters2 = currentStep2.counters || { comparisons: 0, swaps: 0 };

  const algo1Obj = AVAILABLE_SORTING.find(a => a.id === algo1Id);
  const algo2Obj = AVAILABLE_SORTING.find(a => a.id === algo2Id);

  // Parse entered count for live feedback
  const enteredElementsCount = customInputValue.trim() 
    ? customInputValue.trim().split(/[\s,]+/).filter(Boolean).length 
    : 0;

  return (
    <div className="space-y-8 pb-4">
      
      {/* Race Header Banner */}
      <div className="p-4 sm:p-7 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/40 border border-blue-200/80 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Algorithm Race Arena</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Head-to-Head Algorithm Comparison
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          Execute two distinct sorting algorithms simultaneously on your own custom array or random data. Observe real-time comparison counts, write counts, and speed differences.
        </p>
      </div>

      {/* Global Controls Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:px-4 shadow-sm flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
        
        {/* Left Action & Playback Group */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleTogglePlay}
            disabled={algo1Id === algo2Id}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all active:scale-95 ${
              algo1Id === algo2Id
                ? 'bg-slate-300 cursor-not-allowed text-slate-500'
                : isPlaying
                ? 'bg-amber-500 hover:bg-amber-600'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Start Race'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs"
            title="Reset Race"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSwapAlgorithms}
            className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-2xs"
            title="Swap algorithms between Arena 1 and Arena 2"
          >
            <GitCompare className="w-3.5 h-3.5 text-indigo-600" />
            <span>Swap</span>
          </button>

          <button
            onClick={() => handleOpenCustomModal('both')}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-all shadow-2xs"
            title="Set custom array for both arenas or choose a side"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-600" />
            <span>Own Array</span>
          </button>

          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors shadow-2xs"
            title="Generate new random array for both arenas"
          >
            <Shuffle className="w-3.5 h-3.5 text-blue-600" />
            <span>New Array</span>
          </button>
        </div>

        {/* Right Speed Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
            <Gauge className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Speed:</span>
          </div>
          <div className="flex items-center gap-0.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[
              { label: '0.5x', ms: 500 },
              { label: '1x', ms: 300 },
              { label: '2x', ms: 150 },
              { label: '4x', ms: 60 }
            ].map(s => (
              <button
                key={s.label}
                onClick={() => setSpeed(s.ms)}
                className={`px-2 sm:px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  speed === s.ms
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Side-by-Side Dual Arenas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        
        {/* Arena 1 */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 h-full">
          {/* Arena 1 Header - Strictly single-line and fixed height */}
          <div className="flex items-center justify-between gap-3 min-h-[44px]">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="w-7 h-7 shrink-0 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">1</span>
              <select
                value={algo1Id}
                onChange={e => handleAlgo1Change(e.target.value)}
                className="w-full max-w-[160px] sm:max-w-[200px] px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 truncate"
              >
                {AVAILABLE_SORTING.map(a => {
                  const isOpponent = a.id === algo2Id;
                  return (
                    <option
                      key={a.id}
                      value={a.id}
                      disabled={isOpponent}
                      className={isOpponent ? 'text-slate-400 bg-slate-100' : ''}
                    >
                      {a.name}{isOpponent ? ' (Active in 2)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenCustomModal('1')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors shadow-2xs whitespace-nowrap"
                title="Customize Arena 1 array"
              >
                <Edit3 className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Own Array</span>
              </button>

              {isDone1 && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full whitespace-nowrap">
                  Finished ({steps1.length} steps)
                </span>
              )}
            </div>
          </div>

          {/* Array Info Strip */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 h-10 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-slate-700 whitespace-nowrap">{array1.length} Items:</span>
              <span className="font-mono text-[11px] text-slate-500 truncate">
                [{array1.join(', ')}]
              </span>
            </div>
            <button
              onClick={() => handleOpenCustomModal('1')}
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 ml-2 whitespace-nowrap shrink-0"
            >
              <span>Edit</span>
            </button>
          </div>

          {/* Visualizer 1 */}
          <div className="flex-1 flex flex-col justify-end">
            <SortingVisualizer step={currentStep1} array={array1} />
          </div>

          {/* Counters 1 */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs shrink-0">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Comparisons</div>
              <div className="text-sm font-bold text-amber-500 mt-0.5">{counters1.comparisons}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Swaps / Shifts</div>
              <div className="text-sm font-bold text-rose-500 mt-0.5">{counters1.swaps}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Step Progress</div>
              <div className="text-sm font-bold text-blue-500 mt-0.5">{stepIndex1 + 1} / {steps1.length}</div>
            </div>
          </div>
        </div>

        {/* Arena 2 */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4 h-full">
          {/* Arena 2 Header - Strictly single-line and fixed height */}
          <div className="flex items-center justify-between gap-3 min-h-[44px]">
            <div className="flex items-center gap-2.5 min-w-0 flex-1">
              <span className="w-7 h-7 shrink-0 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">2</span>
              <select
                value={algo2Id}
                onChange={e => handleAlgo2Change(e.target.value)}
                className="w-full max-w-[160px] sm:max-w-[200px] px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 truncate"
              >
                {AVAILABLE_SORTING.map(a => {
                  const isOpponent = a.id === algo1Id;
                  return (
                    <option
                      key={a.id}
                      value={a.id}
                      disabled={isOpponent}
                      className={isOpponent ? 'text-slate-400 bg-slate-100' : ''}
                    >
                      {a.name}{isOpponent ? ' (Active in 1)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleOpenCustomModal('2')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors shadow-2xs whitespace-nowrap"
                title="Customize Arena 2 array"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Own Array</span>
              </button>

              {isDone2 && (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full whitespace-nowrap">
                  Finished ({steps2.length} steps)
                </span>
              )}
            </div>
          </div>

          {/* Array Info Strip */}
          <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-600 h-10 shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold text-slate-700 whitespace-nowrap">{array2.length} Items:</span>
              <span className="font-mono text-[11px] text-slate-500 truncate">
                [{array2.join(', ')}]
              </span>
            </div>
            <button
              onClick={() => handleOpenCustomModal('2')}
              className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 ml-2 whitespace-nowrap shrink-0"
            >
              <span>Edit</span>
            </button>
          </div>

          {/* Visualizer 2 */}
          <div className="flex-1 flex flex-col justify-end">
            <SortingVisualizer step={currentStep2} array={array2} />
          </div>

          {/* Counters 2 */}
          <div className="grid grid-cols-3 gap-2 font-mono text-xs shrink-0">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Comparisons</div>
              <div className="text-sm font-bold text-amber-500 mt-0.5">{counters2.comparisons}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Swaps / Shifts</div>
              <div className="text-sm font-bold text-rose-500 mt-0.5">{counters2.swaps}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Step Progress</div>
              <div className="text-sm font-bold text-indigo-500 mt-0.5">{stepIndex2 + 1} / {steps2.length}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Custom Array Setup Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-2xs">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-tight">
                    Set Own Race Array
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Configure custom numbers for the algorithm race
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowCustomModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Target Arena Selector Tabs */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Apply Array To:
              </label>
              <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setTargetArena('both');
                    setInputError('');
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                    targetArena === 'both'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  Both Arenas
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTargetArena('1');
                    setCustomInputValue(array1.join(', '));
                    setInputError('');
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all truncate text-center ${
                    targetArena === '1'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                  title={`Arena 1 (${algo1Obj?.name})`}
                >
                  Arena 1 ({algo1Obj?.name})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTargetArena('2');
                    setCustomInputValue(array2.join(', '));
                    setInputError('');
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all truncate text-center ${
                    targetArena === '2'
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                  title={`Arena 2 (${algo2Obj?.name})`}
                >
                  Arena 2 ({algo2Obj?.name})
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Quick Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: 'Random', key: 'random' },
                  { label: 'Worst Case (Reversed)', key: 'reversed' },
                  { label: 'Nearly Sorted', key: 'nearly-sorted' },
                  { label: 'Few Unique', key: 'few-unique' },
                  { label: 'Sorted', key: 'sorted' }
                ].map(preset => (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => handlePresetSelect(preset.key)}
                    className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 text-slate-700 transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Form */}
            <form onSubmit={handleApplyCustom} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Enter Numbers (comma or space separated):</span>
                  <span className={`font-mono font-bold ${
                    enteredElementsCount >= 2 && enteredElementsCount <= 30
                      ? 'text-blue-600'
                      : enteredElementsCount > 30
                      ? 'text-rose-500'
                      : 'text-slate-400'
                  }`}>
                    {enteredElementsCount} / 30 elements
                  </span>
                </div>

                <textarea
                  autoFocus
                  rows={3}
                  placeholder="e.g. 45, 12, 88, 23, 7, 50, 64, 31, 95, 18"
                  value={customInputValue}
                  onChange={e => {
                    setCustomInputValue(e.target.value);
                    setInputError('');
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-2xl border font-mono text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all resize-none ${
                    inputError
                      ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/30'
                      : 'border-slate-200 focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Allowed: 2 to 30 numbers between 1 and 999</span>
                </div>

                {inputError && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-medium flex items-center gap-2">
                    <X className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>{inputError}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md shadow-blue-500/20 active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {targetArena === 'both'
                      ? 'Apply to Both Arenas'
                      : targetArena === '1'
                      ? 'Apply to Arena 1'
                      : 'Apply to Arena 2'}
                  </span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
