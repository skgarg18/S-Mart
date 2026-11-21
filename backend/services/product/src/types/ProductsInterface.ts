export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    unit: string;
    image_url: string;
    is_active: boolean;
    category: string;
}