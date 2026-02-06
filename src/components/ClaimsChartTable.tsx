import type { ClaimChart, ClaimChartRow, NoveltyConclusion } from '../data/mockData';
import '../styles/claims-chart-table.css';

// Helper to get novelty status color
function getStatusColor(status: NoveltyConclusion): string {
  switch (status) {
    case 'Not novel':
      return '#dc2626';
    case 'Likely not novel':
      return '#ca8a04';
    case 'Likely novel':
      return '#65a30d';
    case 'Novel':
      return '#16a34a';
  }
}

// Novelty status icon
function NoveltyIcon({ status }: { status: NoveltyConclusion }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" fill={getStatusColor(status)} />
    </svg>
  );
}

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
  return (
    <div className="claimsChartTable">
      <div className="claimsChartTable__header">
        <h2 className="claimsChartTable__title">{chart.claimNumber}</h2>
        <span className="claimsChartTable__reference">{chart.priorArtReference}</span>
      </div>

      <div className="claimsChartTable__wrapper">
        <table className="claimsChartTable__table">
          <thead>
            <tr>
              <th className="claimsChartTable__col--id">ID</th>
              <th className="claimsChartTable__col--claimText">Claim text</th>
              <th className="claimsChartTable__col--interpretation">Quotation</th>
              <th className="claimsChartTable__col--citation">Citation</th>
              <th className="claimsChartTable__col--novelty">Novelty</th>
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row) => (
              <tr
                key={row.claimId}
                className={`claimsChartTable__row ${
                  selectedRowId === row.claimId ? 'claimsChartTable__row--selected' : ''
                }`}
                onClick={() => onRowClick?.(row)}
              >
                <td className="claimsChartTable__cell--id">
                  <span className="claimsChartTable__idChip">{row.claimId}</span>
                </td>
                <td className="claimsChartTable__cell--claimText">{row.claimText}</td>
                <td className="claimsChartTable__cell--interpretation">{row.interpretation}</td>
                <td className="claimsChartTable__cell--citation">
                  {row.citations && row.citations !== '—' && (
                    <button
                      className="claimsChartTable__citationBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCitationClick?.(row.citations);
                      }}
                    >
                      {row.citations}
                    </button>
                  )}
                  {row.citations === '—' && (
                    <span className="claimsChartTable__citationTag">—</span>
                  )}
                </td>
                <td className="claimsChartTable__cell--novelty">
                  <span
                    className={`claimsChartTable__noveltyChip claimsChartTable__noveltyChip--${row.conclusion
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`}
                  >
                    <NoveltyIcon status={row.conclusion} />
                    <span>{row.conclusion}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClaimsChartTable;
