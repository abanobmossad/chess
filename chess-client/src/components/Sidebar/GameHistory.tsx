import { chunk } from 'lodash';
import { useAppSelector } from '../../store/hooks';
import { Table, TableContainer, Tag, Tbody, Td, Tr } from '@chakra-ui/react';

export function GameHistory() {
  const {
    game: { chess },
  } = useAppSelector((state) => state);
  const history = chess.history();
  const chunkedHistory = chunk(history, 2);

  const renderMove = (highlighted: boolean, move = ' ') => {
    return (
      <Td>
        {highlighted ? (
          <Tag fontWeight="bold" colorScheme="orange" borderRadius="none">
            {move}
          </Tag>
        ) : (
          move
        )}
      </Td>
    );
  };

  return (
    <TableContainer flex="1" maxHeight="400px" overflowY="scroll">
      <Table variant="striped" size="sm">
        <Tbody>
          {chunkedHistory.map(([move1, move2], i, row) => {
            const moveId = (move2 || move1) + i;
            const isLastItem = i + 1 === row.length;
            const move2IsHighlighted = row[row.length - 1].length === 2;
            return (
              <Tr key={moveId} bg={i % 2 === 1 ? 'gray.500' : 'gray.700'}>
                <Td fontSize="xs">{`${i}.`}</Td>
                {renderMove(isLastItem && !move2IsHighlighted, move1)}
                {renderMove(isLastItem && move2IsHighlighted, move2)}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
