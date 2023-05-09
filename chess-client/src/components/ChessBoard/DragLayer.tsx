import { useDragLayer, XYCoord } from 'react-dnd';

export function DragLayer({ boardRef }: { boardRef: React.RefObject<HTMLElement> }) {
  const getItemStyle = (sourceClientOffset: XYCoord | null) => {
    if (!sourceClientOffset) return { display: 'none' };
    const boardRect = boardRef?.current?.getBoundingClientRect() || {
      width: 801,
      height: 801,
      top: 100,
      left: 50,
      y: 50,
      x: 50,
    };
    let { x, y } = sourceClientOffset;

    // limit movement in the board
    x = x > boardRect.width + boardRect.y ? boardRect.width + boardRect.y : x;
    x = x < boardRect.left ? boardRect.left : x;

    y = y > boardRect.height ? boardRect.height : y;
    y = y < boardRect.top ? boardRect.top : y;

    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
      touchAction: 'none',
      cursor: 'grabbing',
    };
  };

  const collectedProps = useDragLayer((monitor) => ({
    item: monitor.getItem() as { img: string },
    clientOffset: monitor.getClientOffset(),
    sourceClientOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const { isDragging, item, sourceClientOffset } = collectedProps;

  return isDragging ? (
    <div
      style={{
        position: 'fixed',
        pointerEvents: 'none',
        left: 0,
        top: 0,
        cursor: 'grabbing',
      }}
    >
      <div style={getItemStyle(sourceClientOffset)}>
        <img src={item.img} width={100} height={100} />
      </div>
    </div>
  ) : null;
}
