import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Shuffle, 
  Edit3, 
  Gauge, 
  Check, 
  X
} from 'lucide-react';
import { parseCustomArrayInput } from '../../utils/arrayUtils';

export function ControlsBar({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onReset,
  currentStepIndex,
  totalSteps,
  onJumpToStep,
  speed,
  onSpeedChange,
  onGenerateRandom,
  onApplyCustomInput,
  customInputPlaceholder = "e.g. 45, 12, 88, 23, 7, 50, 64",
  showInputControls = true
}) {
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customInputValue, setCustomInputValue] = useState('');
  const [inputError, setInputError] = useState('');

  const handleApplyCustom = (e) => {
    e.preventDefault();
    if (!onApplyCustomInput) return;

    const result = parseCustomArrayInput(customInputValue);
    if (!result.valid) {
      setInputError(result.error);
      return;
    }

    setInputError('');
    onApplyCustomInput(result.data);
    setShowCustomModal(false);
  };

  // Speed options mapping
  const speedPresets = [
    { label: '0.25x', value: 1200 },
    { label: '0.5x', value: 800 },
    { label: '1x', value: 500 },
    { label: '2x', value: 250 },
    { label: '4x', value: 100 }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-sm space-y-3.5">
      
      {/* Top Row: Playback & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
        
        {/* Playback Button Group */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60">
          {/* Reset */}
          <button
            onClick={onReset}
            title="Reset (R)"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Previous Step */}
          <button
            onClick={onPrev}
            disabled={currentStepIndex <= 0}
            title="Previous Step (Left Arrow)"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Play / Pause Primary */}
          <button
            onClick={onTogglePlay}
            title={isPlaying ? "Pause (Space)" : "Play (Space)"}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-semibold text-xs transition-all shadow-sm ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{currentStepIndex > 0 && currentStepIndex < totalSteps - 1 ? 'Resume' : 'Start'}</span>
              </>
            )}
          </button>

          {/* Next Step */}
          <button
            onClick={onNext}
            disabled={totalSteps <= 0 || currentStepIndex >= totalSteps - 1}
            title="Next Step (Right Arrow)"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Gauge className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Speed:</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700/60">
            {speedPresets.map(preset => {
              const isSelected = speed === preset.value;
              return (
                <button
                  key={preset.label}
                  onClick={() => onSpeedChange(preset.value)}
                  className={`px-1.5 sm:px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    isSelected
                      ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Controls (Random & Custom) */}
        {showInputControls && (
          <div className="flex items-center gap-2">
            {onGenerateRandom && (
              <button
                onClick={onGenerateRandom}
                title="Generate Random Array"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">Random</span>
              </button>
            )}

            {onApplyCustomInput && (
              <button
                onClick={() => {
                  setInputError('');
                  setShowCustomModal(true);
                }}
                title="Enter Custom Input"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700/60 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-500" />
                <span className="hidden sm:inline">Custom Input</span>
              </button>
            )}
          </div>
        )}

      </div>

      {/* Bottom Row: Step Scrubber & Progress */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-1.5 min-w-[70px] sm:min-w-[90px]">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
            Step {totalSteps > 0 ? currentStepIndex + 1 : 0}
          </span>
          <span className="font-mono text-[11px] text-slate-400">/{totalSteps}</span>
        </div>

        <div className="flex-1 relative flex items-center">
          <input
            type="range"
            min="0"
            max={Math.max(0, totalSteps - 1)}
            value={currentStepIndex}
            onChange={e => onJumpToStep(parseInt(e.target.value, 10))}
            className="w-full h-2 rounded-full cursor-pointer focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1 min-w-[48px] justify-end">
          <span className="font-mono text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded-lg shadow-2xs">
            {totalSteps > 1 ? Math.round((currentStepIndex / (totalSteps - 1)) * 100) : 0}%
          </span>
        </div>
      </div>

      {/* Custom Input Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Custom Array Input</h3>
              <button 
                onClick={() => setShowCustomModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleApplyCustom} className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter numbers separated by commas or spaces (min 2, max 30 numbers between 1 and 999):
              </p>
              
              <input
                type="text"
                autoFocus
                placeholder={customInputPlaceholder}
                value={customInputValue}
                onChange={e => {
                  setCustomInputValue(e.target.value);
                  setInputError('');
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl border font-mono text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-colors ${
                  inputError
                    ? 'border-rose-500 focus:border-rose-500'
                    : 'border-slate-300 dark:border-slate-700 focus:border-blue-500'
                }`}
              />

              {inputError && (
                <p className="text-xs text-rose-500 font-medium">{inputError}</p>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Apply & Visualize</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
