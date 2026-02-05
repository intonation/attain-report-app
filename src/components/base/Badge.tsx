import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'muted';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

export const Badge = ({
  variant = 'default',
  children,
  style,
  ...props
}: BadgeProps) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--space-1) var(--space-2)',
    fontSize: 'var(--font-size-xsmall)',
    fontFamily: 'var(--font-mono)',
    fontWeight: 500,
    borderRadius: '2px',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  };

  const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--color-accent-subtle)',
      color: 'var(--color-accent)',
    },
    success: {
      backgroundColor: 'var(--color-accent-subtle)',
      color: 'var(--color-accent)',
    },
    warning: {
      backgroundColor: 'rgba(180, 120, 60, 0.12)',
      color: '#8b6914',
    },
    muted: {
      backgroundColor: 'var(--color-grey-mid)',
      color: 'var(--color-text-muted)',
    },
  };

  return (
    <span style={{ ...baseStyles, ...variantStyles[variant], ...style }} {...props}>
      {children}
    </span>
  );
};
