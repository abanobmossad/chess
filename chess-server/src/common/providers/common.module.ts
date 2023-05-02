import { Global, Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { Logger } from './logger.service';

const providers = [Logger, HelperService];

@Global()
@Module({
  providers,
  exports: providers,
})
export class CommonModule {}
