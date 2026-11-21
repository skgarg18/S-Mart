import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm'

import { orders } from '../entities/orders.entity.js'

import { OrdersController } from './orders.controller.js';
import { OrdersServices } from './orders.services.js';

import {
  AuthenticateMiddleware,
} from '../orders.middleware.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([orders])
  ],
  controllers: [OrdersController],
  providers: [OrdersServices],
})

export class OrdersModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(
        AuthenticateMiddleware
      )
      .forRoutes({
        path: 'orders/admin/summary',
        method: RequestMethod.GET,
      });

  }
}