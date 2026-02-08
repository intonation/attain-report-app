import type { ClaimData } from '../components/ClaimCard';

export const reportData = {
  title: 'Attain report',
  applicationRef: 'US 17/174,123',
  subtitle: 'Adaptive Cruise Control with Predictive Headway Management',
  summary: `This application relates to an adaptive cruise control system that uses predictive algorithms to maintain safe following distances between vehicles. The core innovation lies in how the system calculates a "predicted headway" – estimating the future gap between vehicles based on current speeds, acceleration, and road conditions – and then adjusts the vehicle's deceleration strategy to optimize both safety and passenger comfort.

The prior art reference, Graves et. al., discusses conventional adaptive cruise control with basic deceleration mechanisms. Most vehicle control features in the present application are anticipated by Graves. However, novelty concentrates around two key areas: (1) the dynamic calculation of target headway using forward-looking predictions rather than reactive measurements, and (2) the coordination of multiple controller modules under edge conditions such as sudden braking or sensor degradation.`,
};

export const claimsData: ClaimData[] = [
  {
    claimNumber: 1,
    isNovel: 'novel',
    reasoning: `Claim 1 addresses an adaptive cruise controller that restores a target headway to a forward vehicle while reducing passenger discomfort. The invention of claim 1 requires that, when current headway falls below target headway, an elastic cruise control module determines a deceleration strategy that is selectively comfort-optimized based on a predicted headway computed for a future time using the forward vehicle's current relative speed and acceleration. On the current record, claim 1 is novel over Graves et al. because Graves' action-conditioned predictions and comfort criteria are described in terms of zone-based safety/comfort values and state predictions rather than a predicted headway value used as the comfort-selective input to determine the deceleration strategy (see claim charts, L1-8, L1-9, L1-10).`,
  },
  {
    claimNumber: 18,
    isNovel: 'novel',
    reasoning: `Claim 18 addresses a computer program on non-transitory storage that implements adaptive cruise control to increase headway when current headway falls below a target headway. The invention of claim 18 requires selecting a deceleration strategy that selectively optimizes comfort based on a determined risk category, where that risk category is selected from a discrete set based on the forward vehicle's current relative speed and acceleration. On the current record, claim 18 is novel over Graves et al. because Graves describes zone-based safety levels and comfort considerations but does not describe determining a discrete risk category from forward-vehicle relative kinematics as the basis for comfort-selective strategy determination (see claim charts, L18-7, L18-8).`,
  },
];

export const calloutContent = {
  title: 'Getting started with Attain',
  subtitle: 'How the analysis works',
  content: `Your patent documents go through eight processing stages. Each claim gets parsed into its features, then checked against prior art. The system looks for both explicit and implicit disclosures in the references.`,
};

// Claims Chart data types and mock data
export type NoveltyConclusion = 'Not novel' | 'Likely not novel' | 'Likely novel' | 'Novel';

export interface ClaimChartRow {
  claimId: string;
  claimText: string;
  interpretation: string;
  citations: string;
  conclusion: NoveltyConclusion;
  analysis: string;
  counteranalysis: string;
  strength: string;
}

export interface ClaimChart {
  claimNumber: string;
  noveltyStatus: NoveltyConclusion;
  summary: string;
  priorArtReference: string;
  rows: ClaimChartRow[];
}

export const claimChartData: ClaimChart[] = [
  {
    claimNumber: 'Claim 1',
    noveltyStatus: 'Novel',
    summary: 'Novel over Graves et al. because Graves\' action-conditioned predictions and comfort criteria are described in terms of zone-based safety/comfort values rather than a predicted headway value used as the comfort-selective input.',
    priorArtReference: 'Graves et al. (US 2019/0329772 A1)',
    rows: [
      {
        claimId: 'L1-1',
        claimText: 'An adaptive cruise controller for autonomously adapting the speed of an ego vehicle to maintain a target headway,',
        interpretation: '"In the present example, these parameters are target speed and target headway (e.g. inter-vehicle spacing). ... However, if a car approaches from behind or front, the baseline controller will increase or decrease the speed, respectively, to avoid collision."',
        citations: 'p.12, top',
        conclusion: 'Not novel',
        analysis: 'The reference explicitly discloses an adaptive cruise controller that maintains target headway by adjusting vehicle speed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-2',
        claimText: 'headway being distance from the ego vehicle to a forward vehicle,',
        interpretation: '"the spacing distance between the leading front vehicle 306 and the ego vehicle 105 and the spacing distance between the trailing back vehicle 308 and the ego vehicle 105 both safely exceed the SRZ 310 and the CRZ 312 of the ego vehicle 105."',
        citations: 'p.5, bottom',
        conclusion: 'Not novel',
        analysis: 'Headway as distance to forward vehicle is clearly disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-3',
        claimText: 'the ego vehicle equipped with a perception system for measuring a current headway and a current speed and acceleration of the forward vehicle relative to the ego vehicle,',
        interpretation: '"In an example embodiment, the specific information from the state space required to predict safety for the front or back SRZs are, for a given time t: Current speed v of the ego vehicle; Distance from the ego vehicle 105 to the target vehicle in each zone; Direct and/or indirect measurement of speed of target vehicle in each zone; Direct and/or indirect measurement of acceleration of target vehicle in each zone."',
        citations: 'p.8, ¶97-¶101',
        conclusion: 'Not novel',
        analysis: 'Perception system measuring headway, speed, and acceleration is disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-4',
        claimText: 'the adaptive cruise controller comprising: a comparison module configured to determine if the current headway is below the target headway; and',
        interpretation: '"The output of the safety state function is a value between 0 and 1 that indicates the safety level of the ego vehicle 105 for the specific safety risk zone, where 1 is safe and 0 is unsafe."',
        citations: 'p.6, top',
        conclusion: 'Not novel',
        analysis: 'Comparison of distance to threshold is disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-5',
        claimText: 'an elastic adaptive cruise control module configured to, in response to detecting that the current headway is below the target headway, determine a deceleration strategy',
        interpretation: '"In some examples embodiments, AS controller module 412 receives AC predictions 416 from the predictive perception module 402 and selects an action, for example an extent to which the vehicle 105 should throttle or brake."',
        citations: 'p.9, ¶110',
        conclusion: 'Likely not novel',
        analysis: 'Selecting throttle/brake action based on predictions is treated as determining a deceleration strategy.',
        counteranalysis: 'The selection/implementation disclosures are framed as optimization over predictions and do not expressly state the trigger as "in response to detecting that the current headway is below the target headway".',
        strength: '2/5',
      },
      {
        claimId: 'L1-6',
        claimText: 'for increasing to the target headway; and',
        interpretation: '"In example embodiments the ASP control system of ego vehicle 105 is configured to continuously predict the SRZ 310 and the CRZ 312 by monitoring the environment around the ego vehicle 105 and operating state of the ego vehicle 205, predict what actions are most likely to keep other vehicles out of the CRZ 312 and the SRZ 310."',
        citations: 'p.5, top',
        conclusion: 'Not novel',
        analysis: 'Actions to restore safe spacing are disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-7',
        claimText: 'a controller configured to implement the deceleration strategy;',
        interpretation: '"In an example embodiment, once a next action is determined, the action is communicated to the appropriate actuator of drive control system 150 for implementation. In example embodiments, the next action can specify either an amount of throttle to be applied by throttle unit 156 or an amount of braking that should be applied by the braking unit 154."',
        citations: 'p.10, ¶124',
        conclusion: 'Not novel',
        analysis: 'Controller implementing throttle/brake actions is disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-8',
        claimText: 'wherein the deceleration strategy is determined so as to selectively optimize for comfort in dependence on a predicted headway,',
        interpretation: '"There are many ways to add comfort to the condition, however, in one example embodiment the AS controller 412 is configured to maximize the following statement: Front is Comfortable AND Back is Comfortable AND Front is Safe AND Back is Safe AND Speed is Close to Target"',
        citations: 'p.10, ¶116',
        conclusion: 'Novel',
        analysis: 'No predicted headway (future ego-to-forward-vehicle distance) is disclosed, and comfort is not described as being selectively optimized in dependence on a predicted headway value.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-9',
        claimText: 'the predicted headway computed for a future time instant',
        interpretation: '"In some examples, the safety prediction for a safety risk zone indicates a probability that, based on a specific action, the safety risk zone will be free of both static and moving obstacles (such as another vehicle) at a predetermined future time."',
        citations: 'p.8, bottom-top',
        conclusion: 'Novel',
        analysis: 'The reference describes predictions for a predetermined future time as safety/comfort probabilities and state predictions, but not computing a predicted headway value for a future time instant.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-10',
        claimText: 'based on the current speed and acceleration of the forward vehicle relative to the ego vehicle.',
        interpretation: '"Direct and/or indirect measurement of speed of target vehicle in each zone (for example change in distance between given time t and previous sample time t-1 to the target vehicle in each zone, and/or direct radar unit speed measurement of target vehicle in each zone); Direct and/or indirect measurement of acceleration of target vehicle in each zone"',
        citations: 'p.8, ¶100-¶101',
        conclusion: 'Novel',
        analysis: 'Although target-vehicle speed and acceleration measurements are disclosed as state inputs, they are not disclosed as being used to compute a predicted headway (future distance).',
        counteranalysis: '',
        strength: '5/5',
      },
    ],
  },
  {
    claimNumber: 'Claim 18',
    noveltyStatus: 'Novel',
    summary: 'Novel over Graves et al. because Graves describes zone-based safety levels and comfort considerations but does not describe determining a discrete risk category from forward-vehicle relative kinematics as the basis for comfort-selective strategy determination.',
    priorArtReference: 'Graves et al. (US 2019/0329772 A1)',
    rows: [
      {
        claimId: 'L18-1',
        claimText: 'A computer program embodied on non-transitory computer-readable storage,',
        interpretation: '"A computer program product comprising a medium tangibly storing thereon executable instructions that, when executed by a processor system in a vehicle, cause the processor system to: determine a current state of a vehicle based on sensor data captured by sensors of the vehicle;"',
        citations: 'p.16, mid-bottom',
        conclusion: 'Not novel',
        analysis: 'Computer program on non-transitory storage is disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L18-2',
        claimText: 'comprising computer executable instructions configured, when executed, to implement an adaptive cruise control method',
        interpretation: '"The memory tangibly stores thereon executable instructions that, when executed by the processor system, cause the processor system to: determine a current state of a vehicle based on sensor data captured by sensors of the vehicle; predict, based on the current vehicle state, a future state for the vehicle for each possible action in a set of possible actions..."',
        citations: 'p.1, ¶16',
        conclusion: 'Not novel',
        analysis: 'Executable instructions implementing adaptive spacing control are disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L18-3',
        claimText: 'for autonomously adapting the speed of an ego vehicle to maintain a target headway,',
        interpretation: '"In the present example, these parameters are target speed and target headway (e.g. inter-vehicle spacing). It is desirable that the policy remain relatively constant over small periods of time in order to enable the safety predictor to learn to generalize."',
        citations: 'p.12, top',
        conclusion: 'Likely not novel',
        analysis: 'The reference describes controlling spacing and references a "target headway (e.g. inter-vehicle spacing)" parameter used with target speed in a controller/policy context.',
        counteranalysis: 'The "target headway" discussion appears in a training/data-collection controller context and the main ASP control descriptions focus on SRZ/CRZ avoidance rather than maintaining a target headway setpoint.',
        strength: '2/5',
      },
      {
        claimId: 'L18-4',
        claimText: 'headway being distance from the ego vehicle to a forward vehicle,',
        interpretation: '"the spacing distance between the leading front vehicle 306 and the ego vehicle 105 and the spacing distance between the trailing back vehicle 308 and the ego vehicle 105 both safely exceed the SRZ 310 and the CRZ 312 of the ego vehicle 105."',
        citations: 'p.5, bottom',
        conclusion: 'Not novel',
        analysis: 'Headway as distance to forward vehicle is disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L18-5',
        claimText: 'the ego vehicle equipped with a perception system for measuring a current headway and a current speed and acceleration of the forward vehicle relative to the ego vehicle, by:',
        interpretation: '"Information used by the state sub-module 410 to construct a representation of the current state of the ego vehicle 105 and its environment at a current time t may for example include distance information provided by front and back SAR units 116 (radar) and LIDAR units 114."',
        citations: 'p.5, bottom; p.8, ¶100-¶101',
        conclusion: 'Not novel',
        analysis: 'Distance to objects/vehicles (front/back) is sensed by SAR/LIDAR and used to form current state, and target-vehicle speed/acceleration are also listed as inputs.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L18-6',
        claimText: 'responsive to detecting that the current headway is below the target headway, determining and implementing a deceleration strategy for increasing to the target headway;',
        interpretation: '"In some examples embodiments, AS controller module 412 receives AC predictions 416 from the predictive perception module 402 and selects an action, for example an extent to which the vehicle 105 should throttle or brake."',
        citations: 'p.9, ¶110',
        conclusion: 'Likely not novel',
        analysis: 'The reference discloses selecting and implementing throttle/brake actions based on predictions, which is treated as determining and implementing a deceleration strategy to improve/restore spacing.',
        counteranalysis: 'The reference does not expressly state a trigger of "detecting that the current headway is below the target headway" followed by a corresponding strategy "for increasing to the target headway".',
        strength: '2/5',
      },
      {
        claimId: 'L18-7',
        claimText: 'wherein the deceleration strategy is determined so as to selectively optimize for comfort in dependence on a determined risk category of the ego vehicle,',
        interpretation: '"Front is Comfortable AND Back is Comfortable AND Front is Safe AND Back is Safe AND Speed is Close to Target"',
        citations: 'p.10, ¶116',
        conclusion: 'Likely novel',
        analysis: 'Comfort is included in an example action-selection condition, but the reference does not describe selectively optimizing comfort in dependence on a determined ego-vehicle "risk category" as a distinct claimed input.',
        counteranalysis: 'If the zone safety state/safety indication (e.g., safe vs unsafe) is treated as the claimed risk-category signal that gates whether comfort is included alongside safety, then comfort optimization could be read as dependent on a "risk category" analogue.',
        strength: '4/5',
      },
      {
        claimId: 'L18-8',
        claimText: 'the risk category determined as one of a discrete set of risk categories based on the current speed and acceleration of the forward vehicle relative to the ego vehicle.',
        interpretation: '"The output of the safety state function is a value between 0 and 1 that indicates the safety level of the ego vehicle 105 for the specific safety risk zone, where 1 is safe and 0 is unsafe."',
        citations: 'p.6, top',
        conclusion: 'Novel',
        analysis: 'The reference does not disclose a risk category determined as one of a discrete set that is based on the forward vehicle\'s current speed and acceleration relative to the ego vehicle, as recited.',
        counteranalysis: 'Treating "safe" vs "unsafe" as a discrete category set still does not supply the required basis of the risk-category determination on forward-vehicle speed and acceleration relative to ego.',
        strength: '5/5',
      },
    ],
  },
];
