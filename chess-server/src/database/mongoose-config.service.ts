import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Logger } from 'src/common/providers';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService, private logger: Logger) {
    this.logger.setContext('Mongo DB');
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get('database'),
      connectionFactory: (connection: Connection) => {
        connection.on('connected', () => {
          this.logger.info('is connected');
        });
        connection.on('disconnected', () => {
          this.logger.warn('DB disconnected');
        });
        connection.on('error', (error) => {
          this.logger.error('DB connection failed! for error: ', error);
        });
        return connection;
      },
    };
  }
}
