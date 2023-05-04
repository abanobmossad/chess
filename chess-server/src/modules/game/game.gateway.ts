import {
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
export class GameEventsGateway {
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
    return game;
  }

  @SubscribeMessage(GameSocketEvents.LEAVED_GAME)
  async handleLeaveGame(client: Socket, data: JoinGameDto) {
    console.log('⚠️ ➜ GameEventsGateway ➜ handleLeaveGame ➜ data:', data);
    const room = this.getGameRoom(data.gameId);
    this.server.socketsLeave(room);
    this.server.to(room).emit(GameSocketEvents.LEAVED_GAME, data);
  }

  getGameRoom = (gameId: string) => {
    return `GAME:${gameId}`;
  };
}
