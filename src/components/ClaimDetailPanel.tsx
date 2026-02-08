import { useState } from 'react';
import type { ClaimChartRow, NoveltyConclusion } from '../data/mockData';
import type { WorkbenchEntry } from '../data/workbenchData';
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
function ConclusionBadge({ conclusion }: { conclusion: NoveltyConclusion | string }) {
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
        className="claimDetailPanel__tagInline"
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

/* ── Node Pill Component ────────────────────────────────────────────── */

function NodePill({ node, onClick }: { node: string; onClick?: () => void }) {
  const tooltip = node.startsWith('R') ? 'Relationship' : node.startsWith('F') ? 'Feature' : '';
  return (
    <button
      className="claimDetailPanel__nodePill"
      title={tooltip}
      onClick={onClick}
      type="button"
    >
      {node}
    </button>
  );
}

/* ── Breadcrumb Navigation ────────────────────────────────────────── */

interface BreadcrumbEntry {
  id: string;
  label: string;
}

interface BreadcrumbProps {
  rootLabel: string;
  navStack: BreadcrumbEntry[];
  onNavigate: (index: number) => void;
}

function Breadcrumb({ rootLabel, navStack, onNavigate }: BreadcrumbProps) {
  if (navStack.length === 0) return null;

  return (
    <nav className="claimDetailPanel__breadcrumb">
      <button
        className="claimDetailPanel__breadcrumbLink"
        onClick={() => onNavigate(-1)}
      >
        {rootLabel}
      </button>
      {navStack.map((entry, i) => (
        <span key={i} className="claimDetailPanel__breadcrumbItem">
          <span className="claimDetailPanel__breadcrumbSep">&rsaquo;</span>
          {i < navStack.length - 1 ? (
            <button
              className="claimDetailPanel__breadcrumbLink"
              onClick={() => onNavigate(i)}
            >
              {entry.label}
            </button>
          ) : (
            <span className="claimDetailPanel__breadcrumbCurrent">{entry.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ── Entry Detail View (when navigating to a specific F/R entry) ───── */

interface EntryDetailViewProps {
  entry: WorkbenchEntry;
  priorArtReference: string;
  onNodeClick: (id: string) => void;
  onCitationClick?: (citation: string) => void;
}

function EntryDetailView({ entry, priorArtReference, onNodeClick, onCitationClick }: EntryDetailViewProps) {
  const isFeature = entry.type === 'Feature';

  return (
    <>
      <section className="claimDetailPanel__section">
        <h3 className="claimDetailPanel__sectionTitle">{isFeature ? 'Feature' : 'Relationship'}</h3>
        <p className="claimDetailPanel__text">
          <ParsedText text={entry.name} onIdClick={onNodeClick} />
        </p>
      </section>

      <section className="claimDetailPanel__section">
        <h3 className="claimDetailPanel__sectionTitle">{isFeature ? 'Definition' : 'Interpretation'}</h3>
        <p className="claimDetailPanel__text">
          <ParsedText text={entry.interpretation} onIdClick={onNodeClick} />
        </p>
      </section>

      {entry.supportingDescription && (
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Supporting description</h3>
          <p className="claimDetailPanel__text">
            <ParsedText text={entry.supportingDescription} onIdClick={onNodeClick} />
          </p>
        </section>
      )}

      {entry.interpretationBasis && entry.interpretationBasis.length > 0 && (
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Interpretation basis</h3>
          <div className="claimDetailPanel__tagGroup">
            {entry.interpretationBasis.map((citation, idx) => (
              <button
                key={idx}
                className="claimDetailPanel__tagCitation"
                onClick={() => onCitationClick?.(citation)}
              >
                {citation}
              </button>
            ))}
          </div>
        </section>
      )}

      <hr className="claimDetailPanel__divider" />

      {/* Reference Section */}
      <h3 className="claimDetailPanel__refTitle">{priorArtReference}</h3>

      {entry.refSummary && (
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Summary</h3>
          <p className="claimDetailPanel__text">
            <ParsedText text={entry.refSummary} onIdClick={onNodeClick} />
          </p>
        </section>
      )}

      {entry.refMapping && (
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Citation</h3>
          <div className="claimDetailPanel__tagGroup">
            <button
              className="claimDetailPanel__tagCitation"
              onClick={() => onCitationClick?.(entry.refMapping!)}
            >
              {entry.refMapping}
            </button>
          </div>
        </section>
      )}

      {entry.refAnalysis && (
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Analysis</h3>
          <p className="claimDetailPanel__text">
            <ParsedText text={entry.refAnalysis} onIdClick={onNodeClick} />
          </p>
        </section>
      )}

      <hr className="claimDetailPanel__divider" />

      {/* Conclusion Card */}
      <section className="claimDetailPanel__section">
        <div className="claimDetailPanel__conclusionCard">
          <div className="claimDetailPanel__conclusionGrid">
            <div className="claimDetailPanel__conclusionCol">
              <h3 className="claimDetailPanel__sectionTitle">Conclusion</h3>
              <ConclusionBadge conclusion={entry.refConclusion} />
            </div>
            <div className="claimDetailPanel__conclusionCol">
              <h3 className="claimDetailPanel__sectionTitle">Strength</h3>
              <StrengthBar strength={entry.refStrength} />
            </div>
          </div>
        </div>
      </section>

      {entry.refCounteranalysis && (
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Counteranalysis</h3>
          <p className="claimDetailPanel__text">
            <ParsedText text={entry.refCounteranalysis} onIdClick={onNodeClick} />
          </p>
        </section>
      )}
    </>
  );
}

/* ── Relationships Table ────────────────────────────────────────────── */

interface RelationshipEntry {
  id: string;
  name: string;
  conclusion: string;
  strength: string;
  relatedNodes: string[];
}

interface RelationshipsTableProps {
  relationships: RelationshipEntry[];
  onNodeClick: (id: string) => void;
}

function RelationshipsTable({ relationships, onNodeClick }: RelationshipsTableProps) {
  if (relationships.length === 0) return null;

  return (
    <section className="claimDetailPanel__section">
      <h3 className="claimDetailPanel__sectionTitle">Relationships</h3>
      <table className="claimDetailPanel__relTable">
        <thead>
          <tr>
            <th>Node</th>
            <th>Relationship</th>
            <th>Novelty</th>
            <th>Strength</th>
          </tr>
        </thead>
        <tbody>
          {relationships.map((rel) => (
            <tr key={rel.id} className="claimDetailPanel__relRow">
              <td className="claimDetailPanel__relNode">
                <NodePill node={rel.id} onClick={() => onNodeClick(rel.id)} />
              </td>
              <td className="claimDetailPanel__relText">
                <ParsedText text={rel.name} onIdClick={onNodeClick} />
              </td>
              <td className="claimDetailPanel__relNovelty">
                <ConclusionBadge conclusion={rel.conclusion} />
              </td>
              <td className="claimDetailPanel__relStrength">{rel.strength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ── Main Claim Detail View ─────────────────────────────────────────── */

interface ClaimDetailViewProps {
  row: ClaimChartRow;
  relationships: RelationshipEntry[];
  onNodeClick: (id: string) => void;
  onCitationClick?: (citation: string) => void;
}

function ClaimDetailView({ row, relationships, onNodeClick, onCitationClick }: ClaimDetailViewProps) {
  return (
    <>
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

      {/* Relationships Table */}
      <RelationshipsTable relationships={relationships} onNodeClick={onNodeClick} />

      {/* Analysis Section */}
      <section className="claimDetailPanel__section">
        <h3 className="claimDetailPanel__sectionTitle">Analysis</h3>
        <p className="claimDetailPanel__analysis">
          <ParsedText text={row.analysis} onIdClick={onNodeClick} />
        </p>
      </section>

      {/* Counter-analysis Section */}
      {row.counteranalysis && (
        <section className="claimDetailPanel__section">
          <h3 className="claimDetailPanel__sectionTitle">Counter-analysis</h3>
          <p className="claimDetailPanel__counteranalysis">
            <ParsedText text={row.counteranalysis} onIdClick={onNodeClick} />
          </p>
        </section>
      )}

      <hr className="claimDetailPanel__divider" />

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
    </>
  );
}

/* ── Main ClaimDetailPanel Component ─────────────────────────────────── */

interface ClaimDetailPanelProps {
  row: ClaimChartRow | null;
  onClose: () => void;
  onCitationClick?: (citation: string) => void;
  findWorkbenchEntry?: (id: string) => { entry: WorkbenchEntry; priorArtReference: string } | null;
  relationships?: RelationshipEntry[];
}

export function ClaimDetailPanel({ row, onClose, onCitationClick, findWorkbenchEntry, relationships = [] }: ClaimDetailPanelProps) {
  // Breadcrumb navigation state
  const [navStack, setNavStack] = useState<BreadcrumbEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<{ entry: WorkbenchEntry; priorArtReference: string } | null>(null);

  const currentNode = navStack.length > 0 ? navStack[navStack.length - 1] : null;

  const handleNodeClick = (nodeId: string) => {
    if (!findWorkbenchEntry) return;

    const found = findWorkbenchEntry(nodeId);
    if (found) {
      setNavStack((prev) => [...prev, { id: nodeId, label: nodeId }]);
      setCurrentEntry(found);
    }
  };

  const handleBreadcrumbNavigate = (index: number) => {
    if (index < 0) {
      // Go back to claim root
      setNavStack([]);
      setCurrentEntry(null);
    } else {
      // Navigate to specific breadcrumb
      const newStack = navStack.slice(0, index + 1);
      setNavStack(newStack);

      // Fetch the entry for that node
      if (findWorkbenchEntry) {
        const found = findWorkbenchEntry(newStack[newStack.length - 1].id);
        setCurrentEntry(found);
      }
    }
  };

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
        <span className="claimDetailPanel__title">
          {currentNode ? currentNode.id : row.claimId}
        </span>
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
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          rootLabel={row.claimId}
          navStack={navStack}
          onNavigate={handleBreadcrumbNavigate}
        />

        {/* Render either entry detail or claim detail */}
        {currentNode && currentEntry ? (
          <EntryDetailView
            entry={currentEntry.entry}
            priorArtReference={currentEntry.priorArtReference}
            onNodeClick={handleNodeClick}
            onCitationClick={onCitationClick}
          />
        ) : (
          <ClaimDetailView
            row={row}
            relationships={relationships}
            onNodeClick={handleNodeClick}
            onCitationClick={onCitationClick}
          />
        )}
      </div>
    </div>
  );
}

export default ClaimDetailPanel;
