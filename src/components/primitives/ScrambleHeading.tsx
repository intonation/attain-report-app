import { useState, useEffect, useRef } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface ScrambleHeadingProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span";
  revealDelayMs?: number;
  cycleDelayMs?: number;
  cyclesPerChar?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrambleHeading({
  text,
  as: Tag = "h2",
  revealDelayMs = 70,
  cycleDelayMs = 30,
  cyclesPerChar = 3,
  className = "",
  style,
}: ScrambleHeadingProps) {
  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const [displayText, setDisplayText] = useState(
    prefersReducedMotion.current ? text : ""
  );
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Skip animation if reduced motion or already animated
    if (prefersReducedMotion.current || hasAnimatedRef.current) {
      setDisplayText(text);
      return;
    }

    hasAnimatedRef.current = true;

    let charIndex = 0;
    let cycleCount = 0;
    let currentDisplay = "";

    const runAnimation = () => {
      // Finished all characters
      if (charIndex >= text.length) {
        setDisplayText(text);
        return;
      }

      const currentChar = text[charIndex];

      // If it's a space or non-letter, reveal immediately and move on
      if (currentChar === " " || !/[A-Za-z]/.test(currentChar)) {
        currentDisplay += currentChar;
        setDisplayText(currentDisplay);
        charIndex++;
        cycleCount = 0;
        setTimeout(runAnimation, revealDelayMs);
        return;
      }

      // Still cycling through random letters for current character
      if (cycleCount < cyclesPerChar) {
        const randomChar = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        setDisplayText(currentDisplay + randomChar);
        cycleCount++;
        setTimeout(runAnimation, cycleDelayMs);
        return;
      }

      // Done cycling, reveal the real character
      currentDisplay += currentChar;
      setDisplayText(currentDisplay);
      charIndex++;
      cycleCount = 0;
      setTimeout(runAnimation, revealDelayMs);
    };

    // Start the animation
    const startTimeout = setTimeout(runAnimation, 0);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [text, revealDelayMs, cycleDelayMs, cyclesPerChar]);

  // Pad display text with spaces to prevent layout shift
  const paddedText = displayText.padEnd(text.length, " ");

  return (
    <Tag className={className} style={style}>
      {paddedText.split("").map((char, index) => (
        <span
          key={index}
          style={{
            display: "inline-block",
            minWidth: text[index] === " " ? "0.25em" : undefined,
            opacity: index < displayText.length ? 1 : 0,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
}
