export interface ProductInterface {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    unit: string;
    image_url: string | null;
    is_active: boolean;
    category: string;
}

export interface orderItemsInterface {
    product: ProductInterface;
    quantity: number;
}

export interface PlaceOrderType{
    items: orderItemsInterface[];
}