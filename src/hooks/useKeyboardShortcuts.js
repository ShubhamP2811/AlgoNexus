import { useEffect } from 'react';

/**
 * Registers keyboard navigation shortcuts when user is not focused on an input.
 */
export function useKeyboardShortcuts({
  onTogglePlay,
  onNext,
  onPrev,
  onReset,
  enabled = true
}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // Ignore if user is currently typing in an input or textarea
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (onTogglePlay) onTogglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        if (onNext) onNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        if (onPrev) onPrev();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        if (onReset) onReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTogglePlay, onNext, onPrev, onReset, enabled]);
}
