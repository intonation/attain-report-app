import { useEffect, useRef, useState, type ReactNode } from "react";
import { ScrambleHeading } from "../primitives/ScrambleHeading";

type Item = {
  id: string;
  label: string;
  icon: ReactNode;
};

interface SidebarSectionProps {
  title: string;
  items: Item[];
  startDelay: number;
  activeItem: string;
  visitedItemIds: Set<string>;
  onNavigate: (itemId: string) => void;
}

export function SidebarSection({
  title,
  items,
  startDelay,
  activeItem,
  visitedItemIds,
  onNavigate,
}: SidebarSectionProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    const t = setTimeout(() => {
      setShowHeader(true);

      // Start item reveal at same time as scramble
      items.forEach((_, i) => {
        setTimeout(() => {
          setVisibleCount((v) => v + 1);
        }, i * 120);
      });

      hasAnimatedRef.current = true;
    }, startDelay);

    return () => clearTimeout(t);
  }, [startDelay, items.length]);

  return (
    <div>
      <button
        className="sidebarSectionHeaderBtn"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
      >
        <span className="sidebarSectionHeaderText">
          {showHeader ? (
            <ScrambleHeading
              text={title}
              as="span"
              revealDelayMs={50}
              cycleDelayMs={25}
              cyclesPerChar={2}
              className="sidebarSectionTitle"
            />
          ) : (
            <span className="sidebarSectionTitle">&nbsp;</span>
          )}
        </span>
        <span className={`sidebarSectionChevron ${collapsed ? "collapsed" : ""}`}>
          <ChevronIcon />
        </span>
      </button>

      {!collapsed && (
        <div className="sidebarSectionItems">
          {items.map((item, i) => {
            const isActive = activeItem === item.id;
            const isVisited = visitedItemIds.has(item.id);
            const stateClass = isVisited ? "sidebarItemVisited" : "sidebarItemUnread";

            return (
              <button
                key={item.id}
                className={`sidebarItem ${i < visibleCount ? "visible" : ""} ${isActive ? "active" : ""} ${stateClass}`}
                onClick={() => onNavigate(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

const ChevronIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
