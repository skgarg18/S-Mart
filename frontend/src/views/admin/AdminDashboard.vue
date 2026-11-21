<script setup lang="ts">
import { onMounted, ref } from "vue";

import ProductApi from "../../services/productApi.ts";

import Navbar from "../../components/Navbar.vue";
import OrderSummaryCard from "../../components/admin/OrderSummaryCard.vue";
import CategoryCard from "../../components/admin/CategoryCard.vue";

import type { CategorySummaryInterface } from "../../types/admin/CategorySummary.ts";

const loading = ref(true);
const error = ref("");

const categorySummary = ref<CategorySummaryInterface[]>([]);

async function getCategorySummary() {
    try {
        const response = await ProductApi.get("/admin/summary");

        categorySummary.value = response.data;
    } catch (err) {
        console.error("Error fetching category summary:", err);

        error.value = "Failed to load product categories.";
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    getCategorySummary();
    // console.log(categorySummary)
});
</script>

<template>
    <div class="min-h-screen bg-gray-50">

        <Navbar />

        <!-- Page Header -->
        <header class="border-b border-gray-200 bg-white">
            <div class="mx-auto max-w-7xl px-6 py-6">

                <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                    Admin Dashboard
                </h1>

                <p class="mt-1 text-sm text-gray-500">
                    Manage your products and monitor your store.
                </p>

            </div>
        </header>


        <main class="mx-auto max-w-7xl px-6 py-8">

            <!-- Orders -->
            <section>
                <OrderSummaryCard />
            </section>


            <!-- Product Management -->
            <section class="mt-10">

                <div class="mb-6">
                    <h2 class="text-2xl font-bold text-gray-900">
                        Product Management
                    </h2>

                    <p class="mt-1 text-sm text-gray-500">
                        Manage products by category.
                    </p>
                </div>


                <!-- Loading -->
                <div
                    v-if="loading"
                    class="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm"
                >
                    <p class="text-sm text-gray-500">
                        Loading categories...
                    </p>
                </div>


                <!-- Error -->
                <div
                    v-else-if="error"
                    class="rounded-2xl border border-red-200 bg-red-50 p-6"
                >
                    <p class="text-sm font-medium text-red-600">
                        {{ error }}
                    </p>
                </div>


                <!-- Categories -->
                <div
                    v-else
                    class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >

                    <CategoryCard
                        v-for="category in categorySummary"
                        :key="category.category"
                        :category="category.category"
                        :product-count="category.productCount"
                    />

                </div>

            </section>

        </main>

    </div>
</template>