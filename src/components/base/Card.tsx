import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export const Card = ({ children, padded = false, style, ...props }: CardProps) => {
  const styles: React.CSSProperties = {
    position: 'relative',
    backgroundColor: 'var(--color-paper)',
    borderRadius: 0,
    padding: padded ? 'var(--space-6)' : undefined,
    border: '1px solid var(--color-border)',
    transition: 'background-color 0.2s ease',
    ...style,
  };

  return (
    <div style={styles} {...props}>
      {children}
    </div>
  );
};
