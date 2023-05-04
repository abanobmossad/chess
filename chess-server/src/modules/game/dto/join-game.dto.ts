import { IsNotEmpty } from 'class-validator';

export class JoinGameDto {
  @IsNotEmpty()
  gameId: string;
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  userName: string;
}
