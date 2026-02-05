import { useState, useEffect, useRef } from 'react';

/**
 * Hook for typewriter text animation.
 * Returns the current text to display.
 */
export function useTypewriter(
  text: string,
  options: {
    enabled: boolean;
    charSpeed?: number;
    onComplete?: () => void;
  }
): { displayText: string; isComplete: boolean } {
  const { enabled, charSpeed = 18, onComplete } = options;
  const [charIndex, setCharIndex] = useState(enabled ? 0 : text.length);
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setCharIndex(text.length);
      return;
    }

    if (charIndex >= text.length) {
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onComplete?.();
      }
      return;
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, charSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, text.length, charSpeed, enabled, onComplete]);

  // Skip to end if disabled mid-animation
  useEffect(() => {
    if (!enabled && charIndex < text.length) {
      setCharIndex(text.length);
      if (!hasCalledComplete.current) {
        hasCalledComplete.current = true;
        onComplete?.();
      }
    }
  }, [enabled, charIndex, text.length, onComplete]);

  return {
    displayText: text.slice(0, charIndex),
    isComplete: charIndex >= text.length,
  };
}
