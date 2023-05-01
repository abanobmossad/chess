import { ChessBoard } from '../../components/ChessBoard';
import { Sidebar } from '../../components/Sidebar';
import './GamePlay.css';
import { Prompt } from '../../common/Prompt';

export function GamePlay() {
  return (
    <div className="game-container">
      {/* No leaving the page */}
      <Prompt
        when={true}
        beforeUnload
        message="You are leaving the game, are you sure you want to leave?"
      />

      <ChessBoard />
      <Sidebar />
    </div>
  );
}
