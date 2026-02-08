# Interaction Model: Candidate A
## Contextual Menu Routing

**URL:** `/option-a` or `/`

---

### Routing Rules

| User Action | Result |
|-------------|--------|
| Click reference node (F/R) | Context menu appears at cursor |
| Select "Left pane" | Workbench opens in main pane, scrolls to entry |
| Select "Right pane" | Split view activates, Workbench in right pane |
| Select "Details pane" | Details panel opens on right edge |
| Click citation | Document viewer opens |
| Click claim chart row | Claim details panel opens |

---

### Pane Behaviour

```
┌─────────────────────────────────────────────────────────────┐
│ TOOLBAR                                                     │
├────────┬────────────────────────────────────────────────────┤
│        │                                                    │
│        │  MAIN PANE              │  DETAILS PANE            │
│  NAV   │  (or split view)        │  (conditional)           │
│        │                         │                          │
│        │  Content determined     │  Opens when:             │
│        │  by nav selection       │  • Node → Details        │
│        │  or context menu        │  • Row click             │
│        │                         │  • Citation click        │
│        │                         │                          │
└────────┴─────────────────────────┴──────────────────────────┘
```

**Split view:** Activated via context menu "Right pane" or pane header toggle
**Details pane:** Slides in from right, resizable, closable
**Document viewer:** Opens between main pane and details pane

---

### Navigation Entry Points

| Entry Point | Location | Behaviour |
|-------------|----------|-----------|
| Sidebar nav | Left rail | Changes main pane content |
| Pane header dropdown | Top of pane | Changes pane content (split view) |
| Context menu | On node click | Routes to chosen pane |
| "View in claims chart" button | Claim cards | Jumps to claim charts + selects row |

---

### Claim Chart Jump Behaviour

**Trigger:** "View in claims chart" button on ClaimCard

**Flow:**
1. Navigate main pane to Claim Charts
2. Scroll to matching claim section
3. Select first row of that claim
4. Open claim details panel

---

### Inspect Behaviour

**Reference nodes (F1-1, R1-2, etc.):**
1. Click → Context menu appears
2. User selects destination pane
3. Content routes to selected pane
4. If "Details pane" selected, panel shows full entry info

**Claim chart rows:**
1. Click → Claim details panel opens immediately
2. No context menu (direct routing)

**Citations:**
1. Click → Document viewer opens immediately
2. No context menu (direct routing)

---

### Override Behaviour

| Current State | User Action | Override |
|---------------|-------------|----------|
| Details panel open | Click different node → Details | Replaces panel content |
| Split view active | Select "Left pane" from menu | Closes split view |
| Document viewer open | Click different citation | Replaces viewer content |
| Both panels open | — | Sidebar auto-collapses |

---

### Context Menu Structure

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

### Key Characteristics

- **User-directed routing** — user chooses destination
- **Highlighting capability** — annotation for review workflow
- **Workbench accessible** — full page available in nav
- **Split view supported** — side-by-side comparison
- **2 clicks to evidence** — node → menu → destination
