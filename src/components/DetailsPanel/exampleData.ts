import type { LinePanelData, FeaturePanelData, RelationshipPanelData } from './DetailsPanel';

/* ── Example Line Panel Data ────────────────────────────────────── */

export const exampleLineData: LinePanelData = {
  id: 'L1-8',
  claimText: 'wherein the deceleration strategy is determined so as to selectively optimize for comfort in dependence on a predicted headway,',
  priorArtReference: {
    id: 'graves',
    title: 'Graves et al.',
    citation: 'US 2019/0329772 A1',
  },
  quotation: '"There are many ways to add comfort to the condition, however, in one example embodiment the AS controller 412 is configured to maximize the following statement: Front is Comfortable AND Back is Comfortable AND Front is Safe AND Back is Safe AND Speed is Close to Target"',
  citations: [
    { id: 'cite-1', label: 'p.10, ¶116' },
    { id: 'cite-2', label: 'p.9, ¶107' },
  ],
  conclusion: 'Novel over Graves et al. because no predicted headway (future ego-to-forward-vehicle distance) is disclosed, and comfort is not described as being selectively optimized in dependence on a predicted headway value.',
  noveltyStatus: 'Novel',
  analysis: 'The reference explicitly discloses comfort optimization as part of the action-selection condition, but the comfort is described in terms of zone-based safety/comfort values rather than a predicted headway value. The claim requires comfort optimization to depend on a predicted headway computed for a future time instant.',
  strength: 5,
};

/* ── Example Feature Panel Data ─────────────────────────────────── */

export const exampleFeatureData: FeaturePanelData = {
  id: 'F1-3',
  featureTitle: 'Predicted headway computation',
  interpretation: 'A calculation that determines the expected distance between the ego vehicle and forward vehicle at a future time instant.',
  basisChips: [
    { id: 'basis-1', label: 'L1-8', variant: 'line' },
    { id: 'basis-2', label: 'L1-9', variant: 'line' },
    { id: 'basis-3', label: 'L1-10', variant: 'line' },
  ],
  supportingDescription: 'The predicted headway is computed using the current speed and acceleration of the forward vehicle relative to the ego vehicle. This forward-looking prediction enables the system to anticipate future spacing conditions rather than react to current measurements.',
  exampleChips: [
    { id: 'ex-1', label: 'Kinematic projection', variant: 'feature' },
    { id: 'ex-2', label: 'Time-horizon estimation', variant: 'feature' },
  ],
  priorArtReference: {
    id: 'graves',
    title: 'Graves et al.',
    citation: 'US 2019/0329772 A1',
  },
  summary: 'The prior art describes safety predictions for future time instants but does not disclose computing a predicted headway value (distance) for use in comfort-selective deceleration strategy determination.',
  citations: [
    { id: 'cite-1', label: 'p.8, ¶97-¶101' },
    { id: 'cite-2', label: 'p.9, ¶110' },
  ],
  analysis: 'While Graves describes action-conditioned predictions for safety zones at predetermined future times, these predictions relate to zone occupancy probabilities rather than computed headway distances. The claim requires a specific predicted headway value.',
  conclusion: 'This feature is not disclosed in the prior art.',
  noveltyStatus: 'Novel',
  strength: 5,
};

/* ── Example Relationship Panel Data ────────────────────────────── */

export const exampleRelationshipData: RelationshipPanelData = {
  id: 'R1-2',
  relationshipTitle: 'Comfort-headway dependency',
  relationshipStatement: 'The deceleration strategy selection depends on comfort optimization, which in turn depends on the predicted headway value.',
  basisChips: [
    { id: 'basis-1', label: 'F1-3', variant: 'feature' },
    { id: 'basis-2', label: 'L1-8', variant: 'line' },
  ],
  supportingDescription: 'This relationship establishes that comfort is not independently optimized but is gated by the predicted headway. When predicted headway indicates low risk, comfort optimization is prioritized; when predicted headway indicates high risk, safety takes precedence.',
  priorArtReference: {
    id: 'graves',
    title: 'Graves et al.',
    citation: 'US 2019/0329772 A1',
  },
  summary: 'The prior art describes comfort as one factor in action selection but does not condition comfort optimization on a predicted headway value.',
  citations: [
    { id: 'cite-1', label: 'p.10, ¶116' },
    { id: 'cite-2', label: 'p.9, ¶113-¶114' },
  ],
  analysis: 'Graves discloses a fuzzy inference system that includes comfort in the optimization criteria, but comfort and safety are treated as parallel considerations rather than comfort being selectively applied based on a predicted headway value.',
  conclusion: 'This relationship between comfort optimization and predicted headway is not taught by the prior art.',
  noveltyStatus: 'Novel',
  strength: 5,
};

/* ── Additional Examples (Not Novel) ────────────────────────────── */

export const exampleLineDataNotNovel: LinePanelData = {
  id: 'L1-1',
  claimText: 'An adaptive cruise controller for autonomously adapting the speed of an ego vehicle to maintain a target headway,',
  priorArtReference: {
    id: 'graves',
    title: 'Graves et al.',
    citation: 'US 2019/0329772 A1',
  },
  quotation: '"In the present example, these parameters are target speed and target headway (e.g. inter-vehicle spacing). ... However, if a car approaches from behind or front, the baseline controller will increase or decrease the speed, respectively, to avoid collision."',
  citations: [
    { id: 'cite-1', label: 'p.12, top' },
  ],
  conclusion: 'Not novel. The reference explicitly discloses an adaptive cruise controller that maintains target headway by adjusting vehicle speed.',
  noveltyStatus: 'Not novel',
  analysis: 'The reference explicitly discloses an adaptive cruise controller that maintains target headway by adjusting vehicle speed. The claim element is directly anticipated.',
  strength: 5,
};

export const exampleLineDataLikelyNotNovel: LinePanelData = {
  id: 'L1-5',
  claimText: 'an elastic adaptive cruise control module configured to, in response to detecting that the current headway is below the target headway, determine a deceleration strategy',
  priorArtReference: {
    id: 'graves',
    title: 'Graves et al.',
    citation: 'US 2019/0329772 A1',
  },
  quotation: '"In some examples embodiments, AS controller module 412 receives AC predictions 416 from the predictive perception module 402 and selects an action, for example an extent to which the vehicle 105 should throttle or brake."',
  citations: [
    { id: 'cite-1', label: 'p.9, ¶110' },
  ],
  conclusion: 'Likely not novel. Selecting throttle/brake action based on predictions is treated as determining a deceleration strategy.',
  noveltyStatus: 'Likely not novel',
  analysis: 'The selection/implementation disclosures are framed as optimization over predictions and do not expressly state the trigger as "in response to detecting that the current headway is below the target headway".',
  strength: 2,
};
