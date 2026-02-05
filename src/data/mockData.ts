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
    reasoning: `This claim is novel. Graves describes zone-based safety levels and comfort considerations but does not describe using a predicted headway value as the comfort selective input to determine the deceleration strategy (see claim charts L1-8 L1-8 L1-10).`,
  },
  {
    claimNumber: 12,
    isNovel: 'likely-novel',
    reasoning: `This claim is likely novel. The reference discloses a vehicle control system with predictive braking but does not appear to teach coordinating multiple controller modules under sensor degradation conditions as claimed (see claim charts L12-1 L12-4 L12-5).`,
  },
  {
    claimNumber: 7,
    isNovel: 'likely-not-novel',
    reasoning: `This claim may be anticipated by the combination of Graves and Breuer. Graves discloses the basic headway calculation method, while Breuer teaches similar velocity threshold parameters. Further review recommended (see Breuer paras [0032]-[0035]).`,
  },
  {
    claimNumber: 18,
    isNovel: 'not-novel',
    reasoning: `This claim is anticipated by Graves. The reference explicitly discloses determining a discrete risk category from forward vehicle relative kinematics as the basis for deceleration strategy selection (see Graves Fig. 4, paras [0045]-[0048]).`,
  },
];

export const calloutContent = {
  title: 'Getting started with Attain',
  subtitle: 'How the analysis works',
  content: `Your patent documents go through eight processing stages. Each claim gets parsed into its features, then checked against prior art. The system looks for both explicit and implicit disclosures in the references.`,
};
