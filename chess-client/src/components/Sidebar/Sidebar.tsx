import { GameHistory } from './GameHistory';
import './Sidebar.css';

export function Sidebar() {
  return (
		<div className="sidebar-container">
			<GameHistory />
		</div>
  );
}
