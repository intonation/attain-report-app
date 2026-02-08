import { useState } from 'react';
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

/* ── Node Pill Component ────────────────────────────────────────────── */

function NodePill({ node, onClick }: { node: string; onClick?: () => void }) {
  const tooltip = node.startsWith('R') ? 'Relationship' : node.startsWith('F') ? 'Feature' : '';
  return (
    <button
      className="workbench__node-pill"
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
    <nav className="workbench__breadcrumb">
      <button
        className="workbench__breadcrumb-link"
        onClick={() => onNavigate(-1)}
      >
        {rootLabel}
      </button>
      {navStack.map((entry, i) => (
        <span key={i} className="workbench__breadcrumb-item">
          <span className="workbench__breadcrumb-sep">&rsaquo;</span>
          {i < navStack.length - 1 ? (
            <button
              className="workbench__breadcrumb-link"
              onClick={() => onNavigate(i)}
            >
              {entry.label}
            </button>
          ) : (
            <span className="workbench__breadcrumb-current">{entry.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ── Relationships Table ────────────────────────────────────────────── */

export interface RelationshipEntry {
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
    <section className="workbench__detail-panel-section">
      <h3>Relationships</h3>
      <table className="workbench__rel-table">
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
            <tr key={rel.id} className="workbench__rel-row">
              <td className="workbench__rel-node">
                <NodePill node={rel.id} onClick={() => onNodeClick(rel.id)} />
              </td>
              <td className="workbench__rel-text">
                <ParsedText text={rel.name} onIdClick={onNodeClick} />
              </td>
              <td className="workbench__rel-novelty">
                <ConclusionBadge conclusion={rel.conclusion} />
              </td>
              <td className="workbench__rel-strength">{rel.strength}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/* ── Entry Detail View ──────────────────────────────────────────────── */

interface EntryDetailViewProps {
  entry: WorkbenchEntry;
  priorArtReference: string;
  relationships: RelationshipEntry[];
  onNodeClick: (id: string) => void;
  onCitationClick?: (citation: string) => void;
}

function EntryDetailView({ entry, priorArtReference, relationships, onNodeClick, onCitationClick }: EntryDetailViewProps) {
  return (
    <>
      <section className="workbench__detail-panel-section">
        <h3>{entry.type === 'Feature' ? 'Feature' : 'Relationship'}</h3>
        <p><ParsedText text={entry.name} onIdClick={onNodeClick} /></p>
      </section>

      <section className="workbench__detail-panel-section">
        <h3>{entry.type === 'Feature' ? 'Definition' : 'Interpretation'}</h3>
        <p><ParsedText text={entry.interpretation} onIdClick={onNodeClick} /></p>
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
          <p><ParsedText text={entry.supportingDescription} onIdClick={onNodeClick} /></p>
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

      {/* Relationships Table */}
      <RelationshipsTable relationships={relationships} onNodeClick={onNodeClick} />

      <hr className="workbench__detail-panel-divider" />

      {/* Reference Section */}
      <h3 className="workbench__detail-panel-ref-title">{priorArtReference}</h3>

      {entry.refSummary && (
        <section className="workbench__detail-panel-section">
          <h3>Summary</h3>
          <p><ParsedText text={entry.refSummary} onIdClick={onNodeClick} /></p>
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
          <p><ParsedText text={entry.refAnalysis} onIdClick={onNodeClick} /></p>
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

      {entry.refCounteranalysis && (
        <section className="workbench__detail-panel-section">
          <h3>Counteranalysis</h3>
          <p><ParsedText text={entry.refCounteranalysis} onIdClick={onNodeClick} /></p>
        </section>
      )}
    </>
  );
}

/* ── Workbench Detail Panel ──────────────────────────────────────── */

export interface WorkbenchDetailPanelProps {
  entry: WorkbenchEntry | null;
  priorArtReference: string;
  onClose: () => void;
  onIdClick?: (id: string) => void;
  onCitationClick?: (citation: string) => void;
  findWorkbenchEntry?: (id: string) => { entry: WorkbenchEntry; priorArtReference: string } | null;
  relationships?: RelationshipEntry[];
}

export function WorkbenchDetailPanel({
  entry,
  priorArtReference,
  onClose,
  onIdClick,
  onCitationClick,
  findWorkbenchEntry,
  relationships = [],
}: WorkbenchDetailPanelProps) {
  // Breadcrumb navigation state
  const [navStack, setNavStack] = useState<BreadcrumbEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState<{ entry: WorkbenchEntry; priorArtReference: string } | null>(null);

  const currentNode = navStack.length > 0 ? navStack[navStack.length - 1] : null;
  const displayEntry = currentEntry?.entry ?? entry;
  const displayPriorArt = currentEntry?.priorArtReference ?? priorArtReference;

  const handleNodeClick = (nodeId: string) => {
    if (findWorkbenchEntry) {
      // Use internal navigation with breadcrumbs
      const found = findWorkbenchEntry(nodeId);
      if (found) {
        setNavStack((prev) => [...prev, { id: nodeId, label: nodeId }]);
        setCurrentEntry(found);
      }
    } else if (onIdClick) {
      // Fallback to external handler (rewrite panel)
      onIdClick(nodeId);
    }
  };

  const handleBreadcrumbNavigate = (index: number) => {
    if (index < 0) {
      // Go back to root entry
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
        <span className="workbench__detail-panel-title">
          {currentNode ? currentNode.id : entry.id}
        </span>
        <button className="workbench__detail-panel-close" onClick={onClose} aria-label="Close panel">
          <CloseIcon />
        </button>
      </div>

      <div className="workbench__detail-panel-body">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          rootLabel={entry.id}
          navStack={navStack}
          onNavigate={handleBreadcrumbNavigate}
        />

        {/* Entry Detail */}
        {displayEntry && (
          <EntryDetailView
            entry={displayEntry}
            priorArtReference={displayPriorArt}
            relationships={currentNode ? [] : relationships}
            onNodeClick={handleNodeClick}
            onCitationClick={onCitationClick}
          />
        )}
      </div>
    </div>
  );
}

export default WorkbenchDetailPanel;
