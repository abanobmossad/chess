import {
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { GameService } from './game.service';
import { JoinGameDto } from './dto/join-game.dto';
import { PlayMoveDto } from './dto/play-move.dto';
import { GameSocketEvents } from 'src/common/constants/game.enum';

@WebSocketGateway({
  namespace: 'game',
  cors: {
    origin: '*',
  },
})
export class GameEventsGateway implements OnGatewayDisconnect {
  private activePlayers: {
    gameId: string;
    userId: string;
    socketId: string;
    userName: string;
  }[] = [];

  constructor(private gameService: GameService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(GameSocketEvents.PlayMove)
  async handleGamePlayMove(client: Socket, data: PlayMoveDto) {
    const game = await this.gameService.movePiece(data);
    this.server
      .to(this.getGameRoom(data.gameId))
      .emit(GameSocketEvents.NewMove, data);
    return game;
  }

  @SubscribeMessage(GameSocketEvents.JOIN_GAME)
  async handleJoinGame(client: Socket, data: JoinGameDto) {
    const game = await this.gameService.startGame(data);
    const room = this.getGameRoom(data.gameId);
    this.server.socketsJoin(room);
    this.server.to(room).emit(GameSocketEvents.JOINED_GAME, { ...data, game });
    this.activePlayers.push({
      gameId: data.gameId,
      userId: data.userId,
      userName: data.userName,
      socketId: client.id,
    });
    return game;
  }

  async handleDisconnect(client: Socket) {
    const activeGame = this.activePlayers.find(
      (ag) => ag.socketId === client.id,
    );
    console.log(activeGame);
    if (!activeGame) return;

    const room = this.getGameRoom(activeGame.gameId);
    const game = await this.gameService.leaveGame({
      gameId: activeGame.gameId,
      userId: activeGame.userId,
      userName: activeGame.userId,
    });
    this.server.to(room).emit(GameSocketEvents.LEAVED_GAME, {
      ...activeGame,
      isOpponentLeft: !!game.opponentId,
    });
    // remove from players list
    this.activePlayers = this.activePlayers.filter(
      (ag) => ag.socketId !== client.id,
    );
  }

  getGameRoom = (gameId: string) => {
    return `GAME:${gameId}`;
  };
}
