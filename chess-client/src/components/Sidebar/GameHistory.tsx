import { chunk } from 'lodash';
import { useAppSelector } from '../../store/hooks';

export function GameHistory() {
  const {
    game: { chess },
  } = useAppSelector((state) => state);
  const history = chess.history();
  const chunkedHistory = chunk(history, 2);

  const renderMove = (highlighted: boolean, move: string) => {
    const highlightedClass = highlighted ? 'bg-gray-500 text-yellow-300' : undefined;
    return (
      <td>
        <div className={highlightedClass && `${highlightedClass} text-center w-1/2`}>{move}</div>
      </td>
    );
  };

  return (
    <div className="sidebar-history-scroller mt-8">
      <table className="table-auto w-full">
        <tbody>
          {chunkedHistory.map(([move1, move2], i, row) => {
            const moveId = (move2 || move1) + i;
            const isLastItem = i + 1 === row.length;
            const move2IsHighlighted = row[row.length - 1].length === 2;
            return (
              <>
                <tr
                  key={moveId}
                  id={moveId}
                  className="bg-[#2B2926] odd:bg-[#272522] text-[#d1d5db] pl-2 font-bold w-24 p-1"
                >
                  <td className="text-xs">{`${i}.`}</td>
                  {renderMove(isLastItem && !move2IsHighlighted, move1)}
                  {move2 && renderMove(isLastItem && move2IsHighlighted, move2)}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
