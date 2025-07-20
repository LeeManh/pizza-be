import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  ErrorResponse,
  UnprocessableEntityResponse,
} from '../types/response.type';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const responseBody: ErrorResponse = {
      statusCode: httpStatus,
      message,
    };

    if (exception instanceof UnprocessableEntityException) {
      const response = exception.getResponse() as UnprocessableEntityResponse;
      responseBody.errors = response.errors;
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
