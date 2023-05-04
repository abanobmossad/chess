import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GameSocketEvents } from '../../common/events.enum';
import { gameMoveAction, joinedToGameAction, loadGameAction } from '../../store/actions/game.actions';
import { ChessBoard } from '../../components/ChessBoard';
import { Sidebar } from '../../components/Sidebar';
import { Prompt } from '../../common/Prompt';
import { GameSocket } from '../../server';
import './GamePlay.css';
import { JoinGameModal } from './JoinGameModal';

export function GamePlay() {
  // get game id form url path
  const { gameId, isLoaded } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const { gameId: pathParamId } = useParams();
  const activeGameId = gameId || pathParamId;

  // load game state
  useEffect(() => {
    if (!gameId && !!pathParamId) {
      dispatch(loadGameAction(pathParamId));
    }
  }, [gameId, pathParamId, dispatch]);

  useEffect(() => {
    // listen to new moves
    GameSocket.on(GameSocketEvents.NewMove, (data) => {
      dispatch(gameMoveAction(data.from, data.to));
    });
    // check if any user joined
    GameSocket.on(GameSocketEvents.JOINED_GAME, (data) => {
      dispatch(joinedToGameAction(data.userId, data.userNAme, data.game));
    });
  }, [activeGameId, dispatch]);

  return (
    <div className="game-container">
      {/* No leaving the page */}
      <Prompt when={true} beforeUnload message="You are leaving the game, are you sure you want to leave?" />
      <JoinGameModal />
      {!isLoaded ? (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="orange.300" size="xl" />
      ) : (
        <>
          <ChessBoard />
          <Sidebar />
        </>
      )}
    </div>
  );
}
