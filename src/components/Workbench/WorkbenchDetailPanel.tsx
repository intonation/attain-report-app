import type { WorkbenchEntry } from '../../data/workbenchData';
import './workbench.css';

/* ── Icons ────────────────────────────────────────────────────────── */

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

/* ── Inline ID Link Helper ──────────────────────────────────────────── */

const ID_PATTERN = /\b([FR]\d+(?:-\d+)?)\b/g;

interface ParsedTextProps {
  text: string;
  onIdClick?: (id: string) => void;
}

function ParsedText({ text, onIdClick }: ParsedTextProps) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = ID_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const id = match[1];
    parts.push(
      <button
        key={`${id}-${match.index}`}
        className="workbench__tag-inline"
        onClick={(e) => {
          e.stopPropagation();
          onIdClick?.(id);
        }}
      >
        {id}
      </button>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

/* ── Strength Bar Component ────────────────────────────────────── */

function StrengthBar({ strength }: { strength: string }) {
  const [value, max] = strength.split('/').map(n => parseInt(n, 10));
  const percentage = (value / max) * 100;

  return (
    <div className="workbench__strength-container">
      <div className="workbench__strength-bar">
        <div
          className="workbench__strength-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="workbench__strength-value">{strength}</span>
    </div>
  );
}

/* ── Conclusion Badge Component ──────────────────────────────────── */

function ConclusionBadge({ conclusion }: { conclusion: string }) {
  const isNovel = conclusion === 'Novel';

  return (
    <span className={`workbench__conclusion-badge ${isNovel ? 'workbench__conclusion-novel' : 'workbench__conclusion-not-novel'}`}>
      <svg width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="5" fill={isNovel ? '#16a34a' : '#dc2626'} />
      </svg>
      {conclusion}
    </span>
  );
}

/* ── Workbench Detail Panel ──────────────────────────────────────── */

export interface WorkbenchDetailPanelProps {
  entry: WorkbenchEntry | null;
  priorArtReference: string;
  onClose: () => void;
  onIdClick?: (id: string) => void;
  onCitationClick?: (citation: string) => void;
}

export function WorkbenchDetailPanel({ entry, priorArtReference, onClose, onIdClick, onCitationClick }: WorkbenchDetailPanelProps) {
  if (!entry) {
    return (
      <div className="workbench__detail-panel workbench__detail-panel--empty">
        <p className="workbench__detail-panel-empty-text">Select an entry to view details</p>
      </div>
    );
  }

  return (
    <div className="workbench__detail-panel">
      <div className="workbench__detail-panel-header">
        <span className="workbench__detail-panel-title">{entry.id}</span>
        <button className="workbench__detail-panel-close" onClick={onClose} aria-label="Close panel">
          <CloseIcon />
        </button>
      </div>

      <div className="workbench__detail-panel-body">
        {/* Feature Breakdown Section */}
        <h2 className="workbench__detail-panel-section-title">Feature Breakdown</h2>

        <section className="workbench__detail-panel-section">
          <h3>Feature</h3>
          <p><ParsedText text={entry.name} onIdClick={onIdClick} /></p>
        </section>

        <section className="workbench__detail-panel-section">
          <h3>Interpretation</h3>
          <p><ParsedText text={entry.interpretation} onIdClick={onIdClick} /></p>
        </section>

        {entry.interpretationBasis && entry.interpretationBasis.length > 0 && (
          <section className="workbench__detail-panel-section">
            <h3>Interpretation basis</h3>
            <div className="workbench__tag-group">
              {entry.interpretationBasis.map((citation, idx) => (
                <button
                  key={idx}
                  className="workbench__tag-citation"
                  onClick={() => onCitationClick?.(citation)}
                >
                  {citation}
                </button>
              ))}
            </div>
          </section>
        )}

        {entry.supportingDescription && (
          <section className="workbench__detail-panel-section">
            <h3>Supporting description</h3>
            <p><ParsedText text={entry.supportingDescription} onIdClick={onIdClick} /></p>
          </section>
        )}

        {entry.examples && entry.examples.length > 0 && (
          <section className="workbench__detail-panel-section">
            <h3>Examples</h3>
            <div className="workbench__tag-group">
              {entry.examples.map((example, idx) => (
                <span key={idx} className="workbench__tag-example">{example}</span>
              ))}
            </div>
          </section>
        )}

        <hr className="workbench__detail-panel-divider" />

        {/* Reference Section */}
        <h2 className="workbench__detail-panel-section-title">{priorArtReference}</h2>

        {entry.refSummary && (
          <section className="workbench__detail-panel-section">
            <h3>Summary</h3>
            <p><ParsedText text={entry.refSummary} onIdClick={onIdClick} /></p>
          </section>
        )}

        {entry.refMapping && (
          <section className="workbench__detail-panel-section">
            <h3>Citation</h3>
            <div className="workbench__tag-group">
              <button
                className="workbench__tag-citation"
                onClick={() => onCitationClick?.(entry.refMapping!)}
              >
                {entry.refMapping}
              </button>
            </div>
          </section>
        )}

        {entry.refAnalysis && (
          <section className="workbench__detail-panel-section">
            <h3>Analysis</h3>
            <p><ParsedText text={entry.refAnalysis} onIdClick={onIdClick} /></p>
          </section>
        )}

        <hr className="workbench__detail-panel-divider" />

        <section className="workbench__detail-panel-section">
          <div className="workbench__detail-panel-conclusion-card">
            <div className="workbench__dp-conclusion-grid">
              <div className="workbench__dp-conclusion-col">
                <h3>Conclusion</h3>
                <ConclusionBadge conclusion={entry.refConclusion} />
              </div>
              <div className="workbench__dp-conclusion-col">
                <h3>Strength</h3>
                <StrengthBar strength={entry.refStrength} />
              </div>
            </div>
          </div>
        </section>

        {entry.refMapping && (
          <section className="workbench__detail-panel-section">
            <h3>Mapping</h3>
            <p>{entry.refMapping}</p>
          </section>
        )}

        {entry.refCounteranalysis && (
          <section className="workbench__detail-panel-section">
            <h3>Counteranalysis</h3>
            <p><ParsedText text={entry.refCounteranalysis} onIdClick={onIdClick} /></p>
          </section>
        )}
      </div>
    </div>
  );
}

export default WorkbenchDetailPanel;
