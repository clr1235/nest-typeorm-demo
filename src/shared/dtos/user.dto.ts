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

function PasswordValidators() {
  return applyDecorators(IsString(), MaxLength(20), MinLength(6));
}

export class CreateUserDto {
  @IsString()
  @Validate(StartWithConstraint)
  // @StartWith('user_', { message: '用户名必须以 user_ 开头' })
  username: string;

  @IsString()
  mobile: string;

  @IsString()
  @IsEmail()
  email: string;

  @PasswordValidators()
  password: string;

  @IsNumber()
  @Type(() => Number)
  status: number;

  @IsBoolean()
  @Type(() => Boolean)
  is_super: boolean;

  @IsNumber()
  @IsOptional()
  sort: number;
}

export class UpdateUserDto extends CreateUserDto {
  @IsNumber()
  id: number;
}
