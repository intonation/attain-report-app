import { useState, useEffect, useRef } from 'react';
import {
  GeneratedAnalysisIcon,
  GeneratedTablesIcon,
  PriorArtIcon,
  AllCasesIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  OpenMenuIcon,
  CloseMenuIcon,
} from '../icons';
import { SidebarSection } from './SidebarSection';
import { useTheme } from '../../contexts/ThemeContext';
import AttainLogoLight from '../../assets/Attain-Logo-Light.svg';
import AttainLogoDark from '../../assets/Attain-Logo-Dark.svg';
import '../../styles/sidebar.css';

// Sun icon for light mode
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="3" />
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
  </svg>
);

// Moon icon for dark mode
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9.5A6 6 0 1 1 6.5 2 4.5 4.5 0 0 0 14 9.5Z" />
  </svg>
);

interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

// Workbench icon - grid of squares for feature/relationship analysis
const WorkbenchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="5" height="5" rx="1" />
    <rect x="9" y="2" width="5" height="5" rx="1" />
    <rect x="2" y="9" width="5" height="5" rx="1" />
    <rect x="9" y="9" width="5" height="5" rx="1" />
  </svg>
);

const generatedDocumentsItems: NavItem[] = [
  { id: 'executive-summary', label: 'Executive Summary', icon: <GeneratedAnalysisIcon /> },
  { id: 'scope-of-analysis', label: 'Scope of analysis', icon: <GeneratedAnalysisIcon /> },
  { id: 'strategic-review', label: 'Strategic Review', icon: <GeneratedAnalysisIcon /> },
  { id: 'claims', label: 'Claims', icon: <GeneratedAnalysisIcon /> },
  { id: 'summary-graves', label: 'Summary: Graves et al.', icon: <GeneratedAnalysisIcon /> },
  { id: 'claim-charts', label: 'Claim Charts', icon: <GeneratedTablesIcon /> },
  { id: 'workbench', label: 'Workbench', icon: <WorkbenchIcon /> },
];

const priorArtItems: NavItem[] = [
  { id: 'claims-on-file', label: 'Claims on File', icon: <PriorArtIcon /> },
  { id: 'patent-specification', label: 'Patent Specification', icon: <PriorArtIcon /> },
  { id: 'us-17-774-135-oa', label: 'US 17/774,135 OA', icon: <PriorArtIcon /> },
  { id: 'breuer-et-al', label: 'Breuer et al.: US 2015/0012204', icon: <PriorArtIcon /> },
  { id: 'graves-et-al', label: 'Graves et al.: US 2019/0329772 A1', icon: <PriorArtIcon /> },
];

interface SidebarProps {
  activeItem: string;
  onNavigate: (itemId: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Show emphasis animation on toggle button (first visit) */
  showEmphasis?: boolean;
  /** Callback when emphasis animation completes */
  onEmphasisComplete?: () => void;
  /** Hide workbench from navigation (for system mode) */
  hideWorkbench?: boolean;
}

export const Sidebar = ({
  activeItem,
  onNavigate,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  showEmphasis = false,
  onEmphasisComplete,
  hideWorkbench = false,
}: SidebarProps) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  // Filter out workbench if hideWorkbench is true
  const filteredDocumentItems = hideWorkbench
    ? generatedDocumentsItems.filter(item => item.id !== 'workbench')
    : generatedDocumentsItems;
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  // Initialize with the active item already marked as visited (it's the page we're on)
  const [visitedItemIds, setVisitedItemIds] = useState<Set<string>>(() => new Set([activeItem]));
  const hasAnimatedRef = useRef(false);
  const emphasisTimeoutRef = useRef<number | null>(null);

  // Mark animation as complete (called by first section after animation runs)
  const markAnimationComplete = () => {
    hasAnimatedRef.current = true;
  };

  // Handle emphasis animation timeout
  useEffect(() => {
    if (showEmphasis && onEmphasisComplete) {
      emphasisTimeoutRef.current = window.setTimeout(() => {
        onEmphasisComplete();
      }, 2000);
    }

    return () => {
      if (emphasisTimeoutRef.current) {
        clearTimeout(emphasisTimeoutRef.current);
      }
    };
  }, [showEmphasis, onEmphasisComplete]);

  // Use controlled state if provided, otherwise use internal state
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = (value: boolean) => {
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
        <img
          src={isDark ? AttainLogoDark : AttainLogoLight}
          alt="Attain Logo"
          className="sidebarLogoImg"
        />
        {!collapsed && <span className="sidebarLogoText">Acme Automotive</span>}
        <button
          className={`sidebarCollapseBtn ${showEmphasis ? 'sidebarCollapseBtn--emphasis' : ''}`}
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <OpenMenuIcon /> : <CloseMenuIcon />}
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
              startDelay={100}
              items={filteredDocumentItems}
              activeItem={activeItem}
              visitedItemIds={visitedItemIds}
              onNavigate={handleNavigate}
              skipAnimation={hasAnimatedRef.current}
              onAnimationComplete={markAnimationComplete}
            />

            <SidebarSection
              title="PRIOR ART"
              startDelay={500}
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
            <button className="sidebarBottomItem" onClick={toggleTheme}>
              {isDark ? <SunIcon /> : <MoonIcon />}
              <span>{isDark ? 'Light mode' : 'Dark mode'}</span>
            </button>
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
