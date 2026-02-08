interface QuoteBlockProps {
  children: string;
}

export function QuoteBlock({ children }: QuoteBlockProps) {
  return (
    <blockquote className="detailsPanel__quoteBlock">
      {children}
    </blockquote>
  );
}
