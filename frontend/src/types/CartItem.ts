import type {ProductInterface} from "./Product.ts";

export interface CartItemInterface {
    product: ProductInterface;
    quantity: number;
}