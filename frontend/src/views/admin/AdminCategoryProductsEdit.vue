<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Plus, ArrowLeft, Pencil, Trash2 } from "lucide-vue-next";

import ProductApi from "../../services/productApi.ts";
import Navbar from "../../components/Navbar.vue";
import AddProductModal from "../../components/admin/AddProductModel.vue"

import type { ProductInterface } from "../../types/Product.ts";
import type {AddProductFormDataInterface} from "../../types/admin/AddProductForm"


const route = useRoute();
const router = useRouter();

const products = ref<ProductInterface[]>([]);

const loading = ref(true);
const error = ref("");

const showAddProductModal = ref(false);

const category = route.params.category as string;

async function fetchProductsByCategory() {
    try {
        const response = await ProductApi.get(
            `/${encodeURIComponent(category)}`
        );

        console.log("Products fetched:", response.data);

        products.value = response.data;
    } catch (err) {
        console.error(err);

        error.value = "Failed to load products.";
    } finally {
        loading.value = false;
    }
}




function goBack() {
    router.push("/admin");
}

async function addProduct(product: AddProductFormDataInterface) {
    // We'll implement this later

    try {

        const res = await ProductApi.post(
            `/admin/${encodeURIComponent(category)}/add`,
            product
        )

        console.log("Product added" , product);

        return res.data

        
    } catch (err) {
        console.log("error adding product" , err);

        throw err

    }

    
}

function editProduct(product: ProductInterface) {
    // We'll implement this later
    console.log("Edit product:", product);
}

function deleteProduct(product: ProductInterface) {
    // We'll implement this later
    console.log("Delete product:", product);
}




async function handleProductAdded(product: AddProductFormDataInterface) {
    

    try{
        await addProduct(product);
        showAddProductModal.value = false;
        await fetchProductsByCategory();
    }
    catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    fetchProductsByCategory();
});
</script>

<template>
    <div class="min-h-screen bg-gray-50">

        <Navbar />


        <!-- Page Header -->
        <header class="border-b border-gray-200 bg-white">
            <div
                class="mx-auto flex max-w-7xl items-center justify-between px-6 py-6"
            >

                <div class="flex items-center gap-4">

                    <!-- Back button -->
                    <button
                        class="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                        @click="goBack"
                    >
                        <ArrowLeft class="h-5 w-5" />
                    </button>


                    <div>
                        <div class="flex items-center gap-2">

                            <h1
                                class="text-2xl font-bold tracking-tight text-gray-900"
                            >
                                {{ category }}
                            </h1>

                            <span
                                class="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600"
                            >
                                {{ products.length }}
                                {{ products.length === 1 ? "product" : "products" }}
                            </span>

                        </div>

                        <p class="mt-1 text-sm text-gray-500">
                            Manage products in this category
                        </p>
                    </div>

                </div>


                <!-- Add Product -->
                <button
                    class="flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 cursor-pointer"
                    @click="showAddProductModal=true"
                >
                    <Plus class="h-4 w-4" />

                    Add Product
                </button>

            </div>
        </header>


        <main class="mx-auto max-w-7xl px-6 py-8">


            <!-- Loading -->
            <div
                v-if="loading"
                class="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm"
            >
                <p class="text-sm text-gray-500">
                    Loading products...
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


            <!-- Empty -->
            <div
                v-else-if="products.length === 0"
                class="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm"
            >
                <div
                    class="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100"
                >
                    <Plus class="h-5 w-5 text-gray-500" />
                </div>

                <h2 class="mt-4 text-lg font-semibold text-gray-900">
                    No products found
                </h2>

                <p class="mt-1 text-sm text-gray-500">
                    There are currently no products in {{ category }}.
                </p>

                <button
                    class="mt-5 rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 cursor-pointer"
                    @click="showAddProductModal=true"
                >
                    Add Product
                </button>
            </div>


            <!-- Products Table -->
            <div
                v-else
                class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
            >
                <!-- Table Header -->
                <div class="border-b border-gray-200 px-6 py-5">
                    <div class="flex items-center justify-between">
                    
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900">
                                {{ category }} Products
                            </h2>
                        
                            <p class="mt-1 text-sm text-gray-500">
                                View and manage all products in this category.
                            </p>
                        </div>
                    
                        <span
                            class="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600"
                        >
                            {{ products.length }}
                            {{ products.length === 1 ? "Product" : "Products" }}
                        </span>
                    
                    </div>
                </div>
            
            
                <div class="overflow-x-auto">
                
                    <table class="w-full">
                    
                        <!-- Header -->
                        <thead class="border-b border-gray-200 bg-gray-50">
                        
                            <tr>
                            
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    Product
                                </th>
                            
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    Price
                                </th>
                            
                                <th
                                    class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    Stock
                                </th>
                            
                                <th
                                    class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    Actions
                                </th>
                            
                            </tr>
                        
                        </thead>
                    
                    
                        <!-- Body -->
                        <tbody class="divide-y divide-gray-100">
                        
                            <tr
                                v-for="product in products"
                                :key="product.id"
                                class="transition-colors hover:bg-gray-50/70"
                            >
                        
                                <!-- Product -->
                                <td class="px-6 py-5">
                                
                                    <div class="flex items-center gap-4">
                                    
                                        <!-- Product Initial -->
                                        <div
                                            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100"
                                        >
                                            <span
                                                class="text-sm font-semibold text-gray-500"
                                            >
                                                {{ product.name.charAt(0).toUpperCase() }}
                                            </span>
                                        </div>
                                    
                                    
                                        <!-- Product Info -->
                                        <div class="min-w-0">
                                        
                                            <p
                                                class="font-semibold text-gray-900"
                                            >
                                                {{ product.name }}
                                            </p>
                                        
                                            <p
                                                class="mt-1 max-w-md truncate text-sm text-gray-500"
                                            >
                                                {{ product.description }}
                                            </p>
                                        
                                        </div>
                                    
                                    </div>
                                
                                </td>
                            
                            
                                <!-- Price -->
                                <td class="px-6 py-5">
                                
                                    <div class="flex items-baseline gap-1">
                                    
                                        <span
                                            class="font-semibold text-gray-900"
                                        >
                                            ₹{{ product.price }}
                                        </span>
                                    
                                        <span
                                            class="text-sm text-gray-500"
                                        >
                                            / {{ product.unit }}
                                        </span>
                                    
                                    </div>
                                
                                </td>
                            
                            
                                <!-- Stock -->
                                <td class="px-6 py-5">
                                
                                    <div class="flex items-center gap-3">
                                    
                                        <span
                                            class="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-semibold text-gray-700"
                                        >
                                            {{ product.stock }}
                                        </span>
                                    
                                        <span
                                            class="text-sm text-gray-500"
                                        >
                                            {{ product.unit }}
                                        </span>
                                    
                                    </div>
                                
                                </td>
                            
                            
                                <!-- Actions -->
                                <td class="px-6 py-5">
                                
                                    <div class="flex justify-end gap-2">
                                    
                                        <button
                                            class="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                                            @click="editProduct(product)"
                                        >
                                            <Pencil class="h-4 w-4" />
                                    
                                            Edit
                                        </button>
                                    
                                    
                                        <button
                                            class="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3.5 py-2 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50 cursor-pointer"
                                            @click="deleteProduct(product)"
                                        >
                                            <Trash2 class="h-4 w-4" />
                                    
                                            Delete
                                        </button>
                                    
                                    </div>
                                
                                </td>
                            
                            </tr>
                        
                        </tbody>
                    
                    </table>
                
                </div>
            
            </div>

        </main>

        <AddProductModal
            v-if="showAddProductModal"
            :category="category"
            @close="showAddProductModal = false"
            @product-added="handleProductAdded"
        />

    </div>
</template>