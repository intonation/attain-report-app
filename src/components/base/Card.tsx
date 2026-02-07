import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export const Card = ({ children, padded = false, style, className, ...props }: CardProps) => {
  const cardClass = padded ? 'card card--padded' : 'card';
  const combinedClassName = className ? `${cardClass} ${className}` : cardClass;

  return (
    <div className={combinedClassName} style={style} {...props}>
      {children}
    </div>
  );
};
