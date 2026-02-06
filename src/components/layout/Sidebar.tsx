import { useState, useEffect, useRef } from 'react';
import {
  GeneratedAnalysisIcon,
  GeneratedTablesIcon,
  PriorArtIcon,
  SidepanelIcon,
  AllCasesIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
} from '../icons';
import { SidebarSection } from './SidebarSection';
import '../../styles/sidebar.css';

// Logo icon component based on Logo.svg
const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.48959 18.2483H4.15448L3.51961 19.7186C3.3117 20.2086 3.20775 20.6133 3.20775 20.9326C3.20775 21.3558 3.37853 21.6677 3.7201 21.8682C3.92058 21.987 4.41437 22.0761 5.20146 22.1355V22.5476H0.178208V22.1355C0.720259 22.0538 1.16578 21.8311 1.51477 21.4672C1.86376 21.096 2.29443 20.3349 2.80678 19.1839L8.20872 7.13259H8.42034L13.8668 19.5181C14.3866 20.6913 14.8136 21.4301 15.1477 21.7345C15.4002 21.9647 15.7566 22.0984 16.217 22.1355V22.5476H8.91042V22.1355H9.21114C9.79775 22.1355 10.2099 22.0538 10.4475 21.8905C10.6108 21.7717 10.6925 21.6009 10.6925 21.3781C10.6925 21.2445 10.6702 21.1071 10.6257 20.966C10.6108 20.8992 10.4994 20.6207 10.2915 20.1307L9.48959 18.2483ZM9.1109 17.4241L6.86102 12.2227L4.54431 17.4241H9.1109Z" fill="black"/>
    <rect x="15.05" y="6.08589" width="11.9" height="7" fill="white" stroke="#A13838" strokeWidth="2.1"/>
  </svg>
);

const COLLAPSE_BREAKPOINT = 1200;

interface NavItem {
  id: string;
  label: string;
}

const generatedDocumentsItems: NavItem[] = [
  { id: 'executive-summary', label: 'Executive Summary' },
  { id: 'scope-of-analysis', label: 'Scope of analysis' },
  { id: 'strategic-review', label: 'Strategic Review' },
  { id: 'claims', label: 'Claims' },
  { id: 'summary-graves', label: 'Summary: Graves et al.: US 2019/0329772 A1' },
];

const generatedTableItems: NavItem[] = [
  { id: 'claim-charts', label: 'Claim Charts' },
  { id: 'documents-overview', label: 'Documents Overview' },
];

const priorArtItems: NavItem[] = [
  { id: 'claims-on-file', label: 'Claims on File' },
  { id: 'patent-specification', label: 'Patent Specification' },
  { id: 'us-17-774-135-oa', label: 'US 17/774,135 OA' },
  { id: 'breuer-et-al', label: 'Breuer et al.: US 2015/0012204' },
  { id: 'graves-et-al', label: 'Graves et al.: US 2019/0329772 A1' },
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
  // Initialize with the active item already marked as visited (it's the page we're on)
  const [visitedItemIds, setVisitedItemIds] = useState<Set<string>>(() => new Set([activeItem]));
  const userToggledRef = useRef(false);
  const hasAnimatedRef = useRef(false);
  const isInitialLoadRef = useRef(true);

  // Mark animation as complete (called by first section after animation runs)
  const markAnimationComplete = () => {
    hasAnimatedRef.current = true;
    // After animation completes, allow responsive collapse
    isInitialLoadRef.current = false;
  };

  // Responsive collapse based on viewport width (only after initial load)
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${COLLAPSE_BREAKPOINT}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // Skip auto-collapse on initial load - always show expanded first
      if (isInitialLoadRef.current) {
        return;
      }
      // Only auto-collapse if user hasn't manually toggled
      if (!userToggledRef.current) {
        if (onCollapsedChange) {
          onCollapsedChange(e.matches);
        } else {
          setInternalCollapsed(e.matches);
        }
      }
    };

    // Listen for changes (don't check initial state - we want expanded on load)
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
      <div className="sidebarLogo">
        <LogoIcon />
        {!collapsed && <span className="sidebarLogoText">Acme Automotive</span>}
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
        <>
          <div className="sidebarContent">
            {/* All cases link */}
            <button
              className="sidebarBottomItem"
              style={{ marginBottom: 'var(--space-4)' }}
            >
              <AllCasesIcon />
              <span>All cases</span>
            </button>

            <SidebarSection
              title="GENERATED DOCUMENTS"
              sectionIcon={<GeneratedAnalysisIcon />}
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
              sectionIcon={<GeneratedTablesIcon />}
              startDelay={400}
              items={generatedTableItems}
              activeItem={activeItem}
              visitedItemIds={visitedItemIds}
              onNavigate={handleNavigate}
              skipAnimation={hasAnimatedRef.current}
            />

            <SidebarSection
              title="PRIOR ART"
              sectionIcon={<PriorArtIcon />}
              startDelay={700}
              items={priorArtItems}
              activeItem={activeItem}
              visitedItemIds={visitedItemIds}
              onNavigate={handleNavigate}
              skipAnimation={hasAnimatedRef.current}
              defaultCollapsed={true}
            />
          </div>

          {/* Bottom navigation */}
          <div className="sidebarBottom">
            <button className="sidebarBottomItem">
              <UsersIcon />
              <span>Invite users</span>
            </button>
            <button className="sidebarBottomItem">
              <SettingsIcon />
              <span>Settings</span>
            </button>
            <button className="sidebarBottomItem">
              <LogOutIcon />
              <span>Sign out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};
