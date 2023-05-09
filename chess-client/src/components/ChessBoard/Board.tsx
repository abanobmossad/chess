import Xarrow from 'react-xarrows';
import { Grid, GridItem, Square as UISquare, forwardRef } from '@chakra-ui/react';
import { useAppSelector } from '../../store/hooks';
import { getSquarePosition, isBlackSquare } from '../../utils/board.utils';
import './Board.css';
import { Square } from './Square';

export const Board = forwardRef(function Board(_, ref) {
  const {
    game: { board, activePiece, playAs },
    settings: { board: boardSettings },
  } = useAppSelector((state) => state);

  const letters = playAs === 'b' ? 'abcdefgh'.split('').reverse() : 'abcdefgh'.split('');

  return (
    <>
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

      <UISquare size="80vh" ref={ref}>
        <Grid
          templateAreas={`
                  "coordx chess-board"
                  "coordx coordy"`}
          gridTemplateRows={'100% 1fr'}
          gridTemplateColumns={'20px 1fr'}
          h="100%"
          w="100%"
          gap="1"
          fontWeight="bold"
        >
          <GridItem area={'coordx'} display="flex" flexDirection="column">
            {letters.map((l, i) => {
              return (
                <span key={l} className="board-coordinates" style={{ height: '12%' }}>
                  {playAs === 'b' ? i + 1 : Math.abs(7 - i + 1)}
                </span>
              );
            })}
          </GridItem>

          <GridItem area={'chess-board'}>
            <div className="board">
              {board.map((p, i) => {
                const position = getSquarePosition(i, playAs === 'b');
                return <Square key={position} piece={p} isBlack={isBlackSquare(i)} position={position} />;
              })}
            </div>
          </GridItem>

          <GridItem area={'coordy'} display="flex" justifyContent="space-around">
            {letters.map((l) => {
              return (
                <span key={l} className="board-coordinates" style={{ width: '12%' }}>
                  {l}
                </span>
              );
            })}
          </GridItem>
        </Grid>
      </UISquare>
    </>
  );
});
