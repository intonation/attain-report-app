import './styles/tokens.css';
import { ConstrainedWorkspace } from './pages/ConstrainedWorkspace';
import { InteractionModeProvider, type InteractionMode } from './contexts/InteractionModeContext';
import { ThemeProvider } from './contexts/ThemeContext';

function getInteractionMode(): InteractionMode {
  const path = window.location.pathname;
  if (path === '/option-b') return 'system';
  // Default: /option-a or any other path
  return 'contextual';
}

function App() {
  const mode = getInteractionMode();

  return (
    <ThemeProvider>
      <InteractionModeProvider mode={mode}>
        <ConstrainedWorkspace />
      </InteractionModeProvider>
    </ThemeProvider>
  );
}

export default App;
