# Interaction Model: Candidate B
## System-Directed Routing

**URL:** `/option-b`

---

### Routing Rules

| User Action | Result |
|-------------|--------|
| Click reference node (F/R) | Details panel opens immediately |
| Click citation | Document viewer opens |
| Click claim chart row | Claim details panel opens |

**No context menu. No destination choice. System routes automatically.**

---

### Pane Behaviour

```
┌─────────────────────────────────────────────────────────────┐
│ TOOLBAR                                                     │
├────────┬────────────────────────────────────────────────────┤
│        │                                                    │
│        │  MAIN PANE              │  DETAILS PANE            │
│  NAV   │                         │  (always used)           │
│        │  Content determined     │                          │
│  (no   │  by nav selection       │  Opens on any:           │
│  work- │                         │  • Node click            │
│  bench)│  No split view          │  • Row click             │
│        │  in this model          │  • Citation click        │
│        │                         │                          │
└────────┴─────────────────────────┴──────────────────────────┘
```

**Split view:** Not available
**Details pane:** Always the destination for inspecting content
**Document viewer:** Opens for citations only
**Workbench:** Removed from navigation

---

### Navigation Entry Points

| Entry Point | Location | Behaviour |
|-------------|----------|-----------|
| Sidebar nav | Left rail | Changes main pane content |
| Pane header dropdown | Top of pane | Changes pane content |
| Node click | Inline in content | Opens details panel |
| "View in claims chart" button | Claim cards | Jumps to claim charts + selects row |

**Removed:** Workbench from sidebar and dropdowns

---

### Claim Chart Jump Behaviour

**Trigger:** "View in claims chart" button on ClaimCard

**Flow:**
1. Navigate main pane to Claim Charts
2. Scroll to matching claim section
3. Select first row of that claim
4. Open claim details panel

*Same as Candidate A*

---

### Inspect Behaviour

**Reference nodes (F1-1, R1-2, etc.):**
1. Click → Details panel opens immediately
2. Panel shows full entry info (interpretation, evidence, conclusion)
3. No intermediate menu

**Claim chart rows:**
1. Click → Claim details panel opens immediately
2. Same as Candidate A

**Citations:**
1. Click → Document viewer opens immediately
2. Same as Candidate A

---

### Override Behaviour

| Current State | User Action | Override |
|---------------|-------------|----------|
| Details panel open | Click different node | Replaces panel content |
| Document viewer open | Click different citation | Replaces viewer content |
| Details + viewer open | — | Sidebar auto-collapses |

**Simpler state management — fewer possible configurations**

---

### What's Removed

| Feature | Status |
|---------|--------|
| Context menu | ✗ Removed |
| Highlighting (5 colors) | ✗ Removed |
| Clear highlight | ✗ Removed |
| "View in left pane" | ✗ Removed |
| "View in right pane" | ✗ Removed |
| Split view | ✗ Removed |
| Workbench page | ✗ Removed from nav |

---

### Key Characteristics

- **System-directed routing** — no user choice on destination
- **No highlighting** — no annotation capability
- **No Workbench** — removed from navigation
- **No split view** — single pane focus
- **1 click to evidence** — node → details panel
- **Lower cognitive load** — fewer decisions
- **Predictable** — same action = same result
