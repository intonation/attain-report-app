import { useState, useEffect } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { ClaimCard } from '../components/ClaimCard';
import { InspectPanel } from '../components/InspectPanel';
import { reportData, claimsData } from '../data/mockData';

// Navigation items that should trigger full-width mode (sidebar collapsed)
const FULL_WIDTH_NAV_ITEMS = ['claims-chart', 'workbench'];

export const ReportExecutiveSummaryWireframe = () => {
  const [activeNavItem, setActiveNavItem] = useState('executive-summary');
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [inspectClaimNumber, setInspectClaimNumber] = useState<number>(1);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Auto-collapse sidebar for full-width pages
  useEffect(() => {
    if (FULL_WIDTH_NAV_ITEMS.includes(activeNavItem)) {
      setSidebarCollapsed(true);
    }
  }, [activeNavItem]);

  const handleInspectClaim = (claimNumber: number) => {
    setInspectClaimNumber(claimNumber);
    setIsInspectOpen(true);
  };

  const handleNavigate = (itemId: string) => {
    setActiveNavItem(itemId);
  };

  // Check if we're in full-width mode
  const isFullWidth = FULL_WIDTH_NAV_ITEMS.includes(activeNavItem);

  // Layout styles
  const wrapperStyles: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--space-6)',
    padding: 'var(--space-6)',
    minHeight: '100vh',
    backgroundColor: 'var(--color-canvas)',
  };

  const contentAreaStyles: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    justifyContent: isFullWidth ? 'stretch' : 'flex-start',
  };

  const mainColumnStyles: React.CSSProperties = {
    padding: 'var(--space-6)',
    maxWidth: isFullWidth ? 'none' : 'var(--main-content-max-width)',
    width: isFullWidth ? '100%' : undefined,
    borderRadius: 0,
  };

  // Header styles
  const titleStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-h2)',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-2)',
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

  const sectionHeadingStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-h4)',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-5)',
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
      'claims-chart': 'Claims Chart',
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
    <div style={wrapperStyles}>
      {/* Left Sidebar */}
      <Sidebar
        activeItem={activeNavItem}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      {/* Content Area */}
      <div style={contentAreaStyles}>
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

      {/* Inspect Panel (slide-in from right) */}
      <InspectPanel
        isOpen={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        claimNumber={inspectClaimNumber}
      />
    </div>
  );
};

export default ReportExecutiveSummaryWireframe;
