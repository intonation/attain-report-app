import { useEffect, useRef, useState, type ReactNode } from "react";

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
  onNavigate: (itemId: string) => void;
}

function useTypewriterOnce(text: string, speed: number, active: boolean) {
  const [value, setValue] = useState(active ? "" : text);

  useEffect(() => {
    if (!active) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setValue(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, active]);

  const finish = () => setValue(text);
  return { value, finish };
}

export function SidebarSection({
  title,
  items,
  startDelay,
  activeItem,
  onNavigate,
}: SidebarSectionProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  const hasAnimatedRef = useRef(false);

  const { value, finish } = useTypewriterOnce(
    title,
    18,
    startTyping && !hasAnimatedRef.current
  );

  useEffect(() => {
    if (hasAnimatedRef.current) return;

    const t = setTimeout(() => {
      setStartTyping(true);

      // Start item reveal at same time as typing
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
    <div onMouseEnter={finish}>
      <button
        className="sidebarSectionHeaderBtn"
        onClick={() => setCollapsed((c) => !c)}
        aria-expanded={!collapsed}
      >
        <span className="sidebarSectionHeaderText">{value}</span>
        <span className={`sidebarSectionChevron ${collapsed ? "collapsed" : ""}`}>
          <ChevronIcon />
        </span>
      </button>

      {!collapsed && (
        <div className="sidebarSectionItems">
          {items.map((item, i) => (
            <button
              key={item.id}
              className={`sidebarItem ${i < visibleCount ? "visible" : ""} ${activeItem === item.id ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
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
