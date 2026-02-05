import { Card } from './base';

interface CalloutCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const CalloutCard = ({ title, subtitle, children }: CalloutCardProps) => {
  const cardStyles: React.CSSProperties = {
    padding: 'var(--space-5)',
    backgroundColor: 'var(--color-paper)',
    border: '1px solid var(--color-border)',
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-body)',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: 'var(--space-2)',
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-small)',
    fontWeight: 500,
    color: 'var(--color-text-muted)',
    marginBottom: 'var(--space-3)',
  };

  const contentStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-small)',
    lineHeight: 'var(--line-height-body)',
    color: 'var(--color-text)',
  };

  return (
    <Card style={cardStyles}>
      <h3 style={titleStyles}>{title}</h3>
      {subtitle && <p style={subtitleStyles}>{subtitle}</p>}
      <div style={contentStyles}>{children}</div>
    </Card>
  );
};
