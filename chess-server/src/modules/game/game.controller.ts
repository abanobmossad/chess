import {
  Body,
  Controller,
  Ip,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('/game')
export class GameController {
  constructor(private readonly appService: GameService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  startGame(@Body() createGameDto: CreateGameDto, @Ip() ip: string) {
    const dto: CreateGameDto = { ...createGameDto, creatorId: ip };

    return this.appService.createGame(dto);
  }
}
