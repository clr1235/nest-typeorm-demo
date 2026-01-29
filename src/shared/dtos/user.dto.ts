import { applyDecorators } from '@nestjs/common';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEmail,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StartWithConstraint } from '../validators/user-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

function PasswordValidators() {
  return applyDecorators(IsString(), MaxLength(20), MinLength(6));
}

export class CreateUserDto {
  @IsString()
  @Validate(StartWithConstraint)
  // @StartWith('user_', { message: '用户名必须以 user_ 开头' })
  @ApiProperty({ description: '用户名', example: 'user_123' })
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '手机号', example: '13800000000' })
  @ApiPropertyOptional() // api属性可选
  mobile: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty({ description: '邮箱', example: 'user@example.com' })
  @ApiPropertyOptional() // api属性可选
  email: string;

  @PasswordValidators()
  @ApiProperty({ description: '密码', example: '123456' })
  password: string;

  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ description: '用户状态', example: 1 })
  status: number;

  @IsBoolean()
  @Type(() => Boolean)
  // @IsOptional()
  @ApiProperty({ description: '是否为超级用户', example: false })
  is_super: boolean;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: '排序', example: 0 })
  sort: number;
}

// PartialType将继承自CreateUserDto的所有属性都可选
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @ApiProperty({ description: '用户ID', example: 1 })
  @IsOptional()
  @ApiPropertyOptional() // api属性可选
  id: number;
}
