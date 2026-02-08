import { useEffect, useRef, useCallback } from 'react';
import '../styles/selection-context-menu.css';

/* ── Types ────────────────────────────────────────────────────────── */

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'orange';
export type ViewPane = 'left' | 'right' | 'details';

export interface SelectionContextMenuProps {
  x: number;
  y: number;
  onHighlight: (color: HighlightColor) => void;
  onClear: () => void;
  onViewInPane: (pane: ViewPane) => void;
  onCancel: () => void;
}

/* ── Highlight Colors ─────────────────────────────────────────────── */

const HIGHLIGHT_COLORS: { id: HighlightColor; value: string; label: string }[] = [
  { id: 'yellow', value: '#fef08a', label: 'Yellow' },
  { id: 'green', value: '#bbf7d0', label: 'Green' },
  { id: 'blue', value: '#bfdbfe', label: 'Blue' },
  { id: 'pink', value: '#fbcfe8', label: 'Pink' },
  { id: 'orange', value: '#fed7aa', label: 'Orange' },
];

/* ── Icons ────────────────────────────────────────────────────────── */

function ClearIcon() {
  return (
    <svg width="16" height="16" viewBox="7 8 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.6667 22L9.80005 19.1333C9.13338 18.4667 9.13338 17.4667 9.80005 16.8667L16.2 10.4667C16.8667 9.80001 17.8667 9.80001 18.4667 10.4667L22.2 14.2C22.8667 14.8667 22.8667 15.8667 22.2 16.4667L16.6667 22" />
      <path d="M22.6667 22H12.6667" />
      <path d="M11.3333 15.3333L17.3333 21.3333" />
    </svg>
  );
}

function PanelLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  );
}

function PanelRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  );
}

function DetailsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── Sub-components ───────────────────────────────────────────────── */

interface MenuSectionProps {
  label: string;
}

function MenuSection({ label }: MenuSectionProps) {
  return (
    <div className="contextMenu__sectionLabel">{label}</div>
  );
}

interface ColorSwatchRowProps {
  colors: typeof HIGHLIGHT_COLORS;
  onSelect: (color: HighlightColor) => void;
}

function ColorSwatchRow({ colors, onSelect }: ColorSwatchRowProps) {
  return (
    <div className="contextMenu__swatchRow" role="group" aria-label="Highlight colors">
      {colors.map((color) => (
        <button
          key={color.id}
          className="contextMenu__swatch"
          style={{ backgroundColor: color.value }}
          onClick={() => onSelect(color.id)}
          aria-label={`Highlight ${color.label}`}
          role="menuitem"
        />
      ))}
    </div>
  );
}

interface MenuActionRowProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function MenuActionRow({ icon, label, onClick }: MenuActionRowProps) {
  return (
    <button className="contextMenu__actionRow" onClick={onClick} role="menuitem">
      <span className="contextMenu__actionIcon">{icon}</span>
      <span className="contextMenu__actionLabel">{label}</span>
    </button>
  );
}

function MenuDivider() {
  return <div className="contextMenu__divider" role="separator" />;
}

/* ── Main Component ───────────────────────────────────────────────── */

export function SelectionContextMenu({
  x,
  y,
  onHighlight,
  onClear,
  onViewInPane,
  onCancel,
}: SelectionContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  }, [onCancel]);

  // Handle outside click
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      onCancel();
    }
  }, [onCancel]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleKeyDown, handleOutsideClick]);

  // Adjust position to keep menu in viewport
  const adjustedPosition = useCallback(() => {
    const menuWidth = 200;
    const menuHeight = 280;
    const padding = 8;

    let adjustedX = x;
    let adjustedY = y;

    if (x + menuWidth > window.innerWidth - padding) {
      adjustedX = window.innerWidth - menuWidth - padding;
    }
    if (y + menuHeight > window.innerHeight - padding) {
      adjustedY = window.innerHeight - menuHeight - padding;
    }

    return { left: adjustedX, top: adjustedY };
  }, [x, y]);

  const position = adjustedPosition();

  return (
    <div
      ref={menuRef}
      className="contextMenu"
      role="menu"
      style={{ left: position.left, top: position.top }}
    >
      {/* Highlight section */}
      <MenuSection label="Highlight" />
      <ColorSwatchRow colors={HIGHLIGHT_COLORS} onSelect={onHighlight} />

      <MenuActionRow
        icon={<ClearIcon />}
        label="Clear highlight"
        onClick={onClear}
      />

      <MenuDivider />

      {/* View in section */}
      <MenuSection label="View in" />
      <MenuActionRow
        icon={<PanelLeftIcon />}
        label="Left pane"
        onClick={() => onViewInPane('left')}
      />
      <MenuActionRow
        icon={<PanelRightIcon />}
        label="Right pane"
        onClick={() => onViewInPane('right')}
      />
      <MenuActionRow
        icon={<DetailsIcon />}
        label="Details pane"
        onClick={() => onViewInPane('details')}
      />

      <MenuDivider />

      {/* Cancel */}
      <MenuActionRow
        icon={<CloseIcon />}
        label="Cancel"
        onClick={onCancel}
      />
    </div>
  );
}

export default SelectionContextMenu;
