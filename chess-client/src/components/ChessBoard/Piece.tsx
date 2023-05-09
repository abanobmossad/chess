import { useEffect } from 'react';
import { Piece as ChessPiece } from 'chess.js';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useAppSelector } from '../../store/hooks';

interface Props {
  piece: ChessPiece;
  position: string;
  isCheckPosition: boolean | null;
}

export function Piece(props: Props) {
  const {
    game: { currentTurn, isViewer, playAs },
    settings: { board },
  } = useAppSelector((state) => state);

  const { piece, position, isCheckPosition } = props;
  const id = `${piece.color}${piece.type}`;
  const img = ['/pieces-pack', board.piecesSchema, `${id}.png`].join('/');

  const isCanDrag = (() => {
    if (isViewer) return false;
    if (currentTurn === playAs && piece.color === currentTurn) return true;
    return false;
  })();

  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: 'piece',
      item: () => ({ id, position, img }),
      collect: (monitor) => {
        return { isDragging: !!monitor.isDragging() };
      },
      canDrag: () => isCanDrag,
    }),
    [id, position, isCanDrag],
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const getCursorStyle = () => {
    if (isCanDrag) return 'board-piece';
    if (isDragging) return 'board-piece board-piece-dragging';
    return undefined;
  };

  return (
    <div
      ref={dragRef}
      className={getCursorStyle()}
      style={{
        backgroundImage: isDragging ? undefined : `url(${img})`,
        width: '100%',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100%',
        backgroundColor: 'transparent',
        touchAction: 'none',
        filter: isCheckPosition ? 'drop-shadow(0px 0px 10px rgba(214, 48, 49,1.0))' : undefined,
      }}
    />
  );
}
