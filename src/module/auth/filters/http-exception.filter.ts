import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { message, error, statusCode } = exception.getResponse();

    response.status(201).json({
      messages: Array.isArray(message) ? [...message] : [message],
      error: error || null,
      statusCode,
      result: null,
    });
  }
}
