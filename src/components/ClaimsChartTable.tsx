import type { ClaimChart, ClaimChartRow, NoveltyConclusion } from '../data/mockData';
import { Badge, type BadgeVariant } from './base/Badge';
import { ReferenceToken, type ReferenceVariant } from './base/ReferenceToken';
import '../styles/claims-chart-table.css';

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

// Helper to map reference code to variant
function getReferenceVariant(code: string): ReferenceVariant {
  if (code.startsWith('L')) return 'line';
  if (code.startsWith('C')) return 'claim';
  if (code.startsWith('F')) return 'feature';
  if (code.startsWith('R')) return 'relationship';
  return 'line';
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
                  <ReferenceToken variant={getReferenceVariant(row.claimId)}>{row.claimId}</ReferenceToken>
                </td>
                <td className="claimsChartTable__cell--claimText">{row.claimText}</td>
                <td className="claimsChartTable__cell--interpretation">{row.interpretation}</td>
                <td className="claimsChartTable__cell--citation">
                  {row.citations && row.citations !== '—' && (
                    <ReferenceToken
                      variant={getReferenceVariant(row.citations)}
                      onClick={(e) => {
                        e.stopPropagation();
                        onCitationClick?.(row.citations);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {row.citations}
                    </ReferenceToken>
                  )}
                  {row.citations === '—' && (
                    <span className="claimsChartTable__citationTag">—</span>
                  )}
                </td>
                <td className="claimsChartTable__cell--novelty">
                  <Badge variant={getNoveltyVariant(row.conclusion)}>
                    {row.conclusion}
                  </Badge>
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
