import { Button } from '../base';
import {
  HistoryIcon,
  DiamondIcon,
  PenIcon,
  StrikethroughIcon,
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
      {/* Left section - app info */}
      <div className="toolbar__left">
        <div className="toolbar__appInfo">
          <span className="toolbar__appNumber">{applicationNumber}</span>
          <span className="toolbar__appTitle">{applicationTitle}</span>
          <span className="toolbar__version">{version}</span>
        </div>
      </div>

      {/* Center section - Tool controls */}
      <div className="toolbar__center">
        <button className="toolbar__iconBtn" aria-label="History">
          <HistoryIcon />
        </button>
        <div className="toolbar__divider" />
        <button className="toolbar__iconBtn" aria-label="Diamond">
          <DiamondIcon />
        </button>
        <button className="toolbar__iconBtn" aria-label="Edit">
          <PenIcon />
        </button>
        <button className="toolbar__iconBtn" aria-label="Strikethrough">
          <StrikethroughIcon />
        </button>
      </div>

      {/* Right section - Export */}
      <div className="toolbar__right">
        <Button variant="primary" size="small">
          <DownloadIcon />
          Export
        </Button>
      </div>
    </header>
  );
};
