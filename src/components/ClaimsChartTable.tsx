import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { ClaimChart, ClaimChartRow, NoveltyConclusion } from '../data/mockData';
import { Badge, type BadgeVariant } from './base/Badge';
import { ReferenceToken, type ReferenceVariant } from './base/ReferenceToken';
import '../styles/claims-chart-table.css';

/* ── Types ──────────────────────────────────────────────────────── */

type ConclusionStatus = NoveltyConclusion;

const ALL_STATUSES: ConclusionStatus[] = ['Not novel', 'Likely not novel', 'Likely novel', 'Novel'];

// Column visibility - base columns (not including evidence source columns)
type BaseColumnId = 'id' | 'claimText' | 'novelty';
const BASE_COLUMNS: { id: BaseColumnId; label: string }[] = [
  { id: 'id', label: 'ID' },
  { id: 'claimText', label: 'Claim text' },
  { id: 'novelty', label: 'Novelty' },
];
const DEFAULT_VISIBLE_BASE_COLUMNS = new Set<BaseColumnId>(['id', 'claimText', 'novelty']);

// Evidence sources - each adds quotation + citation columns
interface EvidenceSource {
  id: string;
  label: string;
  shortLabel: string;
}

const EVIDENCE_SOURCES: EvidenceSource[] = [
  { id: 'graves', label: 'Graves et al. (US 2019/0329772 A1)', shortLabel: 'Graves' },
  { id: 'smith', label: 'Smith (US 2020/0123456)', shortLabel: 'Smith' },
  { id: 'johnson', label: 'Johnson (EP 3456789)', shortLabel: 'Johnson' },
];

// Default to only Graves selected
const DEFAULT_EVIDENCE_SOURCES = new Set<string>(['graves']);

// Mock quotations for Smith (secondary evidence source)
const SMITH_QUOTATIONS: Record<string, { quotation: string; citation: string }> = {
  'L1-1': {
    quotation: '"The vehicle controller module continuously monitors spacing between the host vehicle and preceding traffic to maintain a user-defined following distance."',
    citation: 'col.4, ll.12-18',
  },
  'L1-2': {
    quotation: '"Headway distance is measured from the front bumper of the host vehicle to the rear bumper of the lead vehicle using forward-facing radar sensors."',
    citation: 'col.3, ll.45-48',
  },
  'L1-3': {
    quotation: '"The sensor array includes radar, lidar, and camera systems configured to detect relative velocity and acceleration of surrounding vehicles."',
    citation: 'col.5, ll.22-30',
  },
  'L1-4': {
    quotation: '"A comparator circuit evaluates whether current spacing falls below the threshold value stored in memory."',
    citation: 'col.7, ll.5-8',
  },
  'L1-5': {
    quotation: '"When spacing drops below threshold, the braking controller selects from a plurality of deceleration profiles."',
    citation: 'col.8, ll.33-40',
  },
  'L1-6': {
    quotation: '"The system applies graduated braking to restore the target following distance."',
    citation: 'col.9, ll.1-5',
  },
  'L1-7': {
    quotation: '"The brake actuator module receives commands from the central controller and modulates brake pressure accordingly."',
    citation: 'col.10, ll.44-50',
  },
  'L1-8': {
    quotation: '—',
    citation: '—',
  },
  'L1-9': {
    quotation: '—',
    citation: '—',
  },
  'L1-10': {
    quotation: '—',
    citation: '—',
  },
  'L18-1': {
    quotation: '"A non-transitory computer-readable medium storing executable instructions for vehicle spacing control."',
    citation: 'col.12, ll.1-4',
  },
  'L18-2': {
    quotation: '"The instructions, when executed by a processor, cause the processor to implement adaptive cruise functionality."',
    citation: 'col.12, ll.8-12',
  },
  'L18-3': {
    quotation: '"The system automatically adjusts vehicle speed to maintain a preset headway distance."',
    citation: 'col.4, ll.20-24',
  },
  'L18-4': {
    quotation: '"Distance to the forward vehicle is continuously calculated based on sensor fusion data."',
    citation: 'col.5, ll.55-58',
  },
  'L18-5': {
    quotation: '"Multiple sensor modalities provide redundant measurements of target vehicle position, velocity, and acceleration."',
    citation: 'col.6, ll.12-18',
  },
  'L18-6': {
    quotation: '"Upon detecting insufficient headway, the controller initiates a braking sequence to restore safe spacing."',
    citation: 'col.8, ll.48-52',
  },
  'L18-7': {
    quotation: '—',
    citation: '—',
  },
  'L18-8': {
    quotation: '—',
    citation: '—',
  },
};

/* ── Icons ──────────────────────────────────────────────────────── */

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

/* ── Helper Functions ───────────────────────────────────────────── */

function getNoveltyVariant(status: NoveltyConclusion): BadgeVariant {
  switch (status) {
    case 'Novel': return 'novel';
    case 'Likely novel': return 'likely-novel';
    case 'Likely not novel': return 'likely-not-novel';
    case 'Not novel': return 'not-novel';
  }
}

function getReferenceVariant(code: string): ReferenceVariant {
  if (code.startsWith('L')) return 'line';
  if (code.startsWith('C')) return 'claim';
  if (code.startsWith('F')) return 'feature';
  if (code.startsWith('R')) return 'relationship';
  return 'line';
}

function getStatusColor(status: ConclusionStatus): string {
  switch (status) {
    case 'Not novel': return '#dc2626';
    case 'Likely not novel': return '#ca8a04';
    case 'Likely novel': return '#65a30d';
    case 'Novel': return '#16a34a';
  }
}

function getStatusIcon(status: ConclusionStatus) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" fill={getStatusColor(status)} />
    </svg>
  );
}

/* ── Filter Panel ───────────────────────────────────────────────── */

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  noveltyFilter: Set<ConclusionStatus>;
  onNoveltyFilterChange: (filter: Set<ConclusionStatus>) => void;
  visibleBaseColumns: Set<BaseColumnId>;
  onVisibleBaseColumnsChange: (columns: Set<BaseColumnId>) => void;
  evidenceSources: Set<string>;
  onEvidenceSourcesChange: (sources: Set<string>) => void;
}

function FilterPanel({
  isOpen,
  onClose,
  noveltyFilter,
  onNoveltyFilterChange,
  visibleBaseColumns,
  onVisibleBaseColumnsChange,
  evidenceSources,
  onEvidenceSourcesChange,
}: FilterPanelProps) {
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

  const toggleBaseColumn = (columnId: BaseColumnId) => {
    const newSet = new Set(visibleBaseColumns);
    if (newSet.has(columnId)) {
      if (newSet.size > 1) {
        newSet.delete(columnId);
      }
    } else {
      newSet.add(columnId);
    }
    onVisibleBaseColumnsChange(newSet);
  };

  const toggleEvidenceSource = (sourceId: string) => {
    const newSet = new Set(evidenceSources);
    if (newSet.has(sourceId)) {
      newSet.delete(sourceId);
    } else {
      newSet.add(sourceId);
    }
    onEvidenceSourcesChange(newSet);
  };

  const handleReset = () => {
    onNoveltyFilterChange(new Set(ALL_STATUSES));
    onVisibleBaseColumnsChange(new Set(DEFAULT_VISIBLE_BASE_COLUMNS));
    onEvidenceSourcesChange(new Set(DEFAULT_EVIDENCE_SOURCES));
  };

  return (
    <div className="claimsChartTable__filterPanel" ref={panelRef}>
      <div className="claimsChartTable__filterPanelHeader">
        <h3>Filters</h3>
        <button className="claimsChartTable__filterPanelClose" onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      <div className="claimsChartTable__filterSection">
        <label className="claimsChartTable__filterLabel">Evidence sources</label>
        <div className="claimsChartTable__filterOptions">
          {EVIDENCE_SOURCES.map((source) => (
            <label key={source.id} className="claimsChartTable__filterOption claimsChartTable__filterOption--source">
              <input
                type="checkbox"
                checked={evidenceSources.has(source.id)}
                onChange={() => toggleEvidenceSource(source.id)}
              />
              <span>{source.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="claimsChartTable__filterSection">
        <label className="claimsChartTable__filterLabel">Novelty status</label>
        <div className="claimsChartTable__filterOptions">
          {ALL_STATUSES.map((status) => (
            <label key={status} className="claimsChartTable__filterOption">
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

      <div className="claimsChartTable__filterSection">
        <label className="claimsChartTable__filterLabel">Visible columns</label>
        <div className="claimsChartTable__filterOptions">
          {BASE_COLUMNS.map((col) => (
            <label key={col.id} className="claimsChartTable__filterOption">
              <input
                type="checkbox"
                checked={visibleBaseColumns.has(col.id)}
                onChange={() => toggleBaseColumn(col.id)}
              />
              <span>{col.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="claimsChartTable__filterFooter">
        <button className="claimsChartTable__filterReset" onClick={handleReset}>
          Reset all
        </button>
      </div>
    </div>
  );
}

/* ── Claims Chart Table ─────────────────────────────────────────── */

interface ClaimsChartTableProps {
  chart: ClaimChart;
  selectedRowId?: string;
  onRowClick?: (row: ClaimChartRow) => void;
  onCitationClick?: (citation: string) => void;
}

export function ClaimsChartTable({
  chart,
  selectedRowId,
  onRowClick,
  onCitationClick,
}: ClaimsChartTableProps) {
  const tableRef = useRef<HTMLTableElement>(null);

  // Search state
  const [searchText, setSearchText] = useState('');

  // Novelty filter state
  const [noveltyFilter, setNoveltyFilter] = useState<Set<ConclusionStatus>>(new Set(ALL_STATUSES));

  // Filter panel state
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  // Column visibility state (base columns only)
  const [visibleBaseColumns, setVisibleBaseColumns] = useState<Set<BaseColumnId>>(new Set(DEFAULT_VISIBLE_BASE_COLUMNS));

  // Evidence sources state - each selected source adds quotation + citation columns
  const [evidenceSources, setEvidenceSources] = useState<Set<string>>(new Set(DEFAULT_EVIDENCE_SOURCES));

  // Get selected evidence sources in order
  const selectedSources = React.useMemo(() => {
    return EVIDENCE_SOURCES.filter(s => evidenceSources.has(s.id));
  }, [evidenceSources]);

  // Row highlight state
  const [highlightedRowId, setHighlightedRowId] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<number | null>(null);

  // Scroll to selected row and highlight when selectedRowId changes
  useEffect(() => {
    if (selectedRowId && tableRef.current) {
      const row = tableRef.current.querySelector(`[data-claim-id="${selectedRowId}"]`);
      if (row) {
        row.scrollIntoView({ behavior: 'smooth', block: 'center' });

        if (highlightTimeoutRef.current) {
          clearTimeout(highlightTimeoutRef.current);
        }

        setHighlightedRowId(selectedRowId);

        highlightTimeoutRef.current = window.setTimeout(() => {
          setHighlightedRowId(null);
        }, 1500);
      }
    }
  }, [selectedRowId]);

  // Handle row selection - stub handler that logs the ID
  const handleRowClick = useCallback((row: ClaimChartRow) => {
    console.log('onRowSelect:', row.claimId);
    onRowClick?.(row);
  }, [onRowClick]);

  // Filter rows
  const filteredRows = chart.rows.filter((row) => {
    // Novelty filter
    if (!noveltyFilter.has(row.conclusion)) return false;

    // Search filter (claim text only)
    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      if (!row.claimText.toLowerCase().includes(search)) return false;
    }

    return true;
  });

  // Determine if any filters are active
  const hasActiveFilters = noveltyFilter.size < ALL_STATUSES.length ||
    visibleBaseColumns.size < BASE_COLUMNS.length ||
    evidenceSources.size !== DEFAULT_EVIDENCE_SOURCES.size ||
    ![...evidenceSources].every(s => DEFAULT_EVIDENCE_SOURCES.has(s));

  return (
    <div className="claimsChartTable">
      {/* Sticky Header */}
      <div className="claimsChartTable__stickyHeader">
        {/* Chart Context - Claim title and novelty status */}
        <div className="claimsChartTable__context">
          <span className="claimsChartTable__contextClaim">{chart.claimNumber}</span>
          <span className={`claimsChartTable__noveltyChip claimsChartTable__noveltyChip--${chart.noveltyStatus.toLowerCase().replace(/\s+/g, '-')}`}>
            {getStatusIcon(chart.noveltyStatus)}
            {chart.noveltyStatus}
          </span>
          <span className="claimsChartTable__contextRef">{chart.priorArtReference}</span>
        </div>

        {/* Summary sentence */}
        <p className="claimsChartTable__summary">{chart.summary}</p>

        {/* Toolbar */}
        <div className="claimsChartTable__toolbar">
          {/* Search */}
          <div className="claimsChartTable__search">
            <SearchIcon />
            <input
              type="text"
              className="claimsChartTable__searchInput"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            {searchText && (
              <button className="claimsChartTable__searchClear" onClick={() => setSearchText('')}>
                <CloseIcon />
              </button>
            )}
          </div>

          {/* Filter Button */}
          <div className="claimsChartTable__filterBtnWrap">
            <button
              className={`claimsChartTable__filterBtn ${hasActiveFilters ? 'claimsChartTable__filterBtn--active' : ''}`}
              onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            >
              <FilterIcon />
              Filter
              {hasActiveFilters && <span className="claimsChartTable__filterBadge" />}
            </button>
            <FilterPanel
              isOpen={filterPanelOpen}
              onClose={() => setFilterPanelOpen(false)}
              noveltyFilter={noveltyFilter}
              onNoveltyFilterChange={setNoveltyFilter}
              visibleBaseColumns={visibleBaseColumns}
              onVisibleBaseColumnsChange={setVisibleBaseColumns}
              evidenceSources={evidenceSources}
              onEvidenceSourcesChange={setEvidenceSources}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="claimsChartTable__wrapper">
        <table ref={tableRef} className="claimsChartTable__table">
          <thead>
            <tr>
              {visibleBaseColumns.has('id') && <th className="claimsChartTable__col--id">ID</th>}
              {visibleBaseColumns.has('claimText') && <th className="claimsChartTable__col--claimText">Claim text</th>}
              {/* Dynamic quotation + citation columns for each selected evidence source */}
              {selectedSources.map((source) => (
                <React.Fragment key={source.id}>
                  <th className="claimsChartTable__col--interpretation">
                    Quotation{selectedSources.length > 1 ? ` (${source.shortLabel})` : ''}
                  </th>
                  <th className="claimsChartTable__col--citation">
                    Citation{selectedSources.length > 1 ? ` (${source.shortLabel})` : ''}
                  </th>
                </React.Fragment>
              ))}
              {visibleBaseColumns.has('novelty') && <th className="claimsChartTable__col--novelty">Novelty</th>}
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 ? (
              <tr>
                <td colSpan={visibleBaseColumns.size + (selectedSources.length * 2)} className="claimsChartTable__noResults">
                  No rows match current filters
                </td>
              </tr>
            ) : (
              filteredRows.map((row) => (
                <tr
                  key={row.claimId}
                  data-claim-id={row.claimId}
                  className={`claimsChartTable__row ${
                    selectedRowId === row.claimId ? 'claimsChartTable__row--selected' : ''
                  } ${highlightedRowId === row.claimId ? 'claimsChartTable__row--highlighted' : ''}`}
                  onClick={() => handleRowClick(row)}
                >
                  {visibleBaseColumns.has('id') && (
                    <td className="claimsChartTable__cell--id">
                      <ReferenceToken variant={getReferenceVariant(row.claimId)}>{row.claimId}</ReferenceToken>
                    </td>
                  )}
                  {visibleBaseColumns.has('claimText') && (
                    <td className="claimsChartTable__cell--claimText">{row.claimText}</td>
                  )}
                  {/* Dynamic quotation + citation cells for each selected evidence source */}
                  {selectedSources.map((source) => {
                    // Get quotation/citation based on source
                    let quotation = '—';
                    let citation = '—';

                    if (source.id === 'graves') {
                      quotation = row.interpretation;
                      citation = row.citations;
                    } else if (source.id === 'smith') {
                      const smithData = SMITH_QUOTATIONS[row.claimId];
                      if (smithData) {
                        quotation = smithData.quotation;
                        citation = smithData.citation;
                      }
                    }
                    // Johnson remains as '—' (no mock data)

                    return (
                      <React.Fragment key={source.id}>
                        <td className="claimsChartTable__cell--interpretation">
                          {quotation}
                        </td>
                        <td className="claimsChartTable__cell--citation">
                          {citation && citation !== '—' ? (
                            <ReferenceToken
                              variant="line"
                              onClick={(e) => {
                                e.stopPropagation();
                                onCitationClick?.(citation);
                              }}
                              style={{ cursor: 'pointer' }}
                            >
                              {citation}
                            </ReferenceToken>
                          ) : (
                            <span className="claimsChartTable__citationTag">—</span>
                          )}
                        </td>
                      </React.Fragment>
                    );
                  })}
                  {visibleBaseColumns.has('novelty') && (
                    <td className="claimsChartTable__cell--novelty">
                      <Badge variant={getNoveltyVariant(row.conclusion)}>
                        {row.conclusion}
                      </Badge>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Filter Summary */}
      {filteredRows.length !== chart.rows.length && (
        <div className="claimsChartTable__filterSummary">
          Showing {filteredRows.length} of {chart.rows.length} rows
        </div>
      )}
    </div>
  );
}

export default ClaimsChartTable;
