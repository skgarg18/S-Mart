<script setup lang="ts">
import { onMounted, ref} from "vue";
import ProductApi from "../services/productApi.ts";


import Navbar from "../components/Navbar.vue";
import ProductGrid from "../components/product/ProductGrid.vue";

import type {ProductInterface} from "../types/Product.ts";

const products = ref<ProductInterface[]>([]);
const loading = ref(true);
const error = ref("");


async function fetchProducts() {
    try {
        const response = await ProductApi.get("/");

        products.value = response.data;
    } catch (err) {
        console.error(err);
        error.value = "Failed to load products";
    } finally {
        loading.value = false;
    }
}


onMounted(() => {
    fetchProducts();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50">

        <Navbar/>

        <main class="mx-auto max-w-7xl px-6 py-8">

            <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-900">
                    Products
                </h2>

                <p class="mt-1 text-gray-500">
                    Browse our fresh products
                </p>
            </div>

            <div v-if="loading">
                Loading products...
            </div>

            <div v-else-if="error">
                {{ error }}
            </div>

            <div v-else>

                <ProductGrid
                    :products="products"
                />

            </div>

        </main>

    </div>
</template>