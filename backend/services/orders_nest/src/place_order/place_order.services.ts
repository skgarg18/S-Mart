import {
    Injectable,
    BadRequestException
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import {
    Repository,
    DataSource
} from 'typeorm';

import { JwtPayload } from "../types/jwtTokenInterface.js";
import type { orderItemsInterface } from "../types/placeOrderType.js";

import {
    orders,
    OrderStatus,
    PaymentMethod
} from '../entities/orders.entity.js';

import { order_items } from "../entities/order_items.entity.js";


@Injectable()
export class PlaceOrderServices {

    constructor(
        @InjectRepository(orders)
        private readonly ordersRepository: Repository<orders>,

        @InjectRepository(order_items)
        private readonly orderItemsRepository: Repository<order_items>,

        private readonly dataSource: DataSource,
    ) {}

    async placeOrder(
        user: JwtPayload,
        orderItems: orderItemsInterface[]
    ) {

        try {

            const result = await this.dataSource.transaction(
                async (manager) => {

                    // 1. Calculate subtotal
                    const subtotal = orderItems.reduce(
                        (sum, item) =>
                            sum +
                            Number(item.product.price) * item.quantity,
                        0
                    );

                    const deliveryFee = 50;

                    const total = subtotal + deliveryFee;


                    // 2. Create order
                    const order = manager.create(orders, {
                        user_id: user.userId,
                        subtotal: subtotal,
                        delivery_fee: deliveryFee,
                        status: OrderStatus.PLACED,
                        payment_method: PaymentMethod.COD,
                    });

                    const savedOrder = await manager.save(
                        orders,
                        order
                    );


                    // 3. Create order items
                    for (const item of orderItems) {

                        const orderItem = manager.create(
                            order_items,
                            {
                                user_id: user.userId,

                                // This creates order_items.order_id
                                order: savedOrder,

                                product_id: item.product.id,

                                quantity: item.quantity,

                                price: Number(item.product.price),

                                subtotal:
                                    Number(item.product.price) *
                                    item.quantity,
                            }
                        );

                        await manager.save(
                            order_items,
                            orderItem
                        );
                    }


                    return {
                        orderId: savedOrder.id,
                        total,
                    };
                }
            );


            return {
                message: "Order Placed Successfully",
                orderId: result.orderId
            };

        }
        catch (error) {

            console.log(error);

            throw new BadRequestException(
                "There is some error in placing the order: " +
                error
            );
        }
    }
}