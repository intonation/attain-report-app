import { Card } from './base';
import { Badge, type BadgeVariant } from './base/Badge';

// Mock status data
const STATUS_DATA = [
  {
    label: 'Independent claim novelty signals',
    value: 'Present',
    variant: 'success' as BadgeVariant,
  },
  {
    label: 'Blocking prior art detected',
    value: 'Yes',
    variant: 'warning' as BadgeVariant,
  },
  {
    label: 'Claim chart',
    value: 'Ready',
    variant: 'success' as BadgeVariant,
  },
  {
    label: 'Scope analysis',
    value: '8/8 complete',
    variant: 'muted' as BadgeVariant,
  },
];

interface StatusRowProps {
  label: string;
  value: string;
  variant: BadgeVariant;
}

const StatusRow = ({ label, value, variant }: StatusRowProps) => {
  const rowStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 'var(--space-3)',
  };

  const labelStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-text)',
    lineHeight: 'var(--line-height-small)',
  };

  return (
    <div style={rowStyles}>
      <span style={labelStyles}>{label}</span>
      <Badge variant={variant}>{value}</Badge>
    </div>
  );
};

export const ResultsStatusCard = () => {
  const cardStyles: React.CSSProperties = {
    padding: 'var(--space-5)',
    backgroundColor: 'var(--color-paper)',
    border: '1px solid var(--color-border)',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-body)',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-4)',
  };

  const rowsContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  };

  return (
    <Card style={cardStyles}>
      <h3 style={titleStyles}>Analysis status</h3>
      <div style={rowsContainerStyles}>
        {STATUS_DATA.map((item) => (
          <StatusRow
            key={item.label}
            label={item.label}
            value={item.value}
            variant={item.variant}
          />
        ))}
      </div>
    </Card>
  );
};
