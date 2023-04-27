import { chunk } from 'lodash';
import { useAppSelector } from '../../store/hooks';

export function GameHistory() {
  const {
    game: { chess },
  } = useAppSelector((state) => state);
  const history = chess.history();
  const chunkedHistory = chunk(history, 2);

  return (
    <div className="sidebar-history-scroller">
      <table className="table-auto overflow-scroll w-full">
        <tbody>
          {chunkedHistory.map(([move1, move2], i, row) => {
            const moveId = (move2 || move1) + i;
            const isLastItem = i + 1 === row.length;
            const move2IsHighlighted = row[row.length - 1].length === 2;
            return (
              <>
                <tr id={moveId} className="bg-[#2B2926] odd:bg-[#272522] text-[#d1d5db] font-bold w-24 p-1">
                  <td className="text-xs"> {`${i}.`}</td>
                  <td className={isLastItem && !move2IsHighlighted ? 'bg-gray-500 text-yellow-300' : undefined}>
                    {move1}
                  </td>
                  {move2 && (
                    <td className={isLastItem && move2IsHighlighted ? 'bg-gray-500 text-yellow-300' : undefined}>
                      {move2}
                    </td>
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
