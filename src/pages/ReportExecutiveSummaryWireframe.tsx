import { useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { ClaimCard } from '../components/ClaimCard';
import { CalloutCard } from '../components/CalloutCard';
import { reportData, claimsData, calloutContent } from '../data/mockData';

export const ReportExecutiveSummaryWireframe = () => {
  const [activeNavItem, setActiveNavItem] = useState('executive-summary');

  const handleInspectClaim = (claimNumber: number) => {
    console.log('Inspecting claim:', claimNumber);
  };

  // Layout styles
  const wrapperStyles: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--space-6)',
    padding: 'var(--space-6)',
    minHeight: '100vh',
    backgroundColor: 'var(--color-canvas)',
  };

  const contentAreaStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr var(--right-column-width)',
    flex: 1,
    gap: 'var(--space-6)',
  };

  const mainColumnStyles: React.CSSProperties = {
    padding: 'var(--space-6)',
    maxWidth: 'var(--main-content-max-width)',
    backgroundColor: 'var(--color-paper)',
    borderRadius: '12px',
    border: '1px solid #e5e5e5',
  };

  const rightColumnStyles: React.CSSProperties = {
    padding: 'var(--space-6)',
    backgroundColor: 'var(--color-paper)',
    borderRadius: '12px',
    border: '1px solid #e5e5e5',
    height: 'fit-content',
    position: 'sticky',
    top: 'var(--space-6)',
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

  return (
    <div style={wrapperStyles}>
      {/* Left Sidebar */}
      <Sidebar
        activeItem={activeNavItem}
        onNavigate={setActiveNavItem}
      />

      {/* Content Area */}
      <div style={contentAreaStyles}>
        {/* Main Content Column */}
        <main style={mainColumnStyles}>
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
        </main>

        {/* Right Callout Column */}
        <aside style={rightColumnStyles}>
          <CalloutCard title={calloutContent.title} subtitle={calloutContent.subtitle}>
            <p>{calloutContent.content}</p>
          </CalloutCard>
        </aside>
      </div>
    </div>
  );
};

export default ReportExecutiveSummaryWireframe;
