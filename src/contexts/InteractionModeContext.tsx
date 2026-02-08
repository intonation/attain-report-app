import { createContext, useContext, type ReactNode } from 'react';

export type InteractionMode = 'contextual' | 'system';

const InteractionModeContext = createContext<InteractionMode>('contextual');

interface InteractionModeProviderProps {
  mode: InteractionMode;
  children: ReactNode;
}

export function InteractionModeProvider({ mode, children }: InteractionModeProviderProps) {
  return (
    <InteractionModeContext.Provider value={mode}>
      {children}
    </InteractionModeContext.Provider>
  );
}

export function useInteractionMode(): InteractionMode {
  return useContext(InteractionModeContext);
}
