import { useState, useEffect } from 'react';
import { Piece as ChessPiece } from 'chess.js';
import { useDrop } from 'react-dnd';
import { Piece } from './Piece';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { gameMoveAction } from '../../store/actions/game.actions';
import { getPiecePosition } from '../../utils/board.utils';

interface Props {
  piece: ChessPiece | null;
  isBlack: boolean;
  position: string;
}

export function Square(props: Props) {
  const { piece, isBlack, position } = props;

  const {
    game: { chess, activePiece },
    theme: { board: boardTheme },
  } = useAppSelector((state) => state);

  const defaultBackgroundColor = isBlack ? boardTheme.black : boardTheme.white;
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);
  const [isRightClickActive, setRightClicked] = useState(false);
  // moved highlights
  useEffect(() => {
    if (activePiece.from === position || activePiece.to === position) {
      setBackgroundColor((b) => `color-mix(in srgb, ${boardTheme.moveHighlight} 40%, ${b})`);
    } else setBackgroundColor(defaultBackgroundColor);
  }, [activePiece, boardTheme.moveHighlight, position, defaultBackgroundColor]);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (piece) {
      if (isRightClickActive) setBackgroundColor(defaultBackgroundColor);
      else setBackgroundColor((b) => `color-mix(in srgb, red 70%, ${b})`);
      setRightClicked((cur) => !cur);
    }
  };

  const dispatch = useAppDispatch();
  const [, dropRef] = useDrop(() => ({
    accept: 'piece',
    drop: (item: { id: string; position: string }) => {
      dispatch(gameMoveAction(item.position, position));
    },
  }));

  const checkPosition = chess.isCheck() && getPiecePosition(chess.board(), { type: 'k', color: chess.turn() });
  const isCheckPosition = checkPosition && checkPosition === position;

  return (
    <div
      id={position}
      className="board-square"
      style={{ backgroundColor }}
      ref={dropRef}
      onContextMenu={handleRightClick}
    >
      {piece && <Piece piece={piece} position={position} isCheckPosition={isCheckPosition} />}
    </div>
  );
}
