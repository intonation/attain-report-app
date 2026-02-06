import { useState, useEffect, useRef } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { ClaimCard } from '../components/ClaimCard';
import { InspectPanel } from '../components/InspectPanel';
import { reportData, claimsData } from '../data/mockData';

// Navigation items that should trigger full-width mode (sidebar collapsed)
const FULL_WIDTH_NAV_ITEMS = ['claim-charts', 'workbench'];

// Breakpoint at which we auto-collapse sidebar when inspect panel opens
const INSPECT_COLLAPSE_BREAKPOINT = 1400;

export const ReportExecutiveSummaryWireframe = () => {
  const [activeNavItem, setActiveNavItem] = useState('executive-summary');
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [inspectClaimNumber, setInspectClaimNumber] = useState<number>(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const mainScrollRef = useRef<HTMLDivElement>(null);
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

  // Auto-collapse/expand sidebar based on inspect panel state and viewport width
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

    if (isInspectOpen && isNarrow && !sidebarCollapsed) {
      // Collapse sidebar when inspect panel opens and viewport is narrow
      wasCollapsedByInspectRef.current = true;
      setSidebarCollapsed(true);
    } else if (!isInspectOpen && wasCollapsedByInspectRef.current) {
      // Re-expand sidebar when inspect panel closes (if we collapsed it)
      wasCollapsedByInspectRef.current = false;
      setSidebarCollapsed(false);
    }
  }, [isInspectOpen, sidebarCollapsed]);

  const handleInspectClaim = (claimNumber: number) => {
    setInspectClaimNumber(claimNumber);
    setIsInspectOpen(true);
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

  // Check if we're in full-width mode
  const isFullWidth = FULL_WIDTH_NAV_ITEMS.includes(activeNavItem);

  // Content area takes remaining space, shrinks when inspect panel opens
  const contentAreaStyles: React.CSSProperties = {
    flex: 1,
    minWidth: 0, // Allow shrinking below content size
    display: 'flex',
    justifyContent: isFullWidth ? 'stretch' : 'flex-start',
  };

  const mainColumnStyles: React.CSSProperties = {
    padding: 'var(--space-6)',
    maxWidth: isFullWidth ? 'none' : 'var(--main-content-max-width)',
    width: isFullWidth ? '100%' : undefined,
    borderRadius: 0,
  };

  // Header styles (Minor third scale: 14px base × 1.2⁴ = 29px for h1)
  const titleStyles: React.CSSProperties = {
    fontSize: '29px',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-2)',
    fontFamily: 'times',
  };

  const applicationRefStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-6)',
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

  // Placeholder content for full-width pages
  const renderFullWidthPlaceholder = () => {
    const placeholderStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      color: 'var(--color-text-muted)',
    };

    const titleMap: Record<string, string> = {
      'claim-charts': 'Claim Charts',
      'workbench': 'Workbench',
    };

    return (
      <div style={placeholderStyles}>
        <h2 style={{ ...titleStyles, marginBottom: 'var(--space-4)' }}>
          {titleMap[activeNavItem] || 'Full Width View'}
        </h2>
        <p style={{ fontSize: 'var(--font-size-small)' }}>
          Full-width table view placeholder
        </p>
      </div>
    );
  };

  return (
    <div className="appFrame">
      {/* Left Sidebar */}
      <div className="appFrame__sidebar">
        <Sidebar
          activeItem={activeNavItem}
          onNavigate={handleNavigate}
          collapsed={sidebarCollapsed}
          onCollapsedChange={handleSidebarCollapsedChange}
        />
      </div>

      {/* Main scrollable content area */}
      <div className="appFrame__main" ref={mainScrollRef}>
        {/* Content Area - shrinks when inspect panel is open */}
        <div style={contentAreaStyles} className="contentMount">
          {/* Main Content Column */}
          <main style={mainColumnStyles}>
            {isFullWidth ? (
              renderFullWidthPlaceholder()
            ) : (
              <>
                {/* Header Area */}
                <header>
                  <h1 style={titleStyles}>{reportData.title}</h1>
                  <p style={applicationRefStyles}>
                    {reportData.applicationRef} · {reportData.subtitle}
                  </p>
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
              </>
            )}
          </main>
        </div>
      </div>

      {/* Inspect Panel - outside scroll container, fixed height */}
      {isInspectOpen && (
        <InspectPanel
          onClose={() => setIsInspectOpen(false)}
          claimNumber={inspectClaimNumber}
        />
      )}
    </div>
  );
};

export default ReportExecutiveSummaryWireframe;
