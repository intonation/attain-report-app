import { Card, Badge, Button } from './base';

export interface ClaimData {
  claimNumber: number;
  isNovel: boolean;
  reasoning: string;
  references?: string;
}

interface ClaimCardProps {
  claim: ClaimData;
  onInspect?: (claimNumber: number) => void;
}

export const ClaimCard = ({ claim, onInspect }: ClaimCardProps) => {
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
    fontSize: 'var(--font-size-small)',
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
        <Badge variant="success">{claim.isNovel ? 'Novel' : 'Not Novel'}</Badge>
      </div>
      <p style={reasoningStyles}>{claim.reasoning}</p>
      {claim.references && <p style={referencesStyles}>{claim.references}</p>}
      <Button
        variant="secondary"
        size="small"
        onClick={() => onInspect?.(claim.claimNumber)}
      >
        Inspect claim
      </Button>
    </Card>
  );
};
