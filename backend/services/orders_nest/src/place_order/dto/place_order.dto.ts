import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    stock: number;

    @ApiProperty()
    unit: string;

    @ApiProperty({ nullable: true })
    image_url: string | null;

    @ApiProperty()
    is_active: boolean;

    @ApiProperty()
    category: string;
}

export class OrderItemDto {
    @ApiProperty({ type: ProductDto })
    product: ProductDto;

    @ApiProperty()
    quantity: number;
}

export class PlaceOrderDto {
    @ApiProperty({
        type: [OrderItemDto],
    })
    items: OrderItemDto[];
}