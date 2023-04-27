import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { ChessBoard } from '../../components/ChessBoard';
import { Sidebar } from '../../components/Sidebar';
import './Game.css';

export function Game() {
  return (
		<div className="game-container">
			<DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
				<ChessBoard />
			</DndProvider>
			<Sidebar />
		</div>
  );
}
