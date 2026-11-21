import { Injectable } from "@nestjs/common"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { orders } from '../entities/orders.entity.js'

@Injectable()
export class OrdersServices{

    constructor(
        @InjectRepository(orders)
        private readonly ordersRepository: Repository<orders>,
    ) {}
    
    async getOrderSummary() {
        const result = await this.ordersRepository
            .createQueryBuilder('order')
            .select('COUNT(order.id)', 'total_orders')
            .addSelect('COALESCE(SUM(order.subtotal), 0)', 'total_amount')
            .getRawOne();
        
        return result;
    }
}