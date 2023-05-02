import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ autoCreate: true })
export class Game {
  @Prop({ required: true })
  creatorId: string;

  @Prop()
  opponentId?: string;

  @Prop({ required: true })
  creatorName: string;

  @Prop()
  opponentName?: string;

  @Prop({ type: String, default: 'w' })
  currentTurn?: 'w' | 'b';

  @Prop({ type: String, default: 'w' })
  creatorPlayAs?: 'w' | 'b';

  @Prop()
  creatorClock?: string;

  @Prop()
  opponentClock?: string;

  @Prop({ required: true })
  position: string;

  @Prop({ default: false })
  isGameStarted?: boolean;

  @Prop({ default: false })
  isGameOver?: boolean;

  @Prop()
  gameOverDetails?: string;

  @Prop([[String]])
  history: string[][];
}

export type GameDocument = HydratedDocument<Game>;
export const GameSchema = SchemaFactory.createForClass(Game);
