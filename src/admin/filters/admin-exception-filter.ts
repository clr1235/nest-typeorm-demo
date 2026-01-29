import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AdminExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = exception.status;
    let message = exception.message;
    // 处理BadRequestException异常
    if (exception instanceof BadRequestException) {
      const exceptionBody: any = exception.getResponse();
      if (typeof exceptionBody === 'object' && exceptionBody.message) {
        message = exceptionBody.message.join(', ');
        status = exceptionBody.statusCode;
      }
    }

    // render选项：渲染views/error.hbs模板，将错误信息和状态码传递给模板
    response.status(status).render('error', {
      message,
      status,
    });
  }
}
