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
  revealDelayMs = 80,
  cycleDelayMs = 32,
  cyclesPerChar = 2,
  className = "",
  style,
}: ScrambleHeadingProps) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [displayText, setDisplayText] = useState(
    prefersReducedMotion ? text : ""
  );

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return;
    }

    let charIndex = 0;
    let cycleIndex = 0;
    let buffer = "";

    const tick = () => {
      if (charIndex >= text.length) {
        setDisplayText(text);
        if (timerRef.current) clearInterval(timerRef.current);
        return;
      }

      const realChar = text[charIndex];

      // spaces settle immediately
      if (realChar === " ") {
        buffer += " ";
        setDisplayText(buffer);
        charIndex++;
        cycleIndex = 0;
        return;
      }

      if (cycleIndex < cyclesPerChar) {
        const rand =
          ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
        setDisplayText(buffer + rand);
        cycleIndex++;
        return;
      }

      // settle real char
      buffer += realChar;
      setDisplayText(buffer);
      charIndex++;
      cycleIndex = 0;
    };

    const intervalMs = Math.min(cycleDelayMs, revealDelayMs);
    timerRef.current = window.setInterval(tick, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, prefersReducedMotion, cycleDelayMs, revealDelayMs, cyclesPerChar]);

  const padded = displayText.padEnd(text.length, " ");

  return (
    <Tag className={className} style={style}>
      {padded.split("").map((c, i) => (
        <span key={i} style={{ display: "inline-block" }}>
          {c === " " ? "\u00A0" : c}
        </span>
      ))}
    </Tag>
  );
}