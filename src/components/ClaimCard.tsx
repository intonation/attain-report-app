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
  /** @deprecated Use onGoToClaimChart instead */
  onInspect?: (claimNumber: number) => void;
}

export const ClaimCard = ({ claim, onGoToClaimChart, onInspect }: ClaimCardProps) => {
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
        <p className="claim-card__reasoning">{claim.reasoning}</p>
        {claim.references && <p className="claim-card__references">{claim.references}</p>}
        <div className="claim-card__actions">
          <Button
            variant="secondary"
            size="small"
            onClick={() => handleClick?.(claim.claimNumber)}
          >
            Go to claims chart
          </Button>
        </div>
      </div>
    </Card>
  );
};
