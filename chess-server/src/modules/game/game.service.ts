import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './game.model';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { JoinGameDto } from './dto/join-game.dto';
import { PlayMoveDto } from './dto/play-move.dto';

@Injectable()
export class GameService {
  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {}

  async createGame(dto: CreateGameDto): Promise<Game> {
    const game: Game = {
      creatorName: dto.creatorName,
      creatorPlayAs: dto.creatorPlayAs === 'r' ? 'w' : dto.creatorPlayAs,
      creatorId: dto.creatorId,
      // starting position FEN
      position: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      history: [],
      board: [],
      capturedBlackPieces: [],
      capturedWhitePieces: [],
      activePiece: { from: '', to: '' },
    };
    const createdCat = new this.gameModel(game);
    return createdCat.save();
  }

  async findGameById(gameId: string) {
    return this.gameModel.findById(gameId).lean();
  }

  async startGame(dto: JoinGameDto): Promise<Game> {
    const game = await this.findGameById(dto.gameId);
    if (game.creatorId === dto.userId || !dto.userName) return game;

    return this.gameModel.findByIdAndUpdate(
      { _id: dto.gameId },
      {
        isGameStarted: true,
        opponentId: dto.userId,
        opponentName: dto.userName,
      },
      { new: true },
    );
  }

  async leaveGame(dto: JoinGameDto): Promise<Game> {
    const game = await this.findGameById(dto.gameId);
    if (game.opponentId === dto.userId) {
      game.opponentId = null;
      game.opponentName = null;
    }

    return this.gameModel.findByIdAndUpdate({ _id: dto.gameId }, game, {
      new: true,
    });
  }

  async movePiece(dto: PlayMoveDto): Promise<Game> {
    return this.gameModel.findByIdAndUpdate(
      dto.gameId,
      {
        isGameOver: dto.isGameOver,
        gameOverDetails: dto.gameOverDetails,
        position: dto.position,
        activePiece: dto.activePiece,
        board: dto.board,
        currentTurn: dto.currentTurn,
      },
      { new: true },
    );
  }
}
