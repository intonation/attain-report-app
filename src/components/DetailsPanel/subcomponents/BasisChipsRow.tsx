interface BasisChip {
  id: string;
  label: string;
  variant?: 'default' | 'feature' | 'line' | 'claim';
}

interface BasisChipsRowProps {
  chips: BasisChip[];
  onChipClick?: (chip: BasisChip) => void;
}

function getChipClass(variant: BasisChip['variant'] = 'default'): string {
  return `detailsPanel__basisChip detailsPanel__basisChip--${variant}`;
}

export function BasisChipsRow({ chips, onChipClick }: BasisChipsRowProps) {
  if (chips.length === 0) return null;

  return (
    <div className="detailsPanel__chipsRow">
      {chips.map((chip) => (
        <button
          key={chip.id}
          className={getChipClass(chip.variant)}
          onClick={() => onChipClick?.(chip)}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}

export type { BasisChip };
