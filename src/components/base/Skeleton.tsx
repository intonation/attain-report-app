import type { HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
}

export const Skeleton = ({ width, height, style, ...props }: SkeletonProps) => {
  const styles: React.CSSProperties = {
    width: width ?? '100%',
    height: height ?? '1rem',
    ...style,
  };

  return <div className="skeleton" style={styles} {...props} />;
};

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? '70%' : '100%'}
          height="14px"
        />
      ))}
    </div>
  );
};
