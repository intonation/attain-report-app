import React from 'react';

// Citation data structure
interface Citation {
  refId: string;
  filename: string;
  text: string;
  location: string;
}

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

// Graves Reference Summary Content Component
interface GravesReferenceSummaryContentProps {
  onCitationClick?: (citation: Citation) => void;
}

export const GravesReferenceSummaryContent: React.FC<GravesReferenceSummaryContentProps> = ({
  onCitationClick,
}) => {
  // Helper to render a citation link
  const cite = (refId: string, filename: string, text: string, location: string) => (
    <PdfJumpLink
      citation={{ refId, filename, text, location }}
      onClick={onCitationClick}
    />
  );

  return (
    <div className="reference-summary">
      <section className="reference-summary__section">
        <h2 className="reference-summary__heading">Reference summary — Graves et al.</h2>

        <p className="reference-summary__paragraph">
          <span className="reference-summary__paragraph-num">[1]</span> In example embodiments, the vehicle control system 115 of vehicle 105 (referred to hereinafter as ego vehicle 105) is configured by adaptive spacing module 172 to implement an adaptive spacing predictive (ASP) control system, and FIG. 4 illustrates that ASP control system 400 receives inputs from the EM wave based sensors 110 and the vehicle sensors 111 and controls actuators of the drive control system 150 (e.g. brake unit 154 and throttle unit 156) ({cite("ref_2", "US_2019329772_A1.pdf", "B00541:[0065] In example embodiments, the vehicle control system 115 of vehicle 105...", "p.5, top")}; {cite("ref_2", "US_2019329772_A1.pdf", "B00567:[0070] FIG. 4 illustrates a block diagram of an adaptive spacing predictive (ASP) control system 400...", "p.5, mid")}).
        </p>

        <p className="reference-summary__paragraph">
          Scenario 302 illustrates a normal highway driving with the ego vehicle 105 travelling on roadway 304 between a leading front vehicle 306 and a trailing back vehicle 308, and in example embodiments there are two overlapping risk zones identified for the ego vehicle 105 including a safety risk zone (SRZ) 310 and a comfort risk zone (CRZ) 312 ({cite("ref_2", "US_2019329772_A1.pdf", "B00543:Scenario 302 illustrates a normal highway driving...", "p.5, mid")}).
        </p>

        <p className="reference-summary__paragraph">
          The ASP control system 400 includes a predictive perception module 402 and an adaptive spacing (AS) controller module 412, and the predictive perception module 402 includes a state sub-module 410 that receives information from the EM wave based sensors 110 and the vehicle sensors 111 and continuously determines a representation of a current state of the ego vehicle 105 and its environment at a current time t ({cite("ref_2", "US_2019329772_A1.pdf", "B00570:The ASP control system 400 includes a predictive perception module 402...", "p.5, mid-bottom")}).
        </p>

        <p className="reference-summary__paragraph">
          In one example, safety state safe is a function and the output of the safety state function is a value between 0 and 1 that indicates the safety level of the ego vehicle 105 for the specific safety risk zone, where 1 is safe and 0 is unsafe, and in equation (2) dfront is the distance from the ego vehicle 105 to the front vehicle 306 and dfront-safe is a safety threshold, and in equation (3) dback is the distance from the ego vehicle 105 to the back vehicle 308 and dback-safe is a safe distance threshold ({cite("ref_2", "US_2019329772_A1.pdf", "B00602:[0076] In one example, safety state safe is a function...", "p.6, bottom-top")}; {cite("ref_2", "US_2019329772_A1.pdf", "B00608:In equation (2), it is assumed that the ego vehicle 105 is travelling forward...", "p.6, top-mid")}; {cite("ref_2", "US_2019329772_A1.pdf", "B00624:In equation (3), it is assumed that the ego vehicle 105 is travelling forward...", "p.7, top")}).
        </p>

        <p className="reference-summary__paragraph">
          In example embodiments, the state sub-module 410 is also configured to determine a set of all possible actions A that can be taken by the ego vehicle 105 given the current vehicle state s, and the actions at in the set A will each specify one or both of an amount of brake actuation and an amount of throttle actuation ({cite("ref_2", "US_2019329772_A1.pdf", "B00655:[0085] In example embodiments, the state sub-module 410 is also configured...", "p.7, ¶85")}).
        </p>

        <p className="reference-summary__paragraph">
          The set of predictor sub-modules 403 includes safety predictor sub-module 404, state predictor sub-module 406 and, in at least some examples, an optional comfort predictor sub-module 408, and the predictive perception module generates AC predictions 416 that include state (speed) predictions, safety predictions, and comfort predictions that are action conditional "what-ifs" ({cite("ref_2", "US_2019329772_A1.pdf", "B00587:[0072] The set of predictor sub-modules 403 includes safety predictor sub-module 404...", "p.6, top-mid")}; {cite("ref_2", "US_2019329772_A1.pdf", "B00747:[0107] As described above, the predictive perception module generates AC predictions 416...", "p.9, ¶107")}).
        </p>

        <p className="reference-summary__paragraph">
          In one example the AS controller module 412 is implemented using a fuzzy inference system (FIS) and seeks to find an action to satisfy the condition "Front is Safe AND Back is Safe AND Speed is Close to Target," and in one example embodiment the AS controller 412 is configured to maximize "Front is Comfortable AND Back is Comfortable AND Front is Safe AND Back is Safe AND Speed is Close to Target" ({cite("ref_2", "US_2019329772_A1.pdf", "B00779:[0113] In one example the AS controller module 412 is implemented using a fuzzy inference system (FIS)...", "p.9, ¶113-¶114")}; {cite("ref_2", "US_2019329772_A1.pdf", "B00787:[0116] There are many ways to add comfort to the condition...", "p.10, ¶116")}).
        </p>

        <p className="reference-summary__paragraph">
          In an example embodiment, once a next action at is determined, the action is communicated to the appropriate actuator of drive control system 150 for implementation, and FIG. 7 provides summary of an adaptive spacing control method that includes constructing vehicle state st based on sensor data and choosing the next action at ({cite("ref_2", "US_2019329772_A1.pdf", "B00820:[0124] In an example embodiment, once a next action at is determined...", "p.10, ¶124")}; {cite("ref_2", "US_2019329772_A1.pdf", "B00822:[0125] FIG. 7 provides summary of an adaptive spacing control method...", "p.10, ¶125-¶127")}).
        </p>
      </section>
    </div>
  );
};

export type { Citation };
