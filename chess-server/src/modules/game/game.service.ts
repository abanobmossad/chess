import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './game.model';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';

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
    };
    const createdCat = new this.gameModel(game);
    return createdCat.save();
  }
}
