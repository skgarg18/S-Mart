import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm'

import { PlaceOrderController } from './place_order.controller.js'
import { PlaceOrderServices } from './place_order.services.js'

import {orders} from '../entities/orders.entity.js'
import {order_items} from '../entities/order_items.entity.js'

import {
  AuthenticateMiddleware
} from '../orders.middleware.js';


@Module({
    imports:[
      TypeOrmModule.forFeature(
        [orders, order_items]
      )
    ],
    controllers: [PlaceOrderController],
    providers: [PlaceOrderServices],
})

export class PlaceOrdersModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {

    consumer
      .apply(
        AuthenticateMiddleware
      )
      .forRoutes({
        path: 'orders/place',
        method: RequestMethod.POST,
      });

  }
}


