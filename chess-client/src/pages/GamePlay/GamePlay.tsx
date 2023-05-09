import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Flex, Spinner, Tag, TagLabel, useToast } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { GameSocketEvents } from '../../common/events.enum';
import { gameMoveAction, joinedToGameAction, leaveGameAction, loadGameAction } from '../../store/actions/game.actions';
import { ChessBoard } from '../../components/ChessBoard';
import { Sidebar } from '../../components/Sidebar';
import { Prompt } from '../../common/Prompt';
import { GameSocket } from '../../server';
import { JoinGameModal } from './JoinGameModal';
import { FaUser } from 'react-icons/fa';

function renderUserName(name: string) {
  return (
    <Tag size="lg" colorScheme="orange" borderRadius="full" my="2">
      <Avatar size="xs" name={name} icon={<FaUser />} ml={-2} mr={2} />
      <TagLabel>{name || 'Waiting to connect'}</TagLabel>
    </Tag>
  );
}

export function GamePlay() {
  // get game id form url path
  const { gameId, isLoaded, displayedNameTop, displayedNameBottom, userId } = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  const toast = useToast();
  const { gameId: pathParamId } = useParams();

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
      dispatch(joinedToGameAction(data.userId, data.userName, data.game));
      if (!toast.isActive('user-joining-status') && data.userId !== userId) {
        toast({
          id: 'user-joining-status',
          title: 'User Joined',
          description: `"${data.userName}" is joined the game`,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
    });
    // check if any user leave game
    GameSocket.on(GameSocketEvents.LEAVED_GAME, (data) => {
      dispatch(leaveGameAction(data.userId, data.userName, data.isOpponentLeft));
      if (!toast.isActive('user-leaving-status') && data.userId !== userId) {
        toast({
          id: 'user-leaving-status',
          title: 'User Leaved',
          description: `"${data.userName}" leaved the game`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  });

  if (!isLoaded) return <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="orange.300" size="xl" />;

  return (
    <>
      {/* No leaving the page */}
      <Prompt when={true} beforeUnload message="You are leaving the game, are you sure you want to leave?" />
      <JoinGameModal />

      <div>
        {renderUserName(displayedNameTop)}
        <Flex gap="5">
          <ChessBoard />
          <Sidebar />
        </Flex>
        {renderUserName(displayedNameBottom)}
      </div>
    </>
  );
}
