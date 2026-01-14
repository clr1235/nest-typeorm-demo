import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // 配置模版根目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 配置模版引擎
  app.setViewEngine('hbs');

  app.use(cookieParser());
  app.use(
    session({
      secret: 'my-secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
