# Interaction Model: Option B
## System-Directed Routing

**URL:** `/option-b`

**Core Principle:** System-directed routing. Every click has exactly one destination—no choices, no menus. The system decides where content appears based on element type.

---

## Quick Reference

| User clicks... | What happens |
|----------------|--------------|
| Claim number | Claim Summary Panel opens |
| Paragraph [1] | Claim Summary Panel opens |
| F/R node (F1-1) | Workbench Detail Panel opens |
| L-ref (L1-8) | Navigate to Claim Charts, row highlighted |
| Citation (p.4) | Document Viewer opens |
| Table row | Detail panel opens |
| Reference name | Navigate to Reference Summary |
| "View in claims chart" | Navigate to Claim Charts, row highlighted |

---

## Interaction Paths Overview

### Path 1: Panel Opening Flow (Most Common)

```
┌─────────────────────────────────────────────────────────────────┐
│                      PANEL OPENING FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   User clicks            Panel opens             Panel type     │
│                                                                 │
│   Claim number     ───►  Right edge       ───►  ClaimSummary    │
│   or [1], [2]            panel opens            Panel           │
│                                                                 │
│   F/R node         ───►  Right edge       ───►  Workbench       │
│   (F1-1, R1-2)           panel opens            DetailPanel     │
│                                                                 │
│   Table row        ───►  Right edge       ───►  ClaimDetail     │
│   (Claim Charts)         panel opens            Panel           │
│                                                                 │
│   Citation         ───►  Right edge       ───►  Document        │
│   (p.4, top)             panel opens            Viewer          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Path 2: Direct Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DIRECT NAVIGATION FLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   User clicks            System action           Result         │
│                                                                 │
│   L-ref (L1-8)    ───►   Navigate         ───►  Claim Charts    │
│                          + highlight row         (row selected) │
│                                                                 │
│   Reference name  ───►   Navigate         ───►  Reference       │
│   (Graves et al.)                                Summary page   │
│                                                                 │
│   "View in        ───►   Navigate         ───►  Claim Charts    │
│   claims chart"          + highlight row         (row selected) │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Path 3: Panel Replacement Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    PANEL REPLACEMENT FLOW                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Panel already open                  User clicks new element   │
│                                                                 │
│   ClaimSummaryPanel    ───►  Click claim #2    ───►  Rewrites   │
│   showing Claim 1                                    to Claim 2 │
│                                                                 │
│   ClaimDetailPanel     ───►  Click F/R link    ───►  Navigates  │
│   showing row                in panel               (breadcrumb)│
│                                                                 │
│   Any panel open       ───►  Click different   ───►  Previous   │
│                              element type            closes,    │
│                                                      new opens  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## FigJam Flow Diagrams

### Master Flow: All Interaction Types

```
                            ┌──────────────────┐
                            │   USER CLICKS    │
                            │   AN ELEMENT     │
                            └────────┬─────────┘
                                     │
                 ┌───────────────────┼───────────────────┐
                 │                   │                   │
                 ▼                   ▼                   ▼
        ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
        │     PANEL      │  │    DIRECT      │  │     PANEL      │
        │    OPENERS     │  │  NAVIGATION    │  │   REPLACEMENT  │
        └───────┬────────┘  └───────┬────────┘  └───────┬────────┘
                │                   │                   │
        • Claim number              │           (when panel
        • Paragraph [1]             │            already open)
        • F/R node                  │
        • Citation                  │
        • Table row                 │
                │                   │                   │
                ▼                   ▼                   ▼
        ┌────────────────┐  ┌────────────────┐  ┌────────────────┐
        │  PANEL OPENS   │  │   NAVIGATE     │  │ PANEL REWRITES │
        │  (right edge)  │  │   TO PAGE      │  │ (same position)│
        └────────────────┘  └────────────────┘  └────────────────┘
```

### Page-by-Page Flows

#### Executive Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                     EXECUTIVE SUMMARY                           │
│                                                                 │
│    ┌──────────────────────────────────────────────────┐        │
│    │  Independent Claims section                       │        │
│    │  • Claim cards with "View in claims chart" button │        │
│    └──────────────────────────────────────────────────┘        │
│                                                                 │
│    ┌──────────────────────────────────────────────────┐        │
│    │  Key Dependent Claims section (Option B only)     │        │
│    │  • Dependent claim cards with "View in claims     │        │
│    │    chart" button                                  │        │
│    └──────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                                   │
            ▼                                   ▼
    ┌──────────────┐                    ┌──────────────┐
    │ "View in     │                    │   L-ref      │
    │ claims chart"│                    │  (L1-8)      │
    └──────┬───────┘                    └──────┬───────┘
           │                                   │
           ▼                                   ▼
    ┌─────────────────────────────────────────────────┐
    │              CLAIM CHARTS PAGE                  │
    │              Row highlighted                    │
    │              Panel NOT auto-opened              │
    │              User clicks row to open panel      │
    └─────────────────────────────────────────────────┘
```

#### Scope of Analysis

```
┌─────────────────────────────────────────────────────────────────┐
│                     SCOPE OF ANALYSIS                           │
└─────────────────────────────────────────────────────────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Claim number │      │  Reference   │      │   Citation   │
│ or [1], [2]  │      │    name      │      │  (p.4, top)  │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  ClaimSum-   │      │   NAVIGATE   │      │  Document    │
│  maryPanel   │      │   to Ref     │      │   Viewer     │
│   opens      │      │   Summary    │      │   opens      │
└──────────────┘      └──────────────┘      └──────────────┘
```

#### Strategic Review

```
┌─────────────────────────────────────────────────────────────────┐
│                      STRATEGIC REVIEW                           │
└─────────────────────────────────────────────────────────────────┘
                              │
       ┌──────────────────────┼──────────────────────┐
       │                      │                      │
       ▼                      ▼                      ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Claim title  │      │ Claim number │      │   Citation   │
│ or paragraph │      │  (1, 18, 19) │      │  (p.12, top) │
│    [1]       │      │              │      │              │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  ClaimSum-   │      │  ClaimSum-   │      │  Document    │
│  maryPanel   │      │  maryPanel   │      │   Viewer     │
│   opens      │      │   opens      │      │   opens      │
└──────────────┘      └──────────────┘      └──────────────┘
```

#### Claims Page

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLAIMS PAGE                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                      ┌──────────────┐
                      │   F/R node   │
                      │  (F1-1, R1-2)│
                      └──────┬───────┘
                             │
                             ▼
                      ┌──────────────┐
                      │  Workbench   │
                      │ DetailPanel  │
                      │   opens      │
                      └──────┬───────┘
                             │
       ┌─────────────────────┴─────────────────────┐
       │                                           │
       ▼                                           ▼
┌──────────────────┐                      ┌──────────────────┐
│ Click another    │                      │ Click linked     │
│ F/R on page      │                      │ F/R in panel     │
└──────┬───────────┘                      └──────┬───────────┘
       │                                         │
       ▼                                         ▼
┌──────────────────┐                      ┌──────────────────┐
│ Panel REPLACES   │                      │ Panel NAVIGATES  │
│ with new entry   │                      │ (breadcrumb      │
│                  │                      │  shows path)     │
└──────────────────┘                      └──────────────────┘
```

#### Claim Charts

```
┌─────────────────────────────────────────────────────────────────┐
│                       CLAIM CHARTS                              │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                                   │
            ▼                                   ▼
    ┌──────────────┐                    ┌──────────────┐
    │  Table row   │                    │   Citation   │
    │   click      │                    │   in row     │
    └──────┬───────┘                    └──────┬───────┘
           │                                   │
           ▼                                   ▼
    ┌──────────────┐                    ┌──────────────┐
    │ ClaimDetail  │                    │  Document    │
    │    Panel     │                    │   Viewer     │
    │   opens      │                    │   opens      │
    └──────┬───────┘                    └──────────────┘
           │
           ▼
    ┌──────────────────────────────────────┐
    │ Click F/R link in panel              │
    │           │                          │
    │           ▼                          │
    │ Panel navigates to that entry        │
    │ (breadcrumb shows navigation path)   │
    └──────────────────────────────────────┘
```

#### Reference Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                REFERENCE SUMMARY (Graves et al.)                │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                                   │
            ▼                                   ▼
    ┌──────────────┐                    ┌──────────────┐
    │  Paragraph   │                    │   Citation   │
    │  number [1]  │                    │  (p.5, top)  │
    └──────┬───────┘                    └──────┬───────┘
           │                                   │
           ▼                                   ▼
    ┌──────────────┐                    ┌──────────────┐
    │ ClaimSummary │                    │  Document    │
    │    Panel     │                    │   Viewer     │
    │   opens      │                    │   opens      │
    └──────────────┘                    └──────────────┘
```

---

## Toolbar Highlighting

Option B provides toolbar-based highlighting instead of context menus:

```
┌─────────────────────────────────────────────────────────────────┐
│  TOOLBAR                                                        │
│                                                                 │
│  [App info]        [●] Clear highlights  |  [Export]           │
│                     ↑                                           │
│                     └── Highlight colour swatch                 │
│                         Click to open colour picker             │
└─────────────────────────────────────────────────────────────────┘

                              │
                              ▼
                    ┌──────────────────┐
                    │ Colour Picker    │
                    │                  │
                    │ ● ● ● ● ●       │  ← 5 colour options
                    │                  │
                    └──────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  When a colour is active:                                       │
│  • Swatch shows selected colour with ring indicator             │
│  • Clicking any claim/paragraph applies highlight               │
│  • Click swatch again to deselect (exit highlight mode)         │
│  • "Clear highlights" removes all highlights from document      │
└─────────────────────────────────────────────────────────────────┘
```

---

## Screen Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  TOOLBAR    [App info]              [●] Clear highlights  |  [Export]   │
├─────────┬───────────────────────────────────┬───────────────────────────┤
│         │                                   │                           │
│         │                                   │                           │
│  SIDE   │         MAIN PANE                 │      INSPECT PANE         │
│  BAR    │                                   │      (conditional)        │
│         │    Single page view only          │                           │
│  • Nav  │    (no split view)                │   • ClaimSummaryPanel     │
│  • No   │                                   │   • ClaimDetailPanel      │
│  work-  │    Pages:                         │   • WorkbenchDetailPanel  │
│  bench  │    • Executive Summary            │   • DocumentViewer        │
│         │    • Scope of Analysis            │                           │
│         │    • Strategic Review             │   Only ONE shows at a     │
│         │    • Claims                       │   time. Each click        │
│         │    • Claim Charts                 │   REPLACES previous.      │
│         │    • Reference Summaries          │                           │
│         │                                   │                           │
├─────────┴───────────────────────────────────┴───────────────────────────┤
│  [Theme toggle]  [Invite]  [Settings]  [Sign out]                       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Element Types Reference

| Element | Visual Style | Behaviour |
|---------|--------------|-----------|
| **Claim title** (Claims 1, 19) | Blue, dotted underline | Opens ClaimSummaryPanel |
| **Claim number** (1, 18) | Blue, dotted underline | Opens ClaimSummaryPanel |
| **Paragraph number** [1] | Blue, dotted underline | Opens ClaimSummaryPanel |
| **F/R node** (F1-1, R1-2) | Inline text | Opens WorkbenchDetailPanel |
| **L-ref** (L1-8, L18-7) | Blue, dotted underline | Navigate to Claim Charts |
| **Reference name** | Blue, dotted underline | Navigate to Reference Summary |
| **Citation** (p.4, top) | Blue, dotted underline | Opens DocumentViewer |
| **Table row** | Hover highlight | Opens ClaimDetailPanel |
| **"View in claims chart"** | Button | Navigate to Claim Charts |

---

## Panel Mutual Exclusivity

```
┌─────────────────────────────────────────────────────────────────┐
│                   PANEL REPLACEMENT RULES                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   Same panel type:                                              │
│   ─────────────────                                             │
│   ClaimSummaryPanel open → Click claim #2 → Rewrites to #2     │
│   ClaimDetailPanel open → Click new row → Rewrites to row      │
│   DocumentViewer open → Click new citation → Updates view       │
│                                                                 │
│   Different panel type:                                         │
│   ────────────────────                                          │
│   Any panel open → Click different element → Previous closes,  │
│                                               new opens         │
│                                                                 │
│   Navigation action:                                            │
│   ─────────────────                                             │
│   Any panel open → Click L-ref/ref name → Panel closes,        │
│                                           page navigates        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Navigation vs Panel Opening

| Action | Type | Stays on Page? |
|--------|------|----------------|
| Click claim title | Panel | Yes |
| Click claim number | Panel | Yes |
| Click paragraph number | Panel | Yes |
| Click F/R node | Panel | Yes |
| Click citation | Panel | Yes |
| Click table row | Panel | Yes |
| Click L-ref | Navigation | No → Claim Charts |
| Click reference name | Navigation | No → Reference Summary |
| Click "View in claims chart" | Navigation | No → Claim Charts |
| Click sidebar nav item | Navigation | No → changes page |

---

## Comparison with Option A

| Feature | Option A | Option B |
|---------|----------|----------|
| Context menu | Yes | No |
| User chooses destination | Yes | No (system decides) |
| Highlighting method | Via context menu | Via toolbar swatch |
| Split view | Yes | No |
| Workbench page | Yes | No (panel only) |
| Key Dependent Claims | No | Yes (Exec Summary) |
| Clicks to evidence | 2 (click → menu → choice) | 1 (direct) |
| Predictability | Medium | High |
| Flexibility | High | Low |
| Learning curve | Higher | Lower |

---

## Key Characteristics

| Attribute | Value |
|-----------|-------|
| Clicks to see evidence | 1 |
| User decisions per click | 0 (system decides) |
| Available destinations | Fixed (always right panel) |
| Has split view | No |
| Has Workbench page | No (detail panel only) |
| Has highlighting | Yes (via toolbar) |
| Predictability | High |
| Flexibility | Low |
