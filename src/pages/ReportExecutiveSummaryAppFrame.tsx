import { useState, useEffect, useRef } from 'react';
import { Toolbar } from '../components/layout/Toolbar';
import { PaneHeader } from '../components/layout/PaneHeader';
import { Sidebar } from '../components/layout/Sidebar';
import { ClaimCard } from '../components/ClaimCard';
import { InspectPanel } from '../components/InspectPanel';
import { ClaimsChartTable } from '../components/ClaimsChartTable';
import { ClaimDetailPanel } from '../components/ClaimDetailPanel';
import { DocumentViewer } from '../components/DocumentViewer';
import { reportData, claimsData, claimChartData } from '../data/mockData';
import type { ClaimChartRow } from '../data/mockData';

// Navigation items that should trigger full-width mode (sidebar collapsed)
const FULL_WIDTH_NAV_ITEMS = ['claim-charts', 'workbench'];

// Breakpoint at which we auto-collapse sidebar when inspect panel opens
const INSPECT_COLLAPSE_BREAKPOINT = 1400;

// Document items for dropdown selector
const DOCUMENT_ITEMS = [
  { id: 'executive-summary', label: 'Executive Summary' },
  { id: 'scope-of-analysis', label: 'Scope of analysis' },
  { id: 'strategic-review', label: 'Strategic Review' },
  { id: 'claims', label: 'Claims' },
  { id: 'summary-graves', label: 'Summary: Graves et al.' },
];

export const ReportExecutiveSummaryAppFrame = () => {
  const [activeNavItem, setActiveNavItem] = useState('executive-summary');
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [inspectClaimNumber, setInspectClaimNumber] = useState<number>(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSplitView, setIsSplitView] = useState(false);
  const [rightPaneDocId, setRightPaneDocId] = useState('executive-summary');

  // Claims chart row selection state
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(undefined);
  const [detailRow, setDetailRow] = useState<ClaimChartRow | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

  // Document viewer state
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);
  const [viewerCitation, setViewerCitation] = useState<string>('');

  const mainScrollRef = useRef<HTMLDivElement>(null);
  const rightPaneScrollRef = useRef<HTMLDivElement>(null);
  const userToggledSidebarRef = useRef(false);
  const isInitialLoadRef = useRef(true);
  const wasCollapsedByInspectRef = useRef(false);

  // Auto-collapse sidebar for full-width pages
  useEffect(() => {
    if (FULL_WIDTH_NAV_ITEMS.includes(activeNavItem)) {
      setSidebarCollapsed(true);
    }
  }, [activeNavItem]);

  // Reset scroll position on navigation (scroll main container, not window)
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [activeNavItem]);

  // Auto-collapse/expand sidebar based on inspect panel, detail panel, or split view state and viewport width
  useEffect(() => {
    // Never auto-collapse on initial load
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

    // Don't auto-adjust if user has manually toggled sidebar
    if (userToggledSidebarRef.current) {
      return;
    }

    const isNarrow = window.innerWidth < INSPECT_COLLAPSE_BREAKPOINT;
    const needsMoreSpace = isInspectOpen || isSplitView || isDetailPanelOpen || isDocumentViewerOpen;

    if (needsMoreSpace && isNarrow && !sidebarCollapsed) {
      // Collapse sidebar when any right panel opens and viewport is narrow
      wasCollapsedByInspectRef.current = true;
      setSidebarCollapsed(true);
    } else if (!needsMoreSpace && wasCollapsedByInspectRef.current) {
      // Re-expand sidebar when all panels are closed (if we collapsed it)
      wasCollapsedByInspectRef.current = false;
      setSidebarCollapsed(false);
    }
  }, [isInspectOpen, isSplitView, isDetailPanelOpen, isDocumentViewerOpen, sidebarCollapsed]);

  const handleInspectClaim = (claimNumber: number) => {
    setInspectClaimNumber(claimNumber);
    setIsInspectOpen(true);
    // Close split view when opening inspect
    setIsSplitView(false);
  };

  const handleSidebarCollapsedChange = (collapsed: boolean) => {
    // Mark that user has manually toggled
    userToggledSidebarRef.current = true;
    wasCollapsedByInspectRef.current = false;
    setSidebarCollapsed(collapsed);
  };

  const handleNavigate = (itemId: string) => {
    setActiveNavItem(itemId);
  };

  const handleLeftPaneDocumentSelect = (id: string) => {
    setActiveNavItem(id);
  };

  const handleRightPaneDocumentSelect = (id: string) => {
    setRightPaneDocId(id);
  };

  const handleSplit = () => {
    setIsSplitView(true);
    setIsInspectOpen(false); // Close inspect when opening split view
    // Set right pane to a different document if possible
    const otherDoc = DOCUMENT_ITEMS.find(d => d.id !== activeNavItem);
    if (otherDoc) {
      setRightPaneDocId(otherDoc.id);
    }
  };

  const handleCloseSplitView = () => {
    setIsSplitView(false);
  };

  // Handle row click from claims chart - open detail panel
  const handleRowClick = (row: ClaimChartRow) => {
    setDetailRow(row);
    setSelectedRowId(row.claimId);
    setIsDetailPanelOpen(true);
    // Close other panels
    setIsSplitView(false);
    setIsInspectOpen(false);
  };

  // Handle closing the detail panel
  const handleDetailPanelClose = () => {
    setDetailRow(null);
    setSelectedRowId(undefined);
    setIsDetailPanelOpen(false);
  };

  // Handle citation click - open document viewer
  const handleCitationClick = (citation: string) => {
    setViewerCitation(citation);
    setIsDocumentViewerOpen(true);
    // Close other panels
    setIsDetailPanelOpen(false);
    setIsInspectOpen(false);
    setIsSplitView(false);
  };

  // Handle closing the document viewer
  const handleDocumentViewerClose = () => {
    setIsDocumentViewerOpen(false);
    setViewerCitation('');
  };

  // Get document title by id
  const getDocTitle = (docId: string) =>
    DOCUMENT_ITEMS.find(d => d.id === docId)?.label || 'Executive Summary';

  // Get current document titles
  const leftPaneDocTitle = getDocTitle(activeNavItem);
  const rightPaneDocTitle = getDocTitle(rightPaneDocId);

  // isFullWidth can be used for future full-width mode handling
  void FULL_WIDTH_NAV_ITEMS.includes(activeNavItem);

  // Header styles (Minor third scale: 14px base × 1.2⁴ = 29px for h1)
  const titleStyles: React.CSSProperties = {
    fontSize: '29px',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-2)',
    fontFamily: 'times',
  };

  const summaryStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-small)',
    lineHeight: 'var(--line-height-body)',
    color: 'var(--color-text)',
    marginBottom: 'var(--space-8)',
  };

  // Minor third scale: 14px base × 1.2³ = 24px for h2
  const sectionHeadingStyles: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-5)',
    fontFamily: 'times',
  };

  // Render document content based on document ID
  const renderDocumentContent = (docId: string) => {
    // Claim Charts page - render interactive table
    if (docId === 'claim-charts') {
      return (
        <div style={{ width: '100%' }}>
          {claimChartData.map((chart) => (
            <ClaimsChartTable
              key={chart.claimNumber}
              chart={chart}
              selectedRowId={selectedRowId}
              onRowClick={handleRowClick}
              onCitationClick={handleCitationClick}
            />
          ))}
        </div>
      );
    }

    // Workbench placeholder
    if (docId === 'workbench') {
      const placeholderStyles: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        color: 'var(--color-text-muted)',
      };

      return (
        <div style={placeholderStyles}>
          <h2 style={{ ...titleStyles, marginBottom: 'var(--space-4)' }}>
            Workbench
          </h2>
          <p style={{ fontSize: 'var(--font-size-small)' }}>
            Full-width table view placeholder
          </p>
        </div>
      );
    }

    // Main content styles
    const mainContentStyles: React.CSSProperties = {
      maxWidth: 'var(--main-content-max-width)',
    };

    return (
      <div style={mainContentStyles} className="contentMount">
        {/* Header Area */}
        <header>
          <h1 style={titleStyles}>{reportData.title}</h1>
          <div style={summaryStyles}>
            {reportData.summary.split('\n\n').map((paragraph, index) => (
              <p key={index} style={{ marginBottom: 'var(--space-4)' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </header>

        {/* Independent Claims Section */}
        <section>
          <h2 style={sectionHeadingStyles}>Independent claims</h2>
          {claimsData.map((claim) => (
            <ClaimCard
              key={claim.claimNumber}
              claim={claim}
              onInspect={handleInspectClaim}
            />
          ))}
        </section>
      </div>
    );
  };

  return (
    <div className="appShell appShell--withSidebarTop">
      {/* Left Sidebar - full height */}
      <div className={`appShell__sidebar ${sidebarCollapsed ? 'appShell__sidebar--collapsed' : 'appShell__sidebar--expanded'}`}>
        <Sidebar
          activeItem={activeNavItem}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onCollapsedChange={handleSidebarCollapsedChange}
        />
      </div>

      {/* Main area (toolbar + workspace) */}
      <div className="appShell__main">
        {/* Top Toolbar */}
        <Toolbar
          applicationNumber="US 17/174,123"
          applicationTitle="Adaptive Cruise Control with Predictive Headway Management"
          version="v0.1"
        />

        {/* Workspace area with panes */}
        <div className="appShell__workspace">
          {/* Left Pane - Document content */}
          <div className="appShell__pane">
            <PaneHeader
              title={leftPaneDocTitle}
              items={DOCUMENT_ITEMS}
              selectedId={activeNavItem}
              onSelect={handleLeftPaneDocumentSelect}
              onSplit={handleSplit}
              showNavigation={true}
              showKebab={true}
              showSplit={!isSplitView}
            />
            <div className="appShell__paneContent" ref={mainScrollRef}>
              {renderDocumentContent(activeNavItem)}
            </div>
          </div>

          {/* Right Pane - Split View (second document) */}
          {isSplitView && (
            <div className="appShell__pane">
              <PaneHeader
                title={rightPaneDocTitle}
                items={DOCUMENT_ITEMS}
                selectedId={rightPaneDocId}
                onSelect={handleRightPaneDocumentSelect}
                onSplit={handleCloseSplitView}
                showNavigation={true}
                showKebab={true}
                showSplit={true}
              />
              <div className="appShell__paneContent" ref={rightPaneScrollRef}>
                {renderDocumentContent(rightPaneDocId)}
              </div>
            </div>
          )}

          {/* Right Pane - Inspect Panel */}
          {isInspectOpen && !isSplitView && !isDetailPanelOpen && !isDocumentViewerOpen && (
            <div className="appShell__inspectPane">
              <PaneHeader
                title={leftPaneDocTitle}
                items={DOCUMENT_ITEMS}
                selectedId={activeNavItem}
                onSelect={handleLeftPaneDocumentSelect}
                showNavigation={true}
                showKebab={true}
                showSplit={false}
              />
              <InspectPanel
                onClose={() => setIsInspectOpen(false)}
                claimNumber={inspectClaimNumber}
                embedded={true}
              />
            </div>
          )}

          {/* Right Pane - Claim Detail Panel (for claim chart row selection) */}
          {isDetailPanelOpen && !isSplitView && !isDocumentViewerOpen && (
            <div className="appShell__inspectPane">
              <ClaimDetailPanel
                row={detailRow}
                onClose={handleDetailPanelClose}
              />
            </div>
          )}

          {/* Right Pane - Document Viewer (for citation clicks) */}
          {isDocumentViewerOpen && !isSplitView && (
            <div className="appShell__inspectPane">
              <DocumentViewer
                citation={viewerCitation}
                onClose={handleDocumentViewerClose}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportExecutiveSummaryAppFrame;
