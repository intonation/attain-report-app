import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '../base';
import { DownloadIcon } from '../icons';
import '../../styles/toolbar.css';

export type HighlightColor = 'yellow' | 'green' | 'blue' | 'pink' | 'orange';

const HIGHLIGHT_COLORS: { id: HighlightColor; value: string; label: string }[] = [
  { id: 'yellow', value: '#fef08a', label: 'Yellow' },
  { id: 'green', value: '#bbf7d0', label: 'Green' },
  { id: 'blue', value: '#bfdbfe', label: 'Blue' },
  { id: 'pink', value: '#fbcfe8', label: 'Pink' },
  { id: 'orange', value: '#fed7aa', label: 'Orange' },
];

interface ToolbarProps {
  applicationNumber?: string;
  applicationTitle?: string;
  version?: string;
  /** Show highlight picker (for Option B / system mode) */
  showHighlightPicker?: boolean;
  /** Currently active highlight color */
  activeHighlightColor?: HighlightColor | null;
  /** Callback when highlight color is selected */
  onHighlightColorSelect?: (color: HighlightColor | null) => void;
  /** Callback when clear highlighting is clicked */
  onClearHighlighting?: () => void;
}

export const Toolbar = ({
  applicationNumber = 'US 17/174,123',
  applicationTitle = 'Adaptive Cruise Control with Predictive Headway Management',
  version = 'v0.1',
  showHighlightPicker = false,
  activeHighlightColor = null,
  onHighlightColorSelect,
  onClearHighlighting,
}: ToolbarProps) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close picker when clicking outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsColorPickerOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isColorPickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isColorPickerOpen, handleClickOutside]);

  const handleColorSelect = (color: HighlightColor) => {
    onHighlightColorSelect?.(color);
    setIsColorPickerOpen(false);
  };

  const handleSwatchClick = () => {
    if (activeHighlightColor) {
      // If a color is active, clicking deselects it
      onHighlightColorSelect?.(null);
    } else {
      // Open the picker
      setIsColorPickerOpen(!isColorPickerOpen);
    }
  };

  // Get the color value for the swatch display (default to yellow when not active)
  const displayColor = activeHighlightColor
    ? HIGHLIGHT_COLORS.find(c => c.id === activeHighlightColor)?.value
    : HIGHLIGHT_COLORS[0].value; // Default to yellow

  return (
    <header className="toolbar">
      {/* Left section - app info (two lines) */}
      <div className="toolbar__left">
        <div className="toolbar__appInfo">
          <div className="toolbar__appLine1">
            <span className="toolbar__appNumber">{applicationNumber}</span>
          </div>
          <div className="toolbar__appLine2">
            <span className="toolbar__appTitle">{applicationTitle}</span>
            <span className="toolbar__version">{version}</span>
          </div>
        </div>
      </div>

      {/* Right section - Highlight tools cluster, separator, Export */}
      <div className="toolbar__right">
        {/* Highlight tools cluster */}
        <div className="toolbar__highlightCluster">
          {showHighlightPicker && (
            <div className="toolbar__highlightPicker">
              <button
                ref={buttonRef}
                className={`toolbar__swatch ${activeHighlightColor ? 'toolbar__swatch--active' : ''}`}
                onClick={handleSwatchClick}
                title="Highlight colour"
                aria-label={activeHighlightColor ? `Highlighting with ${activeHighlightColor}, click to deselect` : 'Select highlight colour'}
                aria-expanded={isColorPickerOpen}
              >
                <span
                  className="toolbar__swatchInner"
                  style={{ backgroundColor: displayColor }}
                />
              </button>
              {isColorPickerOpen && (
                <div ref={pickerRef} className="toolbar__colorDropdown">
                  <div className="toolbar__colorDropdownLabel">Highlight colour</div>
                  <div className="toolbar__colorSwatches">
                    {HIGHLIGHT_COLORS.map((color) => (
                      <button
                        key={color.id}
                        className="toolbar__colorOption"
                        style={{ backgroundColor: color.value }}
                        onClick={() => handleColorSelect(color.id)}
                        aria-label={color.label}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <button
            className="toolbar__outlineBtn"
            aria-label="Clear highlights"
            onClick={onClearHighlighting}
          >
            Clear highlights
          </button>
        </div>

        <div className="toolbar__divider" />

        <Button variant="primary" size="small" style={{ fontSize: '12px' }}>
          <DownloadIcon />
          Export
        </Button>
      </div>
    </header>
  );
};
