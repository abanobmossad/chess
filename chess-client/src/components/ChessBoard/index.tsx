import { DndProvider } from 'react-dnd';
import { Board } from './Board.tsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragLayer } from './DragLayer.tsx';

export function ChessBoard() {
  return (
		<>
			<DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
				<DragLayer />
				<Board />
			</DndProvider>
		</>
  );
}
