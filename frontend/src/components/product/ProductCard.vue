<script setup lang="ts">
import { computed } from "vue";

import type {ProductInterface} from "../../types/Product";

import { ShoppingCart, Plus, Minus } from "lucide-vue-next";

import { useCartStore } from "../../stores/cart"

const props = defineProps<{
    product: ProductInterface;
}>();

const cart = useCartStore();

const cartItem = computed(() => {
    return cart?.cartItems.find(
        item => item.product.id === props.product.id
    );
});
</script>

<template>
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white transition hover:shadow-md">

        <!-- Product image -->
        <div class="flex h-48 items-center justify-center bg-gray-100 text-6xl">
            <ShoppingCart />
        </div>

        <!-- Product information -->
        <div class="p-4">

            <p class="mb-1 text-sm text-gray-500">
                {{ product.category }}
            </p>

            <h3 class="text-lg font-semibold text-gray-900">
                {{ product.name }}
            </h3>

            <p class="mt-1 text-sm text-gray-500">
                {{ product.description }}
            </p>

            <div class="mt-4 flex items-center justify-between">
                <div>
                    <span class="text-lg font-bold text-gray-900">
                        ₹{{ product.price }}
                    </span>

                    <span class="text-sm text-gray-500">
                        / {{ product.unit }}
                    </span>
                </div>

                <span class="text-xs text-gray-500">
                    {{ product.stock }} available
                </span>
            </div>

            <!-- Add to Cart -->
            <button
                v-if="!cartItem"
                class="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
                @click="cart?.addToCart(product)"
            >
                <ShoppingCart class="h-4 w-4" />
                Add to Cart
            </button>

            <!-- Quantity Controls -->
            <div
                v-else
                class="mt-4 flex w-full items-center justify-center rounded-lg border border-gray-200"
            >
                <button
                    class="flex h-10 w-12 items-center justify-center rounded-l-lg text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                    @click="cart?.decreaseQuantity(product.id)"
                >
                    <Minus class="h-4 w-4" />
                </button>

                <span
                    class="flex h-10 flex-1 items-center justify-center border-x border-gray-200 text-sm font-semibold text-gray-900"
                >
                    {{ cartItem.quantity }}
                </span>

                <button
                    class="flex h-10 w-12 items-center justify-center rounded-r-lg text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                    @click="cart?.increaseQuantity(product.id)"
                >
                    <Plus class="h-4 w-4" />
                </button>
            </div>

        </div>
    </div>
</template>