import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

// 同步的自定义验证器
@Injectable()
@ValidatorConstraint({ name: 'startWith', async: false })
export class StartWithConstraint implements ValidatorConstraintInterface {
  validate(text: string, validationArguments?: ValidationArguments) {
    const { constraints } = validationArguments || {};
    return text.startsWith(constraints?.[0] || '');
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    const { property, constraints } = validationArguments || {};
    return `${property} 必须以 ${constraints?.[0] || ''} 开头`;
  }
}
export function StartWith(
  prefix: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor, // 目标类
      propertyName, // 目标属性名 比如 username
      options: validationOptions, // 验证选项
      constraints: [prefix], // 传递给验证器的参数
      validator: StartWithConstraint, // 指定使用的验证器
    });
  };
}
