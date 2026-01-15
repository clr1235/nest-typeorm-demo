import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './services/configuration.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class SharedModule {}
