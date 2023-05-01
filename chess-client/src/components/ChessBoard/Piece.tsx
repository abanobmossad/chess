import { useEffect } from 'react';
import { Piece as ChessPiece } from 'chess.js';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

interface Props {
  piece: ChessPiece;
  position: string;
  isCheckPosition: boolean | null;
}

export function Piece(props: Props) {
  const { piece, position, isCheckPosition } = props;
  const id = `${piece.color}${piece.type}`;
  const img = ['/pieces-pack', 'standard', `${id}.png`].join('/');

  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: 'piece',
      item: () => ({ id, position, img }),
      collect: (monitor) => {
        return { isDragging: !!monitor.isDragging() };
      },
    }),
    [id, position],
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div
      ref={dragRef}
      className={'board-piece ' + (isDragging ? 'board-piece-dragging ' : undefined)}
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
