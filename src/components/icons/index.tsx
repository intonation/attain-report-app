import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export const DocumentIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 2v4h4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ChartIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M2 14V8h3v6H2zM6.5 14V5h3v9h-3zM11 14V2h3v12h-3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ListIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M5 4h9M5 8h9M5 12h9M2 4h.01M2 8h.01M2 12h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ClipboardIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M10 2H6a1 1 0 00-1 1v1h6V3a1 1 0 00-1-1z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 4V3a2 2 0 00-2-2H7a2 2 0 00-2 2v1H4a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1h-1z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const BookIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M2 3h4a2 2 0 012 2v9a1.5 1.5 0 00-1.5-1.5H2V3zM14 3h-4a2 2 0 00-2 2v9a1.5 1.5 0 011.5-1.5H14V3z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const GridIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const SearchIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const LayersIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M8 1L1 5l7 4 7-4-7-4z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 11l7 4 7-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 8l7 4 7-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FileTextIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 9h6M5 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const LinkIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <path
      d="M6.5 9.5a3 3 0 004.24 0l2.12-2.12a3 3 0 00-4.24-4.24L7.5 4.26"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 6.5a3 3 0 00-4.24 0L3.14 8.62a3 3 0 004.24 4.24l1.12-1.12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
