import { VideoWindow } from '../VideoWindow';
import { GameControls } from './GameControls';
import { GameHistory } from './GameHistory';
import './Sidebar.css';

export function Sidebar() {
  return (
    <div className="sidebar-container">
      <VideoWindow />
      <GameHistory />
      <GameControls />
    </div>
  );
}
