import { useState, useEffect, useCallback, useRef } from 'react';

const BREAKPOINT = 992;
const STORAGE_KEY_OPEN = 'sidebarOpen';
const STORAGE_KEY_FIRST_VISIT = 'sidebarFirstVisit';

interface UseResponsiveSidebarOptions {
  /** Initial collapsed state before localStorage check */
  defaultCollapsed?: boolean;
}

interface UseResponsiveSidebarReturn {
  /** Whether sidebar is collapsed */
  collapsed: boolean;
  /** Toggle or set collapsed state */
  setCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
  /** Whether to show first-load emphasis animation */
  showEmphasis: boolean;
  /** Call when emphasis animation completes */
  onEmphasisComplete: () => void;
  /** Whether we're above the breakpoint */
  isWideScreen: boolean;
}

/**
 * Hook for responsive sidebar behavior with breakpoint-based auto-collapse,
 * user state memory, and first-load emphasis.
 */
export function useResponsiveSidebar(
  options: UseResponsiveSidebarOptions = {}
): UseResponsiveSidebarReturn {
  const { defaultCollapsed = false } = options;

  // Track if we've initialized from localStorage
  const initializedRef = useRef(false);
  // Track the previous breakpoint state to detect crossings
  const wasWideRef = useRef<boolean | null>(null);
  // Track if user has manually toggled in this session
  const userToggledRef = useRef(false);

  // Initialize state
  const [collapsed, setCollapsedState] = useState(defaultCollapsed);
  const [showEmphasis, setShowEmphasis] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(true);

  // Initialize on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const isWide = window.innerWidth >= BREAKPOINT;
    setIsWideScreen(isWide);
    wasWideRef.current = isWide;

    if (isWide) {
      // Wide screen: check localStorage preference
      const storedPref = localStorage.getItem(STORAGE_KEY_OPEN);
      if (storedPref !== null) {
        // Restore stored preference (stored as "open" state, so invert for collapsed)
        setCollapsedState(storedPref !== 'true');
      } else {
        // No stored preference: default to open
        setCollapsedState(false);
      }

      // Check if this is first visit for emphasis
      const hasVisited = localStorage.getItem(STORAGE_KEY_FIRST_VISIT);
      if (!hasVisited) {
        setShowEmphasis(true);
      }
    } else {
      // Narrow screen: force collapsed
      setCollapsedState(true);
    }
  }, []);

  // Handle window resize - only trigger on breakpoint crossing
  useEffect(() => {
    const handleResize = () => {
      const isWide = window.innerWidth >= BREAKPOINT;

      // Only act if we're crossing the breakpoint
      if (wasWideRef.current !== null && wasWideRef.current !== isWide) {
        setIsWideScreen(isWide);

        if (isWide) {
          // Crossed to wide: restore preference or default open
          const storedPref = localStorage.getItem(STORAGE_KEY_OPEN);
          if (storedPref !== null) {
            setCollapsedState(storedPref !== 'true');
          } else {
            setCollapsedState(false);
          }
          // Reset user toggle tracking when crossing to wide
          userToggledRef.current = false;
        } else {
          // Crossed to narrow: force collapsed
          setCollapsedState(true);
        }
      }

      wasWideRef.current = isWide;
    };

    // Use resize event with debounce to avoid excessive calls
    let timeoutId: number;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // User toggle handler - saves preference to localStorage
  const setCollapsed = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    setCollapsedState((prev) => {
      const newValue = typeof value === 'function' ? value(prev) : value;

      // Only save preference if we're on a wide screen
      if (window.innerWidth >= BREAKPOINT) {
        userToggledRef.current = true;
        // Store as "open" state (inverted from collapsed)
        localStorage.setItem(STORAGE_KEY_OPEN, String(!newValue));
      }

      return newValue;
    });
  }, []);

  // Handler for when emphasis animation completes
  const onEmphasisComplete = useCallback(() => {
    setShowEmphasis(false);
    localStorage.setItem(STORAGE_KEY_FIRST_VISIT, 'true');
  }, []);

  return {
    collapsed,
    setCollapsed,
    showEmphasis,
    onEmphasisComplete,
    isWideScreen,
  };
}
