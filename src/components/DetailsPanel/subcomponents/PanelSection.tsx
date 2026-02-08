import type { ReactNode } from 'react';

interface PanelSectionProps {
  children: ReactNode;
  className?: string;
}

export function PanelSection({ children, className = '' }: PanelSectionProps) {
  return (
    <div className={`detailsPanel__section ${className}`}>
      {children}
    </div>
  );
}
