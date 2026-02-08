import { Button } from '../base';
import {
  DiamondIcon,
  DownloadIcon,
} from '../icons';
import '../../styles/toolbar.css';

interface ToolbarProps {
  applicationNumber?: string;
  applicationTitle?: string;
  version?: string;
}

export const Toolbar = ({
  applicationNumber = 'US 17/174,123',
  applicationTitle = 'Adaptive Cruise Control with Predictive Headway Management',
  version = 'v0.1',
}: ToolbarProps) => {
  return (
    <header className="toolbar">
      {/* Left section - app info (two lines) */}
      <div className="toolbar__left">
        <div className="toolbar__appInfo">
          <div className="toolbar__appLine1">
            <span className="toolbar__appNumber">{applicationNumber}</span>
          </div>
          <div className="toolbar__appLine2">
            <span className="toolbar__appTitle">{applicationTitle}</span>
            <span className="toolbar__version">{version}</span>
          </div>
        </div>
      </div>

      {/* Right section - Clear highlighting and Export */}
      <div className="toolbar__right">
        <button className="toolbar__iconBtn" aria-label="Clear all highlighting">
          <DiamondIcon />
        </button>
        <div className="toolbar__divider" />
        <Button variant="primary" size="small">
          <DownloadIcon />
          Export
        </Button>
      </div>
    </header>
  );
};
