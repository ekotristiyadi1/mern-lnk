import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { databaseProviders } from './providers/database.provider';

@Module({
  imports: [],
  providers: [
    ...databaseProviders,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [...databaseProviders],
})
export class CoreModule {}
