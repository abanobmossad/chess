import { HTML5Backend } from 'react-dnd-html5-backend';
import './App.css';
import { ChessBoard } from './components/ChessBoard';
import { DndProvider } from 'react-dnd';

function App() {
  return (
		<div className="container">
			<DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
				<ChessBoard />
			</DndProvider>
		</div>
  );
}

export default App;
