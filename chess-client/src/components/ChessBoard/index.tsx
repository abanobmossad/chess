import { useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { Board } from './Board.tsx';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragLayer } from './DragLayer.tsx';

export function ChessBoard() {
  const boardRef = useRef<HTMLElement>(null);

  return (
    <Box flex="1">
      <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
        <DragLayer boardRef={boardRef} />
        <Board ref={boardRef} />
      </DndProvider>
    </Box>
  );
}
