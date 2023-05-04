import { IsNotEmpty } from 'class-validator';

export class PlayMoveDto {
  @IsNotEmpty()
  gameId: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  from: string;
  @IsNotEmpty()
  to: string;

  isGameOver?: boolean;
  gameOverDetails?: string;

  activePiece: { from: string; to: string; piece: string };
  board: string[][];
}
