import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn,
    OneToMany
        } from 'typeorm';

import type { Relation } from 'typeorm';

import { order_items } from './order_items.entity.js';


export enum OrderStatus{
    PLACED = 'placed',
    CONFIRMED = 'confirmed',
    PACKING = 'packing',
    OUT_FOR_DELIVERY = 'out_for_dilevery',
    DELIVERED = 'delivered',
    CANCELLED = 'cancelled',
}

export enum PaymentMethod{
    COD="cod",
    ONLINE='online'
}

@Entity('orders')
export class orders{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    subtotal: number;

    @Column()
    delivery_fee: number;

    @Column({
        type: 'enum',
        enum: OrderStatus,
        default:OrderStatus.CONFIRMED
    })
    status: OrderStatus;

    @Column({
        type: 'enum',
        enum: PaymentMethod,
        default: PaymentMethod.ONLINE
    })
    payment_method: PaymentMethod;

    @Column()
    user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


    @OneToMany(
        () => order_items,
        (order_item) => order_item.order,
    )
    orders_items: Relation<order_items[]>

}