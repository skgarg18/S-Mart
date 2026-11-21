<script setup lang="ts">
import {computed, ref} from "vue";

import CartItem from "./CartItem.vue";
import CartSummary from "./CartSummary.vue";

import {useCartStore} from "../../stores/cart.ts";

import orderApi from "../../services/orderApi.ts";

import axios from "axios";
const emit = defineEmits<{
    back: [];
}>();


const cart = useCartStore();

const subtotal = computed(() => {
    if (!cart) {
        return 0;
    }

    return cart.cartItems.reduce((total, item) => {
        return total + Number(item.product.price) * item.quantity;
    }, 0);
});

const loading = ref(false);
const successMessage = ref(""); 
const errorMessage = ref("");



async function handlePlaceOrder(){

    // Clear previous messages
    successMessage.value = ""; errorMessage.value = "";

    try {

        loading.value = true;
        
        const response = await orderApi.post("/place",
            {
                items: cart.cartItems
            }
        )

        // Show success message
        successMessage.value = response.data.message;
        
        // Clear cart after successful order 
        cart.clearCart();


    } catch (error:any) {

        if (axios.isAxiosError(error)) {
          console.log(error.response?.status);
          console.log(error.response?.data);
        }
        
        console.log(error)

        errorMessage.value = "Failed to place order. Please try again.";

    }
    finally { loading.value = false; }


}


</script>

<template>
    <div class="mx-auto max-w-4xl px-6 py-8">

        <RouterLink
            class="mb-6 flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            to="/"
        >
            ← Continue Shopping
        </RouterLink>

        <h2 class="mb-6 text-3xl font-bold">
            Your Cart
        </h2>

        <!-- Success message --> 
        <div v-if="successMessage"
         class="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700" > 
            {{ successMessage }}
        </div>
         
         
        <!-- Error message --> 
        <div v-if="errorMessage"
         class="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700" >
            {{ errorMessage }}
        </div>

        <!-- Empty cart -->
        <div
            v-if="!cart || cart.cartItems.length === 0"
            class="rounded-xl border border-gray-200 bg-white p-8 text-center"
        >
            <p class="text-gray-500">
                Your cart is empty.
            </p>
        </div>

        <!-- Cart items -->
        <div v-else class="space-y-4">

            <CartItem
                v-for="item in cart.cartItems"
                :key="item.product.id"
                :item="item"
                @increase="cart.increaseQuantity"
                @decrease="cart.decreaseQuantity"
            />

            <CartSummary
                v-if="cart && cart.cartItems.length > 0"
                :subtotal="subtotal"
                @place-order="handlePlaceOrder"
                :loading="loading"
            />

        </div>

        

    </div>
</template>