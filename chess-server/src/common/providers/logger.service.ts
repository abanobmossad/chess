import { Injectable, Logger as BaseLogger, Scope } from '@nestjs/common';

/**
 * https://docs.nestjs.com/techniques/logger
 */
@Injectable({ scope: Scope.TRANSIENT })
export class Logger extends BaseLogger {
  private isProduction: boolean = process.env.NODE_ENV === 'production';

  info(message: string, context?: string) {
    super.log(message, context);
  }

  setContext(context: string) {
    this.context = context;
  }
}
