import type { Ref } from "vue";
import type {ProductInterface} from "./Product";
import type { CartItemInterface } from "./CartItem";

export interface CartContextInterface {
    cartItems: Ref<CartItemInterface[]>;
    addToCart: (product: ProductInterface) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
}