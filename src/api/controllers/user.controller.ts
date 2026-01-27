import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from 'src/shared/dtos/user.dto';
import { User } from 'src/shared/entities/user.entity';
import { UserService } from 'src/shared/services/user.service';
import { Result } from 'src/shared/vo/result';

@ApiTags('api/user')
@UseInterceptors(ClassSerializerInterceptor) // 使用类序列化拦截器, 配合class-transformer 实现序列化时的自定义转换
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 200, description: '返回所有用户', type: [User] })
  async findAll() {
    return await this.userService.findAll();
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiBearerAuth()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: '创建用户成功', type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '根据ID获取用户' })
  @ApiParam({ name: 'id', description: '用户ID', example: 1, type: Number })
  @ApiResponse({ status: 200, description: '返回用户', type: User })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.findOne({ where: { id } });
    if (result) {
      return result;
    } else {
      return new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: '根据ID更新用户' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: '更新用户成功', type: User })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.userService.update(id, updateUserDto);
    if (result.affected) {
      return {
        code: 200,
        message: '更新成功',
      };
    } else {
      return {
        code: 400,
        message: '更新失败',
      };
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: '根据ID删除用户' })
  @ApiParam({ name: 'id', description: '用户ID', example: 1, type: Number })
  @ApiResponse({ status: 200, description: '删除用户成功' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.delete(id);
    if (result.affected) {
      return new Result({
        code: 200,
        message: '删除成功',
        data: null,
      });
    } else {
      return new Result({
        code: 400,
        message: '删除失败',
        data: null,
      });
    }
  }
}
