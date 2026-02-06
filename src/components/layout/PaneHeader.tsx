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
  onSplit?: () => void;
  showNavigation?: boolean;
  showKebab?: boolean;
  showSplit?: boolean;
}

export const PaneHeader = ({
  title,
  items = [],
  selectedId,
  onSelect,
  onPrevious,
  onNext,
  onSplit,
  showNavigation = true,
  showKebab = true,
  showSplit = true,
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

      {/* Dropdown selector */}
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

      {/* Right actions */}
      <div className="paneHeader__actions">
        {showSplit && (
          <button
            className="paneHeader__actionBtn"
            onClick={onSplit}
            aria-label="Split view"
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
