import { useState, useRef, useEffect } from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SplitIcon,
  KebabIcon,
  DownloadIcon,
  CopyIcon,
} from '../icons';
import '../../styles/pane-header.css';

interface PaneHeaderProps {
  title: string;
  items?: { id: string; label: string }[];
  selectedId?: string;
  onSelect?: (id: string) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  onSplitToggle?: () => void;
  isSplitView?: boolean;
  showNavigation?: boolean;
  showKebab?: boolean;
  showSplit?: boolean;
  showDropdown?: boolean;
}

export const PaneHeader = ({
  title,
  items = [],
  selectedId,
  onSelect,
  onPrevious,
  onNext,
  onSplitToggle,
  isSplitView = false,
  showNavigation = true,
  showKebab = true,
  showSplit = true,
  showDropdown = true,
}: PaneHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isKebabOpen, setIsKebabOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const kebabRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (kebabRef.current && !kebabRef.current.contains(event.target as Node)) {
        setIsKebabOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    onSelect?.(id);
    setIsDropdownOpen(false);
  };

  return (
    <div className="paneHeader">
      {/* Dropdown selector - only shown in split view */}
      {showDropdown && (
        <div className="paneHeader__dropdown" ref={dropdownRef}>
          <button
            className="paneHeader__dropdownBtn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-expanded={isDropdownOpen}
          >
            <span className="paneHeader__title">{title}</span>
            <ChevronDownIcon />
          </button>

          {isDropdownOpen && items.length > 0 && (
            <div className="paneHeader__dropdownMenu">
              {items.map((item) => (
                <button
                  key={item.id}
                  className={`paneHeader__dropdownItem ${item.id === selectedId ? 'active' : ''}`}
                  onClick={() => handleSelect(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Navigation arrows */}
      {showNavigation && (
        <div className="paneHeader__nav">
          <button
            className="paneHeader__navBtn"
            onClick={onPrevious}
            aria-label="Previous"
          >
            <ChevronLeftIcon />
          </button>
          <button
            className="paneHeader__navBtn"
            onClick={onNext}
            aria-label="Next"
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}

      {/* Right actions */}
      <div className="paneHeader__actions">
        {showSplit && (
          <button
            className={`paneHeader__actionBtn ${isSplitView ? 'paneHeader__actionBtn--active' : ''}`}
            onClick={onSplitToggle}
            aria-label={isSplitView ? 'Close split view' : 'Open split view'}
            aria-pressed={isSplitView}
          >
            <SplitIcon />
          </button>
        )}

        {showKebab && (
          <div className="paneHeader__kebab" ref={kebabRef}>
            <button
              className="paneHeader__actionBtn"
              onClick={() => setIsKebabOpen(!isKebabOpen)}
              aria-label="More options"
              aria-expanded={isKebabOpen}
            >
              <KebabIcon />
            </button>

            {isKebabOpen && (
              <div className="paneHeader__kebabMenu">
                <button className="paneHeader__kebabItem">
                  <DownloadIcon />
                  Download
                </button>
                <button className="paneHeader__kebabItem">
                  <CopyIcon />
                  Copy
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
