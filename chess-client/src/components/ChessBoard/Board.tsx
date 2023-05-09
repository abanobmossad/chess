import Xarrow from 'react-xarrows';
import { Square as UISquare, forwardRef } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hooks';
import { getSquarePosition, isBlackSquare } from '../../utils/board.utils';
import './Board.css';
import { Square } from './Square';

export const Board = forwardRef(function Board(_, ref) {
  const {
    game: { board, activePiece, playAs },
    settings: { board: boardSettings },
  } = useAppSelector((state) => state);

  return (
    <UISquare size="80vh" ref={ref}>
      {activePiece.from && boardSettings.allowArrows && (
        <Xarrow
          start={activePiece.from}
          end={activePiece.to}
          headSize={2}
          color={boardSettings.arrowColor}
          startAnchor="middle"
          endAnchor="middle"
          strokeWidth={10}
          path={activePiece.piece === 'n' ? 'grid' : 'straight'}
          gridBreak="100%"
          headShape={activePiece.piece === 'n' ? 'circle' : 'arrow1'}
        />
      )}
      <div className="board">
        {board.map((p, i) => {
          const position = getSquarePosition(i, playAs === 'b');
          return <Square key={position} piece={p} isBlack={isBlackSquare(i)} position={position} />;
        })}
      </div>
    </UISquare>
  );
});
