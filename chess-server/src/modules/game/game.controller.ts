import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';

@Controller('/game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  startGame(@Body() createGameDto: CreateGameDto) {
    return this.gameService.createGame(createGameDto);
  }

  @Get('/:id')
  getGame(@Param('id') id: string) {
    return this.gameService.findGameById(id);
  }
}
