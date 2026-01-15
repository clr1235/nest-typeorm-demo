import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {}
  get databaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST') as string;
  }
  get databasePort(): number {
    return this.configService.get<number>('DATABASE_PORT') as number;
  }
  get databaseUser(): string {
    return this.configService.get<string>('DATABASE_USER') as string;
  }
  get databasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD') as string;
  }
  get databaseName(): string {
    return this.configService.get<string>('DATABASE_NAME') as string;
  }
  get mysqlConfig() {
    return {
      host: this.databaseHost,
      port: this.databasePort,
      username: this.databaseUser,
      password: this.databasePassword,
      database: this.databaseName,
    };
  }
}
