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

// Custom icons from design system
export const GeneratedAnalysisIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13 3.99984H11V8.99985C11 9.55214 10.5523 9.99985 10 9.99985H5V19.9999H19V9.99985H21V21.0077C21 21.5553 20.5552 21.9997 20.0068 21.9999H3.99316C3.44464 21.9997 3.00001 21.5498 3 20.993V7.99985L9 2.00277V1.99984H13V3.99984ZM5.8291 7.99985H9V4.8309L5.8291 7.99985ZM19.4707 0.329353C19.2943 -0.0964437 18.7059 -0.0964324 18.5293 0.329353L18.2764 0.940682C17.8445 1.9835 17.0385 2.8162 16.0254 3.26686L15.3076 3.5862C14.8974 3.76901 14.8975 4.36623 15.3076 4.54909L16.0674 4.88698C17.0552 5.32631 17.8476 6.12933 18.2871 7.13796L18.5332 7.70339C18.7137 8.11753 19.2864 8.11753 19.4668 7.70339L19.7139 7.13796C20.1534 6.12949 20.945 5.32626 21.9326 4.88698L22.6924 4.54909C23.1026 4.36622 23.1027 3.76902 22.6924 3.5862L21.9746 3.26686C20.9616 2.8162 20.1556 1.98348 19.7237 0.940682L19.4707 0.329353Z" />
  </svg>
);

export const GeneratedTablesIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14 10H10V14H14V10ZM16 10V14H19V10H16ZM14 19V16H10V19H14ZM16 19H19V16H16V19ZM14 5H10V8H14V5ZM16 5V8H19V5H16ZM8 10H5V14H8V10ZM8 19V16H5V19H8ZM8 5H5V8H8V5ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z" />
  </svg>
);

export const PriorArtIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 16H8V8H12C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM10 10V14H12C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10H10ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z" />
  </svg>
);

export const SidepanelIcon = (props: IconProps) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM15 5H4V19H15V5ZM20 5H17V19H20V5Z" />
  </svg>
);
