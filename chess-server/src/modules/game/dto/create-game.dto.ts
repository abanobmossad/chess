import { IsNotEmpty } from 'class-validator';

export class CreateGameDto {
  creatorId: string;

  @IsNotEmpty()
  creatorName: string;

  @IsNotEmpty()
  creatorPlayAs: 'w' | 'b' | 'r';

  @IsNotEmpty()
  time: string;
}
