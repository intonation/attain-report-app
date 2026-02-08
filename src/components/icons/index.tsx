import type { SVGProps, ReactNode } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  /** Visual size of the icon in pixels (default: 16) */
  size?: number;
};

// Shared stroke defaults - strokeWidth: 1.5 per UI consistency rules
const STROKE_DEFAULTS = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/**
 * Base wrapper for stroke-based icons.
 * Provides 16px visual icon with consistent stroke styling.
 * Parent elements should provide 24px hit area via padding/sizing.
 */
const StrokeIcon = ({
  size = 16,
  viewBox = '0 0 24 24',
  children,
  ...props
}: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    {...STROKE_DEFAULTS}
    {...props}
  >
    {children}
  </svg>
);

/**
 * Base wrapper for fill-based icons.
 * Provides 16px visual icon.
 */
const FillIcon = ({
  size = 16,
  viewBox = '0 0 24 24',
  children,
  ...props
}: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox={viewBox}
    fill="currentColor"
    {...props}
  >
    {children}
  </svg>
);

// Path style with non-scaling-stroke
const pathStyle = { vectorEffect: 'non-scaling-stroke' as const };

// ============================================================================
// Document & File Icons
// ============================================================================

export const DocumentIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" style={pathStyle} />
    <path d="M9 2v4h4" style={pathStyle} />
  </StrokeIcon>
);

export const FileTextIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <path d="M4 2h5l4 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" style={pathStyle} />
    <path d="M9 2v4h4" style={pathStyle} />
    <path d="M5 9h6M5 12h4" style={pathStyle} />
  </StrokeIcon>
);

export const ClipboardIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <path d="M10 2H6a1 1 0 00-1 1v1h6V3a1 1 0 00-1-1z" style={pathStyle} />
    <path d="M11 4V3a2 2 0 00-2-2H7a2 2 0 00-2 2v1H4a1 1 0 00-1 1v9a1 1 0 001 1h8a1 1 0 001-1V5a1 1 0 00-1-1h-1z" style={pathStyle} />
  </StrokeIcon>
);

export const FolderIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" style={pathStyle} />
  </StrokeIcon>
);

export const CopyIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" style={pathStyle} />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" style={pathStyle} />
  </StrokeIcon>
);

export const DownloadIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" style={pathStyle} />
    <polyline points="7 10 12 15 17 10" style={pathStyle} />
    <line x1="12" y1="15" x2="12" y2="3" style={pathStyle} />
  </StrokeIcon>
);

// ============================================================================
// Chart & Data Icons
// ============================================================================

export const ChartIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <path d="M2 14V8h3v6H2zM6.5 14V5h3v9h-3zM11 14V2h3v12h-3z" style={pathStyle} />
  </StrokeIcon>
);

export const ListIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <path d="M5 4h9M5 8h9M5 12h9M2 4h.01M2 8h.01M2 12h.01" style={pathStyle} />
  </StrokeIcon>
);

export const GridIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <rect x="2" y="2" width="5" height="5" rx="1" style={pathStyle} />
    <rect x="9" y="2" width="5" height="5" rx="1" style={pathStyle} />
    <rect x="2" y="9" width="5" height="5" rx="1" style={pathStyle} />
    <rect x="9" y="9" width="5" height="5" rx="1" style={pathStyle} />
  </StrokeIcon>
);

export const LayersIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <path d="M8 1L1 5l7 4 7-4-7-4z" style={pathStyle} />
    <path d="M1 11l7 4 7-4" style={pathStyle} />
    <path d="M1 8l7 4 7-4" style={pathStyle} />
  </StrokeIcon>
);

// ============================================================================
// Navigation Icons
// ============================================================================

export const ChevronDownIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <polyline points="6 9 12 15 18 9" style={pathStyle} />
  </StrokeIcon>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <polyline points="15 18 9 12 15 6" style={pathStyle} />
  </StrokeIcon>
);

export const ChevronRightIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <polyline points="9 18 15 12 9 6" style={pathStyle} />
  </StrokeIcon>
);

export const ArrowLeftIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <line x1="19" y1="12" x2="5" y2="12" style={pathStyle} />
    <polyline points="12 19 5 12 12 5" style={pathStyle} />
  </StrokeIcon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <line x1="5" y1="12" x2="19" y2="12" style={pathStyle} />
    <polyline points="12 5 19 12 12 19" style={pathStyle} />
  </StrokeIcon>
);

export const CloseIcon = (props: IconProps) => (
  <StrokeIcon size={20} viewBox="0 0 20 20" {...props}>
    <path d="M15 5L5 15M5 5L15 15" style={pathStyle} />
  </StrokeIcon>
);

// ============================================================================
// Action Icons
// ============================================================================

export const SearchIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <circle cx="7" cy="7" r="4.5" style={pathStyle} />
    <path d="M10.5 10.5L14 14" style={pathStyle} />
  </StrokeIcon>
);

export const LinkIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <path d="M6.5 9.5a3 3 0 004.24 0l2.12-2.12a3 3 0 00-4.24-4.24L7.5 4.26" style={pathStyle} />
    <path d="M9.5 6.5a3 3 0 00-4.24 0L3.14 8.62a3 3 0 004.24 4.24l1.12-1.12" style={pathStyle} />
  </StrokeIcon>
);

export const RefreshIcon = (props: IconProps) => (
  <StrokeIcon size={20} {...props}>
    <path d="M21 12a9 9 0 11-2.636-6.364" style={pathStyle} />
    <path d="M21 3v6h-6" style={pathStyle} />
  </StrokeIcon>
);

export const HistoryIcon = (props: IconProps) => (
  <StrokeIcon size={24} {...props}>
    <path d="M12 8v4l3 3" style={pathStyle} />
    <circle cx="12" cy="12" r="9" style={pathStyle} />
  </StrokeIcon>
);

export const BellIcon = (props: IconProps) => (
  <StrokeIcon size={20} {...props}>
    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" style={pathStyle} />
    <path d="M13.73 21a2 2 0 01-3.46 0" style={pathStyle} />
  </StrokeIcon>
);

// ============================================================================
// Panel & Layout Icons
// ============================================================================

export const SidepanelIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" style={pathStyle} />
    <line x1="9" y1="3" x2="9" y2="21" style={pathStyle} />
  </StrokeIcon>
);

export const SplitIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" style={pathStyle} />
    <line x1="12" y1="3" x2="12" y2="21" style={pathStyle} />
  </StrokeIcon>
);

export const MaximiseIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    {/* Top-left corner arrow */}
    <polyline points="4 9 4 4 9 4" style={pathStyle} />
    <line x1="4" y1="4" x2="10" y2="10" style={pathStyle} />
    {/* Top-right corner arrow */}
    <polyline points="15 4 20 4 20 9" style={pathStyle} />
    <line x1="20" y1="4" x2="14" y2="10" style={pathStyle} />
    {/* Bottom-left corner arrow */}
    <polyline points="4 15 4 20 9 20" style={pathStyle} />
    <line x1="4" y1="20" x2="10" y2="14" style={pathStyle} />
    {/* Bottom-right corner arrow */}
    <polyline points="20 15 20 20 15 20" style={pathStyle} />
    <line x1="20" y1="20" x2="14" y2="14" style={pathStyle} />
  </StrokeIcon>
);

export const ExpandDiagonalIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <path d="M17.5858 5H14V3H21V10H19V6.41421L14.7071 10.7071L13.2929 9.29289L17.5858 5ZM3 14H5V17.5858L9.29289 13.2929L10.7071 14.7071L6.41421 19H10V21H3V14Z" />
  </FillIcon>
);

export const InspectPanelIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 5H13V19H20V5ZM11 5H4V19H11V5Z" />
  </FillIcon>
);

export const KebabIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <circle cx="12" cy="5" r="1.5" />
    <circle cx="12" cy="12" r="1.5" />
    <circle cx="12" cy="19" r="1.5" />
  </FillIcon>
);

// ============================================================================
// Sidebar Menu Icons
// ============================================================================

export const OpenMenuIcon = (props: IconProps) => (
  <StrokeIcon size={24} {...props}>
    <path d="M13 19L20 12L13 5M5 19L12 12L5 5" style={pathStyle} />
  </StrokeIcon>
);

export const CloseMenuIcon = (props: IconProps) => (
  <StrokeIcon size={24} {...props}>
    <path d="M11 19L4 12L11 5M19 19L12 12L19 5" style={pathStyle} />
  </StrokeIcon>
);

// ============================================================================
// Toolbar Icons (Highlighting & Text)
// ============================================================================

export const ClearHighlightingIcon = (props: IconProps) => (
  <StrokeIcon size={24} viewBox="7 8 18 18" {...props}>
    <path d="M12.6667 22L9.80005 19.1333C9.13338 18.4667 9.13338 17.4667 9.80005 16.8667L16.2 10.4667C16.8667 9.80001 17.8667 9.80001 18.4667 10.4667L22.2 14.2C22.8667 14.8667 22.8667 15.8667 22.2 16.4667L16.6667 22" style={pathStyle} />
    <path d="M22.6667 22H12.6667" style={pathStyle} />
    <path d="M11.3333 15.3333L17.3333 21.3333" style={pathStyle} />
  </StrokeIcon>
);
export const DiamondIcon = ClearHighlightingIcon;

export const HideUpdateHighlightsIcon = (props: IconProps) => (
  <StrokeIcon size={24} viewBox="7 8 18 18" {...props}>
    <path d="M14 15.3333L10 19.3333V21.3333H16L18 19.3333" style={pathStyle} />
    <path d="M22.6666 16L19.6 19.0667C19.3507 19.311 19.0156 19.4478 18.6666 19.4478C18.3176 19.4478 17.9825 19.311 17.7333 19.0667L14.2666 15.6C14.0223 15.3508 13.8855 15.0157 13.8855 14.6667C13.8855 14.3177 14.0223 13.9826 14.2666 13.7334L17.3333 10.6667" style={pathStyle} />
  </StrokeIcon>
);
export const PenIcon = HideUpdateHighlightsIcon;

export const ShowRedLinesIcon = (props: IconProps) => (
  <StrokeIcon size={24} viewBox="7 8 18 18" {...props}>
    <path d="M18.6667 10.6667H14.0001C13.68 10.6665 13.3646 10.7432 13.0803 10.8902C12.796 11.0372 12.5512 11.2503 12.3663 11.5116C12.1815 11.7728 12.062 12.0746 12.018 12.3917C11.974 12.7087 12.0067 13.0316 12.1134 13.3334" style={pathStyle} />
    <path d="M17.3333 16C18.0406 16 18.7189 16.281 19.219 16.781C19.719 17.2811 20 17.9594 20 18.6667C20 19.3739 19.719 20.0522 19.219 20.5523C18.7189 21.0524 18.0406 21.3333 17.3333 21.3333H12" style={pathStyle} />
    <path d="M10.6667 16H21.3334" style={pathStyle} />
  </StrokeIcon>
);
export const StrikethroughIcon = ShowRedLinesIcon;

// ============================================================================
// Sidebar Section Icons (Fill-based)
// ============================================================================

export const GeneratedAnalysisIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <path d="M13 3.99984H11V8.99985C11 9.55214 10.5523 9.99985 10 9.99985H5V19.9999H19V9.99985H21V21.0077C21 21.5553 20.5552 21.9997 20.0068 21.9999H3.99316C3.44464 21.9997 3.00001 21.5498 3 20.993V7.99985L9 2.00277V1.99984H13V3.99984ZM5.8291 7.99985H9V4.8309L5.8291 7.99985ZM19.4707 0.329353C19.2943 -0.0964437 18.7059 -0.0964324 18.5293 0.329353L18.2764 0.940682C17.8445 1.9835 17.0385 2.8162 16.0254 3.26686L15.3076 3.5862C14.8974 3.76901 14.8975 4.36623 15.3076 4.54909L16.0674 4.88698C17.0552 5.32631 17.8476 6.12933 18.2871 7.13796L18.5332 7.70339C18.7137 8.11753 19.2864 8.11753 19.4668 7.70339L19.7139 7.13796C20.1534 6.12949 20.945 5.32626 21.9326 4.88698L22.6924 4.54909C23.1026 4.36622 23.1027 3.76902 22.6924 3.5862L21.9746 3.26686C20.9616 2.8162 20.1556 1.98348 19.7237 0.940682L19.4707 0.329353Z" />
  </FillIcon>
);

export const GeneratedTablesIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <path d="M14 10H10V14H14V10ZM16 10V14H19V10H16ZM14 19V16H10V19H14ZM16 19H19V16H16V19ZM14 5H10V8H14V5ZM16 5V8H19V5H16ZM8 10H5V14H8V10ZM8 19V16H5V19H8ZM8 5H5V8H8V5ZM4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3Z" />
  </FillIcon>
);

export const PriorArtIcon = (props: IconProps) => (
  <FillIcon {...props}>
    <path d="M12 16H8V8H12C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM10 10V14H12C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10H10ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z" />
  </FillIcon>
);

// ============================================================================
// Bottom Navigation Icons
// ============================================================================

export const UsersIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" style={pathStyle} />
    <circle cx="9" cy="7" r="4" style={pathStyle} />
    <path d="M23 21v-2a4 4 0 00-3-3.87" style={pathStyle} />
    <path d="M16 3.13a4 4 0 010 7.75" style={pathStyle} />
  </StrokeIcon>
);

export const SettingsIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <circle cx="12" cy="12" r="3" style={pathStyle} />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" style={pathStyle} />
  </StrokeIcon>
);

export const LogOutIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" style={pathStyle} />
    <polyline points="16 17 21 12 16 7" style={pathStyle} />
    <line x1="21" y1="12" x2="9" y2="12" style={pathStyle} />
  </StrokeIcon>
);

export const AllCasesIcon = (props: IconProps) => (
  <StrokeIcon {...props}>
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" style={pathStyle} />
  </StrokeIcon>
);

export const BookIcon = (props: IconProps) => (
  <StrokeIcon viewBox="0 0 16 16" {...props}>
    <path d="M2 3h4a2 2 0 012 2v9a1.5 1.5 0 00-1.5-1.5H2V3zM14 3h-4a2 2 0 00-2 2v9a1.5 1.5 0 011.5-1.5H14V3z" style={pathStyle} />
  </StrokeIcon>
);

// Re-export types for consumers
export type { IconProps };
