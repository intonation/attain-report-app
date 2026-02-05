import { useEffect, useState, type ReactNode } from "react";

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

export function SidebarSection({
  title,
  items,
  startDelay,
  activeItem,
  onNavigate,
}: SidebarSectionProps) {
  const [headerVisible, setHeaderVisible] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    // Show header after startDelay
    const headerTimeout = setTimeout(() => {
      setHeaderVisible(true);
    }, startDelay);

    // Show items with stagger after header appears
    const itemTimeouts: ReturnType<typeof setTimeout>[] = [];
    items.forEach((_, i) => {
      const timeout = setTimeout(() => {
        setVisibleCount((v) => v + 1);
      }, startDelay + 150 + i * 80); // 150ms after header, then 80ms stagger
      itemTimeouts.push(timeout);
    });

    return () => {
      clearTimeout(headerTimeout);
      itemTimeouts.forEach(clearTimeout);
    };
  }, [startDelay, items.length]);

  return (
    <div>
      <div className={`sidebarHeader ${headerVisible ? "visible" : ""}`}>
        {title}
      </div>

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
  );
}
