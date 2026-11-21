import {Controller, Get, InternalServerErrorException, UseGuards} from '@nestjs/common';
import { OrdersServices } from "./orders.services.js"

import { AdminGuard } from '../auth.gaurds.js';


@Controller('orders')
export class OrdersController{
    constructor(private ordersServices: OrdersServices) {}


    @Get("/admin/summary")
    @UseGuards(AdminGuard)
    async getOrderSummary(){


        try {
            const orderSummary = await this.ordersServices.getOrderSummary();

            const summary = {
                totalOrders: Number(orderSummary.total_orders),
                totalAmount: Number(orderSummary.total_amount)
            };

            return summary

        }
        
        catch (error) {
          console.error('Error fetching order summary:', error);
            
          throw new InternalServerErrorException(
            'Failed to fetch order summary',
          );
        }
    }

}