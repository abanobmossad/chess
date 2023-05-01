import { ChessBoard } from '../../components/ChessBoard';
import { Sidebar } from '../../components/Sidebar';
import './Game.css';

export function Game() {
  return (
    <div className="game-container">
      <ChessBoard />
      <Sidebar />
    </div>
  );
}
