import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseFilters,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/shared/dtos/user.dto';
import { UserService } from 'src/shared/services/user.service';
import { AdminExceptionFilter } from '../filters/admin-exception-filter';

@UseFilters(AdminExceptionFilter) // 对admin/users控制器的所有路由，使用自定义的异常过滤器AdminExceptionFilter
@ApiTags('admin/users')
@Controller('admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Render('user/user-list') // 渲染模板
  async findAll() {
    const users = await this.userService.findAll();
    return { users };
  }

  @Get('create')
  @Render('user/user-form') // 渲染模板
  async createForm() {
    return { user: {} };
  }

  @Post()
  @Redirect('/admin/users')
  async creste(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return { success: true };
  }
}
