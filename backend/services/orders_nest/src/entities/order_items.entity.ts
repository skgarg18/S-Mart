import {
    Entity , 
    Column, 
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
    } from 'typeorm'

import type { Relation } from 'typeorm';

import { orders } from './orders.entity.js'

@Entity('order_items')
export class order_items{

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        () => orders,
        (order) => order.orders_items
    )
    @JoinColumn({ name: 'order_id' })
    order: Relation<orders>;


    @Column()
    product_id: number;

    @Column()
    price: number

    @Column()
    quantity: number

    @Column()
    subtotal: number

    @Column()
    user_id: number
}