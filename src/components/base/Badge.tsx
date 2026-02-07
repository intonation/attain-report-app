import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant =
  | 'default'
  | 'success'
  | 'success-light'
  | 'warning'
  | 'error'
  | 'muted'
  | 'novel'
  | 'likely-novel'
  | 'likely-not-novel'
  | 'not-novel';

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
    'success-light': {
      backgroundColor: 'rgba(36, 135, 144, 0.06)',
      color: 'rgba(36, 135, 144, 0.7)',
    },
    warning: {
      backgroundColor: 'rgba(180, 120, 60, 0.12)',
      color: '#8b6914',
    },
    error: {
      backgroundColor: 'rgba(180, 60, 60, 0.12)',
      color: '#a13838',
    },
    muted: {
      backgroundColor: 'var(--color-grey-mid)',
      color: 'var(--color-text-muted)',
    },
    novel: {
      backgroundColor: 'rgba(22, 163, 74, 0.1)',
      color: '#16a34a',
    },
    'likely-novel': {
      backgroundColor: 'rgba(101, 163, 13, 0.1)',
      color: '#65a30d',
    },
    'likely-not-novel': {
      backgroundColor: 'rgba(202, 138, 4, 0.1)',
      color: '#ca8a04',
    },
    'not-novel': {
      backgroundColor: 'var(--color-danger-subtle)',
      color: 'var(--color-status-danger)',
    },
  };

  return (
    <span style={{ ...baseStyles, ...variantStyles[variant], ...style }} {...props}>
      {children}
    </span>
  );
};
