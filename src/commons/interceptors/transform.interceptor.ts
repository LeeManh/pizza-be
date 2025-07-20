import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult, SuccessResponse } from '../types/response.type';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_KEY } from '../decorators/response-message.decorator';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, SuccessResponse<T>>
{
  constructor(private readonly reflector: Reflector) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponse<T>> {
    const message = this.reflector.get<string>(
      RESPONSE_MESSAGE_KEY,
      context.getHandler(),
    );
    const httpStatus = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      map((data) => {
        const response: SuccessResponse<T> = {
          statusCode: httpStatus,
          message,
          data,
        };

        if (this.isPaginatedResult(data)) {
          response.meta = data.meta;
          response.data = data.items;
        }

        return response;
      }),
    );
  }

  private isPaginatedResult(data: any): data is PaginatedResult<any> {
    return (
      data &&
      typeof data === 'object' &&
      'items' in data &&
      'meta' in data &&
      Array.isArray(data.items)
    );
  }
}
