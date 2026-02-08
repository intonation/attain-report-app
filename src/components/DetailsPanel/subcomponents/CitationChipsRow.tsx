interface Citation {
  id: string;
  label: string;
}

interface CitationChipsRowProps {
  citations: Citation[];
  onCitationClick?: (citation: Citation) => void;
}

export function CitationChipsRow({ citations, onCitationClick }: CitationChipsRowProps) {
  if (citations.length === 0) return null;

  return (
    <div className="detailsPanel__chipsRow">
      {citations.map((citation) => (
        <button
          key={citation.id}
          className="detailsPanel__citationChip"
          onClick={() => onCitationClick?.(citation)}
        >
          {citation.label}
        </button>
      ))}
    </div>
  );
}

export type { Citation };
