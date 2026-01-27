import { Controller, Get, Render } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  @Get()
  @Render('dashboard') // 渲染的视图文件为 dashboard.hbs
  getDashboard() {
    return { title: 'Admin Dashboard' };
  }
}
