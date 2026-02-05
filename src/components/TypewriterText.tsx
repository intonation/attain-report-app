import { useTypewriter } from '../hooks/useStagedReveal';

interface TypewriterTextProps {
  /** The full text to display */
  text: string;
  /** Whether the typewriter animation should run */
  enabled: boolean;
  /** Speed per character in ms (default: 18) */
  charSpeed?: number;
  /** Callback when animation completes */
  onComplete?: () => void;
  /** Additional styles */
  style?: React.CSSProperties;
  /** Additional class name */
  className?: string;
}

/**
 * Component that renders text with a typewriter effect.
 * Respects the enabled prop to skip animation when needed.
 */
export const TypewriterText = ({
  text,
  enabled,
  charSpeed = 18,
  onComplete,
  style,
  className,
}: TypewriterTextProps) => {
  const { displayText, isComplete } = useTypewriter(text, {
    enabled,
    charSpeed,
    onComplete,
  });

  // Show cursor only while typing
  const cursorStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '1px',
    height: '1em',
    backgroundColor: 'currentColor',
    marginLeft: '1px',
    opacity: isComplete ? 0 : 0.7,
    animation: isComplete ? 'none' : 'blink 0.8s step-end infinite',
  };

  return (
    <span className={className} style={style}>
      {displayText}
      {enabled && !isComplete && <span style={cursorStyle} aria-hidden="true" />}
      {/* Screen reader gets full text immediately */}
      <span className="sr-only">{text}</span>
    </span>
  );
};
