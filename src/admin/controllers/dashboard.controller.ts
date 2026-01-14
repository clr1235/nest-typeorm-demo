import { Controller, Get, Render } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  @Get()
  @Render('dashboard') // 渲染的视图文件为 dashboard.hbs
  getDashboard() {
    return { title: 'Admin Dashboard' };
  }
}
