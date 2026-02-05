import { useState, type ReactNode } from 'react';
import {
  GeneratedAnalysisIcon,
  GeneratedTablesIcon,
  PriorArtIcon,
  SidepanelIcon,
} from '../icons';
import { SidebarSection } from './SidebarSection';
import '../../styles/sidebar.css';

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

  if (collapsed) {
    return (
      <div className="sidebarContainer collapsed">
        <div className="sidebarLogo">
          <div className="sidebarLogoIcon">A</div>
        </div>
        <button
          className="sidebarCollapseBtn"
          onClick={() => setCollapsed(false)}
          aria-label="Expand sidebar"
        >
          <ExpandIcon />
        </button>
      </div>
    );
  }

  return (
    <div className="sidebarContainer">
      <div className="sidebarTopRow">
        <div className="sidebarLogo">
          <div className="sidebarLogoIcon">A</div>
          <span className="sidebarLogoText">Client name</span>
        </div>
        <button
          className="sidebarCollapseBtn"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse sidebar"
        >
          <SidepanelIcon />
        </button>
      </div>

      <SidebarSection
        title="GENERATED DOCUMENTS"
        startDelay={100}
        items={generatedDocumentsItems}
        activeItem={activeItem}
        visitedItemIds={visitedItemIds}
        onNavigate={handleNavigate}
      />

      <SidebarSection
        title="GENERATED TABLES"
        startDelay={400}
        items={generatedTableItems}
        activeItem={activeItem}
        visitedItemIds={visitedItemIds}
        onNavigate={handleNavigate}
      />

      <SidebarSection
        title="PRIOR ART"
        startDelay={700}
        items={priorArtItems}
        activeItem={activeItem}
        visitedItemIds={visitedItemIds}
        onNavigate={handleNavigate}
      />
    </div>
  );
};
