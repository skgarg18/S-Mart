import {defineStore} from "pinia"
import {ref, watch} from "vue"

import type {ProductInterface} from "../types/Product.ts";
import type {CartItemInterface} from "../types/CartItem.ts";

export const useCartStore = defineStore("cart" , () => {

    const savedCart = localStorage.getItem("cartItems");

    const cartItems = ref<CartItemInterface[]>(
        savedCart ? JSON.parse(savedCart) : []
    );

    watch(
        cartItems,
        (newCart) => {
            localStorage.setItem(
                "cartItems",
                JSON.stringify(newCart)
            );
        },
        { deep: true }
    );

    function addToCart(product: ProductInterface) {
        const existingItem = cartItems.value.find(
            item => item.product.id === product.id
        );

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.value.push({
                product: product,
                quantity: 1
            });
        }

        console.log("Cart Items:", cartItems.value);
    }


    function increaseQuantity(productId: number) {
        const item = cartItems.value.find(
            item => item.product.id === productId
        );

        if (item) {
            item.quantity++;
        }
    }

    function decreaseQuantity(productId: number) {
        const index = cartItems.value.findIndex(
            item => item.product.id === productId
        );

        if (index === -1) {
            return;
        }

        if (cartItems.value[index].quantity > 1) {
            cartItems.value[index].quantity--;
        } else {
            cartItems.value.splice(index, 1);
        }
    }

    function clearCart() { cartItems.value = []; }


    return{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    }


})