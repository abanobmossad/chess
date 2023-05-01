import Xarrow from 'react-xarrows';
import { useAppSelector } from '../../store/hooks';
import { getSquarePosition, isBlackSquare } from '../../utils/board.utils';
import './Board.css';
import { Square } from './Square';

export function Board() {
  const {
    game: { board, activePiece },
    theme: { board: boardTheme },
    settings: { game: gameSettings },
  } = useAppSelector((state) => state);

  return (
		<div className="board-container">
			{activePiece.from && gameSettings.allowArrows && (
				<Xarrow
					start={activePiece.from}
					end={activePiece.to}
					headSize={1.5}
					color={boardTheme.arrow}
					startAnchor="middle"
					endAnchor="middle"
					strokeWidth={10}
					path={activePiece.piece === 'n' ? 'grid' : 'straight'}
					gridBreak="100%"
					headShape="circle"
				/>
			)}
			<div className="board">
				{board.flat().map((p, i) => {
				  const position = getSquarePosition(i);
				  return (
						<Square
							key={position}
							piece={p}
							isBlack={isBlackSquare(i)}
							position={position}
						/>
				  );
				})}
			</div>
		</div>
  );
}
