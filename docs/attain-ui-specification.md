# Attain UI Specification

## Design Principles

### 1. Document First

- Text is the primary object
- Claims are the primary actions
- Navigation is secondary
- Tools are tertiary

> If something competes visually with the report text, it's too loud.

### 2. Stable Structure, Quiet Chrome

- Toolbars stay in place across pages
- Visually low contrast
- No heavy fills
- No boxed icon buttons unless critical
- Prefer line icons at reduced opacity

> Stable ≠ loud.

### 3. Constrain Placement, Not Access

- Documents open in system-defined panes
- No free placement
- Inspect always opens inspection pane
- Nav always opens reading pane

> Choice reduction lowers decision cost. Hick's Law applies.

### 4. Progressive Tool Visibility

- Orientation controls always visible
- Action controls appear on hover or focus
- Rare tools move to overflow or kebab

> Presence is stable. Density is contextual.

### 5. First View = Return Moment

The first viewport should answer:
- What document is this?
- What did the AI produce?
- What should I inspect first?

Everything else can recede.

---

## Interaction Patterns

### Navigation

| Pattern | Behaviour |
|---------|-----------|
| Panel-based navigation | Left pane for reading, right pane for inspection |
| History stack | Back/forward per panel |
| Mutual exclusivity | Only one right panel type at a time (details OR document viewer) |
| Cross-linking | Nodes in content link to related views |

### Selection & Highlighting

| Pattern | Behaviour |
|---------|-----------|
| Row selection | Click to select, background highlight |
| Navigation highlight | Scroll into view + pulse animation |
| Persistent highlighting | 5 colors for annotation |
| Hover preview | Subtle background change on interactive elements |

### Filtering & Search

| Pattern | Behaviour |
|---------|-----------|
| Status filter | Filter by novelty conclusion |
| Text search | Real-time filtering as user types |
| Column visibility | Toggle columns on/off |
| Active indicators | Visual badge when filters applied |

### Table Interactions

| Element | Action | Result |
|---------|--------|--------|
| Row | Click | Opens detail panel |
| Citation | Click | Opens document viewer |
| Mode toggle | Click | Switches overview/detailed view |
| Chip | Click | Navigates to related entry |

### Panel Behaviours

| Behaviour | Trigger |
|-----------|---------|
| Auto-collapse sidebar | Viewport < breakpoint OR both panels open |
| Resize handle | Drag between panels |
| Close button | Always visible on right panels |
| Breadcrumb | Within panel navigation |

### Visual Feedback

| State | Treatment |
|-------|-----------|
| Selected | Background colour change |
| Hover | Subtle transition (150ms) |
| Highlight pulse | Scroll target animation |
| Loading | Skeleton or spinner |

---

## Interaction Models

Two routing models are implemented for evaluation:

### Model A: Contextual Menu

**URL:** `/option-a` or `/`

**Routing:**
- Reference node click → Context menu appears
- User selects destination: Left pane, Right pane, or Details pane
- Highlighting available (5 colours)

**Characteristics:**
- User-directed routing
- 2 clicks to evidence
- Split view supported
- Workbench page accessible

```
Node Click → Menu → User Choice → Destination
```

### Model B: System-Directed

**URL:** `/option-b`

**Routing:**
- Reference node click → Details panel opens immediately
- No menu, no choice
- Workbench removed from navigation

**Characteristics:**
- System-directed routing
- 1 click to evidence
- No split view
- Predictable behaviour

```
Node Click → Details Panel
```

---

## Routing Rules (Both Models)

| Action | Destination |
|--------|-------------|
| Click reference node (F/R) | Details panel (B) or menu choice (A) |
| Click citation | Document viewer |
| Click claim chart row | Claim detail panel |
| Click "View in claims chart" | Navigate to claim charts + select row |

---

## Pane Layout

```
┌─────────────────────────────────────────────────────────────┐
│ TOOLBAR                                                     │
├────────┬──────────────────────────┬─────────────────────────┤
│        │                          │                         │
│  SIDE  │  MAIN PANE               │  INSPECT PANE           │
│  BAR   │                          │  (conditional)          │
│        │  • Document content      │                         │
│  Nav   │  • Claim charts          │  • Detail panel         │
│  items │  • Workbench (Model A)   │  • Document viewer      │
│        │                          │                         │
│        │  Resizable ←──────────→  │  Resizable              │
│        │                          │                         │
└────────┴──────────────────────────┴─────────────────────────┘
```

---

## Override Behaviour

| Current State | User Action | Result |
|---------------|-------------|--------|
| Details panel open | Click different node | Replace panel content |
| Document viewer open | Click different citation | Replace viewer content |
| Split view active | Select "Left pane" (Model A) | Close split view |
| Both panels open | — | Sidebar auto-collapses |

---

## Implementation Reference

| Component | File |
|-----------|------|
| Interaction context | `src/contexts/InteractionModeContext.tsx` |
| Main workspace | `src/pages/ConstrainedWorkspace.tsx` |
| Context menu | `src/components/SelectionContextMenu.tsx` |
| Claim target nodes | `src/data/claimsData.tsx` |
| Workbench detail panel | `src/components/Workbench/WorkbenchDetailPanel.tsx` |
| Claim detail panel | `src/components/ClaimDetailPanel.tsx` |
| Document viewer | `src/components/DocumentViewer.tsx` |
