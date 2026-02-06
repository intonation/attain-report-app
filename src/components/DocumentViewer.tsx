import '../styles/document-viewer.css';

// Close icon
function CloseIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

interface DocumentViewerProps {
  citation: string;
  onClose: () => void;
}

// Map citations to document URLs (in a real app, this would come from an API)
function getDocumentUrl(citation: string): string {
  // For now, use a placeholder PDF or could link to actual documents
  // In production, this would map to actual document URLs
  return `/documents/${encodeURIComponent(citation)}.pdf`;
}

// Parse citation to extract document name and location
function parseCitation(citation: string): { document: string; location: string } {
  // Parse patterns like "p.12, top" or "p.8, para 3" or "Graves Fig. 4, paras [0045]-[0048]"
  if (citation.includes('Graves')) {
    return { document: 'Graves et al. (US 2019/0329772 A1)', location: citation };
  }
  if (citation.startsWith('p.')) {
    return { document: 'Graves et al. (US 2019/0329772 A1)', location: citation };
  }
  return { document: 'Reference Document', location: citation };
}

export function DocumentViewer({ citation, onClose }: DocumentViewerProps) {
  const { document, location } = parseCitation(citation);
  const pdfUrl = getDocumentUrl(citation);

  return (
    <div className="documentViewer">
      {/* Header */}
      <div className="documentViewer__header">
        <div className="documentViewer__headerInfo">
          <span className="documentViewer__title">Document Viewer</span>
          <span className="documentViewer__subtitle">{document}</span>
        </div>
        <button
          className="documentViewer__closeBtn"
          onClick={onClose}
          aria-label="Close document viewer"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Citation location badge */}
      <div className="documentViewer__locationBar">
        <span className="documentViewer__locationLabel">Viewing:</span>
        <span className="documentViewer__locationValue">{location}</span>
      </div>

      {/* Document content */}
      <div className="documentViewer__content">
        {/* In production, this would be an iframe with the actual PDF */}
        {/* For now, show a placeholder since we don't have actual PDFs */}
        <div className="documentViewer__placeholder">
          <div className="documentViewer__placeholderIcon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <p className="documentViewer__placeholderTitle">{document}</p>
          <p className="documentViewer__placeholderText">
            Citation: <strong>{location}</strong>
          </p>
          <p className="documentViewer__placeholderNote">
            Document viewer will display the reference at the specified location.
          </p>
          {/* Hidden iframe for when PDFs are available */}
          <iframe
            src={pdfUrl}
            title="PDF Document"
            className="documentViewer__iframe documentViewer__iframe--hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default DocumentViewer;
