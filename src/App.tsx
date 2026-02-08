import './styles/tokens.css';
import { ConstrainedWorkspace } from './pages/ConstrainedWorkspace';
import { InteractionModeProvider, type InteractionMode } from './contexts/InteractionModeContext';

function getInteractionMode(): InteractionMode {
  const path = window.location.pathname;
  if (path === '/option-b') return 'system';
  // Default: /option-a or any other path
  return 'contextual';
}

function App() {
  const mode = getInteractionMode();

  return (
    <InteractionModeProvider mode={mode}>
      <ConstrainedWorkspace />
    </InteractionModeProvider>
  );
}

export default App;
