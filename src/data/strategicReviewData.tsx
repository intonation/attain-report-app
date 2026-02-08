import React from 'react';

// Citation data structure
interface Citation {
  refId: string;
  filename: string;
  text: string;
  location: string;
}

// Parse citation string format: #["ref_2", "US_2019329772_A1.pdf", "text...", "page info"]
const parseCitation = (citationStr: string): Citation | null => {
  const match = citationStr.match(/\["([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\]/);
  if (match) {
    return {
      refId: match[1],
      filename: match[2],
      text: match[3],
      location: match[4],
    };
  }
  return null;
};

// PDF Jump Link component
interface PdfJumpLinkProps {
  citation: Citation;
  onClick?: (citation: Citation) => void;
}

const PdfJumpLink: React.FC<PdfJumpLinkProps> = ({ citation, onClick }) => (
  <button
    className="pdf-jump-link"
    onClick={() => onClick?.(citation)}
    style={{ background: 'none', border: 'none', padding: 0, font: 'inherit' }}
  >
    {citation.location}
  </button>
);

// Render text with inline citations
const renderTextWithCitations = (
  text: string,
  onCitationClick?: (citation: Citation) => void
): React.ReactNode[] => {
  // Split by citation pattern (#[...])
  const parts = text.split(/(#\["[^"]+",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+"\])/g);

  return parts.map((part, index) => {
    if (part.startsWith('#[')) {
      const citation = parseCitation(part.substring(1));
      if (citation) {
        return (
          <PdfJumpLink
            key={index}
            citation={citation}
            onClick={onCitationClick}
          />
        );
      }
    }
    return <span key={index}>{part}</span>;
  });
};

// Strategic Review Content Component
interface StrategicReviewContentProps {
  onCitationClick?: (citation: Citation) => void;
}

export const StrategicReviewContent: React.FC<StrategicReviewContentProps> = ({
  onCitationClick,
}) => {
  return (
    <div className="strategic-review">
      {/* Claims 1, 19 Section */}
      <section className="strategic-review__section">
        <div className="strategic-review__claim-label">Claims 1, 19</div>

        <p className="strategic-review__paragraph">
          [1] Claim 1 recites an adaptive cruise controller that autonomously adapts an ego vehicle's speed to maintain a target headway to a forward vehicle. It requires a comparison module that determines whether current headway is below the target headway and, upon that condition, an elastic adaptive cruise control module that determines a deceleration strategy that a controller implements. The deceleration strategy is selectively comfort-optimized in dependence on a predicted headway computed for a future time instant based on the forward vehicle's current speed and acceleration relative to the ego vehicle.
        </p>

        <p className="strategic-review__paragraph">
          [2] Claims 1 and 19 are, respectively, controller and method claims that require comfort-selective deceleration based on a predicted headway computed for a future time instant.
        </p>

        <p className="strategic-review__paragraph">
          [3] In one implementation, the ego vehicle's perception system (or perception stack) processes on-board sensor outputs to provide current headway and kinematic information for a forward vehicle relative to the ego vehicle. A comparison module can use current ego-vehicle velocity to calculate the target headway and compare it to the current headway. When current headway is below target headway, an elastic ACC module can calculate additional headway-related quantities (including predicted headway) and select a deceleration strategy. A controller can then execute the selected strategy by providing control signals to vehicle actuators or motors.
        </p>

        <h3 className="strategic-review__reference-heading">
          Reference summary – Graves et al.: US 2019/0329772 A1 (embodiment 1)
        </h3>

        <p className="strategic-review__paragraph">
          [1] A baseline controller uses target speed and target headway (inter-vehicle spacing), and increases or decreases speed to avoid collision when a car approaches from behind or in front ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00932:In the present example, these parameters are target speed and target headway (e. g. inter-vehicle spacing).", "p.12, top"]', onCitationClick)}). In a normal highway driving scenario, a spacing distance is described between a leading front vehicle and an ego vehicle, and another spacing distance is described between a trailing back vehicle and the ego vehicle ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00555:the spacing distance d,,,,,, between the leading front vehicle 306 and the ego vehicle 105 and the spacing distance d,.", "p.5, bottom"]', onCitationClick)}). For predicting safety for front or back safety risk zones, example state-space inputs include current speed, distance to a target vehicle in each zone, and direct or indirect measurement of target-vehicle speed and acceleration ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00715:In an example embodiment, the specific information from the state space (s,) required to predict safety for the front or back SRZs are, for a given time t:", "p.8, para97-para101"]', onCitationClick)}). A safety state function is described as outputting a value between 0 and 1 to indicate safety level, and the distance to a front vehicle can be measured in real time using LIDAR units and SAR units and evaluated against a safety threshold ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00605:The output of the safety state function is a value between 0 and 1 that indicates the safety level of the ego vehicle 105 for the specific safety risk zone, where 1 is safe and 0 is unsafe.", "p.6, top"]', onCitationClick)}). An AS controller module receives action conditioned predictions and selects an action (e.g., an extent to throttle or brake), and the selected actions are provided to a drive control system to control actuators ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00770:In some examples embodiments, AS controller module 412 receives AC predictions 416 from the predictive perception module 402 and selects an action, for example an extent to which the vehicle 105 should throttle or brake.", "p.9, para110"]', onCitationClick)}). An ASP control system is described as predicting a safety risk zone and a comfort risk zone, predicting actions to keep other vehicles out of those zones (with the safety risk zone having higher priority) while maintaining a target speed, and undertaking the action(s) predicted as most likely to succeed ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00563:In example embodiments the ASP control system of ego vehicle 105 is configured to continuously predict the SRZ 310 and the CRZ 312 by monitoring the environment around the ego vehicle 105 and operating state of the ego vehicle 205, predict what actions are most likely to keep other vehicles out of the CRZ 312 and the SRZ 310 (with the SRZ 310 having the higher priority) while maintaining a target speed, and undertake the action(s) predicted as having the greatest likelihood of success.", "p.5, top"]', onCitationClick)}). Once a next action is determined, it can be communicated to an actuator of a drive control system for implementation, and can specify an amount of throttle or an amount of braking ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00820:[0124] Inan example embodiment, once a next action a, is determined, the action is communicated to the appropriate actuator of drive control system 150 for implementation.", "p.10, para124"]', onCitationClick)}). A safety prediction for a safety risk zone is described as indicating a probability that the safety risk zone will be free of obstacles at a predetermined future time ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00703:In some examples, the safety prediction p,,, for a safety risk zone indicates a probability that, based on a specific action, the", "p.8, bottom-top"]', onCitationClick)}). Speed of a target vehicle can be measured directly or indirectly (e.g., change in distance between time samples and/or direct radar unit speed measurement), and acceleration can be measured directly or indirectly (e.g., change in distance over multiple sample periods and/or direct radar unit acceleration measurement) ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00719:Direct and/or indirect measurement of speed of target vehicle in each zone (for example change in distance between given time t and previous sample time t-1 to the target vehicle in each zone z, and/or direct radar unit speed measurement of target vehicle in each zone)", "p.8, para100-para101"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          [2] One example describes adding comfort by configuring an AS controller to maximize a condition that includes "Front is Comfortable" and "Back is Comfortable" together with "Front is Safe," "Back is Safe," and "Speed is Close to Target" ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00787:[0116] There are many ways to add comfort to the condition, however, in one example embodiment the AS controller 412 is configured to maximize the following statement:", "p.10, para116"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Claim 1 requires determining the deceleration strategy to selectively optimize comfort in dependence on a predicted headway computed for a future time instant based on the forward vehicle's current speed and acceleration relative to the ego vehicle. Graves describes incorporating comfort into action selection ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00787:[0116] There are many ways to add comfort to the condition, however, in one example embodiment the AS controller 412 is configured to maximize the following statement:", "p.10, para116"]', onCitationClick)}). Graves also discusses predictions at a predetermined future time in the form of safety predictions, but does not describe producing and using a predicted headway (future ego-to-forward-vehicle distance) for comfort-selective deceleration ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00703:In some examples, the safety prediction p,,, for a safety risk zone indicates a probability that, based on a specific action, the", "p.8, bottom-top"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Graves nonetheless teaches comfort considerations (e.g., comfort risk zones and comfort-inclusive action selection) as part of an adaptive spacing controller ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00787:[0116] There are many ways to add comfort to the condition, however, in one example embodiment the AS controller 412 is configured to maximize the following statement:", "p.10, para116"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Graves' action-conditioned predictions are described in terms of safety/comfort predictions and state predictions (e.g., speed), rather than a predicted headway value (future spacing distance to a forward vehicle) that is then used as the comfort-selective input to a deceleration strategy ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00750:All of these predictions are action conditional what-ifs that can be used to evaluate the impact that different actions will have on safety, comfort and vehicle state (e.", "p.9, para107"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Although Graves describes evaluating predictions for a predetermined future time, those predictions are framed as zone safety probabilities (and optionally comfort probabilities), not as computing a predicted headway for a future time instant ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00703:In some examples, the safety prediction p,,, for a safety risk zone indicates a probability that, based on a specific action, the", "p.8, bottom-top"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Graves describes measuring target-vehicle speed, but the mapping does not show that such speed is used to compute a predicted headway (future inter-vehicle distance) as required by claim 1 ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00719:Direct and/or indirect measurement of speed of target vehicle in each zone (for example change in distance between given time t and previous sample time t-1 to the target vehicle in each zone z, and/or direct", "p.8, para100-para101"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Similarly, Graves describes measuring target-vehicle acceleration, but the mapping does not show that such acceleration is used to compute a predicted headway (future inter-vehicle distance) as required by claim 1 ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00720:[0101] Direct and/or indirect measurement of acceleration of target vehicle in each zone (for example change in distance over three sample periods, and/or direct radar unit acceleration measurement of target vehicle in each zone Zz", "p.8, para101"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          For Graves (Embodiment 1), claim 1 is treated as novel because the claimed comfort-selective deceleration strategy depends on a predicted headway computed for a future time instant based on the forward vehicle's current speed and acceleration, and that predicted-headway-based dependency is not treated as disclosed.
        </p>

        <div className="strategic-review__conclusion">
          <div className="strategic-review__novelty-label">Novelty analysis – Graves et al. (embodiment 1)</div>
          <div className="strategic-review__novelty-item">
            <span className="strategic-review__novelty-text">
              Predicted headway used to select a comfort-optimized deceleration strategy
            </span>
            <span className="strategic-review__novelty-strength strategic-review__novelty-strength--strong">
              Strong
            </span>
          </div>
        </div>
      </section>

      {/* Claim 18 Section */}
      <section className="strategic-review__section">
        <div className="strategic-review__claim-label">Claim 18</div>

        <p className="strategic-review__paragraph">
          [1] Claim 18 focuses on comfort-selective deceleration based on a discrete risk category, rather than on a predicted headway computed for a future time instant. Claim 18 recites a computer program embodied on non-transitory computer-readable storage with executable instructions that, when executed, implement an adaptive cruise control method. The method responds to detecting that current headway is below target headway by determining and implementing a deceleration strategy for increasing to the target headway, where the strategy selectively optimizes comfort in dependence on a determined risk category of the ego vehicle. The risk category is determined as one of a discrete set of risk categories based on the forward vehicle's current speed and acceleration relative to the ego vehicle.
        </p>

        <p className="strategic-review__paragraph">
          [2] Claim 18 is a computer-program claim embodied on non-transitory computer-readable storage.
        </p>

        <p className="strategic-review__paragraph">
          [3] In one implementation, a processor executes stored instructions to (i) evaluate whether current headway is below target headway and (ii) determine and implement a deceleration strategy to increase headway toward the target headway. The strategy selection can be conditioned on a risk category so that comfort constraints are applied selectively when appropriate. The risk category can be selected from a discrete set using forward-vehicle kinematics (current speed and acceleration relative to the ego vehicle) as inputs to the risk assessment.
        </p>

        <h3 className="strategic-review__reference-heading">
          Reference summary – Graves et al.: US 2019/0329772 A1 (embodiment 1)
        </h3>

        <p className="strategic-review__paragraph">
          [1] A computer program product is described as comprising a medium tangibly storing thereon executable instructions ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B01116:22. A computer program product comprising a medium tangibly storing thereon executable instructions", "p.16, mid-bottom"]', onCitationClick)}). Executable instructions stored in memory can cause a processor system to determine a current state, make predictions for possible actions, select a vehicle action, and cause the vehicle to implement the action ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00364:The memory tangibly stores thereon executable instructions that,", "p.1, para16"]', onCitationClick)}). A baseline controller uses target speed and target headway (inter-vehicle spacing) as parameters ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00932:In the present example, these parameters are target speed and target headway (e. g. inter-vehicle spacing).", "p.12, top"]', onCitationClick)}). A spacing distance is described between a leading front vehicle and an ego vehicle ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00555:the spacing distance d,,,,,, between the leading front vehicle 306 and the ego vehicle 105", "p.5, bottom"]', onCitationClick)}). A state sub-module is described as constructing a representation of a current state using distance information provided by front and back SAR units (radar) and LIDAR units ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00574:Information used by the state sub-module 410 to construct a representation of the current state of the ego vehicle 105 and its environment at a current time t may for example include distance information provided by front and back SAR units 116 (radar) and LIDAR units 114.", "p.5, bottom"]', onCitationClick)}). An AS controller module receives action conditioned predictions and selects an action (e.g., an extent to throttle or brake), and provides selected actions to a drive control system to control actuators ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00770:In some examples embodiments, AS controller module 412 receives AC predictions 416 from the predictive perception module 402 and selects an action, for example an extent to which the vehicle 105 should throttle or brake.", "p.9, para110"]', onCitationClick)}). An example describes adding comfort via an AS controller condition that includes "Front is Comfortable" and "Back is Comfortable" together with safety and speed being close to target ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00787:[0116] There are many ways to add comfort to the condition, however, in one example embodiment the AS controller 412 is configured to maximize the following statement:", "p.10, para116"]', onCitationClick)}). A safety state function is described as outputting a value between 0 and 1 that indicates the safety level of an ego vehicle for a specific safety risk zone, where 1 is safe and 0 is unsafe ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00605:[0077] The output of the safety state function is a value between 0 and 1 that indicates the safety level of the ego vehicle 105 for the specific safety risk zone, where 1 is safe and 0 is unsafe.", "p.6, top"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Claim 18 requires determining a risk category as one of a discrete set of risk categories based on the forward vehicle's current speed and acceleration relative to the ego vehicle. Graves describes zone-based safety state semantics (e.g., a safety level value between 0 and 1), but this is not treated as disclosing a risk category selected from a discrete set and derived from the forward vehicle's relative speed and acceleration ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00605:[0077] The output of the safety state function is a value between 0 and 1 that indicates the safety level of the ego vehicle 105 for the specific safety risk zone, where 1 is safe and 0 is unsafe.", "p.6, top"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Graves does teach measuring the target/forward vehicle's speed (e.g., via distance-change inference and/or radar unit speed measurement) ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00719:Direct and/or indirect measurement of speed of target vehicle in each zone (for example change in distance between given time t and previous sample time t-1 to the target vehicle in each zone z, and/or direct", "p.8, para100-para101"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Graves also teaches measuring the target/forward vehicle's acceleration (e.g., via distance-change inference and/or radar unit acceleration measurement) ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00719:[0100] Direct and/or indirect measurement of speed of target vehicle in each zone (for example change in distance between given time t and previous sample time t-1 to the target vehicle in each zone z, and/or direct radar unit speed measurement of target vehicle in each zone)", "p.8, para100-para101"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          On the mapped record, Graves' safety state and safety predictions are described as continuous or probability-like values between 0 and 1, rather than a selection among discrete risk categories as recited ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00605:[0077] The output of the safety state function is a value between 0 and 1 that indicates the safety level of the ego vehicle 105 for the specific safety risk zone, where 1 is safe and 0 is unsafe.", "p.6, top"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Even where Graves uses measured target-vehicle speed as an input (e.g., for predicting zone safety), the mapping does not treat Graves as determining a discrete risk category based on the forward vehicle's current speed relative to the ego vehicle ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00719:Direct and/or indirect measurement of speed of target vehicle in each zone (for example change in distance between given time t and previous sample time t-1 to the target vehicle in each zone z, and/or direct", "p.8, para100-para101"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Likewise, even where Graves uses measured target-vehicle acceleration as an input (e.g., for predicting zone safety), the mapping does not treat Graves as determining a discrete risk category based on the forward vehicle's current acceleration relative to the ego vehicle ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00720:[0101] Direct and/or indirect measurement of acceleration of target vehicle in each zone (for example change in distance over three sample periods, and/or direct radar unit acceleration measurement of target vehicle in each zone Zz", "p.8, para101"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          Claim 18 also requires that the deceleration strategy is determined to selectively optimize comfort in dependence on a determined risk category of the ego vehicle. Graves teaches incorporating comfort into action selection ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00787:[0116] There are many ways to add comfort to the condition, however, in one example embodiment the AS controller 412 is configured to maximize the following statement:", "p.10, para116"]', onCitationClick)}), but the mapping does not treat Graves as disclosing a distinct "risk category" construct that governs when comfort is selectively optimized.
        </p>

        <p className="strategic-review__paragraph">
          Graves nonetheless discloses comfort considerations (e.g., comfort risk zones and comfort predictions, and comfort included in a controller objective) ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00549:CRZ 312 also can includes a front comfort risk zone and a back comfort risk zone that should be free of any other vehicles in order to allow vehicle occupants, for example occupants of the ego vehicle 105, to have a desired comfort level.", "p.5, mid-bottom"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          On the available mapping, Graves' closest analogue is a zone-specific safety state (including safe/unsafe semantics and a 0–1 scaling), but this is not treated as disclosing a "risk category of the ego vehicle" as a distinct determination used to condition whether comfort is selectively optimized ({renderTextWithCitations('#["ref_2", "US_2019329772_A1.pdf", "B00605:[0077] The output of the safety state function is a value between 0 and 1 that indicates the safety level of the ego vehicle 105 for the specific safety risk zone, where 1 is safe and 0 is unsafe.", "p.6, top"]', onCitationClick)}).
        </p>

        <p className="strategic-review__paragraph">
          <strong>Counteranalysis</strong>: If Graves' "1 is safe and 0 is unsafe" semantics are treated as a categorical risk proxy, Graves could be read as using that proxy to gate inclusion of comfort terms alongside safety when selecting an action. If adopted, this would change the conclusion for this point from arguably not disclosed to disclosed.
        </p>

        <p className="strategic-review__paragraph">
          For Graves (Embodiment 1), claim 18 is treated as novel because determining a risk category as one of a discrete set based on the forward vehicle's current relative speed and acceleration is not treated as disclosed, even though Graves teaches comfort-inclusive action selection and zone-based safety/comfort evaluation.
        </p>

        <div className="strategic-review__conclusion">
          <div className="strategic-review__novelty-label">Novelty analysis – Graves et al. (embodiment 1)</div>
          <div className="strategic-review__novelty-item">
            <span className="strategic-review__novelty-text">
              Risk category selected from a discrete set and derived from forward-vehicle relative speed and acceleration
            </span>
            <span className="strategic-review__novelty-strength strategic-review__novelty-strength--strong">
              Strong
            </span>
          </div>
          <div className="strategic-review__novelty-item">
            <span className="strategic-review__novelty-text">
              Comfort optimization dependent on a determined risk category
            </span>
            <span className="strategic-review__novelty-strength strategic-review__novelty-strength--moderate">
              Moderate
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export type { Citation };
