import { ConsoleLogger } from '@nestjs/common';

export class ExtendedConsoleLogger extends ConsoleLogger {
  log(msg: string, stack?: string, context?: string) {
    console.log(`ExtendedConsoleLogger.log`);
    super.log(msg, stack, context);
  }
}
