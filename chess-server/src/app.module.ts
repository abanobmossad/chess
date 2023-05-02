import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configuration } from './config';
import { CommonModule, Logger } from './common/providers';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './database/mongoose-config.service';
import { GameModule } from './modules/game/game.module';

@Module({
  imports: [
    // Load configuration file
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    // Load utils modules
    CommonModule,
    // connect to database
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      inject: [ConfigService, Logger],
    }),
    // Load modules...
    GameModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
