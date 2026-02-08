import type { ClaimChart } from '../data/mockData';
import '../styles/claim-summary-panel.css';

// Close icon
function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// Novelty badge component
function NoveltyBadge({ status }: { status: string }) {
  const getVariant = () => {
    switch (status) {
      case 'Novel':
        return 'novel';
      case 'Likely novel':
        return 'likely-novel';
      case 'Likely not novel':
        return 'likely-not-novel';
      case 'Not novel':
        return 'not-novel';
      default:
        return 'novel';
    }
  };

  return (
    <span className={`claimSummaryPanel__badge claimSummaryPanel__badge--${getVariant()}`}>
      {status}
    </span>
  );
}

interface ClaimSummaryPanelProps {
  claim: ClaimChart | null;
  onClose: () => void;
  onViewClaimChart?: (claimNumber: string) => void;
}

export function ClaimSummaryPanel({ claim, onClose, onViewClaimChart }: ClaimSummaryPanelProps) {
  if (!claim) {
    return (
      <div className="claimSummaryPanel claimSummaryPanel--empty">
        <p className="claimSummaryPanel__emptyText">Select a claim to view details</p>
      </div>
    );
  }

  return (
    <div className="claimSummaryPanel">
      {/* Header */}
      <div className="claimSummaryPanel__header">
        <div className="claimSummaryPanel__headerLeft">
          <span className="claimSummaryPanel__title">{claim.claimNumber}</span>
          <NoveltyBadge status={claim.noveltyStatus} />
        </div>
        <button
          className="claimSummaryPanel__closeBtn"
          onClick={onClose}
          aria-label="Close panel"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Content */}
      <div className="claimSummaryPanel__content">
        {/* Prior Art Reference */}
        <section className="claimSummaryPanel__section">
          <h3 className="claimSummaryPanel__sectionTitle">Prior Art Reference</h3>
          <p className="claimSummaryPanel__text">{claim.priorArtReference}</p>
        </section>

        {/* Summary */}
        <section className="claimSummaryPanel__section">
          <h3 className="claimSummaryPanel__sectionTitle">Summary</h3>
          <p className="claimSummaryPanel__text">{claim.summary}</p>
        </section>

        {/* Claim Lines Overview */}
        <section className="claimSummaryPanel__section">
          <h3 className="claimSummaryPanel__sectionTitle">Claim Lines</h3>
          <p className="claimSummaryPanel__lineCount">
            {claim.rows.length} line{claim.rows.length !== 1 ? 's' : ''} analyzed
          </p>
          <div className="claimSummaryPanel__linesSummary">
            {claim.rows.map((row) => (
              <div key={row.claimId} className="claimSummaryPanel__lineItem">
                <span className="claimSummaryPanel__lineId">{row.claimId}</span>
                <span className={`claimSummaryPanel__lineConclusion claimSummaryPanel__lineConclusion--${row.conclusion.toLowerCase().replace(/\s+/g, '-')}`}>
                  {row.conclusion}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* View in Claim Chart button */}
        {onViewClaimChart && (
          <div className="claimSummaryPanel__actions">
            <button
              className="claimSummaryPanel__actionBtn"
              onClick={() => onViewClaimChart(claim.claimNumber)}
            >
              View in claim chart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClaimSummaryPanel;
