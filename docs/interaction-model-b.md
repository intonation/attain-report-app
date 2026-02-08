# Interaction Model: Candidate B
## System-Directed Routing

**URL:** `/option-b`

**Principle:** No user-chosen pane destinations. System routes automatically based on what was clicked and where.

---

### Routing Rules

| User Action | Location | Destination |
|-------------|----------|-------------|
| Document click | Sidebar | Main reading pane |
| Claim card button | Executive Summary | Claims chart row (navigate + select) |
| Claim chart row click | Claims Chart | Details pane (right) |
| Reference node click | Inline in content | Details pane (right) |
| Reference node click | Inside details pane | Rewrites details pane |
| Citation click | Inline in content | Document viewer |
| Citation click | Inside details pane | Document viewer |

---

### Pane Behaviour

```
┌─────────────────────────────────────────────────────────────┐
│ TOOLBAR                                                     │
├────────┬──────────────────────────┬─────────────────────────┤
│        │                          │                         │
│  SIDE  │  MAIN PANE               │  INSPECT PANE           │
│  BAR   │  (reading)               │  (details)              │
│        │                          │                         │
│  • No  │  Always shows:           │  Shows on:              │
│  work- │  • Executive Summary     │  • Row click → Claim    │
│  bench │  • Scope of Analysis     │  • Node click → Entry   │
│        │  • Strategic Review      │  • Citation → Document  │
│        │  • Claims                │                         │
│        │  • Claim Charts          │  Rewrites on each click │
│        │  • Reference Summaries   │                         │
│        │                          │                         │
└────────┴──────────────────────────┴─────────────────────────┘
```

**Key behaviours:**
- Details pane is the single destination for all inspection
- Each click replaces previous content (no stacking)
- No split view available
- No workbench page in navigation

---

### Flow Diagrams

**Claim inspection flow:**
```
Claim Card → "View in claims chart" → Claims Chart (main pane)
                                           │
                                           ▼
                                      Row selected
                                           │
                                           ▼
                                   ClaimDetailPanel (right)
```

**Reference node flow (inline):**
```
Claims page → Click "adaptive cruise controller" (F1-1)
                           │
                           ▼
                 WorkbenchDetailPanel (right)
                 Shows F1-1 interpretation,
                 evidence, conclusion
```

**Reference node flow (in details pane):**
```
WorkbenchDetailPanel showing F1-1
           │
           ▼
    Click "F1-2" link in text
           │
           ▼
WorkbenchDetailPanel rewrites to F1-2
```

**Citation flow:**
```
Any page → Click citation (e.g., "col.4, ll.12-18")
                         │
                         ▼
              DocumentViewer (right)
              Shows referenced passage
```

---

### Override Behaviour

| Current State | User Action | Result |
|---------------|-------------|--------|
| Details panel showing F1-1 | Click F1-2 in content | Panel rewrites to F1-2 |
| Details panel showing F1-1 | Click F1-3 link in panel | Panel rewrites to F1-3 |
| Document viewer open | Click citation | Viewer rewrites to new citation |
| Details panel open | Click citation | Document viewer opens, details closes |
| Document viewer open | Click reference node | Details opens, viewer closes |

**Mutual exclusivity:** Only one right-panel type at a time.

---

### What's Removed (vs Option A)

| Feature | Status | Reason |
|---------|--------|--------|
| Context menu | Removed | No pane choice needed |
| Highlighting | Removed | Annotation is separate concern |
| Left pane option | Removed | System routes to details |
| Right pane option | Removed | System routes to details |
| Split view | Removed | Single-focus reading model |
| Workbench page | Removed | Details panel serves this purpose |

---

### Implementation

```tsx
// Reference node click - inline in content
const handleClaimTargetClick = (ref, x, y) => {
  if (interactionMode === 'system') {
    const found = findWorkbenchEntry(ref);
    if (found) {
      setWorkbenchSelection({ entry: found.entry, ... });
      setIsWorkbenchPanelOpen(true);
    }
  }
};

// Reference node click - inside details panel
const handleWorkbenchIdClick = (id) => {
  if (interactionMode === 'system') {
    const found = findWorkbenchEntry(id);
    if (found) {
      setWorkbenchSelection({ entry: found.entry, ... });
      // Panel rewrites automatically
    }
  }
};
```

---

### Key Characteristics

| Attribute | Value |
|-----------|-------|
| Clicks to evidence | 1 |
| User decisions | 0 (system decides) |
| Pane destinations | Fixed (always right) |
| Behaviour predictability | High |
| Learning curve | Low |
| Flexibility | Low |
