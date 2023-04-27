import { useCallback } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';

export function DragLayer() {
  const snapToCursor = true;
  const boardWidth = 801;

  const getItemStyle = useCallback(
    (
      clientOffset: XYCoord | null,
      sourceClientOffset: XYCoord | null,
    ) => {
      if (!clientOffset || !sourceClientOffset)
        return { display: 'none' };

      let { x, y } = snapToCursor ? clientOffset : sourceClientOffset;
      if (snapToCursor) {
        const halfSquareWidth = boardWidth / 8 / 2;
        x -= halfSquareWidth;
        y -= halfSquareWidth;
      }
      const transform = `translate(${x}px, ${y}px)`;

      return {
        transform,
        WebkitTransform: transform,
        touchAction: 'none',
        cursor: 'grabbing',
      };
    },
    [boardWidth, snapToCursor],
  );

  const collectedProps = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    clientOffset: monitor.getClientOffset(),
    sourceClientOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const {
    isDragging,
    item,
    clientOffset,
    sourceClientOffset,
  }: {
    item: { img: string };
    clientOffset: XYCoord | null;
    sourceClientOffset: XYCoord | null;
    isDragging: boolean;
  } = collectedProps;


  return isDragging ? (
		<div
			style={{
			  position: 'fixed',
			  pointerEvents: 'none',
			  zIndex: 10,
			  left: 0,
			  top: 0,
			}}>
			<div style={getItemStyle(clientOffset, sourceClientOffset)}>
				<img src={item.img} width={100} height={100} />
			</div>
		</div>
  ) : null;
}
