import type { ClaimChartRow, NoveltyConclusion } from '../data/mockData';
import { ReferenceToken, type ReferenceVariant } from './base/ReferenceToken';
import '../styles/claim-detail-panel.css';

// Helper to map reference code to variant
function getReferenceVariant(code: string): ReferenceVariant {
  if (code.startsWith('L')) return 'line';
  if (code.startsWith('C')) return 'claim';
  if (code.startsWith('F')) return 'feature';
  if (code.startsWith('R')) return 'relationship';
  return 'line';
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
    <div className="claimDetailPanel__strengthContainer">
      <div className="claimDetailPanel__strengthBar">
        <div
          className="claimDetailPanel__strengthFill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="claimDetailPanel__strengthValue">{strength}</span>
    </div>
  );
}

// Conclusion badge for the card
function ConclusionBadge({ conclusion }: { conclusion: NoveltyConclusion }) {
  const isNovel = conclusion === 'Novel' || conclusion === 'Likely novel';
  const color = isNovel ? '#16a34a' : '#dc2626';

  return (
    <span className={`claimDetailPanel__conclusionBadge ${isNovel ? 'claimDetailPanel__conclusionBadge--novel' : 'claimDetailPanel__conclusionBadge--not-novel'}`}>
      <svg width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="5" fill={color} />
      </svg>
      {conclusion}
    </span>
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
        <span className="claimDetailPanel__title">{row.claimId}</span>
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
              <ReferenceToken
                variant={getReferenceVariant(row.citations)}
                onClick={() => onCitationClick?.(row.citations)}
                style={{ cursor: 'pointer' }}
              >
                {row.citations}
              </ReferenceToken>
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

        {/* Conclusion Card */}
        <section className="claimDetailPanel__section">
          <div className="claimDetailPanel__conclusionCard">
            <div className="claimDetailPanel__conclusionGrid">
              <div className="claimDetailPanel__conclusionCol">
                <h3 className="claimDetailPanel__sectionTitle">Conclusion</h3>
                <ConclusionBadge conclusion={row.conclusion} />
              </div>
              <div className="claimDetailPanel__conclusionCol">
                <h3 className="claimDetailPanel__sectionTitle">Strength</h3>
                <StrengthBar strength={row.strength} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClaimDetailPanel;
