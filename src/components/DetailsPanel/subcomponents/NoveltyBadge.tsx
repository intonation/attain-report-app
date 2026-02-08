type NoveltyStatus = 'Novel' | 'Likely novel' | 'Likely not novel' | 'Not novel';

interface NoveltyBadgeProps {
  status: NoveltyStatus;
}

function getStatusClass(status: NoveltyStatus): string {
  const statusMap: Record<NoveltyStatus, string> = {
    'Novel': 'novel',
    'Likely novel': 'likely-novel',
    'Likely not novel': 'likely-not-novel',
    'Not novel': 'not-novel',
  };
  return `detailsPanel__noveltyBadge detailsPanel__noveltyBadge--${statusMap[status]}`;
}

function getStatusIcon(status: NoveltyStatus) {
  const colorMap: Record<NoveltyStatus, string> = {
    'Novel': '#16a34a',
    'Likely novel': '#65a30d',
    'Likely not novel': '#ca8a04',
    'Not novel': '#dc2626',
  };

  return (
    <svg width="10" height="10" viewBox="0 0 10 10">
      <circle cx="5" cy="5" r="5" fill={colorMap[status]} />
    </svg>
  );
}

export function NoveltyBadge({ status }: NoveltyBadgeProps) {
  return (
    <span className={getStatusClass(status)}>
      {getStatusIcon(status)}
      {status}
    </span>
  );
}

export type { NoveltyStatus };
