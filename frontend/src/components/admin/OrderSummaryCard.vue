<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ShoppingBag, ArrowRight } from "lucide-vue-next";
import { useRouter } from "vue-router";

import orderApi from "../../services/orderApi.ts";

interface OrderSummary {
    totalOrders: number;
    totalAmount: number;
}

const router = useRouter();

const orderSummary = ref<OrderSummary>({
    totalOrders: 0,
    totalAmount: 0
});

const loading = ref(true);
const error = ref("");

async function fetchOrderSummary() {
    try {
        console.log("sending backend call")
        const response = await orderApi.get("/admin/summary");

        orderSummary.value = response.data;
    } catch (err) {
        console.error(err);
        error.value = "Failed to load order information.";
    } finally {
        loading.value = false;
    }
}

function viewOrders() {
    router.push("/admin/orders");
}

onMounted(() => {
    fetchOrderSummary();
});
</script>

<template>
    <div
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >

        <!-- Header -->
        <div class="flex items-center gap-3">

            <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100"
            >
                <ShoppingBag class="h-5 w-5 text-gray-700" />
            </div>

            <div>
                <h2 class="font-semibold text-gray-900">
                    Orders
                </h2>

                <p class="text-sm text-gray-500">
                    Order overview
                </p>
            </div>

        </div>


        <!-- Loading -->
        <div
            v-if="loading"
            class="mt-8 text-sm text-gray-500"
        >
            Loading order information...
        </div>


        <!-- Error -->
        <div
            v-else-if="error"
            class="mt-8 text-sm text-red-500"
        >
            {{ error }}
        </div>


        <!-- Order Data -->
        <div v-else>

            <div class="mt-8 grid grid-cols-2 gap-6">

                <!-- Number of Orders -->
                <div>
                    <p class="text-3xl font-bold text-gray-900">
                        {{ orderSummary.totalOrders }}
                    </p>

                    <p class="mt-1 text-sm text-gray-500">
                        Total Orders
                    </p>
                </div>


                <!-- Total Amount -->
                <div>
                    <p class="text-3xl font-bold text-gray-900">
                        ₹{{ orderSummary.totalAmount.toLocaleString("en-IN") }}
                    </p>

                    <p class="mt-1 text-sm text-gray-500">
                        Total Amount
                    </p>
                </div>

            </div>


            <!-- View Orders -->
            <button
                class="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 cursor-pointer"
                @click="viewOrders"
            >
                View Orders

                <ArrowRight class="h-4 w-4" />
            </button>

        </div>

    </div>
</template>