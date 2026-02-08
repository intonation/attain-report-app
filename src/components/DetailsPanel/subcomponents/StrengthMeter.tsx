interface StrengthMeterProps {
  /** Strength value from 1 to 5 */
  value: number;
  /** Maximum value (default 5) */
  max?: number;
  /** Optional label */
  label?: string;
}

export function StrengthMeter({ value, max = 5, label }: StrengthMeterProps) {
  const segments = Array.from({ length: max }, (_, i) => i + 1);
  const clampedValue = Math.min(Math.max(value, 0), max);

  return (
    <div className="detailsPanel__strengthMeter">
      {label && <span className="detailsPanel__strengthLabel">{label}</span>}
      <div className="detailsPanel__strengthSegments">
        {segments.map((segment) => (
          <div
            key={segment}
            className={`detailsPanel__strengthSegment ${
              segment <= clampedValue ? 'detailsPanel__strengthSegment--filled' : ''
            }`}
          />
        ))}
      </div>
      <span className="detailsPanel__strengthValue">{clampedValue}/{max}</span>
    </div>
  );
}
