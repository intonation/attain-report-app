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
  priorArtReference: string;
  rows: ClaimChartRow[];
}

export const claimChartData: ClaimChart[] = [
  {
    claimNumber: 'Claim 1',
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
        claimText: 'the controller comprising: a sensor system configured to measure a current headway between the ego vehicle and a preceding vehicle;',
        interpretation: '"The sensor fusion module integrates data from radar, lidar, and camera systems to determine real-time measurements of inter-vehicle distance."',
        citations: 'p.8, para 3',
        conclusion: 'Not novel',
        analysis: 'Sensor system for measuring headway is clearly disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-3',
        claimText: 'a comparator module configured to compare the current headway with a threshold value;',
        interpretation: '"A threshold comparator evaluates whether the measured following distance falls below a configurable safety margin."',
        citations: 'p.9, para 1',
        conclusion: 'Not novel',
        analysis: 'Threshold comparison is explicitly taught.',
        counteranalysis: '',
        strength: '4/5',
      },
      {
        claimId: 'L1-4',
        claimText: 'a deceleration planning module configured to compute a deceleration profile based on the comparison result;',
        interpretation: '"Upon detection of insufficient spacing, the deceleration planning module computes an optimal braking profile considering current vehicle dynamics."',
        citations: 'p.10, para 2',
        conclusion: 'Likely not novel',
        analysis: 'Deceleration planning is disclosed, though the specific "profile" language may differ.',
        counteranalysis: 'The claim requires a "profile" which may imply a time-series of values rather than a single deceleration command.',
        strength: '3/5',
      },
      {
        claimId: 'L1-5',
        claimText: 'wherein the deceleration planning module uses a target headway value as an input to determine the deceleration strategy;',
        interpretation: '"The control objective function prioritizes restoration of the target following distance while minimizing passenger discomfort."',
        citations: 'p.11, para 1',
        conclusion: 'Likely not novel',
        analysis: 'Target headway is used as an objective, though not explicitly as a direct input.',
        counteranalysis: 'Using target headway as an "objective" differs from using it as a direct "input" to determine strategy.',
        strength: '3/5',
      },
      {
        claimId: 'L1-6',
        claimText: 'a vehicle dynamics controller configured to actuate braking based on the computed deceleration profile;',
        interpretation: '"The vehicle dynamics controller receives deceleration commands and actuates the braking system through electronic signals."',
        citations: 'p.11, para 3',
        conclusion: 'Not novel',
        analysis: 'Vehicle dynamics controller for braking actuation is explicitly disclosed.',
        counteranalysis: '',
        strength: '5/5',
      },
      {
        claimId: 'L1-7',
        claimText: 'wherein the controller is configured to optimize passenger comfort during deceleration;',
        interpretation: '"Comfort optimization is achieved through smooth deceleration curves."',
        citations: 'p.12, para 2',
        conclusion: 'Likely not novel',
        analysis: 'Comfort optimization is mentioned but implementation details differ.',
        counteranalysis: '',
        strength: '4/5',
      },
      {
        claimId: 'L1-8',
        claimText: 'wherein the deceleration strategy is determined based on a predicted headway value calculated for a future time point;',
        interpretation: '"Future state estimation relies on constant velocity assumptions rather than explicit headway predictions at discrete future time points."',
        citations: 'p.13, para 1',
        conclusion: 'Novel',
        analysis: 'The reference does NOT teach using a predicted headway value at a future time point. Instead, it uses constant velocity assumptions.',
        counteranalysis: 'This is a key distinguishing feature. The claimed invention uses explicit prediction of future headway, which is not disclosed.',
        strength: '5/5',
      },
      {
        claimId: 'L1-9',
        claimText: 'wherein the predicted headway value is computed based on current velocities and accelerations of both the ego vehicle and the preceding vehicle;',
        interpretation: '"The prediction horizon extends to 2-3 seconds ahead using linear extrapolation of current kinematic states."',
        citations: 'p.13, para 2',
        conclusion: 'Likely novel',
        analysis: 'While kinematic extrapolation is mentioned, explicit computation of predicted headway from velocities and accelerations is not clearly disclosed.',
        counteranalysis: 'The reference uses extrapolation for position prediction but does not explicitly compute a "predicted headway value" as claimed.',
        strength: '4/5',
      },
      {
        claimId: 'L1-10',
        claimText: 'wherein the comfort selection input comprises the predicted headway value for selecting between comfort-prioritized and safety-prioritized deceleration modes.',
        interpretation: 'No corresponding disclosure found. The reference describes comfort considerations but does not use predicted headway as a mode selection input.',
        citations: '—',
        conclusion: 'Novel',
        analysis: 'This limitation is novel. The reference does not disclose using predicted headway as a comfort selection input for mode switching.',
        counteranalysis: '',
        strength: '5/5',
      },
    ],
  },
];
