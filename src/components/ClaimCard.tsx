import { Card, Badge, Button } from './base';

export interface ClaimData {
  claimNumber: number;
  isNovel: 'novel' | 'likely-novel' | 'likely-not-novel' | 'not-novel';
  reasoning: string;
  references?: string;
}

interface ClaimCardProps {
  claim: ClaimData;
  onGoToClaimChart?: (claimNumber: number) => void;
  onClaimChartRefClick?: (refId: string) => void;
  /** @deprecated Use onGoToClaimChart instead */
  onInspect?: (claimNumber: number) => void;
}

// Parse text and convert L-refs (L1-8, L18-7, etc.) into clickable links
function ParsedReasoning({
  text,
  onRefClick
}: {
  text: string;
  onRefClick?: (refId: string) => void;
}) {
  // Match L-ref patterns like L1-8, L18-7, etc.
  const refPattern = /\b(L\d+-\d+)\b/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = refPattern.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const refId = match[1];
    parts.push(
      <button
        key={`${refId}-${match.index}`}
        className="claim-card__ref-link"
        onClick={(e) => {
          e.stopPropagation();
          onRefClick?.(refId);
        }}
      >
        {refId}
      </button>
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}

export const ClaimCard = ({ claim, onGoToClaimChart, onClaimChartRefClick, onInspect }: ClaimCardProps) => {
  // Prefer onGoToClaimChart, fallback to onInspect for backward compatibility
  const handleClick = onGoToClaimChart || onInspect;

  return (
    <Card padded className="claim-card">
      <div className="claim-card__content">
        <div className="claim-card__header">
          <h3 className="title-claim">Claim {claim.claimNumber}</h3>
          <Badge variant={claim.isNovel}>
            {claim.isNovel === 'novel' ? 'Novel' :
             claim.isNovel === 'likely-novel' ? 'Likely novel' :
             claim.isNovel === 'likely-not-novel' ? 'Likely not novel' : 'Not novel'}
          </Badge>
        </div>
        <p className="claim-card__reasoning">
          <ParsedReasoning text={claim.reasoning} onRefClick={onClaimChartRefClick} />
        </p>
        {claim.references && <p className="claim-card__references">{claim.references}</p>}
        <div className="claim-card__actions">
          <Button
            variant="secondary"
            size="small"
            onClick={() => handleClick?.(claim.claimNumber)}
          >
            View in claims chart
          </Button>
        </div>
      </div>
    </Card>
  );
};
