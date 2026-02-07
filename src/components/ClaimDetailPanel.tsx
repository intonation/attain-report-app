import type { ClaimChartRow, NoveltyConclusion } from '../data/mockData';
import { Badge, type BadgeVariant } from './base/Badge';
import '../styles/claim-detail-panel.css';

// Helper to map novelty conclusion to badge variant
function getNoveltyVariant(status: NoveltyConclusion): BadgeVariant {
  switch (status) {
    case 'Novel':
      return 'novel';
    case 'Likely novel':
      return 'likely-novel';
    case 'Likely not novel':
      return 'likely-not-novel';
    case 'Not novel':
      return 'not-novel';
  }
}

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

// Strength bar visualization
function StrengthBar({ strength }: { strength: string }) {
  const [current, total] = strength.split('/').map(Number);
  const percentage = (current / total) * 100;

  return (
    <div className="claimDetailPanel__strengthBar">
      <div
        className="claimDetailPanel__strengthFill"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

interface ClaimDetailPanelProps {
  row: ClaimChartRow | null;
  onClose: () => void;
  onCitationClick?: (citation: string) => void;
}

export function ClaimDetailPanel({ row, onClose, onCitationClick }: ClaimDetailPanelProps) {
  if (!row) {
    return (
      <div className="claimDetailPanel claimDetailPanel--empty">
        <p className="claimDetailPanel__emptyText">Select a row to view details</p>
      </div>
    );
  }

  return (
    <div className="claimDetailPanel">
      {/* Header */}
      <div className="claimDetailPanel__header">
        <div className="claimDetailPanel__headerLeft">
          <span className="claimDetailPanel__idChip">{row.claimId}</span>
          <Badge variant={getNoveltyVariant(row.conclusion)}>
            {row.conclusion}
          </Badge>
        </div>
        <button
          className="claimDetailPanel__closeBtn"
          onClick={onClose}
          aria-label="Close panel"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Content */}
      <div className="claimDetailPanel__content">
        {/* Claim Text Section */}
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Claim Text</h3>
          <p className="claimDetailPanel__claimText">{row.claimText}</p>
        </section>

        {/* Quotation Section */}
        {row.interpretation && (
          <section className="claimDetailPanel__section">
            <h3 className="claimDetailPanel__sectionTitle">Reference Quotation</h3>
            <blockquote className="claimDetailPanel__quotation">
              {row.interpretation}
            </blockquote>
            {row.citations && row.citations !== '—' && (
              <button
                className="claimDetailPanel__citationBtn"
                onClick={() => onCitationClick?.(row.citations)}
              >
                {row.citations}
              </button>
            )}
          </section>
        )}

        {/* Analysis Section */}
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Analysis</h3>
          <p className="claimDetailPanel__analysis">{row.analysis}</p>
        </section>

        {/* Counter-analysis Section */}
        {row.counteranalysis && (
          <section className="claimDetailPanel__section">
            <h3 className="claimDetailPanel__sectionTitle">Counter-analysis</h3>
            <p className="claimDetailPanel__counteranalysis">{row.counteranalysis}</p>
          </section>
        )}

        {/* Strength Section */}
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Strength</h3>
          <div className="claimDetailPanel__strengthContainer">
            <StrengthBar strength={row.strength} />
            <span className="claimDetailPanel__strengthValue">{row.strength}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClaimDetailPanel;
