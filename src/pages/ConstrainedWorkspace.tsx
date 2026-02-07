import { useState, useEffect, useRef, useCallback } from 'react';
import { Toolbar } from '../components/layout/Toolbar';
import { PaneHeader } from '../components/layout/PaneHeader';
import { Sidebar } from '../components/layout/Sidebar';
import { ClaimCard } from '../components/ClaimCard';
import { ClaimsChartTable } from '../components/ClaimsChartTable';
import { ClaimDetailPanel } from '../components/ClaimDetailPanel';
import { DocumentViewer } from '../components/DocumentViewer';
import { ResizeHandle } from '../components/ResizeHandle';
import { reportData, claimsData, claimChartData } from '../data/mockData';
import type { ClaimChartRow } from '../data/mockData';

// Breakpoint for responsive sidebar collapse/expand
const SIDEBAR_COLLAPSE_BREAKPOINT = 1200;

// Panel size constraints
const SIDEBAR_MIN_WIDTH = 200;
const SIDEBAR_MAX_WIDTH = 400;
const SIDEBAR_DEFAULT_WIDTH = 280;
const SIDE_PANEL_MIN_WIDTH = 320;
const SIDE_PANEL_MAX_WIDTH = 600;
const SIDE_PANEL_DEFAULT_WIDTH = 480;

// All document items available in sidebar and split view dropdown
const DOCUMENT_ITEMS = [
  { id: 'executive-summary', label: 'Executive Summary' },
  { id: 'scope-of-analysis', label: 'Scope of analysis' },
  { id: 'strategic-review', label: 'Strategic Review' },
  { id: 'claims', label: 'Claims' },
  { id: 'summary-graves', label: 'Summary: Graves et al.' },
  { id: 'claim-charts', label: 'Claim Charts' },
  { id: 'documents-overview', label: 'Documents Overview' },
];

export const ConstrainedWorkspace = () => {
  const [activeNavItem, setActiveNavItem] = useState('executive-summary');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSplitView, setIsSplitView] = useState(false);
  const [rightPaneDocId, setRightPaneDocId] = useState('scope-of-analysis');

  // Claims chart row selection state
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(undefined);
  const [detailRow, setDetailRow] = useState<ClaimChartRow | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

  // Document viewer state
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);
  const [viewerCitation, setViewerCitation] = useState<string>('');

  // Navigation history for back/forward
  const [navHistory, setNavHistory] = useState<string[]>(['executive-summary']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Resizable panel widths
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH);
  const [sidePanelWidth, setSidePanelWidth] = useState(SIDE_PANEL_DEFAULT_WIDTH);
  const [documentViewerWidth, setDocumentViewerWidth] = useState(SIDE_PANEL_DEFAULT_WIDTH);

  const mainScrollRef = useRef<HTMLDivElement>(null);
  const rightPaneScrollRef = useRef<HTMLDivElement>(null);
  const userToggledSidebarRef = useRef(false);

  // Responsive sidebar collapse/expand based on viewport width
  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${SIDEBAR_COLLAPSE_BREAKPOINT}px)`);

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      // Only auto-collapse/expand if user hasn't manually toggled
      if (!userToggledSidebarRef.current) {
        setSidebarCollapsed(e.matches);
      }
    };

    // Set initial state based on viewport
    handleChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Reset scroll position on navigation
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [activeNavItem]);

  // Canonical handler: navigate to claim-charts and select a specific row
  const goToClaimChartRow = (claimNumber: number) => {
    handleNavigate('claim-charts');

    // Find the first row matching this claim number (claimChartData uses "Claim N" format)
    const claimLabel = `Claim ${claimNumber}`;
    const matchingChart = claimChartData.find(chart => chart.claimNumber === claimLabel);
    if (matchingChart && matchingChart.rows.length > 0) {
      const firstRow = matchingChart.rows[0];
      setSelectedRowId(firstRow.claimId);
      setDetailRow(firstRow);
      setIsDetailPanelOpen(true);
      setIsSplitView(false);
    }
  };

  const handleSidebarCollapsedChange = (collapsed: boolean) => {
    userToggledSidebarRef.current = true;
    setSidebarCollapsed(collapsed);
  };

  // Navigate via sidebar - this is the primary navigation
  const handleNavigate = (itemId: string) => {
    // Add to history
    const newHistory = navHistory.slice(0, historyIndex + 1);
    newHistory.push(itemId);
    setNavHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActiveNavItem(itemId);
  };

  // Handle split view left pane document select (only in split view)
  const handleLeftPaneDocumentSelect = (id: string) => {
    setActiveNavItem(id);
  };

  // Handle split view right pane document select
  const handleRightPaneDocumentSelect = (id: string) => {
    setRightPaneDocId(id);
  };

  // Toggle split view from toolbar
  const handleSplitToggle = () => {
    if (isSplitView) {
      setIsSplitView(false);
    } else {
      setIsSplitView(true);
      setIsDetailPanelOpen(false);
      setIsDocumentViewerOpen(false);
      // Set right pane to a different document
      const otherDoc = DOCUMENT_ITEMS.find(d => d.id !== activeNavItem);
      if (otherDoc) {
        setRightPaneDocId(otherDoc.id);
      }
    }
  };

  // History navigation
  const handlePrevious = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setActiveNavItem(navHistory[newIndex]);
    }
  };

  const handleNext = () => {
    if (historyIndex < navHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setActiveNavItem(navHistory[newIndex]);
    }
  };

  // Handle row click from claims chart
  const handleRowClick = (row: ClaimChartRow) => {
    setDetailRow(row);
    setSelectedRowId(row.claimId);
    setIsDetailPanelOpen(true);
    setIsSplitView(false);
  };

  const handleDetailPanelClose = () => {
    setDetailRow(null);
    setSelectedRowId(undefined);
    setIsDetailPanelOpen(false);
  };

  const handleCitationClick = (citation: string) => {
    setViewerCitation(citation);
    setIsDocumentViewerOpen(true);
    setIsSplitView(false);
  };

  const handleDocumentViewerClose = () => {
    setIsDocumentViewerOpen(false);
    setViewerCitation('');
  };

  // Resize handlers
  const handleSidebarResize = useCallback((delta: number) => {
    setSidebarWidth(prev => {
      const newWidth = prev + delta;
      return Math.min(Math.max(newWidth, SIDEBAR_MIN_WIDTH), SIDEBAR_MAX_WIDTH);
    });
  }, []);

  const handleSidePanelResize = useCallback((delta: number) => {
    setSidePanelWidth(prev => {
      const newWidth = prev + delta; // Drag left = increase width
      return Math.min(Math.max(newWidth, SIDE_PANEL_MIN_WIDTH), SIDE_PANEL_MAX_WIDTH);
    });
  }, []);

  const handleDocumentViewerResize = useCallback((delta: number) => {
    setDocumentViewerWidth(prev => {
      const newWidth = prev + delta; // Drag left = increase width
      return Math.min(Math.max(newWidth, SIDE_PANEL_MIN_WIDTH), SIDE_PANEL_MAX_WIDTH);
    });
  }, []);

  // Get document title by id
  const getDocTitle = (docId: string) =>
    DOCUMENT_ITEMS.find(d => d.id === docId)?.label || 'Executive Summary';

  const leftPaneDocTitle = getDocTitle(activeNavItem);
  const rightPaneDocTitle = getDocTitle(rightPaneDocId);

  // Shared styles
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

  const sectionHeadingStyles: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-5)',
    fontFamily: 'times',
  };

  const mainContentStyles: React.CSSProperties = {
    maxWidth: 'var(--main-content-max-width)',
    margin: '0 auto',
  };

  const placeholderStyles: React.CSSProperties = {
    padding: 'var(--space-6)',
    backgroundColor: 'var(--color-paper)',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    marginTop: 'var(--space-4)',
  };

  // Render placeholder page
  const renderPlaceholder = (title: string, description: string) => (
    <div style={mainContentStyles} className="contentMount">
      <header>
        <h1 style={titleStyles}>{title}</h1>
        <div style={summaryStyles}>
          <p>This is a placeholder for the {title} page. Layout and controls match the executive summary template.</p>
        </div>
      </header>
      <section>
        <h2 style={sectionHeadingStyles}>Content Preview</h2>
        <div style={placeholderStyles}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
            {description}
          </p>
          <div style={{
            height: '200px',
            backgroundColor: 'var(--color-grey-light)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-text-muted)',
            fontSize: 'var(--font-size-small)',
          }}>
            Content area placeholder
          </div>
        </div>
      </section>
    </div>
  );

  // Render document content based on document ID
  const renderDocumentContent = (docId: string) => {
    switch (docId) {
      case 'executive-summary':
        return (
          <div style={mainContentStyles} className="contentMount">
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
            <section>
              <h2 style={sectionHeadingStyles}>Independent claims</h2>
              {claimsData.map((claim) => (
                <ClaimCard
                  key={claim.claimNumber}
                  claim={claim}
                  onGoToClaimChart={goToClaimChartRow}
                />
              ))}
            </section>
          </div>
        );

      case 'scope-of-analysis':
        return renderPlaceholder(
          'Scope of Analysis',
          'This section will contain the scope definition, included patents, prior art references, and analysis boundaries.'
        );

      case 'strategic-review':
        return renderPlaceholder(
          'Strategic Review',
          'Strategic recommendations and key findings will be presented here, including risk assessment and recommended actions.'
        );

      case 'claims':
        return renderPlaceholder(
          'Claims',
          'Full claim text and claim dependency charts will be displayed in this section.'
        );

      case 'summary-graves':
        return renderPlaceholder(
          'Summary: Graves et al.',
          'Detailed summary of the Graves et al. (US 2019/0329772 A1) reference including key teachings and relevance to the subject patent.'
        );

      case 'claim-charts':
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

      case 'documents-overview':
        return renderPlaceholder(
          'Documents Overview',
          'Overview table of all documents in the case, including upload status, processing state, and quick access links.'
        );

      default:
        return renderPlaceholder('Document', 'Document content will appear here.');
    }
  };

  return (
    <div className="appShell appShell--withSidebarTop">
      {/* Left Sidebar - full height, resizable */}
      <div
        className={`appShell__sidebar ${sidebarCollapsed ? 'appShell__sidebar--collapsed' : 'appShell__sidebar--expanded'}`}
        style={!sidebarCollapsed ? { width: sidebarWidth, position: 'relative' } : undefined}
      >
        <Sidebar
          activeItem={activeNavItem}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onCollapsedChange={handleSidebarCollapsedChange}
        />
        {!sidebarCollapsed && (
          <ResizeHandle
            direction="horizontal"
            position="right"
            onResize={handleSidebarResize}
          />
        )}
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
              onPrevious={handlePrevious}
              onNext={handleNext}
              onSplitToggle={handleSplitToggle}
              isSplitView={isSplitView}
              showNavigation={true}
              showKebab={true}
              showSplit={true}
              showDropdown={isSplitView}
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
                onSplitToggle={handleSplitToggle}
                isSplitView={isSplitView}
                showNavigation={true}
                showKebab={true}
                showSplit={true}
                showDropdown={true}
              />
              <div className="appShell__paneContent" ref={rightPaneScrollRef}>
                {renderDocumentContent(rightPaneDocId)}
              </div>
            </div>
          )}

          {/* Document Viewer - opens to the left of the detail panel, resizable */}
          {isDocumentViewerOpen && !isSplitView && (
            <div
              className="appShell__inspectPane"
              style={{ width: documentViewerWidth, position: 'relative' }}
            >
              <ResizeHandle
                direction="horizontal"
                position="left"
                onResize={handleDocumentViewerResize}
              />
              <DocumentViewer
                citation={viewerCitation}
                onClose={handleDocumentViewerClose}
              />
            </div>
          )}

          {/* Right Pane - Claim Detail Panel, resizable */}
          {isDetailPanelOpen && !isSplitView && (
            <div
              className="appShell__inspectPane"
              style={{ width: sidePanelWidth, position: 'relative' }}
            >
              <ResizeHandle
                direction="horizontal"
                position="left"
                onResize={handleSidePanelResize}
              />
              <ClaimDetailPanel
                row={detailRow}
                onClose={handleDetailPanelClose}
                onCitationClick={handleCitationClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstrainedWorkspace;
