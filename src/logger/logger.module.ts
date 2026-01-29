import { Global, Module } from '@nestjs/common';
import { MyLogger } from 'src/my-logger';

@Global()
@Module({
  providers: [
    {
      provide: 'LOGGER_CONFIG',
      useValue: {
        enable: true,
      },
    },
    MyLogger,
  ],
  exports: [],
})
export class LoggerModule {}
