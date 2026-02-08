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
    display: 'inline',
    padding: 0,
    fontSize: 'inherit',
    fontFamily: 'inherit',
    background: 'transparent',
    border: 'none',
    color: '#3B60E4',
    textDecoration: 'underline',
    textDecorationStyle: 'dotted',
    textUnderlineOffset: '2px',
    transition: 'color 0.15s ease',
  };

  // For non-citation variants (feature, relationship), keep distinct colors
  const variantStyles: Record<ReferenceVariant, React.CSSProperties> = {
    line: {},
    claim: {},
    feature: {
      color: 'var(--color-domain-feature)',
    },
    relationship: {
      color: 'var(--color-domain-relationship)',
    },
  };

  return (
    <span style={{ ...baseStyles, ...variantStyles[variant], ...style }} {...props}>
      {children}
    </span>
  );
};
