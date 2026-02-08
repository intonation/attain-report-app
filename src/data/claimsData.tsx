import React, { useCallback } from 'react';

interface ClaimData {
  claimNumber: number;
  status: 'active' | 'cancelled';
  text: React.ReactNode;
}

// Interactive claim target component
// Renders as inline text at rest, shows highlight on hover/focus
interface ClaimTargetProps {
  children: React.ReactNode;
  dataRef?: string;
  onClick?: (ref: string) => void;
}

const ClaimTarget: React.FC<ClaimTargetProps> = ({
  children,
  dataRef,
  onClick,
}) => {
  const handleClick = useCallback(() => {
    onClick?.(dataRef || '');
  }, [onClick, dataRef]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Activate on Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(dataRef || '');
    }
  }, [onClick, dataRef]);

  return (
    <span
      role="button"
      tabIndex={0}
      className="claim-target"
      data-ref={dataRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </span>
  );
};

// Shorthand component for cleaner markup
const T: React.FC<{ children: React.ReactNode; r?: string }> = ({ children, r }) => (
  <ClaimTarget dataRef={r}>{children}</ClaimTarget>
);

// Individual claim component
interface ClaimItemProps {
  claim: ClaimData;
}

const ClaimItem: React.FC<ClaimItemProps> = ({ claim }) => {
  if (claim.status === 'cancelled') {
    return (
      <div className="claim-item claim-item--cancelled">
        <div className="claim-item__header">
          <span className="claim-item__number">Claim {claim.claimNumber}</span>
          <span className="claim-item__status claim-item__status--cancelled">Cancelled</span>
        </div>
      </div>
    );
  }

  return (
    <div className="claim-item">
      <div className="claim-item__header">
        <span className="claim-item__number">Claim {claim.claimNumber}</span>
      </div>
      <div className="claim-item__content">
        {claim.text}
      </div>
    </div>
  );
};

// All claims data
const claimsDataList: ClaimData[] = [
  {
    claimNumber: 1,
    status: 'active',
    text: (
      <>
        <p className="claim-item__paragraph">
          An <T r="F1-1">adaptive cruise controller</T> for <T r="R1-1">autonomously adapting</T> the <T r="F1-3">speed</T> of an <T r="F1-2">ego vehicle</T> <T r="R1-1">to maintain</T> a <T r="F1-4">target headway</T>, <T r="F1-6">headway</T> <T r="R1-2">being distance from</T> the <T r="F1-2">ego vehicle</T> <T r="R1-2">to</T> a <T r="F1-5">forward vehicle</T>, the <T r="F1-2">ego vehicle</T> <T r="R1-3">equipped with</T> a <T r="F1-7">perception system</T> <T r="R1-4">for measuring</T> a <T r="F1-8">current headway</T> <T r="R1-5">and</T> a <T r="F1-9">current speed</T> and <T r="F1-10">acceleration</T> of the <T r="F1-5">forward vehicle</T> <T r="R1-6">relative to</T> the <T r="F1-2">ego vehicle</T>, the <T r="F1-1">adaptive cruise controller</T> <T r="R1-7">comprising</T>:
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          a <T r="F1-11">comparison module</T> <T r="R1-10">configured to determine if</T> the <T r="F1-8">current headway</T> is <T r="R1-10">below</T> the <T r="F1-4">target headway</T>; <T r="R1-8">and</T>
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          an <T r="F1-12">elastic adaptive cruise control module</T> configured to, <T r="R1-11">in response to</T> detecting that the <T r="F1-8">current headway</T> is below the <T r="F1-4">target headway</T>, <T r="R1-11">determine</T> a <T r="F1-13">deceleration strategy</T> <T r="R1-12">for increasing to</T> the <T r="F1-4">target headway</T>; <T r="R1-9">and</T>
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          a <T r="F1-14">controller</T> <T r="R1-13">configured to implement</T> the <T r="F1-13">deceleration strategy</T>;
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          wherein the <T r="F1-13">deceleration strategy</T> <T r="R1-14">is determined so as to selectively optimize for</T> <T r="F1-17">comfort</T> <T r="R1-14">in dependence on</T> a <T r="F1-15">predicted headway</T>, the <T r="F1-15">predicted headway</T> <T r="R1-15">computed for</T> a <T r="F1-16">future time instant</T> <T r="R1-16">based on</T> the <T r="F1-9">current speed</T> <T r="R1-17">and</T> <T r="F1-10">acceleration</T> of the <T r="F1-5">forward vehicle</T> relative to the <T r="F1-2">ego vehicle</T>.
        </p>
      </>
    ),
  },
  {
    claimNumber: 2,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 1, wherein the deceleration strategy is determined so as to selectively optimize for comfort in dependence on the current headway and the predicted headway.
      </p>
    ),
  },
  {
    claimNumber: 3,
    status: 'active',
    text: (
      <>
        <p className="claim-item__paragraph">
          The adaptive cruise controller of claim 1, configured to:
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          determine a risk headway less than the target headway; and
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          compare the predicted headway with the risk headway, the deceleration strategy selectively optimized for comfort in dependence thereon.
        </p>
      </>
    ),
  },
  {
    claimNumber: 4,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 3, wherein the risk headway is determined based on a measured absolute speed of the ego vehicle.
      </p>
    ),
  },
  {
    claimNumber: 5,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 3, wherein the risk headway and the predicted headway are used to determine whether or not to impose a comfort constraint on the deceleration strategy.
      </p>
    ),
  },
  {
    claimNumber: 6,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 5, wherein the comfort constraint limits the acceleration of the ego vehicle based on a reaction time, the reaction time determined by estimating a time until the risk headway is reached based on the current speed and acceleration of the forward vehicle relative to the ego vehicle.
      </p>
    ),
  },
  {
    claimNumber: 7,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 6, wherein the reaction time is the lesser of: the estimated time until the risk headway is reached, and a predetermined risk time.
      </p>
    ),
  },
  {
    claimNumber: 8,
    status: 'active',
    text: (
      <>
        <p className="claim-item__paragraph">
          The adaptive cruise controller of claim 6, wherein the estimated reaction time t is used to compute an acceleration limit for the ego vehicle as:
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent claim-item__formula">
          a_EV = (d + v_FV t + (a_FV / 2) t² − v_EV (t + T_t) − d_0) / (t T_t + t² / 2),
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          where d is the current headway, v_FV is a current absolute speed of the forward vehicle, a_FV is a current absolute acceleration of the forward vehicle, v_EV is a current absolute speed of the ego vehicle, T_t is a predetermined time value, and d_0 is a predetermined distance value.
        </p>
      </>
    ),
  },
  {
    claimNumber: 9,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 8, wherein the acceleration of the ego vehicle is limited to a_EV in the case that a_EV ≤ 0 but to zero in the event that a_EV &gt; 0.
      </p>
    ),
  },
  {
    claimNumber: 10,
    status: 'active',
    text: (
      <>
        <p className="claim-item__paragraph">
          The adaptive cruise controller of claim 5, wherein:
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          if both the current headway and the predicted headway are above the risk headway, the comfort constraint is imposed; and
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          if either of the current headway or the predicted headway is below the risk headway, the comfort constraint is not imposed.
        </p>
      </>
    ),
  },
  {
    claimNumber: 11,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 5, wherein in the case that the comfort constraint is not imposed, the deceleration strategy comprises initiating an emergency braking procedure.
      </p>
    ),
  },
  {
    claimNumber: 12,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 1, wherein the future time instant is a fixed duration from a current time instant at which the current headway and the current speed and acceleration of the forward vehicle relative to the ego vehicle are measured.
      </p>
    ),
  },
  {
    claimNumber: 13,
    status: 'active',
    text: (
      <>
        <p className="claim-item__paragraph">
          The adaptive cruise controller of claim 4 or any claim dependent thereon, wherein the risk headway d_risk is computed as:
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent claim-item__formula">
          v_EV &lt; v_th_slow → d_risk = d_risk_high
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent claim-item__formula">
          v_th_slow ≤ v_EV ≤ v_th_fast → d_risk = d_risk_high + (d_risk_medium − d_risk_high)/(v_th_fast − v_th_slow) (v_EV − v_th_slow)
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent claim-item__formula">
          v_EV &gt; v_th_fast → d_risk = d_risk_medium
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          in which:
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent-2 claim-item__formula">
          d_risk_medium = max(v_EV × t_0,risk_medium, d_0,risk_medium),
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent-2 claim-item__formula">
          d_risk_high = max(v_EV × t_0,risk_high, d_0,risk_high),
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent-2">
          wherein t_0,risk_medium and t_0,risk_high &lt; t_0,risk_medium are predetermined time values,
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent-2">
          wherein d_0,risk_medium and d_0,risk_high &lt; d_0,risk_medium are predetermined distance values, and
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent-2">
          wherein v_th_slow and v_th_fast are predetermined speed thresholds.
        </p>
      </>
    ),
  },
  {
    claimNumber: 14,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 1, wherein the current speed and acceleration of the forward vehicle relative to the ego vehicle are determined using a measured absolute speed or velocity and acceleration respectively of both the ego vehicle and the forward vehicle, the absolute acceleration of each vehicle and the absolute speed or velocity of the each vehicle provided by the perception system.
      </p>
    ),
  },
  {
    claimNumber: 15,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller of claim 1, wherein the current speed and acceleration of the forward vehicle relative to the ego vehicle are provided directly by the perception system.
      </p>
    ),
  },
  {
    claimNumber: 16,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller according to claim 11, wherein the emergency braking procedure implements sufficiently aggressive braking such that the ego vehicle can be brought to a complete halt before reaching a current location of the forward vehicle.
      </p>
    ),
  },
  {
    claimNumber: 17,
    status: 'cancelled',
    text: null,
  },
  {
    claimNumber: 18,
    status: 'active',
    text: (
      <>
        <p className="claim-item__paragraph">
          A <T r="F18-1">computer program</T> <T r="R18-1">embodied on</T> <T r="F18-2">non-transitory computer-readable storage</T>, <T r="R18-2">comprising</T> <T r="F18-3">computer executable instructions</T> configured, <T r="R18-3">when executed, to implement</T> an <T r="F18-4">adaptive cruise control method</T> for <T r="R18-4">autonomously adapting</T> the <T r="F18-6">speed</T> <T r="R18-4">of</T> an <T r="F18-5">ego vehicle</T> <T r="R18-4">to maintain</T> a <T r="F18-7">target headway</T>, <T r="F18-8">headway</T> <T r="R18-5">being distance from</T> the <T r="F18-5">ego vehicle</T> <T r="R18-5">to</T> a <T r="F18-9">forward vehicle</T>, the <T r="F18-5">ego vehicle</T> <T r="R18-6">equipped with</T> a <T r="F18-10">perception system</T> <T r="R18-10">for</T> <T r="R18-11">measuring</T> a <T r="F18-11">current headway</T> and a <T r="F18-12">current speed</T> <T r="R18-12">and</T> <T r="F18-13">acceleration</T> <T r="R18-8">of</T> the <T r="F18-9">forward vehicle</T> <T r="R18-8">relative to</T> the <T r="F18-5">ego vehicle</T>, by:
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          <T r="R18-14">responsive</T> <T r="R18-15">to</T> <T r="R18-13">detecting</T> that the <T r="F18-11">current headway</T> is <T r="R18-13">below</T> the <T r="F18-7">target headway</T>, <T r="R18-14">determining</T> and <T r="R18-15">implementing</T> a <T r="F18-14">deceleration strategy</T> <T r="R18-16">for increasing to</T> the <T r="F18-7">target headway</T>;
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          wherein the <T r="F18-14">deceleration strategy</T> <T r="R18-17">is determined</T> so as to <T r="R18-17">selectively optimize</T> for <T r="F18-17">comfort</T> <T r="R18-17">in dependence on</T> a determined <T r="F18-15">risk category of the ego vehicle</T>, the <T r="F18-15">risk category</T> <T r="R18-18">determined as one of</T> a <T r="F18-16">discrete set of risk categories</T> <T r="R18-19">based on</T> the <T r="F18-12">current speed</T> and acceleration of the <T r="F18-9">forward vehicle</T> <T r="R18-9">relative to</T> the <T r="F18-5">ego vehicle</T>.
        </p>
      </>
    ),
  },
  {
    claimNumber: 19,
    status: 'active',
    text: (
      <>
        <p className="claim-item__paragraph">
          An adaptive cruise control method for autonomously adapting the speed of an ego vehicle to maintain a target headway, headway being distance from the ego vehicle to a forward vehicle, the ego vehicle equipped with a perception system for measuring a current headway and a current speed and acceleration of the forward vehicle relative to the ego vehicle, the method comprising:
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          in response to detecting that the current headway is below the target headway, determining and implementing a deceleration strategy for increasing to the target headway;
        </p>
        <p className="claim-item__paragraph claim-item__paragraph--indent">
          wherein the deceleration strategy is determined so as to selectively optimize for comfort in dependence on a predicted headway, the predicted headway computed for a future time instant based on the current speed and acceleration of the forward vehicle relative to the ego vehicle.
        </p>
      </>
    ),
  },
  {
    claimNumber: 20,
    status: 'cancelled',
    text: null,
  },
  {
    claimNumber: 21,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The adaptive cruise controller according to claim 1 embodied on a semi- or fully autonomous vehicle.
      </p>
    ),
  },
  {
    claimNumber: 22,
    status: 'active',
    text: (
      <p className="claim-item__paragraph">
        The semi- or fully-autonomous vehicle according to claim 21, wherein the vehicle comprises a sensor system providing a coverage range between 180° and 360°.
      </p>
    ),
  },
  {
    claimNumber: 23,
    status: 'cancelled',
    text: null,
  },
];

// Claims Content Component
export const ClaimsPageContent: React.FC = () => {
  return (
    <div className="claims-page">
      {claimsDataList.map((claim) => (
        <ClaimItem key={claim.claimNumber} claim={claim} />
      ))}
    </div>
  );
};

export { claimsDataList, ClaimTarget };
export type { ClaimData };
