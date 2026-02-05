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

const generatedAnalysisItems: NavItem[] = [
  { id: 'executive-summary', label: 'Executive Summary', icon: <GeneratedAnalysisIcon /> },
  { id: 'scope-of-analysis', label: 'Scope of Analysis', icon: <GeneratedAnalysisIcon /> },
  { id: 'strategic-review', label: 'Strategic Review', icon: <GeneratedAnalysisIcon /> },
  { id: 'claims', label: 'Claims', icon: <GeneratedAnalysisIcon /> },
];

const generatedTableItems: NavItem[] = [
  { id: 'document', label: 'Document', icon: <GeneratedTablesIcon /> },
  { id: 'references', label: 'References', icon: <GeneratedTablesIcon /> },
  { id: 'claims-chart', label: 'Claims chart', icon: <GeneratedTablesIcon /> },
  { id: 'workbench', label: 'Workbench', icon: <GeneratedTablesIcon /> },
];

const priorArtItems: NavItem[] = [
  { id: 'documents-overview', label: 'Documents overview', icon: <PriorArtIcon /> },
  { id: 'patent-specification', label: 'Patent Specification', icon: <PriorArtIcon /> },
  { id: 'prior-art-references', label: 'Prior art references', icon: <PriorArtIcon /> },
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

  // Use controlled state if provided, otherwise use internal state
  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = (value: boolean) => {
    if (onCollapsedChange) {
      onCollapsedChange(value);
    } else {
      setInternalCollapsed(value);
    }
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
        title="GENERATED ANALYSIS"
        startDelay={100}
        items={generatedAnalysisItems}
        activeItem={activeItem}
        onNavigate={onNavigate}
      />

      <SidebarSection
        title="GENERATED TABLES"
        startDelay={400}
        items={generatedTableItems}
        activeItem={activeItem}
        onNavigate={onNavigate}
      />

      <SidebarSection
        title="PRIOR ART"
        startDelay={700}
        items={priorArtItems}
        activeItem={activeItem}
        onNavigate={onNavigate}
      />
    </div>
  );
};
