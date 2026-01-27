import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import hbs from 'hbs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // 配置模版根目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // 配置模版引擎
  app.setViewEngine('hbs');
  // 注册 HBS 部分视图（确保这部分正确）
  hbs.registerPartials(join(__dirname, '../views/partials'));

  // 设置布局（layouts）目录，HBS默认会在`views/layouts`目录下查找布局文件
  // 设置默认布局为`main.hbs`，注意：这里需要指定相对于视图目录的路径
  app.set('view options', { layout: 'layouts/main' });

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
  // 全局使用验证管道
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // 配置 Swagger 文档
  const documentConf = new DocumentBuilder()
    .setTitle('CMS API')
    .setDescription('CMS API description')
    .setVersion('1.0')
    .addTag('cms')
    .addCookieAuth('connect.sid') // 添加cookie认证到Swagger文档,cookie的名称为connect.sid
    .addBearerAuth({
      // 添加Bearer认证到Swagger文档，在请求头中添加Authorization字段，值为 Bearer <token>
      type: 'http',
      scheme: 'bearer',
      // bearerFormat: 'JWT',
    })
    .build();
  // 创建 Swagger 文档
  const document = SwaggerModule.createDocument(app, documentConf);
  // 设置swagger模块的路径和文档对象，将swagger的ui绑定到指定路径
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
