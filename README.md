## 初始化项目
- 安装依赖
  ```bash
  npm i -g @nestjs/cli
  nest new project-name (也可将 project-name 换成 . 表示在当前已有的目录下创建项目)

  ```
- [nest-cli 用法](https://docs.nestjs.cn/cli/usages)
  ```bash
  nest generate|g <schematic> [name] [options] # 生成模块、控制器、服务等
  nest build [options]                        # 构建项目
  nest start [options]                        # 启动项目
  nest info                                   # 查看环境信息
  ```
- 创建模块
  ```bash
  nest generate module admin
  nest g module api
  nest g module shared

  nest g controller admin/controllers/dashboard --no-spec --flat
  ```
- 支持会话
  ```bash
  npm install cookie-parser express-session @nestjs/platform-express
  ```
- 使用MVC
  ```bash
  npm install --save hbs
  ```
  - 创建视图
  1、根目录下创建views目录，在views目录下创建dashboard.hbs文件，文件内容如下：
  ```hbs
  <h1>{{title}}</h1>
  ```
  2、在dashboard.controller.ts文件中添加如下代码：
  ```ts
  import { Controller, Get, Render } from '@nestjs/common';

  @Controller('dashboard')
  export class DashboardController {
    @Get()
    @Render('dashboard')
    getDashboard() {
      return { title: 'Admin Dashboard' };
    }
  }
  ```
  3、main.ts文件中添加如下代码：
  ```ts
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  import cookieParser from 'cookie-parser';
  import session from 'express-session';
  import { NestExpressApplication } from '@nestjs/platform-express';

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
  ```
- 连接数据库
  ```bash
  npm install --save @nestjs/config @nestjs/typeorm typeorm mysql2
  ```
  - 创建.env文件，添加数据库连接配置
  - 创建src/shared/services/configuration.service.ts文件