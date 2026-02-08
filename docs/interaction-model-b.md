# Interaction Model: Candidate B
## System-Directed Routing

**URL:** `/option-b`

**Principle:** No user-chosen pane destinations. System routes automatically based on what was clicked and where.

---

## Interaction Path Matrix

### By Page: What Opens When You Click

| Page | Clickable Element | What Opens | Panel Type |
|------|-------------------|------------|------------|
| **Executive Summary** | Claim card "View in claims chart" | Navigate to Claim Charts, highlight row | Navigation |
| | L-ref link (L1-8, L18-7) | Claim Detail Panel | Right panel |
| **Scope of Analysis** | Claim number (1, 2, 18...) | Claim Summary Panel | Right panel |
| | Reference name (Graves et al.) | Navigate to Reference Summary | Navigation |
| | Citation (p.4, top) | Document Viewer | Right panel |
| **Strategic Review** | Claim number (1, 18, 19...) | Claim Summary Panel | Right panel |
| | Citation (p.12, top) | Document Viewer | Right panel |
| **Claims** | F/R node (F1-1, R1-2) | Workbench Detail Panel | Right panel |
| **Claim Charts** | Table row | Claim Detail Panel | Right panel |
| | Citation in row | Document Viewer | Right panel |
| **Reference Summaries** | Citation (p.5, top) | Document Viewer | Right panel |

---

### By Element Type: Consistent Behaviour

| Element Type | Visual Style | Click Behaviour |
|--------------|--------------|-----------------|
| **Claim number** | Blue, dotted underline | Opens Claim Summary Panel |
| **L-ref** (L1-8) | Blue, dotted underline | Opens Claim Detail Panel for that row |
| **F/R node** (F1-1) | Inline in claim text | Opens Workbench Detail Panel |
| **Reference name** | Blue, dotted underline | Navigates to Reference Summary page |
| **Citation** | Blue, dotted underline | Opens Document Viewer |
| **Table row** | Hover highlight | Opens detail panel for that row |

---

## Panel Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│ TOOLBAR                                                     │
├────────┬──────────────────────────┬─────────────────────────┤
│        │                          │                         │
│  SIDE  │  MAIN PANE               │  INSPECT PANE           │
│  BAR   │  (reading)               │  (one at a time)        │
│        │                          │                         │
│  • No  │  Pages:                  │  Panel types:           │
│  work- │  • Executive Summary     │  • ClaimSummaryPanel    │
│  bench │  • Scope of Analysis     │  • ClaimDetailPanel     │
│        │  • Strategic Review      │  • WorkbenchDetailPanel │
│        │  • Claims                │  • DocumentViewer       │
│        │  • Claim Charts          │                         │
│        │  • Reference Summaries   │  Only one shows at a    │
│        │                          │  time. Each click       │
│        │                          │  replaces previous.     │
└────────┴──────────────────────────┴─────────────────────────┘
```

---

## Detailed Flow Diagrams

### From Executive Summary

```
Executive Summary
       │
       ├─── Click "View in claims chart" button
       │           │
       │           ▼
       │    Navigate to Claim Charts
       │    Row highlighted (panel NOT open)
       │    User clicks row to open panel
       │
       └─── Click L-ref (L1-8, L18-7)
                   │
                   ▼
            ClaimDetailPanel opens
            Shows that specific row's details
```

### From Scope of Analysis

```
Scope of Analysis
       │
       ├─── Click claim number (1, 18, etc.)
       │           │
       │           ▼
       │    ClaimSummaryPanel opens
       │    Shows claim-level summary
       │    "View in claim chart" button available
       │
       ├─── Click reference (Graves et al.)
       │           │
       │           ▼
       │    Navigate to Reference Summary page
       │
       └─── Click citation (p.4, top)
                   │
                   ▼
            DocumentViewer opens
            Shows PDF at that location
```

### From Strategic Review

```
Strategic Review
       │
       ├─── Click claim number (1, 18, 19)
       │           │
       │           ▼
       │    ClaimSummaryPanel opens
       │    Shows claim-level summary
       │
       └─── Click citation (p.12, top)
                   │
                   ▼
            DocumentViewer opens
```

### From Claims Page

```
Claims Page
       │
       └─── Click F/R node (F1-1, R1-2)
                   │
                   ▼
            WorkbenchDetailPanel opens
            Shows interpretation, evidence, conclusion
                   │
                   └─── Click another F/R in panel
                               │
                               ▼
                        Panel REWRITES to new entry
                        (breadcrumb navigation available)
```

### From Claim Charts

```
Claim Charts
       │
       ├─── Click table row
       │           │
       │           ▼
       │    ClaimDetailPanel opens
       │    Shows row details with analysis
       │           │
       │           └─── Click F/R link in panel
       │                       │
       │                       ▼
       │                Panel navigates to that entry
       │                (breadcrumb shows path)
       │
       └─── Click citation in row
                   │
                   ▼
            DocumentViewer opens
```

---

## Panel Mutual Exclusivity

| Current State | User Action | Result |
|---------------|-------------|--------|
| ClaimSummaryPanel open | Click claim number | Panel rewrites to new claim |
| ClaimDetailPanel open | Click different row | Panel rewrites to new row |
| ClaimDetailPanel open | Click F/R link | Panel navigates (breadcrumb) |
| WorkbenchDetailPanel open | Click F/R in panel | Panel rewrites to new entry |
| DocumentViewer open | Click citation | Viewer updates to new citation |
| Any panel open | Click different element type | Previous closes, new opens |

---

## Navigation vs Panel Opening

| Action | Type | Stays on Page? |
|--------|------|----------------|
| Click claim number | Panel | Yes |
| Click L-ref | Panel | Yes |
| Click F/R node | Panel | Yes |
| Click citation | Panel | Yes |
| Click table row | Panel | Yes |
| Click reference name | Navigation | No - goes to Reference Summary |
| Click "View in claims chart" | Navigation | No - goes to Claim Charts |
| Click sidebar nav item | Navigation | No - changes page |

---

## What's Not Available (vs Option A)

| Feature | Status | Reason |
|---------|--------|--------|
| Context menu | Removed | No pane choice needed |
| Highlighting | Removed | Annotation is separate concern |
| Split view | Removed | Single-focus reading model |
| Workbench page | Removed | Details panel serves this purpose |
| User pane selection | Removed | System decides destination |

---

## Key Characteristics

| Attribute | Value |
|-----------|-------|
| Clicks to evidence | 1 |
| User decisions | 0 (system decides) |
| Pane destinations | Fixed (always right) |
| Behaviour predictability | High |
| Learning curve | Low |
| Flexibility | Low |
