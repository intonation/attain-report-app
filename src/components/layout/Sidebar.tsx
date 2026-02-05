import { useState, type ReactNode } from 'react';
import {
  DocumentIcon,
  ChartIcon,
  ClipboardIcon,
  BookIcon,
  GridIcon,
  SearchIcon,
  LayersIcon,
  FileTextIcon,
  LinkIcon,
} from '../icons';
import { SidebarSection } from './SidebarSection';
import '../../styles/sidebar.css';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

const generatedAnalysisItems: NavItem[] = [
  { id: 'executive-summary', label: 'Executive Summary', icon: <DocumentIcon /> },
  { id: 'scope-of-analysis', label: 'Scope of Analysis', icon: <SearchIcon /> },
  { id: 'strategic-review', label: 'Strategic Review', icon: <ChartIcon /> },
  { id: 'claims', label: 'Claims', icon: <ClipboardIcon /> },
];

const generatedTableItems: NavItem[] = [
  { id: 'document', label: 'Document', icon: <FileTextIcon /> },
  { id: 'references', label: 'References', icon: <LinkIcon /> },
  { id: 'claims-chart', label: 'Claims chart', icon: <ChartIcon /> },
  { id: 'workbench', label: 'Workbench', icon: <GridIcon /> },
];

const priorArtItems: NavItem[] = [
  { id: 'documents-overview', label: 'Documents overview', icon: <LayersIcon /> },
  { id: 'patent-specification', label: 'Patent Specification', icon: <BookIcon /> },
  { id: 'prior-art-references', label: 'Prior art references', icon: <BookIcon /> },
];

// Collapse icon
const CollapseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExpandIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface SidebarProps {
  activeItem: string;
  onNavigate: (itemId: string) => void;
}

export const Sidebar = ({ activeItem, onNavigate }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

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
          <span className="sidebarLogoText">Attain</span>
        </div>
        <button
          className="sidebarCollapseBtn"
          onClick={() => setCollapsed(true)}
          aria-label="Collapse sidebar"
        >
          <CollapseIcon />
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
