import { useState, useEffect, useRef, useCallback } from 'react';
import { Toolbar } from '../components/layout/Toolbar';
import { PaneHeader } from '../components/layout/PaneHeader';
import { Sidebar } from '../components/layout/Sidebar';
import { ClaimCard } from '../components/ClaimCard';
import { ClaimsChartTable } from '../components/ClaimsChartTable';
import { ClaimDetailPanel } from '../components/ClaimDetailPanel';
import { DocumentViewer } from '../components/DocumentViewer';
import { ResizeHandle } from '../components/ResizeHandle';
import { WorkbenchPage, WorkbenchDetailPanel } from '../components/Workbench';
import type { WorkbenchSelection } from '../components/Workbench';
import { SelectionContextMenu, type HighlightColor, type ViewPane } from '../components/SelectionContextMenu';
import { useResponsiveSidebar } from '../hooks';
import { reportData, claimsData, claimChartData } from '../data/mockData';
import { workbenchData } from '../data/workbenchData';
import { StrategicReviewContent } from '../data/strategicReviewData';
import { ScopeOfAnalysisContent } from '../data/scopeOfAnalysisData';
import { ClaimsPageContent } from '../data/claimsData';
import { GravesReferenceSummaryContent } from '../data/gravesReferenceSummaryData';
import type { ClaimChartRow } from '../data/mockData';

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
  { id: 'workbench', label: 'Workbench' },
  { id: 'documents-overview', label: 'Documents Overview' },
];

export const ConstrainedWorkspace = () => {
  const [activeNavItem, setActiveNavItem] = useState('executive-summary');
  const [isSplitView, setIsSplitView] = useState(false);
  const [rightPaneDocId, setRightPaneDocId] = useState('scope-of-analysis');

  // Responsive sidebar with localStorage persistence and first-load emphasis
  const {
    collapsed: sidebarCollapsed,
    setCollapsed: setSidebarCollapsed,
    showEmphasis,
    onEmphasisComplete,
  } = useResponsiveSidebar();

  // Claims chart row selection state
  const [selectedRowId, setSelectedRowId] = useState<string | undefined>(undefined);
  const [detailRow, setDetailRow] = useState<ClaimChartRow | null>(null);
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);

  // Workbench entry selection state
  const [workbenchSelection, setWorkbenchSelection] = useState<WorkbenchSelection | null>(null);
  const [isWorkbenchPanelOpen, setIsWorkbenchPanelOpen] = useState(false);
  const [workbenchScrollToId, setWorkbenchScrollToId] = useState<string | null>(null);

  // Document viewer state
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);
  const [viewerCitation, setViewerCitation] = useState<string>('');

  // Context menu state (for claims page target clicks)
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    ref: string;
  } | null>(null);

  // Navigation history for back/forward
  const [navHistory, setNavHistory] = useState<string[]>(['executive-summary']);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Resizable panel widths
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT_WIDTH);
  const [sidePanelWidth, setSidePanelWidth] = useState(SIDE_PANEL_DEFAULT_WIDTH);
  const [documentViewerWidth, setDocumentViewerWidth] = useState(SIDE_PANEL_DEFAULT_WIDTH);

  const mainScrollRef = useRef<HTMLDivElement>(null);
  const rightPaneScrollRef = useRef<HTMLDivElement>(null);

  // Track if sidebar was auto-collapsed due to space constraints
  const wasAutoCollapsed = useRef(false);

  // Auto-collapse sidebar when both detail panel and document viewer are open
  useEffect(() => {
    const detailPanelOpen = isDetailPanelOpen || isWorkbenchPanelOpen;
    const bothPanelsOpen = detailPanelOpen && isDocumentViewerOpen;

    if (bothPanelsOpen && !sidebarCollapsed) {
      // Both panels open and sidebar is expanded - auto-collapse it
      wasAutoCollapsed.current = true;
      setSidebarCollapsed(true);
    } else if (!bothPanelsOpen && wasAutoCollapsed.current && sidebarCollapsed) {
      // One panel closed and sidebar was auto-collapsed - restore it
      wasAutoCollapsed.current = false;
      setSidebarCollapsed(false);
    }
  }, [isDetailPanelOpen, isWorkbenchPanelOpen, isDocumentViewerOpen, sidebarCollapsed, setSidebarCollapsed]);

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

  // Toggle split view from left pane (or enter split view)
  const handleSplitToggle = () => {
    if (isSplitView) {
      // Maximise left pane - just close split view
      setIsSplitView(false);
    } else {
      setIsSplitView(true);
      setIsDetailPanelOpen(false);
      setIsDocumentViewerOpen(false);
      // Set right pane to same document as left pane
      setRightPaneDocId(activeNavItem);
      // Auto-collapse sidebar in split view mode
      setSidebarCollapsed(true);
    }
  };

  // Maximise right pane - swap documents and close split view
  const handleRightPaneMaximise = () => {
    // Make the right pane's document the main document
    setActiveNavItem(rightPaneDocId);
    // Add to navigation history
    const newHistory = navHistory.slice(0, historyIndex + 1);
    newHistory.push(rightPaneDocId);
    setNavHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    // Close split view
    setIsSplitView(false);
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
    // Close workbench panel if open
    setIsWorkbenchPanelOpen(false);
    setWorkbenchSelection(null);
  };

  const handleDetailPanelClose = () => {
    setDetailRow(null);
    setSelectedRowId(undefined);
    setIsDetailPanelOpen(false);
  };

  // Handle entry click from workbench
  const handleWorkbenchEntrySelect = (selection: WorkbenchSelection) => {
    setWorkbenchSelection(selection);
    setIsWorkbenchPanelOpen(true);
    setIsSplitView(false);
    // Close claims detail panel if open
    setIsDetailPanelOpen(false);
    setDetailRow(null);
    setSelectedRowId(undefined);
  };

  const handleWorkbenchPanelClose = () => {
    setWorkbenchSelection(null);
    setIsWorkbenchPanelOpen(false);
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

  // Handle feature/relationship ID click from workbench detail panel - scroll workbench table to that row
  const handleWorkbenchIdClick = (id: string) => {
    setWorkbenchScrollToId(id);
  };

  // Context menu handlers for Claims page target clicks
  const handleClaimTargetClick = (ref: string, x: number, y: number) => {
    setContextMenu({ x, y, ref });
  };

  const handleContextMenuClose = () => {
    setContextMenu(null);
  };

  const handleHighlight = (color: HighlightColor) => {
    console.log('Highlight:', contextMenu?.ref, 'with color:', color);
    // TODO: Implement highlight storage
    setContextMenu(null);
  };

  const handleClearHighlight = () => {
    console.log('Clear highlight:', contextMenu?.ref);
    // TODO: Implement highlight removal
    setContextMenu(null);
  };

  const handleViewInPane = (pane: ViewPane) => {
    if (!contextMenu?.ref) {
      setContextMenu(null);
      return;
    }

    const ref = contextMenu.ref;

    // Find the entry in workbench data
    const findEntry = () => {
      for (const claim of workbenchData) {
        const entry = claim.entries.find(e => e.id === ref);
        if (entry) {
          return { entry, priorArtReference: claim.priorArtReference };
        }
      }
      return null;
    };

    if (pane === 'left') {
      // Open workbench in left pane and scroll to the entry
      setActiveNavItem('workbench');
      setWorkbenchScrollToId(ref);
      // Close split view if open
      setIsSplitView(false);
    } else if (pane === 'right') {
      // Open workbench in right pane (split view) and scroll to the entry
      setIsSplitView(true);
      setRightPaneDocId('workbench');
      setWorkbenchScrollToId(ref);
      // Auto-collapse sidebar in split view
      setSidebarCollapsed(true);
    } else if (pane === 'details') {
      // Open the workbench detail panel for this entry
      const found = findEntry();
      if (found) {
        // Navigate to workbench and select the entry
        setActiveNavItem('workbench');
        setWorkbenchSelection({ entry: found.entry, priorArtReference: found.priorArtReference });
        setIsWorkbenchPanelOpen(true);
        setWorkbenchScrollToId(ref);
        // Close other panels
        setIsSplitView(false);
        setIsDetailPanelOpen(false);
        setDetailRow(null);
        setSelectedRowId(undefined);
      }
    }

    setContextMenu(null);
  };

  // Clear workbench scroll target after it's been used (allows repeated clicks on same ID)
  useEffect(() => {
    if (workbenchScrollToId) {
      const timeout = setTimeout(() => {
        setWorkbenchScrollToId(null);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [workbenchScrollToId]);

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
    fontFamily: 'var(--font-serif)',
  };

  const summaryStyles: React.CSSProperties = {
    fontSize: '1rem', /* 14px body text */
    lineHeight: 'var(--line-height-body)',
    color: 'var(--color-text)',
    marginBottom: 'var(--space-8)',
  };

  const sectionHeadingStyles: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-5)',
    fontFamily: 'var(--font-serif)',
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
        return (
          <div style={mainContentStyles} className="contentMount">
            <header>
              <h1 style={titleStyles}>Scope of Analysis</h1>
              <div style={summaryStyles}>
                <p>Summary of objections raised in the official action and claim groupings for analysis.</p>
              </div>
            </header>
            <ScopeOfAnalysisContent onCitationClick={(citation) => handleCitationClick(citation.location)} />
          </div>
        );

      case 'strategic-review':
        return (
          <div style={mainContentStyles} className="contentMount">
            <header>
              <h1 style={titleStyles}>Strategic Review</h1>
              <div style={summaryStyles}>
                <p>Analysis of patent claims against prior art references, with novelty assessments and supporting evidence.</p>
              </div>
            </header>
            <StrategicReviewContent onCitationClick={(citation) => handleCitationClick(citation.location)} />
          </div>
        );

      case 'claims':
        return (
          <div style={mainContentStyles} className="contentMount">
            <header>
              <h1 style={titleStyles}>Claims</h1>
              <div style={summaryStyles}>
                <p>Full patent claims with annotated features and relationships.</p>
              </div>
            </header>
            <ClaimsPageContent onTargetClick={handleClaimTargetClick} />
          </div>
        );

      case 'summary-graves':
        return (
          <div style={mainContentStyles} className="contentMount">
            <GravesReferenceSummaryContent onCitationClick={(citation) => handleCitationClick(citation.location)} />
          </div>
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

      case 'workbench':
        return (
          <div style={{ width: '100%' }}>
            <WorkbenchPage
              showTitle={true}
              selectedEntryId={workbenchSelection?.entry.id}
              onEntrySelect={handleWorkbenchEntrySelect}
              onCitationClick={handleCitationClick}
              highlightedEntryId={workbenchScrollToId ?? undefined}
            />
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
          showEmphasis={showEmphasis}
          onEmphasisComplete={onEmphasisComplete}
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
              disablePrevious={historyIndex === 0}
              disableNext={historyIndex >= navHistory.length - 1}
              onSplitToggle={handleSplitToggle}
              isSplitView={isSplitView}
              showNavigation={true}
              showKebab={true}
              showSplit={true}
              showDropdown={isSplitView}
            />
            <div
              className={`appShell__paneContent ${activeNavItem === 'claim-charts' ? 'appShell__paneContent--claims' : ''} ${activeNavItem === 'workbench' ? 'appShell__paneContent--workbench' : ''}`}
              ref={mainScrollRef}
            >
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
                onSplitToggle={handleRightPaneMaximise}
                isSplitView={isSplitView}
                showNavigation={true}
                showKebab={true}
                showSplit={true}
                showDropdown={true}
              />
              <div
                className={`appShell__paneContent ${rightPaneDocId === 'claim-charts' ? 'appShell__paneContent--claims' : ''} ${rightPaneDocId === 'workbench' ? 'appShell__paneContent--workbench' : ''}`}
                ref={rightPaneScrollRef}
              >
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

          {/* Right Pane - Workbench Detail Panel, resizable */}
          {isWorkbenchPanelOpen && !isSplitView && (
            <div
              className="appShell__inspectPane"
              style={{ width: sidePanelWidth, position: 'relative' }}
            >
              <ResizeHandle
                direction="horizontal"
                position="left"
                onResize={handleSidePanelResize}
              />
              <WorkbenchDetailPanel
                entry={workbenchSelection?.entry ?? null}
                priorArtReference={workbenchSelection?.priorArtReference ?? ''}
                onClose={handleWorkbenchPanelClose}
                onIdClick={handleWorkbenchIdClick}
                onCitationClick={handleCitationClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Selection Context Menu */}
      {contextMenu && (
        <SelectionContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onHighlight={handleHighlight}
          onClear={handleClearHighlight}
          onViewInPane={handleViewInPane}
          onCancel={handleContextMenuClose}
        />
      )}
    </div>
  );
};

export default ConstrainedWorkspace;
