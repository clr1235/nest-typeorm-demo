import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './services/configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigurationService) => ({
        type: 'mysql',
        ...configService.mysqlConfig,
        synchronize: true, // 保持代码和数据库的同步
        autoLoadEntities: true, // 自动加载实体类
        logging: true, // 输出内部生成的sql语句
      }),
      inject: [ConfigurationService],
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class SharedModule {}
