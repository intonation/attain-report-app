# Interaction Mode Analysis: Option A vs Option B

## User Journey Flows

### Option A: Contextual Menu Flow

```mermaid
flowchart TD
    A[User sees node in Claims page] --> B[Click node]
    B --> C[Context Menu appears]
    C --> D{User chooses}
    D -->|Highlight| E[Apply color to node]
    D -->|Left pane| F[Workbench replaces current view]
    D -->|Right pane| G[Split view: Claims + Workbench]
    D -->|Details pane| H[Details panel opens on right]
    D -->|Cancel| I[Menu closes]

    style C fill:#e1f5fe
    style D fill:#fff3e0
```

### Option B: System Routed Flow

```mermaid
flowchart TD
    A[User sees node in Claims page] --> B[Click node]
    B --> C[Details panel opens automatically]

    style C fill:#e8f5e9
```

## Feature Comparison

```mermaid
pie title Feature Availability
    "Option A only" : 5
    "Both options" : 3
    "Option B only" : 0
```

| Feature | Option A | Option B |
|---------|:--------:|:--------:|
| Click-to-details | ✓ | ✓ |
| Highlight text (5 colors) | ✓ | ✗ |
| Clear highlights | ✓ | ✗ |
| View in left pane | ✓ | ✗ |
| View in right pane (split) | ✓ | ✗ |
| View in details pane | ✓ | ✓ |
| Access to Workbench page | ✓ | ✗ |
| Side-by-side comparison | ✓ | ✗ |
| Single-click to evidence | ✗ | ✓ |
| Predictable destination | ✗ | ✓ |

## Decision Tree Comparison

```mermaid
flowchart TD
    subgraph A["Option A (2 decisions)"]
        A1[Want to inspect F1-1] --> A2[Click F1-1]
        A2 --> A3{Where to view?}
        A3 -->|Left| A4[Left pane]
        A3 -->|Right| A5[Right pane]
        A3 -->|Details| A6[Details pane]
    end

    subgraph B["Option B (1 decision)"]
        B1[Want to inspect F1-1] --> B2[Click F1-1]
        B2 --> B3[Details panel opens]
    end
```

## Workflow Comparison: Review Claim 1

```mermaid
sequenceDiagram
    participant U as User
    participant C as Claims Page
    participant M as Context Menu
    participant W as Workbench
    participant D as Details Panel

    rect rgb(232, 245, 253)
    note over U,D: Option A Workflow
    U->>C: Navigate to Claims
    U->>C: Click F1-1
    C->>M: Show menu
    U->>M: Select "Right pane"
    M->>W: Open in split view
    U->>C: Click F1-2
    C->>M: Show menu
    U->>M: Select "Details pane"
    M->>D: Open details
    Note over U,D: Result: Claims | Workbench | Details
    end
```

```mermaid
sequenceDiagram
    participant U as User
    participant C as Claims Page
    participant D as Details Panel

    rect rgb(232, 245, 233)
    note over U,D: Option B Workflow
    U->>C: Navigate to Claims
    U->>C: Click F1-1
    C->>D: Open F1-1 details
    U->>C: Click F1-2
    C->>D: Replace with F1-2
    U->>C: Click F1-3
    C->>D: Replace with F1-3
    Note over U,D: Result: Sequential only
    end
```

## Use Case Fit

```mermaid
quadrantChart
    title Use Case Fit by Option
    x-axis Simple --> Complex
    y-axis Casual --> Expert
    quadrant-1 Option A excels
    quadrant-2 Either works
    quadrant-3 Option B excels
    quadrant-4 Option A preferred
    "Quick lookup": [0.2, 0.3]
    "Training new users": [0.3, 0.2]
    "Compare to prior art": [0.7, 0.8]
    "Review multiple features": [0.6, 0.7]
    "Mark for later": [0.5, 0.6]
    "Expert analysis": [0.8, 0.9]
    "Present findings": [0.7, 0.5]
    "Mobile usage": [0.2, 0.4]
```

## Cognitive Load

```mermaid
xychart-beta
    title "Clicks & Decisions per Action"
    x-axis ["Option A", "Option B"]
    y-axis "Count" 0 --> 3
    bar [2, 1]
    line [2, 1]
```

| Metric | Option A | Option B |
|--------|:--------:|:--------:|
| Decisions required | 2 | 1 |
| Clicks to evidence | 2 | 1 |
| Flexibility | HIGH | LOW |
| Learning curve | MEDIUM | LOW |

## Recommendation

```mermaid
flowchart LR
    subgraph rec["Recommendation"]
        direction TB
        R1["★ OPTION A IS SUPERIOR ★"]
        R2["For patent analysis requiring:"]
        R3["• Comparison views"]
        R4["• Annotation capability"]
        R5["• Flexible layout"]
    end

    style R1 fill:#4caf50,color:#fff
```

### Why Option A Wins

1. **AI Reasoning Inspection** requires cross-referencing:
   - Claim text ↔ AI interpretation
   - Feature ↔ Prior art mapping
   - Multiple features ↔ Overall conclusion

2. **Highlighting** lets users mark agreement/disagreement

3. **Split view** enables simultaneous claim + evidence viewing

### Suggested Refinements for Option A

- Add keyboard shortcut: `D` for Details (most common action)
- Add "Remember my choice" user preference
- Make "Details pane" the first/default option
- Consider: single-click = details, right-click = full menu
