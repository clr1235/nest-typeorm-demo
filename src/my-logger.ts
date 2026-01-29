import { Inject, Injectable, LoggerService, LogLevel } from '@nestjs/common';

@Injectable()
export class MyLogger implements LoggerService {
  @Inject('LOGGER_CONFIG')
  private readonly loggerConfig: any;

  log(msg: string, ...optionalParams: any[]) {
    console.log(this.loggerConfig.enable, 'loggerConfig.enable');
    if (this.loggerConfig.enable) {
      console.log(`[LOG] ${msg}`, ...optionalParams);
    }
  }
  error(message: any, ...optionalParams: any[]) {
    console.log(`[ERROR] ${message}`, ...optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    console.log(`[WARN] ${message}`, ...optionalParams);
  }
  debug?(message: any, ...optionalParams: any[]) {
    console.log(`[DEBUG] ${message}`, ...optionalParams);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    console.log(`[VERBOSE] ${message}`, ...optionalParams);
  }
  fatal?(message: any, ...optionalParams: any[]) {
    console.log(`[FATAL] ${message}`, ...optionalParams);
  }
  setLogLevels?(levels: LogLevel[]) {}
}
