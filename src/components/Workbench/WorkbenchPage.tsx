import React, { useState, useRef, useCallback, useEffect } from 'react';
import { workbenchData } from '../../data/workbenchData';
import type { WorkbenchClaim, WorkbenchEntry } from '../../data/workbenchData';
import './workbench.css';

type ConclusionStatus = 'Not novel' | 'Novel';

const ALL_STATUSES: ConclusionStatus[] = ['Not novel', 'Novel'];

// Evidence sources - same as claims chart
const EVIDENCE_SOURCES = [
  { id: 'graves', label: 'Graves et al. (US 2019/0329772 A1)', enabled: true },
  { id: 'smith', label: 'Smith (US 2020/0123456)', enabled: true },
  { id: 'johnson', label: 'Johnson (EP 3456789)', enabled: true },
];

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

/* ── Icons ───────────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── Filter Panel ───────────────────────────────────────────────── */

function FilterPanel({
  isOpen,
  onClose,
  noveltyFilter,
  onNoveltyFilterChange,
  evidenceSources,
  onEvidenceSourcesChange
}: {
  isOpen: boolean;
  onClose: () => void;
  noveltyFilter: Set<ConclusionStatus>;
  onNoveltyFilterChange: (filter: Set<ConclusionStatus>) => void;
  evidenceSources: typeof EVIDENCE_SOURCES;
  onEvidenceSourcesChange: (sources: typeof EVIDENCE_SOURCES) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleNoveltyStatus = (status: ConclusionStatus) => {
    const newSet = new Set(noveltyFilter);
    if (newSet.has(status)) {
      if (newSet.size > 1) {
        newSet.delete(status);
      }
    } else {
      newSet.add(status);
    }
    onNoveltyFilterChange(newSet);
  };

  const toggleSource = (id: string) => {
    const newSources = evidenceSources.map(s =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    if (newSources.some(s => s.enabled)) {
      onEvidenceSourcesChange(newSources);
    }
  };

  const handleReset = () => {
    onNoveltyFilterChange(new Set(ALL_STATUSES));
    onEvidenceSourcesChange(EVIDENCE_SOURCES);
  };

  return (
    <div className="workbench__filter-panel" ref={panelRef}>
      <div className="workbench__filter-panel-header">
        <h3>Filters</h3>
        <button className="workbench__filter-panel-close" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className="workbench__filter-panel-section">
        <label className="workbench__filter-panel-label">Novelty status</label>
        <div className="workbench__filter-panel-sources">
          {ALL_STATUSES.map((status) => (
            <label key={status} className="workbench__filter-panel-source">
              <input
                type="checkbox"
                checked={noveltyFilter.has(status)}
                onChange={() => toggleNoveltyStatus(status)}
              />
              <span>{status}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="workbench__filter-panel-section">
        <label className="workbench__filter-panel-label">Evidence sources</label>
        <div className="workbench__filter-panel-sources">
          {evidenceSources.map((source) => (
            <label key={source.id} className="workbench__filter-panel-source">
              <input
                type="checkbox"
                checked={source.enabled}
                onChange={() => toggleSource(source.id)}
              />
              <span>{source.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="workbench__filter-panel-footer">
        <button
          className="workbench__filter-panel-reset"
          onClick={handleReset}
        >
          Reset all
        </button>
      </div>
    </div>
  );
}

/* ── Feature Block Component ─────────────────────────────────────── */

interface FeatureBlockProps {
  entry: WorkbenchEntry;
  isDetailedMode: boolean;
  onCitationClick?: (citation: string) => void;
  onIdClick?: (id: string) => void;
}

function FeatureBlock({ entry, isDetailedMode, onCitationClick, onIdClick }: FeatureBlockProps) {
  return (
    <div className="workbench__feature-block">
      {/* 1. Name - rendered with clickable ID links */}
      <div className="workbench__section workbench__section-name">
        <span className="workbench__feature-name">
          <ParsedText text={entry.name} onIdClick={onIdClick} />
        </span>
      </div>

      {/* 2. Interpretation - primary definition (visually dominant) */}
      <div className="workbench__section workbench__section-interpretation">
        <span className="workbench__section-label">Interpretation</span>
        <p className="workbench__interpretation-text">
          <ParsedText text={entry.interpretation} onIdClick={onIdClick} />
        </p>
      </div>

      {/* 3. Interpretation basis - source references (always visible) */}
      {entry.interpretationBasis && entry.interpretationBasis.length > 0 && (
        <div className="workbench__section workbench__section-basis">
          <span className="workbench__section-label">Interpretation basis</span>
          <div className="workbench__tag-group">
            {entry.interpretationBasis.map((citation, idx) => (
              <button key={idx} className="workbench__tag-citation" onClick={(e) => { e.stopPropagation(); onCitationClick?.(citation); }}>{citation}</button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Supporting description - longer explanatory text (detailed only) */}
      {isDetailedMode && entry.supportingDescription && (
        <div className="workbench__section workbench__section-supporting">
          <span className="workbench__section-label">Supporting description</span>
          <p className="workbench__supporting-text">
            <ParsedText text={entry.supportingDescription} onIdClick={onIdClick} />
          </p>
        </div>
      )}

      {/* 5. Examples - rendered as chips (detailed only) */}
      {isDetailedMode && entry.examples && entry.examples.length > 0 && (
        <div className="workbench__section workbench__section-examples">
          <span className="workbench__section-label">Examples</span>
          <div className="workbench__tag-group">
            {entry.examples.map((example, idx) => (
              <span key={idx} className="workbench__tag-example">{example}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Workbench Table Component ───────────────────────────────────── */

interface WorkbenchTableProps {
  claim: WorkbenchClaim;
  isDetailedMode: boolean;
  onModeChange: (detailed: boolean) => void;
  selectedEntryId?: string;
  highlightedEntryId?: string;
  onEntryClick: (entry: WorkbenchEntry, priorArtReference: string) => void;
  onCitationClick?: (citation: string) => void;
  onIdClick?: (id: string) => void;
  searchText: string;
  onSearchChange: (text: string) => void;
  noveltyFilter: Set<ConclusionStatus>;
  onNoveltyFilterChange: (filter: Set<ConclusionStatus>) => void;
  filterPanelOpen: boolean;
  onFilterPanelOpenChange: (open: boolean) => void;
  evidenceSources: typeof EVIDENCE_SOURCES;
  onEvidenceSourcesChange: (sources: typeof EVIDENCE_SOURCES) => void;
  hasActiveFilters: boolean;
}

function WorkbenchTable({ claim, isDetailedMode, onModeChange, selectedEntryId, highlightedEntryId, onEntryClick, onCitationClick, onIdClick, searchText, onSearchChange, noveltyFilter, onNoveltyFilterChange, filterPanelOpen, onFilterPanelOpenChange, evidenceSources, onEvidenceSourcesChange, hasActiveFilters }: WorkbenchTableProps) {
  // Filter entries based on novelty and search
  const filterEntries = (entries: WorkbenchEntry[]) => {
    return entries.filter((entry) => {
      // Novelty filter
      const conclusion = entry.refConclusion === 'Novel' ? 'Novel' : 'Not novel';
      if (!noveltyFilter.has(conclusion as ConclusionStatus)) return false;

      // Search filter (name and interpretation)
      if (searchText.trim()) {
        const search = searchText.toLowerCase();
        if (!entry.name.toLowerCase().includes(search) && !entry.interpretation.toLowerCase().includes(search)) {
          return false;
        }
      }

      return true;
    });
  };

  const featureEntries = filterEntries(claim.entries.filter(e => e.type === 'Feature'));
  const relationshipEntries = filterEntries(claim.entries.filter(e => e.type === 'Relationship'));
  const novelCount = claim.entries.filter(e => e.refConclusion === 'Novel').length;

  const allFeatureEntries = claim.entries.filter(e => e.type === 'Feature');
  const allRelationshipEntries = claim.entries.filter(e => e.type === 'Relationship');

  return (
    <div className="workbench__chart-section">
      <div className="workbench__chart-sticky-header">
        <div className="workbench__chart-context">
          <span className="workbench__chart-context-claim">{claim.claimNumber}</span>
          {novelCount > 0 && (
            <span className="workbench__novelty-chip workbench__novelty-chip-novel">
              <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#16a34a"/></svg>
              {novelCount} novel
            </span>
          )}
          <span className="workbench__chart-context-ref">{claim.priorArtReference}</span>
          <span className="workbench__chart-context-rationale">
            {allFeatureEntries.length} features, {allRelationshipEntries.length} relationships
          </span>
        </div>

        <div className="workbench__toolbar">
          <div className="workbench__mode-toggle">
            <button
              className={`workbench__mode-toggle-btn ${!isDetailedMode ? 'workbench__mode-toggle-btn-active' : ''}`}
              onClick={() => onModeChange(false)}
            >
              Overview
            </button>
            <button
              className={`workbench__mode-toggle-btn ${isDetailedMode ? 'workbench__mode-toggle-btn-active' : ''}`}
              onClick={() => onModeChange(true)}
            >
              Detailed
            </button>
          </div>

          <div className="workbench__search">
            <SearchIcon />
            <input
              type="text"
              className="workbench__search-input"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchText && (
              <button className="workbench__search-clear" onClick={() => onSearchChange('')}>
                <CloseIcon />
              </button>
            )}
          </div>

          <div className="workbench__filter-btn-wrap">
            <button
              className={`workbench__filter-btn ${hasActiveFilters ? 'workbench__filter-btn-active' : ''}`}
              onClick={() => onFilterPanelOpenChange(!filterPanelOpen)}
            >
              <FilterIcon />
              Filter
              {hasActiveFilters && <span className="workbench__filter-badge" />}
            </button>
            <FilterPanel
              isOpen={filterPanelOpen}
              onClose={() => onFilterPanelOpenChange(false)}
              noveltyFilter={noveltyFilter}
              onNoveltyFilterChange={onNoveltyFilterChange}
              evidenceSources={evidenceSources}
              onEvidenceSourcesChange={onEvidenceSourcesChange}
            />
          </div>
        </div>
      </div>

      <table className="workbench__table">
        <thead>
          <tr>
            <th className="workbench__col-id">ID</th>
            <th className="workbench__col-content">Content</th>
          </tr>
        </thead>
        <tbody>
          {featureEntries.length === 0 ? (
            <tr>
              <td colSpan={2} className="workbench__no-results">No features found</td>
            </tr>
          ) : (
            featureEntries.map((entry) => (
              <tr
                key={entry.id}
                data-entry-id={entry.id}
                className={`workbench__row workbench__row-clickable ${selectedEntryId === entry.id ? 'workbench__row-selected' : ''} ${highlightedEntryId === entry.id ? 'workbench__row-highlighted' : ''}`}
                onClick={() => onEntryClick(entry, claim.priorArtReference)}
              >
                <td className="workbench__cell-id">{entry.id}</td>
                <td className="workbench__cell-content">
                  <FeatureBlock entry={entry} isDetailedMode={isDetailedMode} onCitationClick={onCitationClick} onIdClick={onIdClick} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {relationshipEntries.length > 0 && (
        <>
          <div className="workbench__section-divider">
            <span>Relationships</span>
          </div>
          <table className="workbench__table">
            <tbody>
              {relationshipEntries.map((entry) => (
                <tr
                  key={entry.id}
                  data-entry-id={entry.id}
                  className={`workbench__row workbench__row-relationship workbench__row-clickable ${selectedEntryId === entry.id ? 'workbench__row-selected' : ''} ${highlightedEntryId === entry.id ? 'workbench__row-highlighted' : ''}`}
                  onClick={() => onEntryClick(entry, claim.priorArtReference)}
                >
                  <td className="workbench__cell-id">{entry.id}</td>
                  <td className="workbench__cell-content">
                    <FeatureBlock entry={entry} isDetailedMode={isDetailedMode} onCitationClick={onCitationClick} onIdClick={onIdClick} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {(featureEntries.length + relationshipEntries.length) !== (allFeatureEntries.length + allRelationshipEntries.length) && (
        <div className="workbench__filter-summary">
          Showing {featureEntries.length + relationshipEntries.length} of {allFeatureEntries.length + allRelationshipEntries.length} entries
        </div>
      )}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────── */

export interface WorkbenchSelection {
  entry: WorkbenchEntry;
  priorArtReference: string;
}

interface WorkbenchPageProps {
  showTitle?: boolean;
  selectedEntryId?: string;
  onEntrySelect?: (selection: WorkbenchSelection) => void;
  onCitationClick?: (citation: string) => void;
  highlightedEntryId?: string;
}

export default function WorkbenchPage({
  showTitle = true,
  selectedEntryId,
  onEntrySelect,
  onCitationClick,
  highlightedEntryId: externalHighlightedId
}: WorkbenchPageProps) {
  const [isDetailedMode, setIsDetailedMode] = useState(false);
  const [highlightedEntryId, setHighlightedEntryId] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<number | null>(null);

  // Search and filter state
  const [searchText, setSearchText] = useState('');
  const [noveltyFilter, setNoveltyFilter] = useState<Set<ConclusionStatus>>(new Set(ALL_STATUSES));
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [evidenceSources, setEvidenceSources] = useState(EVIDENCE_SOURCES);

  const hasActiveFilters = evidenceSources.some(s => !s.enabled) ||
    noveltyFilter.size < ALL_STATUSES.length;

  const handleEntryClick = (entry: WorkbenchEntry, priorArtReference: string) => {
    onEntrySelect?.({ entry, priorArtReference });
  };

  const handleIdClick = useCallback((id: string) => {
    // Find the row element with matching data-entry-id
    const rowElement = document.querySelector(`[data-entry-id="${id}"]`);
    if (rowElement) {
      // Scroll the row into view
      rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Clear any existing highlight timeout
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }

      // Set highlight
      setHighlightedEntryId(id);

      // Remove highlight after animation
      highlightTimeoutRef.current = window.setTimeout(() => {
        setHighlightedEntryId(null);
      }, 1500);
    }
  }, []);

  // Handle external highlight (from navigation)
  useEffect(() => {
    if (externalHighlightedId) {
      handleIdClick(externalHighlightedId);
    }
  }, [externalHighlightedId, handleIdClick]);

  return (
    <div className="workbench__page">
      {showTitle && (
        <header className="workbench__header">
          <h1 className="workbench__page-title">Workbench</h1>
        </header>
      )}
      <main className="workbench__main">
        {workbenchData.map((claim) => (
          <WorkbenchTable
            key={claim.claimNumber}
            claim={claim}
            isDetailedMode={isDetailedMode}
            onModeChange={setIsDetailedMode}
            selectedEntryId={selectedEntryId}
            highlightedEntryId={highlightedEntryId ?? undefined}
            onEntryClick={handleEntryClick}
            onCitationClick={onCitationClick}
            onIdClick={handleIdClick}
            searchText={searchText}
            onSearchChange={setSearchText}
            noveltyFilter={noveltyFilter}
            onNoveltyFilterChange={setNoveltyFilter}
            filterPanelOpen={filterPanelOpen}
            onFilterPanelOpenChange={setFilterPanelOpen}
            evidenceSources={evidenceSources}
            onEvidenceSourcesChange={setEvidenceSources}
            hasActiveFilters={hasActiveFilters}
          />
        ))}
      </main>
    </div>
  );
}
