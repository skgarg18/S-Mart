import { Controller, Post, Headers, Body} from '@nestjs/common';
import {UnauthorizedException, BadRequestException} from "@nestjs/common";
import { PlaceOrderServices } from "./place_order.services.js";

import {jwtDecode} from "jwt-decode";

import { JwtPayload } from "../types/jwtTokenInterface.js";
// import type { PlaceOrderType } from '../types/placeOrderType.js';

import { PlaceOrderDto } from './dto/place_order.dto.js';

@Controller('orders')
export class PlaceOrderController {

    constructor(private placeOrderService: PlaceOrderServices) {}

    @Post("/place")
    async placeOrder(
        @Headers('Authorization') authHeader: string,
        @Body() orderItems: PlaceOrderDto
        ) {

        if(!authHeader || !authHeader.startsWith('Bearer')) {
            throw new UnauthorizedException('Authorization header missing or invalid');
        }

        const token = authHeader?.split(' ')[1];

        const user = jwtDecode(token) as JwtPayload;

        if(!user || !user.userId) {
            throw new UnauthorizedException('Invalid token');
        }

        const result = await this.placeOrderService.placeOrder(user, orderItems.items);

        if(!result){
            throw new BadRequestException('Failed to place order');
        }

        return result;

    }

}