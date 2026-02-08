import React from 'react';

// Citation data structure
interface Citation {
  refId: string;
  filename: string;
  text: string;
  location: string;
}

// Parse citation string format: #["ref", "file.pdf", "text...", "page info"]
const parseCitation = (citationStr: string): Citation | null => {
  const match = citationStr.match(/\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\]/);
  if (match) {
    return {
      refId: match[1],
      filename: match[2],
      text: match[3],
      location: match[4],
    };
  }
  return null;
};

// PDF Jump Link component
interface PdfJumpLinkProps {
  citation: Citation;
  onClick?: (citation: Citation) => void;
}

const PdfJumpLink: React.FC<PdfJumpLinkProps> = ({ citation, onClick }) => (
  <button
    className="pdf-jump-link"
    onClick={() => onClick?.(citation)}
    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
  >
    {citation.location}
  </button>
);

// Claim link component
interface ClaimLinkProps {
  claimNumber: number;
  onClick?: (claimNumber: number, x: number, y: number) => void;
}

const ClaimLink: React.FC<ClaimLinkProps> = ({ claimNumber, onClick }) => (
  <button
    type="button"
    className="scope-analysis__claim-link"
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      onClick?.(claimNumber, e.clientX, e.clientY);
    }}
  >
    {claimNumber}
  </button>
);

// Parse claim list text like "Claims 1, 2, 3, 4, 5" and make each number clickable
const renderClaimList = (
  prefix: string,
  claimNumbers: number[],
  onClaimClick?: (claimNumber: number, x: number, y: number) => void
): React.ReactNode => {
  return (
    <>
      {prefix}
      {claimNumbers.map((num, idx) => (
        <React.Fragment key={num}>
          <ClaimLink claimNumber={num} onClick={onClaimClick} />
          {idx < claimNumbers.length - 1 && ', '}
        </React.Fragment>
      ))}
    </>
  );
};

// Reference link component
interface ReferenceLinkProps {
  referenceId: string;
  displayText: string;
  onClick?: (referenceId: string) => void;
}

const ReferenceLink: React.FC<ReferenceLinkProps> = ({ referenceId, displayText, onClick }) => (
  <button
    className="scope-analysis__reference-link"
    onClick={() => onClick?.(referenceId)}
  >
    {displayText}
  </button>
);

// Render text with inline citations
const renderTextWithCitations = (
  text: string,
  onCitationClick?: (citation: Citation) => void
): React.ReactNode[] => {
  const parts = text.split(/(#\["[^"]+",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+"\])/g);

  return parts.map((part, index) => {
    if (part.startsWith('#[')) {
      const citation = parseCitation(part.substring(1));
      if (citation) {
        return (
          <PdfJumpLink
            key={index}
            citation={citation}
            onClick={onCitationClick}
          />
        );
      }
    }
    return <span key={index}>{part}</span>;
  });
};

// Scope of Analysis Content Component
interface ScopeOfAnalysisContentProps {
  onCitationClick?: (citation: Citation) => void;
  onClaimClick?: (claimNumber: number, x: number, y: number) => void;
  onReferenceClick?: (referenceId: string) => void;
}

export const ScopeOfAnalysisContent: React.FC<ScopeOfAnalysisContentProps> = ({
  onCitationClick,
  onClaimClick,
  onReferenceClick,
}) => {
  return (
    <div className="scope-analysis">
      {/* Substantive Objections Section */}
      <section className="scope-analysis__section">
        <h2 className="scope-analysis__heading">Substantive objections</h2>

        <p className="scope-analysis__paragraph">
          [1] The official action raises the following substantive objections.
        </p>

        <div className="scope-analysis__table-wrapper">
          <table className="scope-analysis__table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Details</th>
                <th>Citations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Anticipation</strong></td>
                <td>Pertains to {renderClaimList('Claims ', [1, 2, 3, 4, 5, 6, 7, 10, 12, 14, 15, 18, 19, 21, 22], onClaimClick)}. The examiner rejects those claims under 35 U.S.C. § 102(a)(1)/(a)(2) as anticipated by <strong><ReferenceLink referenceId="summary-graves" displayText="Graves et al. (US 2019/0329772 A1)" onClick={onReferenceClick} /></strong>.</td>
                <td>{renderTextWithCitations('#["office_action", "Non-final rejection.pdf", "B00085:Claims 1-7, 10, 12, 14-15, 18-19 and 21-22 are rejected under 35 U.", "p.4, top"]', onCitationClick)}</td>
              </tr>
              <tr>
                <td><strong>Obviousness</strong></td>
                <td>Pertains to {renderClaimList('Claims ', [8, 9, 13], onClaimClick)}. The examiner rejects those claims under 35 U.S.C. § 103 as unpatentable over <strong><ReferenceLink referenceId="summary-graves" displayText="Graves et al." onClick={onReferenceClick} /></strong></td>
                <td>{renderTextWithCitations('#["office_action", "Non-final rejection.pdf", "B00291:Claims 8-9 and 13 are rejected under 35 U.", "p.16, bottom"]', onCitationClick)}</td>
              </tr>
              <tr>
                <td><strong>Obviousness</strong></td>
                <td>Pertains to {renderClaimList('Claims ', [11, 16], onClaimClick)}. The examiner rejects those claims under 35 U.S.C. § 103 as unpatentable over <strong><ReferenceLink referenceId="summary-graves" displayText="Graves et al." onClick={onReferenceClick} /></strong> in view of <strong><ReferenceLink referenceId="summary-breuer" displayText="Breuer et al. (US 2015/0012204 A1)" onClick={onReferenceClick} /></strong>.</td>
                <td>{renderTextWithCitations('#["office_action", "Non-final rejection.pdf", "B00298:Claims 11 and 16 are rejected under 35 U.", "p.17, top-bottom"]', onCitationClick)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Minor Objections Section */}
      <section className="scope-analysis__section">
        <h2 className="scope-analysis__heading">Minor objections</h2>

        <p className="scope-analysis__paragraph">
          [2] The official action additionally raises the following objections which appear minor.
        </p>

        <div className="scope-analysis__table-wrapper">
          <table className="scope-analysis__table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Details</th>
                <th>Citations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Abstract</strong></td>
                <td>This objection applies to the abstract. The Office Action objects to the specification because the abstract does not commence on a separate sheet; a new abstract on a separate sheet is required.</td>
                <td>{renderTextWithCitations('#["office_action", "Non-final rejection.pdf", "B00059:Specification The abstract of the disclosure does not commence on a separate sheet in accordance with 37 CFR 1.", "p.2, bottom"]', onCitationClick)}</td>
              </tr>
              <tr>
                <td><strong>Eligibility</strong></td>
                <td>Pertains to {renderClaimList('Claim ', [18], onClaimClick)}. The examiner rejects that claim under 35 U.S.C. § 101 as non-statutory subject matter, asserting the claim is drawn to a computer program (software per se) and indicating it should be written as nontransitory memory storing a computer program.</td>
                <td>{renderTextWithCitations('#["office_action", "Non-final rejection.pdf", "B00070:Claim 18 is rejected under 35 U. S.", "p.3, mid-bottom"]', onCitationClick)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Allowable Subject Matter Section */}
      <section className="scope-analysis__section">
        <h2 className="scope-analysis__heading">Allowable subject matter</h2>

        <p className="scope-analysis__paragraph">
          [3] The official action does not identify any allowable subject matter.
        </p>
      </section>

      {/* Scope of Analysis Section */}
      <section className="scope-analysis__section">
        <h2 className="scope-analysis__heading">Scope of analysis</h2>

        <p className="scope-analysis__paragraph">
          [4] For analysis purposes, the independent claims have been grouped as follows.
        </p>

        <div className="scope-analysis__table-wrapper">
          <table className="scope-analysis__table">
            <thead>
              <tr>
                <th>Group</th>
                <th>Independent claims</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Predicted-headway comfort decel</strong></td>
                <td>{renderClaimList('Claims ', [1, 19], onClaimClick)}</td>
                <td>Determines and applies a deceleration strategy when current headway falls below a target headway. The strategy is selectively optimized for comfort based on a predicted headway computed for a future time using the forward vehicle's current relative speed and acceleration. {renderClaimList('Claim ', [1], onClaimClick)} was selected as the representative claim for this subject matter group because it is the first strictly independent claim in the group listed in the affected-claims list for the anticipation rejection.</td>
              </tr>
              <tr>
                <td><strong>Risk-category comfort decel</strong></td>
                <td>{renderClaimList('Claim ', [18], onClaimClick)}</td>
                <td>Determines and applies a deceleration strategy when current headway falls below a target headway. The strategy is selectively optimized for comfort based on a discrete risk category determined from the forward vehicle's current relative speed and acceleration. {renderClaimList('Claim ', [18], onClaimClick)} has been analyzed because it is the only strictly independent claim in this subject matter group.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export type { Citation };
