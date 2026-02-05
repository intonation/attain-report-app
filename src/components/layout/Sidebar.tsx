import { useState, useEffect, useRef, type ReactNode } from 'react';
import {
  GeneratedAnalysisIcon,
  GeneratedTablesIcon,
  PriorArtIcon,
  SidepanelIcon,
} from '../icons';
import { SidebarSection } from './SidebarSection';
import '../../styles/sidebar.css';

const COLLAPSE_BREAKPOINT = 1200;

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

const generatedDocumentsItems: NavItem[] = [
  { id: 'executive-summary', label: 'Executive Summary', icon: <GeneratedAnalysisIcon /> },
  { id: 'scope-of-analysis', label: 'Scope of analysis', icon: <GeneratedAnalysisIcon /> },
  { id: 'strategic-review', label: 'Strategic Review', icon: <GeneratedAnalysisIcon /> },
  { id: 'claims', label: 'Claims', icon: <GeneratedAnalysisIcon /> },
  { id: 'summary-graves', label: 'Summary: Graves et al.: US 2019/0329772 A1', icon: <GeneratedAnalysisIcon /> },
];

const generatedTableItems: NavItem[] = [
  { id: 'claim-charts', label: 'Claim Charts', icon: <GeneratedTablesIcon /> },
  { id: 'workbench', label: 'Workbench', icon: <GeneratedTablesIcon /> },
  { id: 'documents-overview', label: 'Documents Overview', icon: <GeneratedTablesIcon /> },
];

const priorArtItems: NavItem[] = [
  { id: 'claims-on-file', label: 'Claims on File', icon: <PriorArtIcon /> },
  { id: 'patent-specification', label: 'Patent Specification', icon: <PriorArtIcon /> },
  { id: 'us-17-774-135-oa', label: 'US 17/774,135 OA', icon: <PriorArtIcon /> },
  { id: 'breuer-et-al', label: 'Breuer et al.: US 2015/0012204', icon: <PriorArtIcon /> },
  { id: 'graves-et-al', label: 'Graves et al.: US 2019/0329772 A1', icon: <PriorArtIcon /> },
];

const ExpandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface SidebarProps {
  activeItem: string;
  onNavigate: (itemId: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const Sidebar = ({
  activeItem,
  onNavigate,
  collapsed: controlledCollapsed,
  onCollapsedChange,
}: SidebarProps) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [visitedItemIds, setVisitedItemIds] = useState<Set<string>>(new Set());
  const userToggledRef = useRef(false);
  const hasAnimatedRef = useRef(false);

  // Mark animation as complete (called by first section after animation runs)
  const markAnimationComplete = () => {
    hasAnimatedRef.current = true;
  };

  // Responsive collapse based on viewport width
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${COLLAPSE_BREAKPOINT}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // Only auto-collapse if user hasn't manually toggled
      if (!userToggledRef.current) {
        if (onCollapsedChange) {
          onCollapsedChange(e.matches);
        } else {
          setInternalCollapsed(e.matches);
        }
      }
    };

    // Check initial state
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [onCollapsedChange]);

  // Use controlled state if provided, otherwise use internal state
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = (value: boolean) => {
    // Mark that user has manually toggled
    userToggledRef.current = true;
    if (onCollapsedChange) {
      onCollapsedChange(value);
    } else {
      setInternalCollapsed(value);
    }
  };

  // Handle navigation and mark item as visited
  const handleNavigate = (itemId: string) => {
    setVisitedItemIds((prev) => new Set(prev).add(itemId));
    onNavigate(itemId);
  };

  return (
    <div className={`sidebarContainer ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebarTopRow">
        <div className="sidebarLogo">
          <div className="sidebarLogoIcon">A</div>
          {!collapsed && <span className="sidebarLogoText">Client name</span>}
        </div>
        <button
          className="sidebarCollapseBtn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ExpandIcon /> : <SidepanelIcon />}
        </button>
      </div>

      {/* Only render menu content when not collapsed */}
      {!collapsed && (
        <div className="sidebarContent">
          <SidebarSection
            title="GENERATED DOCUMENTS"
            startDelay={100}
            items={generatedDocumentsItems}
            activeItem={activeItem}
            visitedItemIds={visitedItemIds}
            onNavigate={handleNavigate}
            skipAnimation={hasAnimatedRef.current}
            onAnimationComplete={markAnimationComplete}
          />

          <SidebarSection
            title="GENERATED TABLES"
            startDelay={400}
            items={generatedTableItems}
            activeItem={activeItem}
            visitedItemIds={visitedItemIds}
            onNavigate={handleNavigate}
            skipAnimation={hasAnimatedRef.current}
          />

          <SidebarSection
            title="PRIOR ART"
            startDelay={700}
            items={priorArtItems}
            activeItem={activeItem}
            visitedItemIds={visitedItemIds}
            onNavigate={handleNavigate}
            skipAnimation={hasAnimatedRef.current}
          />
        </div>
      )}
    </div>
  );
};
