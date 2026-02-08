import { InspectPanelIcon, CloseIcon } from './icons';

interface InspectPanelProps {
  onClose: () => void;
  claimNumber?: number;
  embedded?: boolean;
}

// Mock data for the inspect panel - matching screenshot
const MOCK_INSPECT_DATA = {
  featureId: 'F5-6',
  featureName: 'schedule data',
  interpretation: 'Data representing one or more scheduled activities/events for a user, usable by the controller to plan or constrain charging behavior over time.',
  basis: ['Spec · 1', 'Spec · 2'],
  supportingDescription: 'The disclosure describes stored schedule data/schedule information used by applications, and indicates that the controller can obtain a scheduled-activity indicator from stored schedule data.',
  examples: ['stored schedule data', 'schedule information'],
  priorArt: {
    reference: 'Reference A: US 10,998,772',
    summary: 'The device stores a charge log in memory 130. For each charging session, the charge log stores a session identifier, the selected charging profile identifier, a start timestamp, an end timestamp, and a maximum observed battery temperature Tmax during the session.',
    citations: ['Ref A · 1', 'Ref A · 2'],
    analysis: 'Although the reference discloses stored charging-related data in memory 130 (charging profiles and a charge log with timestamps), it does not disclose schedule data associated with a user or used to',
  },
};

export const InspectPanel = ({ onClose, claimNumber: _claimNumber = 1, embedded = false }: InspectPanelProps) => {
  // claimNumber is available for future use
  void _claimNumber;
  // When embedded, we don't render the outer panel wrapper - just the content
  const panelStyles: React.CSSProperties = embedded ? {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
  } : {
    width: '420px',
    flexShrink: 0,
    backgroundColor: 'var(--color-paper)',
    borderLeft: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100vh',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-4) var(--space-6)',
    borderBottom: '1px solid var(--color-border)',
    flexShrink: 0,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 500,
    color: 'var(--color-text)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  };

  const closeButtonStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: 'var(--color-text-muted)',
    borderRadius: '4px',
    transition: 'background-color 0.15s ease',
  };

  const contentStyles: React.CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: 'var(--space-6)',
  };

  const sectionStyles: React.CSSProperties = {
    marginBottom: 'var(--space-6)',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-small)',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-2)',
  };

  const textStyles: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: 'var(--line-height-body)',
    color: 'var(--color-text)',
  };

  const rowStyles: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--space-6)',
    marginBottom: 'var(--space-5)',
  };

  const columnStyles: React.CSSProperties = {
    flex: 1,
  };

  const chipContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--space-2)',
  };

  const chipStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-accent)',
    backgroundColor: 'var(--color-accent-subtle)',
    borderRadius: '6px',
    border: '1px solid var(--color-accent)',
  };

  const outlineChipStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '6px 12px',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text)',
    backgroundColor: 'transparent',
    borderRadius: '6px',
    border: '1px solid var(--color-border)',
  };

  const priorArtHeadingStyles: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-4)',
    marginTop: 'var(--space-6)',
    paddingTop: 'var(--space-6)',
    borderTop: '1px solid var(--color-border)',
  };

  return (
    <aside style={panelStyles}>
      {/* Header with icon and title */}
      <div style={headerStyles}>
        <h2 style={titleStyles}>
          <InspectPanelIcon />
          {MOCK_INSPECT_DATA.featureId} ({MOCK_INSPECT_DATA.featureName})
        </h2>
        <button
          style={closeButtonStyles}
          onClick={onClose}
          aria-label="Close panel"
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-grey-light)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <CloseIcon />
        </button>
      </div>

      {/* Content */}
      <div style={contentStyles}>
        {/* Interpretation */}
        <div style={sectionStyles}>
          <div style={labelStyles}>Interpretation</div>
          <p style={textStyles}>{MOCK_INSPECT_DATA.interpretation}</p>
        </div>

        {/* Basis and Supporting Description Row */}
        <div style={rowStyles}>
          <div style={columnStyles}>
            <div style={labelStyles}>Basis</div>
            <div style={chipContainerStyles}>
              {MOCK_INSPECT_DATA.basis.map((item, index) => (
                <span key={index} style={chipStyles}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Supporting Description */}
        <div style={sectionStyles}>
          <div style={labelStyles}>Supporting description</div>
          <p style={textStyles}>{MOCK_INSPECT_DATA.supportingDescription}</p>
        </div>

        {/* Examples */}
        <div style={sectionStyles}>
          <div style={labelStyles}>Examples</div>
          <div style={chipContainerStyles}>
            {MOCK_INSPECT_DATA.examples.map((item, index) => (
              <span key={index} style={outlineChipStyles}>{item}</span>
            ))}
          </div>
        </div>

        {/* Prior Art Section */}
        <h3 style={priorArtHeadingStyles}>Prior art: {MOCK_INSPECT_DATA.priorArt.reference}</h3>

        {/* Summary */}
        <div style={sectionStyles}>
          <div style={labelStyles}>Summary</div>
          <p style={textStyles}>{MOCK_INSPECT_DATA.priorArt.summary}</p>
        </div>

        {/* Citations */}
        <div style={sectionStyles}>
          <div style={labelStyles}>Citations</div>
          <div style={chipContainerStyles}>
            {MOCK_INSPECT_DATA.priorArt.citations.map((item, index) => (
              <span key={index} style={chipStyles}>{item}</span>
            ))}
          </div>
        </div>

        {/* Analysis */}
        <div style={sectionStyles}>
          <div style={labelStyles}>Analysis</div>
          <p style={textStyles}>{MOCK_INSPECT_DATA.priorArt.analysis}</p>
        </div>
      </div>
    </aside>
  );
};
