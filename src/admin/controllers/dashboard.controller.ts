import { Controller, Get, Render } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  @Get()
  @Render('index') // 渲染的视图文件为 index.hbs
  getDashboard() {
    return { title: 'Admin Dashboard' };
  }
}
