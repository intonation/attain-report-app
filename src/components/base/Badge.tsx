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
  className,
  ...props
}: BadgeProps) => {
  const classes = ['badge', `badge--${variant}`, className].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};
