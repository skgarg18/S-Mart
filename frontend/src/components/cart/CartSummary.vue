<script setup lang="ts">

import {useUserStore} from "../../stores/user"
import { useRouter } from 'vue-router';

const router = useRouter()

defineProps<{
    subtotal: number;
    loading: boolean;
}>();

const emit = defineEmits(['placeOrder'])

const userStore = useUserStore();

const handlePlaceOrder = () => {

    if(!userStore.isLoggedIn){
        router.push({
            path: '/login',
        })
    }
  emit('placeOrder')

}

const deliveryCharge = 40;

</script>

<template>

    <div class="rounded-xl border border-gray-200 bg-white p-6">

        <h3 class="mb-4 text-lg font-semibold">
            Order Summary
        </h3>

        <div class="flex justify-between text-sm">
            <span class="text-gray-500">
                Subtotal
            </span>

            <span>
                ₹{{ subtotal }}
            </span>
        </div>

        <div class="mt-2 flex justify-between text-sm">
            <span class="text-gray-500">
                Delivery
            </span>

            <span>
                ₹{{ deliveryCharge }}
            </span>
        </div>

        <div class="my-4 border-t"></div>

        <div class="flex justify-between text-lg font-bold">
            <span>
                Total
            </span>

            <span>
                ₹{{ subtotal + deliveryCharge }}
            </span>
        </div>

        <button
            class="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="loading"
            @click="handlePlaceOrder"
        >

            <!-- Loader -->
            <span
                v-if="loading"
                class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
            ></span>

            <span>
                {{ loading ? "Placing Order..." : "Proceed to Checkout" }}
            </span>

        </button>

    </div>

</template>