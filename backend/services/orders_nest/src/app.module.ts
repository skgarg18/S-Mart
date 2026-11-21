import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config';

import {OrdersModule} from "./order_admin_summary/orders.module.js"
import {PlaceOrdersModule} from "./place_order/place_order.modules.js"


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal:true,
    }),

    OrdersModule,
    PlaceOrdersModule,

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory:(configService: ConfigService) => ({
        type:'postgres',

        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),

        autoLoadEntities: true,
        // synchronize: true,
      })

      
    })
  ],
})

export class AppModule {}