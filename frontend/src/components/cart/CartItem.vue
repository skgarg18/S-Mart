<script setup lang="ts">
import type { CartItemInterface } from "../../types/CartItem.ts";
import { Plus, Minus } from "lucide-vue-next";

defineProps<{
    item: CartItemInterface;
}>();

const emit = defineEmits<{
    increase: [productId: number];
    decrease: [productId: number];
}>();

</script>

<template>
    <div
        class="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4"
    >
        <div>
            <h3 class="font-semibold">
                {{ item.product.name }}
            </h3>

            <p class="text-sm text-gray-500">
                ₹{{ item.product.price }}
                / {{ item.product.unit }}
            </p>
        </div>

        <div class="flex items-center gap-4">

            <div class="flex items-center gap-2">

                <button
                    class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    @click="emit('decrease', item.product.id)"
                >
                    <Minus class="h-4 w-4" />
                </button>

                <span class="w-8 text-center text-sm font-medium">
                    {{ item.quantity }}
                </span>

                <button
                    class="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer"
                    @click="emit('increase', item.product.id)"
                >
                    <Plus class="h-4 w-4" />
                </button>

            </div>

            <span class="font-semibold">
                ₹{{ Number(item.product.price) * item.quantity }}
            </span>

        </div>
    </div>
</template>