import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface BaseResponse<T> {
  data: T;
  statusCode: number;
  message: string | null;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, BaseResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<BaseResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        statusCode: context.switchToHttp().getResponse().statusCode,
        message: null,
      })),
      catchError((error) => {
        if (error instanceof HttpException) {
          const httpException: HttpException = error as HttpException;
          const response: any = httpException.getResponse();
          const status = httpException.getStatus();
          return throwError(() => {
            throw new HttpException(
              {
                data: null,
                statusCode: status,
                message:
                  typeof response === 'string'
                    ? response
                    : response.message || null,
              },
              status,
            );
          });
        } else {
          // For non-HttpException errors
          return throwError(() => {
            throw new HttpException(
              {
                data: null,
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Internal Server Error',
              },
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          });
        }
      }),
    );
  }
}
