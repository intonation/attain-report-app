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
  const cardStyles: React.CSSProperties = {
    padding: 'var(--space-5)',
    marginBottom: 'var(--space-4)',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    marginBottom: 'var(--space-3)',
  };

  const claimNumberStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-body)',
    fontWeight: 600,
    color: 'var(--color-text)',
  };

  const reasoningStyles: React.CSSProperties = {
    fontSize: '14px',
    lineHeight: 'var(--line-height-body)',
    color: 'var(--color-text)',
    marginBottom: 'var(--space-4)',
  };

  const referencesStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-xsmall)',
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-4)',
  };

  return (
    <Card style={cardStyles}>
      <div style={headerStyles}>
        <span style={claimNumberStyles}>Claim {claim.claimNumber}</span>
        <Badge variant={
          claim.isNovel === 'novel' ? 'success' :
          claim.isNovel === 'likely-novel' ? 'success-light' :
          claim.isNovel === 'likely-not-novel' ? 'warning' : 'error'
        }>
          {claim.isNovel === 'novel' ? 'Novel' :
           claim.isNovel === 'likely-novel' ? 'Likely novel' :
           claim.isNovel === 'likely-not-novel' ? 'Likely not novel' : 'Not novel'}
        </Badge>
      </div>
      <p style={reasoningStyles}>{claim.reasoning}</p>
      {claim.references && <p style={referencesStyles}>{claim.references}</p>}
      <Button
        variant="secondary"
        size="small"
        onClick={() => handleClick?.(claim.claimNumber)}
      >
        Go to claims chart
      </Button>
    </Card>
  );
};
