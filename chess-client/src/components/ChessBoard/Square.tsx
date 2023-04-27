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

  const checkPosition =
		chess.isCheck() &&
		getPiecePosition(chess.board(), { type: 'k', color: chess.turn() });
  const isCheckPosition = checkPosition && checkPosition === position;

  const dispatch = useAppDispatch();
  const [, dropRef] = useDrop(() => ({
    accept: 'piece',
    drop: (item: { id: string; position: string }) => {
      dispatch(gameMoveAction(item.position, position));
    },
  }));

  // moved highlights
  let backgroundColor = isBlack ? boardTheme.black : boardTheme.white;
  if (activePiece.from === position || activePiece.to === position) {
    backgroundColor = `color-mix(in srgb, ${boardTheme.moveHighlight} 40%, ${backgroundColor})`;
  }

  return (
		<div
			id={position}
			className="board-square"
			style={{ backgroundColor }}
			ref={dropRef}>
			{piece && (
				<Piece
					piece={piece}
					position={position}
					isCheckPosition={isCheckPosition}
				/>
			)}
		</div>
  );
}