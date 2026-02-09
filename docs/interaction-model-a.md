# Interaction Model: Option A
## Contextual Menu Routing

**URL:** `/option-a` or `/`

**Core Principle:** User-directed routing. When clicking interactive elements, a context menu lets users choose where content appears.

---

## Quick Reference

| User clicks... | What happens |
|----------------|--------------|
| Claim number | Context menu → user chooses destination |
| F/R node (F1-1) | Context menu → user chooses destination |
| L-ref (L1-8) | Direct navigation to Claim Charts |
| Citation (p.4) | Document Viewer opens |
| Table row | Detail panel opens |
| Reference name | Navigation to Reference Summary |

---

## Interaction Paths Overview

### Path 1: Context Menu Flow (User Choice)

```
┌─────────────────────────────────────────────────────────────────┐
│                     CONTEXT MENU FLOW                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   User clicks            Context menu              Destination  │
│   claim number    ───►   appears         ───►     (user picks)  │
│   or F/R node                                                   │
│                          ┌─────────────┐                        │
│                          │ Left pane   │───► Navigate to page   │
│                          ├─────────────┤                        │
│                          │ Right pane  │───► Split view opens   │
│                          ├─────────────┤                        │
│                          │ Details     │───► Panel opens        │
│                          ├─────────────┤                        │
│                          │ Highlight   │───► Color applied      │
│                          └─────────────┘                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Path 2: Direct Navigation Flow (No Choice)

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

### Path 3: Panel Opening Flow (No Choice)

```
┌─────────────────────────────────────────────────────────────────┐
│                      PANEL OPENING FLOW                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   User clicks            Panel opens            Panel type      │
│                                                                 │
│   Citation        ───►   Right edge      ───►  DocumentViewer   │
│   (p.4, top)             panel opens            (PDF view)      │
│                                                                 │
│   Table row       ───►   Right edge      ───►  ClaimDetailPanel │
│   (Claim Charts)         panel opens            or Workbench    │
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
        │ CONTEXT MENU   │  │    DIRECT      │  │     PANEL      │
        │   ELEMENTS     │  │  NAVIGATION    │  │    OPENING     │
        └───────┬────────┘  └───────┬────────┘  └───────┬────────┘
                │                   │                   │
        • Claim number              │           • Citation
        • F/R node                  │           • Table row
        • Paragraph [1]             │
                │                   │
                ▼                   │
        ┌────────────────┐          │
        │ CONTEXT MENU   │          │
        │    APPEARS     │          │
        └───────┬────────┘          │
                │                   │
    ┌───────────┼───────────┐       │
    │           │           │       │
    ▼           ▼           ▼       │
┌───────┐  ┌───────┐  ┌───────┐     │
│ Left  │  │ Right │  │Details│     │
│ pane  │  │ pane  │  │ pane  │     │
└───┬───┘  └───┬───┘  └───┬───┘     │
    │          │          │         │
    ▼          ▼          ▼         ▼
┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐
│NAVIG- │  │ SPLIT │  │ PANEL │  │ PANEL │
│ATE    │  │ VIEW  │  │ OPENS │  │ OPENS │
└───────┘  └───────┘  └───────┘  └───────┘
```

### Page-by-Page Flows

#### Executive Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                     EXECUTIVE SUMMARY                           │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │ "View in     │  │   L-ref      │  │  (No other   │
    │ claims chart"│  │  (L1-8)      │  │  clickables) │
    └──────┬───────┘  └──────┬───────┘  └──────────────┘
           │                 │
           ▼                 ▼
    ┌─────────────────────────────────────┐
    │         CLAIM CHARTS PAGE           │
    │         Row highlighted             │
    │         Panel NOT auto-opened       │
    └─────────────────────────────────────┘
```

#### Scope of Analysis / Strategic Review

```
┌─────────────────────────────────────────────────────────────────┐
│              SCOPE OF ANALYSIS / STRATEGIC REVIEW               │
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
│   CONTEXT    │      │   NAVIGATE   │      │  DOCUMENT    │
│    MENU      │      │   to Ref     │      │   VIEWER     │
│   appears    │      │   Summary    │      │   opens      │
└──────┬───────┘      └──────────────┘      └──────────────┘
       │
       ├──► Left pane ──► Navigate to Claim Charts
       ├──► Right pane ──► Split view with Claim Charts
       ├──► Details ──► ClaimSummaryPanel opens
       └──► Highlight ──► Color applied to link
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
                      │   CONTEXT    │
                      │    MENU      │
                      │   appears    │
                      └──────┬───────┘
                             │
       ┌─────────────────────┼─────────────────────┐
       │                     │                     │
       ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Left pane   │      │  Right pane  │      │   Details    │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │
       ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Navigate    │      │  Split view  │      │  Workbench   │
│  to Workbench│      │  Workbench   │      │ DetailPanel  │
│  page        │      │  in right    │      │   opens      │
└──────────────┘      └──────────────┘      └──────────────┘
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
    └──────────────┘                    └──────────────┘
```

---

## Context Menu Structure

```
┌────────────────────────────┐
│                            │
│  Highlight                 │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ │  ← 5 color circles
│  │  │ │  │ │  │ │  │ │  │ │
│  └──┘ └──┘ └──┘ └──┘ └──┘ │
│  Clear highlight           │
│                            │
├────────────────────────────┤
│                            │
│  View in                   │
│    ○ Left pane             │
│    ○ Right pane            │
│    ○ Details pane          │
│                            │
├────────────────────────────┤
│                            │
│  Cancel                    │
│                            │
└────────────────────────────┘
```

---

## Screen Layout

```
┌─────────────────────────────────────────────────────────────────────────┐
│  TOOLBAR    [App info]                    [Clear highlights]  [Export]  │
├─────────┬───────────────────────────────────┬───────────────────────────┤
│         │                                   │                           │
│         │                                   │                           │
│  SIDE   │         MAIN PANE                 │      INSPECT PANE         │
│  BAR    │                                   │      (conditional)        │
│         │    Can show any page              │                           │
│  • Nav  │    OR split view                  │   • ClaimSummaryPanel     │
│  • Work │                                   │   • ClaimDetailPanel      │
│    bench│    ┌─────────────┬─────────────┐  │   • WorkbenchDetailPanel  │
│         │    │   LEFT      │   RIGHT     │  │   • DocumentViewer        │
│         │    │   (main)    │   (split)   │  │                           │
│         │    └─────────────┴─────────────┘  │                           │
│         │                                   │                           │
├─────────┴───────────────────────────────────┴───────────────────────────┤
│  [Theme toggle]  [Invite]  [Settings]  [Sign out]                       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Element Types Reference

| Element | Visual Style | Behaviour |
|---------|--------------|-----------|
| **Claim number** (1, 18) | Blue, dotted underline | Context menu |
| **Paragraph number** [1] | Blue, dotted underline | Context menu |
| **F/R node** (F1-1, R1-2) | Inline text | Context menu |
| **L-ref** (L1-8, L18-7) | Blue, dotted underline | Direct nav to Claim Charts |
| **Reference name** | Blue, dotted underline | Direct nav to Reference Summary |
| **Citation** (p.4, top) | Blue, dotted underline | Opens DocumentViewer |
| **Table row** | Hover highlight | Opens detail panel |
| **"View in claims chart"** | Button | Direct nav to Claim Charts |

---

## Key Characteristics

| Attribute | Value |
|-----------|-------|
| Clicks to see evidence | 2 (click → menu → choice) |
| User decisions per click | 1 |
| Available destinations | 3 (left, right, details) |
| Has split view | Yes |
| Has Workbench page | Yes |
| Has highlighting | Yes (via context menu) |
| Predictability | Medium |
| Flexibility | High |
