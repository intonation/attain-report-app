import type { HTMLAttributes, ReactNode } from 'react';

export type ReferenceVariant = 'line' | 'claim' | 'feature' | 'relationship';

export interface ReferenceTokenProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: ReferenceVariant;
  children: ReactNode;
}

export const ReferenceToken = ({
  variant = 'line',
  children,
  style,
  ...props
}: ReferenceTokenProps) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--space-1) var(--space-2)',
    fontSize: 'var(--font-size-xsmall)',
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    borderRadius: '2px',
    letterSpacing: '0.02em',
  };

  const variantStyles: Record<ReferenceVariant, React.CSSProperties> = {
    line: {
      backgroundColor: 'var(--color-accent-subtle)',
      color: 'var(--color-accent)',
    },
    claim: {
      backgroundColor: 'var(--color-accent-subtle)',
      color: 'var(--color-accent)',
    },
    feature: {
      backgroundColor: 'var(--color-domain-feature-subtle)',
      color: 'var(--color-domain-feature)',
    },
    relationship: {
      backgroundColor: 'var(--color-domain-relationship-subtle)',
      color: 'var(--color-domain-relationship)',
    },
  };

  return (
    <span style={{ ...baseStyles, ...variantStyles[variant], ...style }} {...props}>
      {children}
    </span>
  );
};
