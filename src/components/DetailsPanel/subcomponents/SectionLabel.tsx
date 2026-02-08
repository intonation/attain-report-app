interface SectionLabelProps {
  children: string;
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="detailsPanel__sectionLabel">{children}</span>
  );
}
