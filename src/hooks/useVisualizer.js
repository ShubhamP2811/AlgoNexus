import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';

/**
 * Checks whether the final step represents a successful outcome
 * rather than a "not found", error, or negative-cycle failure.
 */
function isSuccessfulCompletion(step) {
  if (!step) return false;

  // Not found states across searching, trees, and data structures
  if (step.type === 'not-found' || step.action === 'not-found') return false;
  if (step.found === -1 || step.found === false) return false;
  if (step.notFound === true) return false;

  // Negative-weight cycle in Bellman-Ford
  if (step.type === 'negative-cycle' || step.hasNegativeCycle === true) return false;

  // Error states (e.g., out-of-bounds access)
  if (step.type === 'error' || step.isError === true) return false;

  // Safeguard: description explicitly states target/node was not found
  if (typeof step.description === 'string' && /not found/i.test(step.description)) {
    return false;
  }

  return true;
}

/**
 * Universal hook for controlling step-by-step visualizations.
 * Handles playback timer, step forward/backward scrubbing, speed, and celebration confetti.
 */
export function useVisualizer({
  steps = [],
  initialSpeed = 500, // milliseconds per step
  autoPlay = false,
  onComplete = null
}) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [speed, setSpeed] = useState(initialSpeed); // ms delay

  const timerRef = useRef(null);
  const stepsLengthRef = useRef(steps.length);
  stepsLengthRef.current = steps.length;
  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  // Whenever steps array changes (e.g. input re-generated), reset back to step 0
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [steps]);

  // Handle play/pause intervals
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex(prevIndex => {
          if (prevIndex < stepsLengthRef.current - 1) {
            return prevIndex + 1;
          } else {
            // Reached end
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);

            // Trigger celebration confetti only if outcome was successful (e.g. target found, sort completed)
            const finalStep = stepsRef.current[stepsLengthRef.current - 1] || stepsRef.current[prevIndex];
            if (isSuccessfulCompletion(finalStep)) {
              try {
                confetti({
                  particleCount: 50,
                  spread: 60,
                  origin: { y: 0.8 },
                  colors: ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b']
                });
              } catch {
                // Ignore if canvas confetti not supported in test environment
              }
            }

            if (onComplete) onComplete();
            return prevIndex;
          }
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, onComplete]);

  const play = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  }, [currentStepIndex, steps.length]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const nextStep = useCallback(() => {
    pause();
    setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
  }, [pause, steps.length]);

  const prevStep = useCallback(() => {
    pause();
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  }, [pause]);

  const reset = useCallback(() => {
    pause();
    setCurrentStepIndex(0);
  }, [pause]);

  const jumpToStep = useCallback((index) => {
    pause();
    const clamped = Math.max(0, Math.min(steps.length - 1, index));
    setCurrentStepIndex(clamped);
  }, [pause, steps.length]);

  const currentStep = steps[currentStepIndex] || {};
  const isAtStart = currentStepIndex === 0;
  const isAtEnd = steps.length > 0 && currentStepIndex === steps.length - 1;
  const progress = steps.length > 1 ? Math.round((currentStepIndex / (steps.length - 1)) * 100) : 0;

  return {
    steps,
    currentStepIndex,
    currentStep,
    isPlaying,
    speed,
    setSpeed,
    play,
    pause,
    togglePlay,
    nextStep,
    prevStep,
    reset,
    jumpToStep,
    isAtStart,
    isAtEnd,
    progress,
    totalSteps: steps.length
  };
}
