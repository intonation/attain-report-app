# Interaction Model: Candidate A
## Contextual Menu Routing

**URL:** `/option-a` or `/`

**Principle:** User-directed routing via context menu. User chooses where content appears.

---

## Interaction Path Matrix

### By Page: What Opens When You Click

| Page | Clickable Element | What Opens | User Choice? |
|------|-------------------|------------|--------------|
| **Executive Summary** | Claim card "View in claims chart" | Navigate to Claim Charts + highlight row | No |
| | L-ref link (L1-8, L18-7) | Navigate to Claim Charts + highlight row | No |
| **Scope of Analysis** | Claim number (1, 2, 18...) | Context menu appears | **Yes** |
| | Reference name (Graves et al.) | Navigate to Reference Summary | No |
| | Citation (p.4, top) | Document Viewer | No |
| **Strategic Review** | Claim number (1, 18, 19...) | Context menu appears | **Yes** |
| | Citation (p.12, top) | Document Viewer | No |
| **Claims** | F/R node (F1-1, R1-2) | Context menu appears | **Yes** |
| **Claim Charts** | Table row | Claim Detail Panel | No |
| | Citation in row | Document Viewer | No |
| **Workbench** | Table row | Workbench Detail Panel | No |
| | Citation | Document Viewer | No |
| **Reference Summaries** | Citation (p.5, top) | Document Viewer | No |

---

### Context Menu Options

Context menus appear in two scenarios:

**When clicking F/R nodes (Claims page):**

| Menu Option | Result |
|-------------|--------|
| **Left pane** | Workbench opens in main pane, scrolls to entry |
| **Right pane** | Split view activates, Workbench in right pane |
| **Details pane** | WorkbenchDetailPanel opens on right edge |
| **Highlight** (5 colors) | Marks the node with selected color |
| **Clear highlight** | Removes highlight from node |
| **Cancel** | Closes menu, no action |

**When clicking claim numbers (Scope of Analysis, Strategic Review):**

| Menu Option | Result |
|-------------|--------|
| **Left pane** | Navigate to Claim Charts, highlight row |
| **Right pane** | Split view activates, Claim Charts in right pane |
| **Details pane** | ClaimSummaryPanel opens on right edge |
| **Highlight** (5 colors) | Marks the claim link with selected color |
| **Clear highlight** | Removes highlight from claim link |
| **Cancel** | Closes menu, no action |

---

### By Element Type: Consistent Behaviour

| Element Type | Visual Style | Click Behaviour |
|--------------|--------------|-----------------|
| **Claim number** | Blue, dotted underline | Context menu (user chooses destination) |
| **L-ref** (L1-8) | Blue, dotted underline | Navigates to Claim Charts, highlights row |
| **F/R node** (F1-1) | Inline in claim text | Context menu (user chooses destination) |
| **Reference name** | Blue, dotted underline | Navigates to Reference Summary page |
| **Citation** | Blue, dotted underline | Opens Document Viewer |
| **Table row** | Hover highlight | Opens detail panel for that row |

---

## Pane Layout

```
┌─────────────────────────────────────────────────────────────┐
│ TOOLBAR                                                     │
├────────┬──────────────────────────┬─────────────────────────┤
│        │                          │                         │
│  SIDE  │  MAIN PANE               │  INSPECT PANE           │
│  BAR   │  (or SPLIT VIEW)         │  (conditional)          │
│        │                          │                         │
│  Has:  │  Can show:               │  Panel types:           │
│  work- │  • Any document page     │  • ClaimSummaryPanel    │
│  bench │  • Workbench (full)      │  • ClaimDetailPanel     │
│  nav   │  • Split: two docs       │  • WorkbenchDetailPanel │
│        │                          │  • DocumentViewer       │
│        │  User controls via:      │                         │
│        │  • Sidebar nav           │  Opens via:             │
│        │  • Context menu          │  • Direct clicks        │
│        │  • Pane header dropdown  │  • Context menu choice  │
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
            Navigate to Claim Charts
            Row highlighted (panel NOT open)
            User clicks row to open panel
```

### From Scope of Analysis / Strategic Review (Context Menu)

```
Scope of Analysis / Strategic Review
       │
       └─── Click claim number (1, 18, 19...)
                   │
                   ▼
            Context Menu appears
                   │
       ┌───────────┼───────────┬───────────┐
       ▼           ▼           ▼           ▼
   Left pane   Right pane   Details    Highlight
       │           │           │           │
       ▼           ▼           ▼           ▼
   Navigate    Split view   ClaimSumm-  Color
   to Claim    activates    aryPanel    applied
   Charts      with Charts  opens       to link
```

### From Claims Page (Context Menu)

```
Claims Page
       │
       └─── Click F/R node (F1-1, R1-2)
                   │
                   ▼
            Context Menu appears
                   │
       ┌───────────┼───────────┬───────────┐
       ▼           ▼           ▼           ▼
   Left pane   Right pane   Details    Highlight
       │           │           │           │
       ▼           ▼           ▼           ▼
   Workbench   Split view   Workbench   Color
   in main     activates    DetailPanel applied
   pane        with WB      opens       to node
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
       │                Scrolls Workbench to entry
       │                (if Workbench visible)
       │
       └─── Click citation in row
                   │
                   ▼
            DocumentViewer opens
```

### From Workbench Page

```
Workbench Page
       │
       ├─── Click table row
       │           │
       │           ▼
       │    WorkbenchDetailPanel opens
       │    Shows full entry details
       │
       └─── Click citation
                   │
                   ▼
            DocumentViewer opens
```

---

## Split View Behaviour

| Trigger | Result |
|---------|--------|
| Context menu → "Right pane" (F/R node) | Split view with Workbench on right |
| Context menu → "Right pane" (claim) | Split view with Claim Charts on right |
| Pane header split toggle | Split view with current doc duplicated |
| Pane header dropdown | Change document in that pane |
| Maximize button (right pane) | Right doc becomes main, split closes |
| Maximize button (left pane) | Split closes, left remains |

---

## Override Behaviour

| Current State | User Action | Result |
|---------------|-------------|--------|
| Details panel open | Click different node → Details | Replaces panel content |
| Split view active | Select "Left pane" from menu | Closes split view, shows Workbench |
| Document viewer open | Click different citation | Replaces viewer content |
| Both panels open | — | Sidebar auto-collapses |
| Workbench in main | Click node → Details | Panel opens alongside |

---

## Context Menu Structure

```
┌──────────────────────┐
│ Highlight            │
│ ● ● ● ● ●           │  ← 5 color swatches
│ Clear highlight      │
├──────────────────────┤
│ View in              │
│   Left pane          │
│   Right pane         │
│   Details pane       │
├──────────────────────┤
│ Cancel               │
└──────────────────────┘
```

---

## Navigation vs Panel Opening

| Action | Type | Stays on Page? |
|--------|------|----------------|
| Click claim number | Menu → choice | Depends on choice |
| Click L-ref | Navigation | No - goes to Claim Charts |
| Click F/R node | Menu → choice | Depends on choice |
| Click citation | Panel | Yes |
| Click table row | Panel | Yes |
| Click reference name | Navigation | No - goes to Reference Summary |
| Click "View in claims chart" | Navigation | No - goes to Claim Charts |
| Click sidebar nav item | Navigation | No - changes page |
| Context menu → Left pane (F/R) | Navigation | No - goes to Workbench |
| Context menu → Left pane (claim) | Navigation | No - goes to Claim Charts |
| Context menu → Right pane | Split view | Sort of - adds pane |
| Context menu → Details | Panel | Yes |

---

## What's Available (vs Option B)

| Feature | Status | Purpose |
|---------|--------|---------|
| Context menu | Available | User chooses destination |
| Highlighting | Available | Annotation for review workflow |
| Split view | Available | Side-by-side comparison |
| Workbench page | Available | Full table view of all entries |
| User pane selection | Available | Flexibility in layout |

---

## Key Characteristics

| Attribute | Value |
|-----------|-------|
| Clicks to evidence | 2 (node → menu → destination) |
| User decisions | 1 per node click |
| Pane destinations | User choice (3 options) |
| Behaviour predictability | Medium |
| Learning curve | Medium |
| Flexibility | High |
