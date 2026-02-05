import { Card, Badge } from './base';

interface InspectPanelProps {
  onClose: () => void;
  claimNumber?: number;
}

// Mock data for the inspect panel
const MOCK_INSPECT_DATA = {
  analysis: `Claim 1 relates to an adaptive cruise controller that autonomously adapts ego-vehicle speed to maintain a target headway to a forward vehicle. The claim focuses on determining and implementing a deceleration strategy, when current headway falls below the target headway, while selectively optimizing comfort based on a predicted headway computed for a future time instant from the forward vehicle's speed and acceleration relative to the ego vehicle.`,
  interpretation: `This determination is based on Graves describing zone-based safety levels and comfort considerations but does not describe using a predicted headway value as the comfort-selective input to determine the deceleration strategy (see claim charts L1-8 L1-9 L1-10).`,
  counterAnalysis: `No counter analysis available.`,
  conclusion: {
    strength: 'Novel',
    reference: 'Ref C',
  },
};

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M15 5L5 15M5 5L15 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const InspectPanel = ({ onClose, claimNumber = 1 }: InspectPanelProps) => {
  const panelStyles: React.CSSProperties = {
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
    padding: 'var(--space-5) var(--space-6)',
    borderBottom: '1px solid var(--color-border)',
    flexShrink: 0,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-h4)',
    fontWeight: 600,
    color: 'var(--color-text)',
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

  const sectionTitleStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-small)',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const sectionTextStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-small)',
    lineHeight: 'var(--line-height-body)',
    color: 'var(--color-text)',
  };

  const conclusionCardStyles: React.CSSProperties = {
    padding: 'var(--space-4)',
    backgroundColor: 'var(--color-grey-light)',
    border: 'none',
  };

  const conclusionRowStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--space-2)',
  };

  const conclusionLabelStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text-muted)',
  };

  const referenceStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-xsmall)',
    color: 'var(--color-text-muted)',
    marginTop: 'var(--space-2)',
  };

  return (
    <aside style={panelStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <h2 style={titleStyles}>Claim {claimNumber} details</h2>
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
        {/* Analysis Section */}
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Analysis</h3>
          <p style={sectionTextStyles}>{MOCK_INSPECT_DATA.analysis}</p>
        </div>

        {/* Interpretation Section */}
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Interpretation</h3>
          <p style={sectionTextStyles}>{MOCK_INSPECT_DATA.interpretation}</p>
        </div>

        {/* Counter Analysis Section */}
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Counter analysis</h3>
          <p style={{ ...sectionTextStyles, color: 'var(--color-text-muted)' }}>
            {MOCK_INSPECT_DATA.counterAnalysis}
          </p>
        </div>

        {/* Conclusion Section */}
        <div style={sectionStyles}>
          <h3 style={sectionTitleStyles}>Conclusion</h3>
          <Card style={conclusionCardStyles}>
            <div style={conclusionRowStyles}>
              <span style={conclusionLabelStyles}>Strength</span>
              <Badge variant="success">{MOCK_INSPECT_DATA.conclusion.strength}</Badge>
            </div>
            <p style={referenceStyles}>{MOCK_INSPECT_DATA.conclusion.reference}</p>
          </Card>
        </div>
      </div>
    </aside>
  );
};
