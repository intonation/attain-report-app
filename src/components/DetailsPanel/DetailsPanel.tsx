import { PanelSection } from './subcomponents/PanelSection';
import { SectionLabel } from './subcomponents/SectionLabel';
import { CitationChipsRow, type Citation } from './subcomponents/CitationChipsRow';
import { BasisChipsRow, type BasisChip } from './subcomponents/BasisChipsRow';
import { StrengthMeter } from './subcomponents/StrengthMeter';
import { NoveltyBadge, type NoveltyStatus } from './subcomponents/NoveltyBadge';
import { QuoteBlock } from './subcomponents/QuoteBlock';
import { ReferenceToken } from '../base/ReferenceToken';
import './details-panel.css';

/* ── Types ──────────────────────────────────────────────────────── */

export type DetailsType = 'line' | 'feature' | 'relationship';

interface PriorArtReference {
  id: string;
  title: string;
  citation: string;
}

// Line Panel Data
export interface LinePanelData {
  id: string;
  claimText: string;
  priorArtReference: PriorArtReference;
  quotation: string;
  citations: Citation[];
  conclusion: string;
  noveltyStatus: NoveltyStatus;
  analysis: string;
  strength: number;
}

// Feature Panel Data
export interface FeaturePanelData {
  id: string;
  featureTitle: string;
  interpretation: string;
  basisChips: BasisChip[];
  supportingDescription: string;
  exampleChips: BasisChip[];
  priorArtReference: PriorArtReference;
  summary: string;
  citations: Citation[];
  analysis: string;
  conclusion: string;
  noveltyStatus: NoveltyStatus;
  strength: number;
}

// Relationship Panel Data
export interface RelationshipPanelData {
  id: string;
  relationshipTitle: string;
  relationshipStatement: string;
  basisChips: BasisChip[];
  supportingDescription: string;
  priorArtReference: PriorArtReference;
  summary: string;
  citations: Citation[];
  analysis: string;
  conclusion: string;
  noveltyStatus: NoveltyStatus;
  strength: number;
}

type PanelData = LinePanelData | FeaturePanelData | RelationshipPanelData;

export interface DetailsPanelProps {
  detailsType: DetailsType;
  data: PanelData;
  onClose: () => void;
  onCitationClick?: (citation: Citation) => void;
  onChipClick?: (chip: BasisChip) => void;
}

/* ── Close Icon ─────────────────────────────────────────────────── */

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── Line Panel Content ─────────────────────────────────────────── */

function LinePanelContent({
  data,
  onCitationClick,
}: {
  data: LinePanelData;
  onCitationClick?: (citation: Citation) => void;
}) {
  return (
    <>
      {/* Header with ID */}
      <div className="detailsPanel__header">
        <ReferenceToken variant="line">{data.id}</ReferenceToken>
        <NoveltyBadge status={data.noveltyStatus} />
      </div>

      {/* Claim Text */}
      <PanelSection>
        <SectionLabel>Claim text</SectionLabel>
        <p className="detailsPanel__text">{data.claimText}</p>
      </PanelSection>

      {/* Prior Art Reference */}
      <PanelSection>
        <SectionLabel>Prior art reference</SectionLabel>
        <div className="detailsPanel__reference">
          <span className="detailsPanel__referenceTitle">{data.priorArtReference.title}</span>
          <span className="detailsPanel__referenceCitation">{data.priorArtReference.citation}</span>
        </div>
      </PanelSection>

      {/* Quotation */}
      <PanelSection>
        <SectionLabel>Quotation</SectionLabel>
        <QuoteBlock>{data.quotation}</QuoteBlock>
      </PanelSection>

      {/* Citations */}
      <PanelSection>
        <SectionLabel>Citations</SectionLabel>
        <CitationChipsRow citations={data.citations} onCitationClick={onCitationClick} />
      </PanelSection>

      {/* Conclusion */}
      <PanelSection>
        <SectionLabel>Conclusion</SectionLabel>
        <p className="detailsPanel__text">{data.conclusion}</p>
      </PanelSection>

      {/* Analysis */}
      <PanelSection>
        <SectionLabel>Analysis</SectionLabel>
        <p className="detailsPanel__text">{data.analysis}</p>
      </PanelSection>

      {/* Strength Meter */}
      <PanelSection>
        <SectionLabel>Strength</SectionLabel>
        <StrengthMeter value={data.strength} />
      </PanelSection>
    </>
  );
}

/* ── Feature Panel Content ──────────────────────────────────────── */

function FeaturePanelContent({
  data,
  onCitationClick,
  onChipClick,
}: {
  data: FeaturePanelData;
  onCitationClick?: (citation: Citation) => void;
  onChipClick?: (chip: BasisChip) => void;
}) {
  return (
    <>
      {/* Header with ID */}
      <div className="detailsPanel__header">
        <ReferenceToken variant="feature">{data.id}</ReferenceToken>
        <NoveltyBadge status={data.noveltyStatus} />
      </div>

      {/* Feature Title */}
      <PanelSection>
        <SectionLabel>Feature</SectionLabel>
        <p className="detailsPanel__title">{data.featureTitle}</p>
      </PanelSection>

      {/* Interpretation */}
      <PanelSection>
        <SectionLabel>Interpretation</SectionLabel>
        <p className="detailsPanel__text">{data.interpretation}</p>
      </PanelSection>

      {/* Basis Chips */}
      {data.basisChips.length > 0 && (
        <PanelSection>
          <SectionLabel>Basis</SectionLabel>
          <BasisChipsRow chips={data.basisChips} onChipClick={onChipClick} />
        </PanelSection>
      )}

      {/* Supporting Description */}
      <PanelSection>
        <SectionLabel>Supporting description</SectionLabel>
        <p className="detailsPanel__text">{data.supportingDescription}</p>
      </PanelSection>

      {/* Example Chips */}
      {data.exampleChips.length > 0 && (
        <PanelSection>
          <SectionLabel>Examples</SectionLabel>
          <BasisChipsRow chips={data.exampleChips} onChipClick={onChipClick} />
        </PanelSection>
      )}

      {/* Prior Art Reference */}
      <PanelSection>
        <SectionLabel>Prior art reference</SectionLabel>
        <div className="detailsPanel__reference">
          <span className="detailsPanel__referenceTitle">{data.priorArtReference.title}</span>
          <span className="detailsPanel__referenceCitation">{data.priorArtReference.citation}</span>
        </div>
      </PanelSection>

      {/* Summary */}
      <PanelSection>
        <SectionLabel>Summary</SectionLabel>
        <p className="detailsPanel__text">{data.summary}</p>
      </PanelSection>

      {/* Citations */}
      <PanelSection>
        <SectionLabel>Citations</SectionLabel>
        <CitationChipsRow citations={data.citations} onCitationClick={onCitationClick} />
      </PanelSection>

      {/* Analysis */}
      <PanelSection>
        <SectionLabel>Analysis</SectionLabel>
        <p className="detailsPanel__text">{data.analysis}</p>
      </PanelSection>

      {/* Conclusion */}
      <PanelSection>
        <SectionLabel>Conclusion</SectionLabel>
        <p className="detailsPanel__text">{data.conclusion}</p>
      </PanelSection>

      {/* Strength Meter */}
      <PanelSection>
        <SectionLabel>Strength</SectionLabel>
        <StrengthMeter value={data.strength} />
      </PanelSection>
    </>
  );
}

/* ── Relationship Panel Content ─────────────────────────────────── */

function RelationshipPanelContent({
  data,
  onCitationClick,
  onChipClick,
}: {
  data: RelationshipPanelData;
  onCitationClick?: (citation: Citation) => void;
  onChipClick?: (chip: BasisChip) => void;
}) {
  return (
    <>
      {/* Header with ID */}
      <div className="detailsPanel__header">
        <ReferenceToken variant="relationship">{data.id}</ReferenceToken>
        <NoveltyBadge status={data.noveltyStatus} />
      </div>

      {/* Relationship Title */}
      <PanelSection>
        <SectionLabel>Relationship</SectionLabel>
        <p className="detailsPanel__title">{data.relationshipTitle}</p>
      </PanelSection>

      {/* Relationship Statement */}
      <PanelSection>
        <SectionLabel>Statement</SectionLabel>
        <p className="detailsPanel__text">{data.relationshipStatement}</p>
      </PanelSection>

      {/* Basis Chips */}
      {data.basisChips.length > 0 && (
        <PanelSection>
          <SectionLabel>Basis</SectionLabel>
          <BasisChipsRow chips={data.basisChips} onChipClick={onChipClick} />
        </PanelSection>
      )}

      {/* Supporting Description */}
      <PanelSection>
        <SectionLabel>Supporting description</SectionLabel>
        <p className="detailsPanel__text">{data.supportingDescription}</p>
      </PanelSection>

      {/* Prior Art Reference */}
      <PanelSection>
        <SectionLabel>Prior art reference</SectionLabel>
        <div className="detailsPanel__reference">
          <span className="detailsPanel__referenceTitle">{data.priorArtReference.title}</span>
          <span className="detailsPanel__referenceCitation">{data.priorArtReference.citation}</span>
        </div>
      </PanelSection>

      {/* Summary */}
      <PanelSection>
        <SectionLabel>Summary</SectionLabel>
        <p className="detailsPanel__text">{data.summary}</p>
      </PanelSection>

      {/* Citations */}
      <PanelSection>
        <SectionLabel>Citations</SectionLabel>
        <CitationChipsRow citations={data.citations} onCitationClick={onCitationClick} />
      </PanelSection>

      {/* Analysis */}
      <PanelSection>
        <SectionLabel>Analysis</SectionLabel>
        <p className="detailsPanel__text">{data.analysis}</p>
      </PanelSection>

      {/* Conclusion */}
      <PanelSection>
        <SectionLabel>Conclusion</SectionLabel>
        <p className="detailsPanel__text">{data.conclusion}</p>
      </PanelSection>

      {/* Strength Meter */}
      <PanelSection>
        <SectionLabel>Strength</SectionLabel>
        <StrengthMeter value={data.strength} />
      </PanelSection>
    </>
  );
}

/* ── Content Renderer Map ───────────────────────────────────────── */

const CONTENT_RENDERERS: Record<
  DetailsType,
  React.ComponentType<{
    data: any;
    onCitationClick?: (citation: Citation) => void;
    onChipClick?: (chip: BasisChip) => void;
  }>
> = {
  line: LinePanelContent,
  feature: FeaturePanelContent,
  relationship: RelationshipPanelContent,
};

/* ── Main Component ─────────────────────────────────────────────── */

export function DetailsPanel({
  detailsType,
  data,
  onClose,
  onCitationClick,
  onChipClick,
}: DetailsPanelProps) {
  const ContentRenderer = CONTENT_RENDERERS[detailsType];

  return (
    <div className="detailsPanel">
      {/* Close Button */}
      <button className="detailsPanel__closeBtn" onClick={onClose} aria-label="Close panel">
        <CloseIcon />
      </button>

      {/* Scrollable Body */}
      <div className="detailsPanel__body">
        <ContentRenderer
          data={data}
          onCitationClick={onCitationClick}
          onChipClick={onChipClick}
        />
      </div>
    </div>
  );
}
